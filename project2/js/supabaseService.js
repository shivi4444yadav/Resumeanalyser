// Supabase Backend & Local Persistence Service
window.SupabaseService = (() => {
  const DEFAULT_SUPABASE_URL = "https://oltrjryytvfoodzfqutn.supabase.co";
  const DEFAULT_SUPABASE_ANON = "sb_publishable_ZE3jtG7TpibLn1-5WusAeQ_AeE8fon2";

  const STORAGE_KEYS = {
    URL: 'resumeai_supabase_url',
    KEY: 'resumeai_supabase_key',
    ANALYSES: 'resumeai_saved_analyses',
    JOB_MATCHES: 'resumeai_saved_job_matches',
    IMPROVED: 'resumeai_saved_improved',
    PROFILE: 'resumeai_user_profile'
  };

  let supabaseClient = null;

  function initClient() {
    const url = localStorage.getItem(STORAGE_KEYS.URL) || DEFAULT_SUPABASE_URL;
    const key = localStorage.getItem(STORAGE_KEYS.KEY) || DEFAULT_SUPABASE_ANON;

    if (window.supabase && window.supabase.createClient && url && key) {
      try {
        supabaseClient = window.supabase.createClient(url, key);
      } catch (err) {
        console.warn("Failed to initialize Supabase client:", err);
        supabaseClient = null;
      }
    }
    return supabaseClient;
  }

  // Initialize on load
  initClient();

  // Authentication Helpers
  async function getCurrentUser() {
    if (supabaseClient) {
      try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (user) return user;
      } catch (e) {
        // Fall back to local
      }
    }
    const localProfile = getLocalProfile();
    return localProfile ? { id: 'guest-user', email: localProfile.email, user_metadata: localProfile } : null;
  }

  async function signIn(email, password) {
    if (supabaseClient) {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data.user;
    }
    // Local fallback
    const user = { id: 'local-' + Date.now(), email, user_metadata: { full_name: email.split('@')[0] } };
    saveLocalProfile(user.user_metadata);
    return user;
  }

  async function signUp(email, password, fullName) {
    if (supabaseClient) {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });
      if (error) throw error;
      return data.user;
    }
    // Local fallback
    const user = { id: 'local-' + Date.now(), email, user_metadata: { full_name: fullName } };
    saveLocalProfile(user.user_metadata);
    return user;
  }

  async function signOut() {
    if (supabaseClient) {
      await supabaseClient.auth.signOut();
    }
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
  }

  // Profile Management
  function getLocalProfile() {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    return {
      fullName: "Alex Rivera",
      email: "alex.rivera@example.com",
      targetRole: "Senior Full Stack Engineer",
      targetIndustry: "Technology & SaaS",
      theme: "light",
      notifications: true
    };
  }

  function saveLocalProfile(profile) {
    const current = getLocalProfile();
    const updated = { ...current, ...profile };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
    return updated;
  }

  // Analyses Persistence
  function getSavedAnalyses() {
    const raw = localStorage.getItem(STORAGE_KEYS.ANALYSES);
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    return [];
  }

  async function saveAnalysis(analysisData) {
    const analyses = getSavedAnalyses();
    const record = {
      id: analysisData.id || 'res-' + Date.now(),
      fileName: analysisData.fileName || 'Resume.pdf',
      fileSizeFormatted: analysisData.fileSizeFormatted || '45 KB',
      overallScore: analysisData.overallScore,
      scoreTier: analysisData.scoreTier,
      categoryScores: analysisData.categoryScores,
      summary: analysisData.summary,
      strengths: analysisData.strengths,
      weaknesses: analysisData.weaknesses,
      suggestions: analysisData.suggestions,
      missingKeywords: analysisData.missingKeywords,
      matchedKeywords: analysisData.matchedKeywords,
      improvedBullets: analysisData.improvedBullets,
      jobMatch: analysisData.jobMatch,
      createdAt: analysisData.analyzedAt || new Date().toISOString()
    };

    // Save to beginning of array
    analyses.unshift(record);
    // Keep max 20 records
    if (analyses.length > 20) analyses.pop();
    localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(analyses));

    // Try saving to Supabase if authenticated
    if (supabaseClient) {
      try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (user) {
          await supabaseClient.from('resume_analyses').insert({
            user_id: user.id,
            file_name: record.fileName,
            file_size_formatted: record.fileSizeFormatted,
            overall_score: record.overallScore,
            category_scores: record.categoryScores,
            summary: record.summary,
            strengths: record.strengths,
            weaknesses: record.weaknesses,
            suggestions: record.suggestions,
            missing_keywords: record.missingKeywords,
            matched_keywords: record.matchedKeywords,
            improved_bullets: record.improvedBullets
          });
        }
      } catch (err) {
        console.warn("Supabase save error (saved to localStorage):", err);
      }
    }

    return record;
  }

  function deleteAnalysis(id) {
    const analyses = getSavedAnalyses().filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(analyses));
    return analyses;
  }

  function clearAllData() {
    localStorage.removeItem(STORAGE_KEYS.ANALYSES);
    localStorage.removeItem(STORAGE_KEYS.JOB_MATCHES);
    localStorage.removeItem(STORAGE_KEYS.IMPROVED);
  }

  // Job Matches Persistence
  function getSavedJobMatches() {
    const raw = localStorage.getItem(STORAGE_KEYS.JOB_MATCHES);
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    return [];
  }

  function saveJobMatch(matchRecord) {
    const matches = getSavedJobMatches();
    const record = {
      id: 'jm-' + Date.now(),
      ...matchRecord,
      createdAt: new Date().toISOString()
    };
    matches.unshift(record);
    if (matches.length > 20) matches.pop();
    localStorage.setItem(STORAGE_KEYS.JOB_MATCHES, JSON.stringify(matches));
    return record;
  }

  // Improved Resumes Persistence
  function getSavedImprovedResumes() {
    const raw = localStorage.getItem(STORAGE_KEYS.IMPROVED);
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    return [];
  }

  function saveImprovedResume(resumeData) {
    const saved = getSavedImprovedResumes();
    const record = {
      id: 'imp-' + Date.now(),
      ...resumeData,
      createdAt: new Date().toISOString()
    };
    saved.unshift(record);
    if (saved.length > 20) saved.pop();
    localStorage.setItem(STORAGE_KEYS.IMPROVED, JSON.stringify(saved));
    return record;
  }

  return {
    initClient,
    getCurrentUser,
    signIn,
    signUp,
    signOut,
    getLocalProfile,
    saveLocalProfile,
    getSavedAnalyses,
    saveAnalysis,
    deleteAnalysis,
    clearAllData,
    getSavedJobMatches,
    saveJobMatch,
    getSavedImprovedResumes,
    saveImprovedResume,
    STORAGE_KEYS
  };
})();
