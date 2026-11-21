// Job Description Matching Component
window.JobMatchSection = ({ analysis, onNavigateToUpload, showToast }) => {
  const [jobTitle, setJobTitle] = React.useState("Senior Full Stack Software Engineer");
  const [jobDescription, setJobDescription] = React.useState(
    window.DocumentParser.SAMPLE_JOB_DESCRIPTIONS[0].text
  );
  const [matchResult, setMatchResult] = React.useState(null);
  const [isMatching, setIsMatching] = React.useState(false);
  const [copiedKw, setCopiedKw] = React.useState(null);

  // Auto-run match on initial load if analysis exists
  React.useEffect(() => {
    if (analysis && analysis.resumeText && !matchResult) {
      handleRunMatch();
    }
  }, [analysis]);

  const handleRunMatch = () => {
    if (!analysis || !analysis.resumeText) {
      showToast("Please upload or select a resume first to run the job matcher!");
      return;
    }

    if (!jobDescription || jobDescription.trim().length < 20) {
      showToast("Please paste a target job description.");
      return;
    }

    setIsMatching(true);
    setTimeout(() => {
      const result = window.AtsEngine.matchJobDescription(analysis.resumeText, jobDescription);
      setMatchResult(result);
      setIsMatching(false);

      // Save match record in persistence
      window.SupabaseService.saveJobMatch({
        resumeFileName: analysis.fileName,
        jobTitle: jobTitle || "Target Job",
        jobDescription: jobDescription,
        matchPercentage: result.matchPercentage,
        matchedKeywords: result.matchedKeywords,
        missingKeywords: result.missingKeywords,
        missingSkills: result.missingSkills,
        recommendations: result.recommendations
      });

      showToast(`Calculated ${result.matchPercentage}% Job Description Match!`);
    }, 600);
  };

  const handleSelectSample = (sample) => {
    setJobTitle(sample.title);
    setJobDescription(sample.text);
    showToast(`Loaded sample role: ${sample.title}`);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedKw(id);
    showToast(`Copied "${text}"`);
    setTimeout(() => setCopiedKw(null), 2000);
  };

  const handleDownloadMatchReport = () => {
    if (!matchResult || !analysis) return;
    window.PdfExportService.downloadJobMatchReport(matchResult, analysis.fileName, jobTitle);
    showToast("Downloaded Job Match Report!");
  };

  if (!analysis) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="p-10 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <window.Icons.Target className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            No Resume Loaded Yet
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            To compare your resume against a target job posting, please upload your resume or choose one of our sample resumes first.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateToUpload}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <window.Icons.UploadCloud className="w-4 h-4" />
              <span>Upload Resume Now</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold mb-3">
          <window.Icons.Target className="w-4 h-4" />
          <span>Targeted Job Matcher</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Job Description Match Analysis
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Compare <strong>{analysis.fileName}</strong> against any job posting to calculate ATS relevance, spot missing keywords, and tailor your profile.
        </p>
      </div>

      {/* Input Form & Matcher Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Job Description Input */}
        <div className="lg:col-span-6 p-7 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <window.Icons.Briefcase className="w-4 h-4 text-blue-600" />
              <span>Target Job Posting</span>
            </h2>
            <div className="text-xs text-slate-400">
              Paste or load template
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
              Job Title & Company (Optional)
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Senior Full Stack Engineer - Stripe"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                Job Description / Requirements
              </label>
              {/* Sample Switchers */}
              <div className="flex items-center gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleSelectSample(window.DocumentParser.SAMPLE_JOB_DESCRIPTIONS[0])}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Full Stack
                </button>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={() => handleSelectSample(window.DocumentParser.SAMPLE_JOB_DESCRIPTIONS[1])}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Product Mgr
                </button>
              </div>
            </div>
            <textarea
              rows={12}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-mono leading-relaxed focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleRunMatch}
            disabled={isMatching}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            <window.Icons.Target className="w-4 h-4" />
            <span>{isMatching ? 'Calculating Match Score...' : 'Calculate Job Match'}</span>
          </button>
        </div>

        {/* Right Column: Match Results */}
        <div className="lg:col-span-6 space-y-6">
          {matchResult ? (
            <>
              {/* Match Gauge Card */}
              <div className="p-7 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Job Match Percentage
                  </span>
                  <div className="text-4xl font-black text-slate-900 dark:text-white mt-1">
                    {matchResult.matchPercentage}%
                    <span className="text-xs font-bold text-slate-400 ml-2">Match</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-xs">
                    {matchResult.matchPercentage >= 75
                      ? "High keyword alignment! Your profile strongly mirrors the target job requirements."
                      : "Moderate alignment. Incorporating the missing keywords below will increase your interview callback odds."}
                  </p>
                </div>

                <div className="relative w-32 h-32 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200 dark:text-slate-800" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke={matchResult.matchPercentage >= 75 ? "#10b981" : matchResult.matchPercentage >= 50 ? "#2563eb" : "#f59e0b"}
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (matchResult.matchPercentage / 100) * 251.2}
                      strokeLinecap="round"
                      className="gauge-circle"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-black text-2xl text-slate-900 dark:text-white">
                    {matchResult.matchPercentage}%
                  </div>
                </div>
              </div>

              {/* Matched vs Missing Keywords */}
              <div className="p-7 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 space-y-5">
                
                {/* Matched Keywords */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <window.Icons.CheckCircle2 className="w-4 h-4" />
                      <span>Matched Keywords ({matchResult.matchedKeywords.length})</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.matchedKeywords.length > 0 ? (
                      matchResult.matchedKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-medium"
                        >
                          ✓ {kw}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">No direct keyword overlap found.</span>
                    )}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                      <window.Icons.AlertCircle className="w-4 h-4" />
                      <span>Missing Job Keywords ({matchResult.missingKeywords.length})</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Click to copy</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.missingKeywords.length > 0 ? (
                      matchResult.missingKeywords.map((kw, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleCopy(kw, `m-${idx}`)}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 border border-rose-200/70 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 text-xs font-medium transition-colors flex items-center gap-1"
                        >
                          <span>+ {kw}</span>
                          {copiedKw === `m-${idx}` && <window.Icons.Check className="w-3 h-3 text-rose-600" />}
                        </button>
                      ))
                    ) : (
                      <span className="text-xs text-emerald-600 font-bold">Incredible! All key terms are present in your resume.</span>
                    )}
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block mb-2">
                    AI Recommendations to Bridge the Gap:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {matchResult.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Download Report Button */}
                <div className="pt-3">
                  <button
                    onClick={handleDownloadMatchReport}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <window.Icons.Download className="w-4 h-4 text-blue-600" />
                    <span>Download Job Match Report (.txt)</span>
                  </button>
                </div>

              </div>
            </>
          ) : (
            <div className="p-12 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 text-center text-slate-400 space-y-3">
              <window.Icons.Search className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
              <div className="text-sm font-bold text-slate-600 dark:text-slate-300">
                Ready to Match
              </div>
              <p className="text-xs max-w-sm mx-auto">
                Click <strong>"Calculate Job Match"</strong> to cross-reference your resume against the job description.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
