// Main Application Orchestrator
window.App = () => {
  const [activeTab, setActiveTab] = React.useState('landing');
  const [currentAnalysis, setCurrentAnalysis] = React.useState(null);
  const [darkMode, setDarkMode] = React.useState(() => {
    return localStorage.getItem('resumeai_dark_mode') === 'true' || 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [user, setUser] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = React.useState(false);

  // Sync dark mode class
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('resumeai_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('resumeai_dark_mode', 'false');
    }
  }, [darkMode]);

  // Check current user on load
  React.useEffect(() => {
    window.SupabaseService.getCurrentUser().then(u => {
      if (u) setUser(u);
    });

    // Check if there is a previous analysis in storage to pre-load
    const saved = window.SupabaseService.getSavedAnalyses();
    if (saved.length > 0) {
      setCurrentAnalysis(saved[0]);
    }
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const handleAnalysisComplete = (analysisResult) => {
    setCurrentAnalysis(analysisResult);
    setActiveTab('dashboard_analysis');
    showToast(`ATS Compatibility Score: ${analysisResult.overallScore}/100 calculated!`);

    // Fire celebratory confetti if high score
    if (analysisResult.overallScore >= 75 && window.confetti) {
      window.confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleTrySample = async (sampleKey) => {
    setActiveTab('upload');
    const sample = window.DocumentParser.SAMPLE_RESUMES[sampleKey];
    if (!sample) return;

    showToast(`Loaded sample resume: ${sample.name}`);
    // Run instant analysis
    const result = await window.AiService.analyzeResume(sample.text, sample.name);
    result.fileSizeFormatted = window.DocumentParser.formatBytes(sample.size);
    result.resumeText = sample.text;
    await window.SupabaseService.saveAnalysis(result);
    setCurrentAnalysis(result);
    setActiveTab('dashboard_analysis');
    showToast(`ATS Analysis complete for ${sample.name}!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Navbar */}
      <window.Navbar
        activeTab={activeTab === 'dashboard_analysis' ? 'upload' : activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onNewUpload={() => {
          setActiveTab('upload');
        }}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <window.LandingPage
            onStartAnalysis={() => setActiveTab('upload')}
            onTrySample={handleTrySample}
            onSelectRoleMatch={() => setActiveTab('job_match')}
          />
        )}

        {activeTab === 'upload' && (
          <window.ResumeUpload
            onAnalysisComplete={handleAnalysisComplete}
            showToast={showToast}
          />
        )}

        {activeTab === 'dashboard_analysis' && (
          <window.AnalysisDashboard
            analysis={currentAnalysis}
            onImproveResume={() => setActiveTab('improve')}
            onMatchJob={() => setActiveTab('job_match')}
            onNewScan={() => setActiveTab('upload')}
            showToast={showToast}
          />
        )}

        {activeTab === 'job_match' && (
          <window.JobMatchSection
            analysis={currentAnalysis}
            onNavigateToUpload={() => setActiveTab('upload')}
            showToast={showToast}
          />
        )}

        {activeTab === 'improve' && (
          <window.ResumeImprovement
            analysis={currentAnalysis}
            onNavigateToUpload={() => setActiveTab('upload')}
            showToast={showToast}
          />
        )}

        {activeTab === 'dashboard' && (
          <window.UserDashboard
            onSelectAnalysis={(rec) => {
              setCurrentAnalysis(rec);
              setActiveTab('dashboard_analysis');
            }}
            onNavigateToUpload={() => setActiveTab('upload')}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
            showToast={showToast}
          />
        )}
      </main>

      {/* Modern SaaS Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 py-10 mt-auto transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Brand Logo & Tagline */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white">
                <window.Icons.Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                  ResumeAI
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Beat the ATS. Land Your Dream Job.
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <button onClick={() => setActiveTab('landing')} className="hover:text-blue-600 transition-colors">
                Home
              </button>
              <button onClick={() => setActiveTab('upload')} className="hover:text-blue-600 transition-colors">
                Analyze Resume
              </button>
              <button onClick={() => setActiveTab('job_match')} className="hover:text-blue-600 transition-colors">
                Job Match
              </button>
              <button onClick={() => setActiveTab('improve')} className="hover:text-blue-600 transition-colors">
                Improve Resume
              </button>
              <button onClick={() => setActiveTab('dashboard')} className="hover:text-blue-600 transition-colors">
                History
              </button>
              <button onClick={() => setIsPrivacyModalOpen(true)} className="hover:text-blue-600 transition-colors flex items-center gap-1">
                <window.Icons.ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Privacy Notice</span>
              </button>
            </div>

            {/* Status & Copyright */}
            <div className="text-xs text-slate-400 text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold mb-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>ATS Engine Operational</span>
              </div>
              <div>© 2026 ResumeAI SaaS Platform. All rights reserved.</div>
            </div>

          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl shadow-slate-950/50 animate-in slide-in-from-bottom-5 border border-slate-700">
          <window.Icons.Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Modals */}
      <window.AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(u) => setUser(u)}
        showToast={showToast}
      />

      <window.SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showToast={showToast}
      />

      <window.PrivacyNoticeModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

    </div>
  );
};
