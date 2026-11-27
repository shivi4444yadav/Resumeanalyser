// Detailed Analysis Dashboard Component
window.AnalysisDashboard = ({ analysis, onImproveResume, onMatchJob, onNewScan, showToast }) => {
  const [selectedCategoryTab, setSelectedCategoryTab] = React.useState('all');
  const [copiedId, setCopiedId] = React.useState(null);
  const [isExportingPdf, setIsExportingPdf] = React.useState(false);

  if (!analysis) return null;

  const {
    overallScore = 75,
    scoreTier = "Very Good",
    scoreTierColor = "blue",
    categoryScores = {},
    summary = "",
    strengths = [],
    weaknesses = [],
    suggestions = [],
    missingKeywords = [],
    matchedKeywords = [],
    fileName = "Resume.pdf",
    fileSizeFormatted = "45 KB",
    wordCount = 450
  } = analysis;

  // Circular score calculation (circumference = 2 * PI * 40 = 251.2)
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  const getTierColorClass = (score) => {
    if (score >= 90) return 'text-emerald-600 dark:text-emerald-400 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40';
    if (score >= 75) return 'text-blue-600 dark:text-blue-400 border-blue-500 bg-blue-50 dark:bg-blue-950/40';
    if (score >= 60) return 'text-amber-600 dark:text-amber-400 border-amber-500 bg-amber-50 dark:bg-amber-950/40';
    if (score >= 40) return 'text-orange-600 dark:text-orange-400 border-orange-500 bg-orange-50 dark:bg-orange-950/40';
    return 'text-rose-600 dark:text-rose-400 border-rose-500 bg-rose-50 dark:bg-rose-950/40';
  };

  const getGaugeStrokeColor = (score) => {
    if (score >= 90) return '#10b981'; // emerald
    if (score >= 75) return '#2563eb'; // blue
    if (score >= 60) return '#f59e0b'; // amber
    if (score >= 40) return '#f97316'; // orange
    return '#ef4444'; // rose
  };

  const categoryConfigs = [
    { key: 'formatting', label: 'Formatting & Layout', icon: window.Icons.Layers, color: 'bg-blue-500' },
    { key: 'keywords', label: 'Keyword Optimization', icon: window.Icons.Target, color: 'bg-purple-500' },
    { key: 'skills', label: 'Skills Relevance', icon: window.Icons.Code, color: 'bg-indigo-500' },
    { key: 'experience', label: 'Work Experience', icon: window.Icons.Briefcase, color: 'bg-emerald-500' },
    { key: 'education', label: 'Education Details', icon: window.Icons.GraduationCap, color: 'bg-teal-500' },
    { key: 'readability', label: 'ATS Readability', icon: window.Icons.Eye, color: 'bg-cyan-500' }
  ];

  const handleCopyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    showToast("Generating executive PDF audit report...");
    try {
      await window.PdfExportService.downloadAnalysisReport(analysis);
      showToast("PDF report downloaded successfully!");
    } catch (e) {
      showToast("Download completed or print dialog opened.");
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner / Actions Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <window.Icons.FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {fileName}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider border ${getTierColorClass(overallScore)}`}>
                {scoreTier}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Parsed: {wordCount} words • Size: {fileSizeFormatted} • Audit Completed
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all"
          >
            <window.Icons.Download className="w-4 h-4 text-blue-600" />
            <span>{isExportingPdf ? 'Exporting...' : 'Download PDF Report'}</span>
          </button>

          <button
            onClick={onMatchJob}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-xs font-bold text-purple-700 dark:text-purple-300 hover:bg-purple-100 transition-all"
          >
            <window.Icons.Target className="w-4 h-4" />
            <span>Job Match</span>
          </button>

          <button
            onClick={onImproveResume}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <window.Icons.Sparkles className="w-4 h-4" />
            <span>Improve Resume</span>
          </button>

          <button
            onClick={onNewScan}
            title="Scan a different resume"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <window.Icons.RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid: A. Overall ATS Score & Executive Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* A. Overall ATS Score Circular Gauge */}
        <div className="p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Overall ATS Compatibility Score
          </div>

          <div className="relative w-44 h-44 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="currentColor"
                strokeWidth="7"
                fill="transparent"
                className="text-slate-200 dark:text-slate-800"
              />
              {/* Animated Progress Gauge */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke={getGaugeStrokeColor(overallScore)}
                strokeWidth="7"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="gauge-circle"
              />
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                {overallScore}
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Out of 100
              </span>
            </div>
          </div>

          <div className="mt-4">
            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${getTierColorClass(overallScore)}`}>
              {scoreTier} Compatibility
            </span>
          </div>

          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 max-w-xs">
            {overallScore >= 75
              ? "Your resume has a high probability of passing primary recruiter keyword screening filters."
              : "Optimization needed to prevent your resume from being discarded by automated ATS parser thresholds."}
          </p>

          {/* Legal ATS Disclaimer */}
          <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 w-full text-[10px] text-slate-400 text-center leading-normal">
            * Note: Estimated compatibility score calculated using industry standard parsing rubrics, not a guarantee of passing any company's proprietary ATS.
          </div>
        </div>

        {/* Short AI Summary & Quick Stats */}
        <div className="lg:col-span-2 p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <window.Icons.Sparkles className="w-5 h-5 text-purple-600" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                AI Executive Assessment
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal bg-slate-50/80 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              {summary}
            </p>
          </div>

          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200/60 dark:border-slate-800">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Strengths Found</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">{strengths.length}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fix Areas</span>
              <div className="text-2xl font-black text-amber-600 mt-1">{weaknesses.length}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Matched Keywords</span>
              <div className="text-2xl font-black text-blue-600 mt-1">{matchedKeywords.length}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Missing Keywords</span>
              <div className="text-2xl font-black text-purple-600 mt-1">{missingKeywords.length}</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Want to see how you match against a specific job description?
            </span>
            <button
              onClick={onMatchJob}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
            >
              Run Job Matcher →
            </button>
          </div>
        </div>

      </div>

      {/* B. Category-wise Scores */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Category-wise ATS Breakdown
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Individual compatibility indices assessing layout, technical breadth, metrics, and recruiter readability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryConfigs.map((cat) => {
            const score = categoryScores[cat.key] || 70;
            return (
              <div
                key={cat.key}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200">
                      <cat.icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {cat.label}
                    </span>
                  </div>
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    {score}<span className="text-[10px] text-slate-400 font-normal">/100</span>
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cat.color} transition-all duration-1000`}
                    style={{ width: `${score}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  <span>Rating</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {score >= 85 ? 'Strong' : score >= 70 ? 'Satisfactory' : 'Needs Optimization'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* C & D: Strengths & Areas for Improvement Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* C. Resume Strengths */}
        <div className="p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/60 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <window.Icons.CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                Resume Strengths ({strengths.length})
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Components correctly configured to pass automated recruiter screeners.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {strengths.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40"
              >
                <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {item.title}
                </div>
                <p className="text-xs text-emerald-800/80 dark:text-emerald-300/70 mt-1 pl-3.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* D. Areas for Improvement */}
        <div className="p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/60 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <window.Icons.AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                Areas for Improvement ({weaknesses.length})
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Critical issues hurting your search visibility and interview conversion rate.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {weaknesses.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40"
              >
                <div className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {item.title}
                </div>
                <p className="text-xs text-amber-800/80 dark:text-amber-300/70 mt-1 pl-3.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* E. AI-Powered Suggestions (Detailed Problem, Why It Matters, Recommendation, Example) */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/60 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <window.Icons.Sparkles className="w-5 h-5 text-blue-600" />
              <span>Personalized AI Improvement Plan</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Actionable corrections with real before-and-after examples customized to your resume text.
            </p>
          </div>
          <button
            onClick={onImproveResume}
            className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold hover:bg-blue-100 transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            <span>Launch AI Rewriter Tool</span>
            <window.Icons.ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestions.map((sug, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  {sug.category}
                </span>
                <span className="text-xs font-bold text-slate-400">Suggestion #{idx + 1}</span>
              </div>

              {/* Problem */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Problem Identified</span>
                <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-0.5">
                  {sug.problem}
                </p>
              </div>

              {/* Why It Matters */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Why It Matters</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {sug.whyItMatters}
                </p>
              </div>

              {/* Recommended Improvement */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Recommended Improvement</span>
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mt-0.5 leading-relaxed">
                  {sug.recommendation}
                </p>
              </div>

              {/* Concrete Example with Before & After */}
              {sug.example && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2 text-xs">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Before vs After Transformation
                  </div>
                  <div className="space-y-1.5 font-mono text-[11px]">
                    <div className="text-rose-600 dark:text-rose-400 line-through">
                      <strong>Before: </strong>{sug.example.before}
                    </div>
                    <div className="text-emerald-700 dark:text-emerald-300 font-bold">
                      <strong>After: </strong>{sug.example.after}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyText(sug.example.after, `sug-${idx}`)}
                    className="mt-2 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    {copiedId === `sug-${idx}` ? (
                      <>
                        <window.Icons.Check className="w-3.5 h-3.5" />
                        <span>Copied example!</span>
                      </>
                    ) : (
                      <>
                        <window.Icons.Copy className="w-3.5 h-3.5" />
                        <span>Copy improved bullet</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* F. Missing Keywords & Target Matching Cloud */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-slate-800">
          <div>
            <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <window.Icons.Target className="w-5 h-5 text-purple-600" />
              <span>Missing & Recommended Industry Keywords</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Incorporate these high-demand terms naturally into your Skills and Work Experience sections.
            </p>
          </div>
          <button
            onClick={onMatchJob}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <span>Compare with Job Description</span>
            <window.Icons.ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Missing Keywords Tags */}
        <div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
            Missing Keywords (Click to copy):
          </span>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((kw, i) => (
              <button
                key={i}
                onClick={() => handleCopyText(kw, `kw-${i}`)}
                className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>+ {kw}</span>
                {copiedId === `kw-${i}` && <window.Icons.Check className="w-3 h-3 text-rose-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* Matched Keywords Tags */}
        <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
            Keywords Successfully Detected ({matchedKeywords.length}):
          </span>
          <div className="flex flex-wrap gap-2">
            {matchedKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium"
              >
                ✓ {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
