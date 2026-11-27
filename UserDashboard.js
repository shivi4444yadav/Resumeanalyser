// User Dashboard & History Component
window.UserDashboard = ({ onSelectAnalysis, onNavigateToUpload, onOpenSettings, showToast }) => {
  const [activeTab, setActiveTab] = React.useState('history'); // 'history', 'saved', 'settings'
  const [analyses, setAnalyses] = React.useState([]);
  const [savedImproved, setSavedImproved] = React.useState([]);
  const [userProfile, setUserProfile] = React.useState(window.SupabaseService.getLocalProfile());
  const [isDeletingId, setIsDeletingId] = React.useState(null);

  React.useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const savedList = window.SupabaseService.getSavedAnalyses();
    setAnalyses(savedList);
    const improvedList = window.SupabaseService.getSavedImprovedResumes();
    setSavedImproved(improvedList);
    setUserProfile(window.SupabaseService.getLocalProfile());
  };

  const totalAnalyzed = analyses.length;
  const latestScore = analyses.length > 0 ? analyses[0].overallScore : 0;
  const avgScore = analyses.length > 0 
    ? Math.round(analyses.reduce((acc, a) => acc + (a.overallScore || 0), 0) / analyses.length) 
    : 0;

  const handleDeleteAnalysis = (id, e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this resume analysis record?")) {
      const updated = window.SupabaseService.deleteAnalysis(id);
      setAnalyses(updated);
      showToast("Resume analysis record deleted.");
    }
  };

  const handleClearAllData = () => {
    if (confirm("Warning: This will delete all your saved resumes, analyses, and history from your local session. This cannot be undone. Continue?")) {
      window.SupabaseService.clearAllData();
      setAnalyses([]);
      setSavedImproved([]);
      showToast("All resume data and scan history cleared.");
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    window.SupabaseService.saveLocalProfile(userProfile);
    showToast("Profile settings saved successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Overview Stats */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Candidate Workspace & History
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Track ATS score progression, manage saved resumes, and review tailored recommendations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToUpload}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
            >
              <window.Icons.UploadCloud className="w-4 h-4" />
              <span>Scan New Resume</span>
            </button>
          </div>
        </div>

        {/* 4 Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Resumes Scanned
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {totalAnalyzed}
            </div>
            <div className="text-[10px] text-slate-400">Total lifetime audits</div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Latest ATS Score
            </span>
            <div className="text-2xl sm:text-3xl font-black text-blue-600">
              {latestScore > 0 ? `${latestScore}/100` : '--'}
            </div>
            <div className="text-[10px] text-slate-400">Most recent document</div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Average Score
            </span>
            <div className="text-2xl sm:text-3xl font-black text-purple-600">
              {avgScore > 0 ? `${avgScore}/100` : '--'}
            </div>
            <div className="text-[10px] text-slate-400">Across all audits</div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Saved Rewrites
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">
              {savedImproved.length}
            </div>
            <div className="text-[10px] text-slate-400">Optimized resumes</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 px-4 text-xs font-bold transition-all relative ${
            activeTab === 'history'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Analysis History ({analyses.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 px-4 text-xs font-bold transition-all relative ${
            activeTab === 'saved'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Saved Resumes ({savedImproved.length})
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 px-4 text-xs font-bold transition-all relative ${
            activeTab === 'settings'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Profile & Privacy Settings
        </button>
      </div>

      {/* TAB 1: Analysis History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {analyses.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {analyses.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => onSelectAnalysis(rec)}
                  className="p-5 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <window.Icons.FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {rec.fileName}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {rec.fileSizeFormatted || 'PDF'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                        <span>{new Date(rec.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{rec.strengths?.length || 0} Strengths</span>
                        <span>•</span>
                        <span>{rec.weaknesses?.length || 0} Fixes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xl font-black text-slate-900 dark:text-white">
                        {rec.overallScore}<span className="text-xs text-slate-400 font-normal">/100</span>
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                        {rec.scoreTier}
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleDeleteAnalysis(rec.id, e)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete record"
                    >
                      <window.Icons.Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center glass-panel rounded-3xl border border-slate-200/80 dark:border-slate-800 text-slate-400 space-y-4">
              <window.Icons.Clock className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
              <div className="text-base font-bold text-slate-700 dark:text-slate-300">
                No Resumes Analyzed Yet
              </div>
              <p className="text-xs max-w-sm mx-auto">
                Upload your resume to view ATS compatibility scores and personalized improvement history here.
              </p>
              <button
                onClick={onNavigateToUpload}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
              >
                Start First Scan
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Saved Improved Resumes */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedImproved.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedImproved.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 space-y-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      "{item.summaryRewrite}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                      {item.bulletsRewrite?.length || 0} STAR Bullets
                    </span>
                    <button
                      onClick={() => {
                        window.PdfExportService.downloadImprovedResumeText(
                          item.fullImprovedContent || item.summaryRewrite,
                          `${item.title}.txt`
                        );
                        showToast("Downloaded resume text!");
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5"
                    >
                      <window.Icons.Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center glass-panel rounded-3xl border border-slate-200/80 dark:border-slate-800 text-slate-400 space-y-3">
              <window.Icons.Sparkles className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
              <div className="text-base font-bold text-slate-700 dark:text-slate-300">
                No Saved Improved Resumes
              </div>
              <p className="text-xs max-w-sm mx-auto">
                Use the "Improve Resume" tool to save optimized ATS bullet points and executive summaries.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Profile & Privacy Settings */}
      {activeTab === 'settings' && (
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Candidate Profile Form */}
          <form onSubmit={handleSaveProfile} className="p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 space-y-5">
            <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <window.Icons.User className="w-5 h-5 text-blue-600" />
              <span>Target Role & Profile Settings</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userProfile.fullName || ""}
                  onChange={(e) => setUserProfile({ ...userProfile, fullName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={userProfile.email || ""}
                  onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Primary Target Role
                </label>
                <input
                  type="text"
                  value={userProfile.targetRole || ""}
                  onChange={(e) => setUserProfile({ ...userProfile, targetRole: e.target.value })}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Target Industry
                </label>
                <input
                  type="text"
                  value={userProfile.targetIndustry || ""}
                  onChange={(e) => setUserProfile({ ...userProfile, targetIndustry: e.target.value })}
                  placeholder="e.g. SaaS / Cloud Infrastructure"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
              >
                Save Profile
              </button>
            </div>
          </form>

          {/* Privacy & Data Management */}
          <div className="p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <window.Icons.ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Data Privacy & Complete Deletion</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              ResumeAI is designed with strict confidentiality. Resumes are processed in-memory during your session. You can wipe all stored records, past scores, and cached resumes from your browser at any time.
            </p>

            <div className="pt-3 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                Permanent Data Removal
              </span>
              <button
                type="button"
                onClick={handleClearAllData}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-bold transition-colors flex items-center gap-2"
              >
                <window.Icons.Trash2 className="w-4 h-4" />
                <span>Delete All Resumes & Data</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
