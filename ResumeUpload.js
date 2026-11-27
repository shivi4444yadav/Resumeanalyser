// Resume Upload & Document Input Component
window.ResumeUpload = ({ onAnalysisComplete, showToast }) => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [fileDetails, setFileDetails] = React.useState(null);
  const [targetJobTitle, setTargetJobTitle] = React.useState("");
  const [targetJobDescription, setTargetJobDescription] = React.useState("");
  const [showJobInput, setShowJobInput] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [analysisStep, setAnalysisStep] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const fileInputRef = React.useRef(null);

  const analysisSteps = [
    "Reading document bytes & verifying structure...",
    "Extracting text content via PDF.js & Mammoth...",
    "Evaluating section layout, contact links & formatting...",
    "Auditing 120+ active verbs & quantifiable metric ratios...",
    "Generating personalized ATS compatibility score & recommendations..."
  ];

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (file) => {
    setErrorMessage(null);
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB

    if (file.size > MAX_SIZE) {
      setErrorMessage(`File exceeds 10 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB). Please upload a smaller file.`);
      return;
    }

    const extension = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'docx', 'txt'].includes(extension)) {
      setErrorMessage(`Unsupported format (.${extension}). Please upload a PDF (.pdf) or Word document (.docx).`);
      return;
    }

    setSelectedFile(file);
    setFileDetails({
      name: file.name,
      sizeFormatted: window.DocumentParser.formatBytes(file.size),
      type: extension,
      rawFile: file
    });
  };

  const handleLoadSample = (sampleKey) => {
    const sample = window.DocumentParser.SAMPLE_RESUMES[sampleKey];
    if (!sample) return;

    setErrorMessage(null);
    setSelectedFile({
      name: sample.name,
      size: sample.size,
      sampleText: sample.text
    });
    setFileDetails({
      name: sample.name,
      sizeFormatted: window.DocumentParser.formatBytes(sample.size),
      type: sample.type,
      sampleText: sample.text
    });
    showToast(`Loaded sample resume: ${sample.name}`);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileDetails(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAnalyze = async () => {
    if (!fileDetails) {
      setErrorMessage("Please select or drop a resume file to analyze.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStep(0);
    setErrorMessage(null);

    // Progress animation interval
    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => (prev < analysisSteps.length - 1 ? prev + 1 : prev));
    }, 600);

    try {
      let extractedText = "";

      if (fileDetails.sampleText) {
        extractedText = fileDetails.sampleText;
      } else if (fileDetails.rawFile) {
        const parsedDoc = await window.DocumentParser.parseFile(fileDetails.rawFile);
        extractedText = parsedDoc.text;
      }

      // Run ATS Analysis via AI service (OpenAI or Local ATS Engine)
      const result = await window.AiService.analyzeResume(
        extractedText,
        fileDetails.name,
        targetJobDescription
      );

      result.fileSizeFormatted = fileDetails.sizeFormatted;
      result.resumeText = extractedText;
      result.jobTitle = targetJobTitle;

      // Save to Supabase / Local storage
      await window.SupabaseService.saveAnalysis(result);

      clearInterval(stepInterval);
      setAnalysisStep(analysisSteps.length - 1);

      setTimeout(() => {
        setIsAnalyzing(false);
        onAnalysisComplete(result);
      }, 500);

    } catch (err) {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      setErrorMessage(err.message || "Failed to parse document. Please ensure it is a valid text-based PDF or DOCX.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3">
          <window.Icons.UploadCloud className="w-4 h-4" />
          <span>Interactive Document Analyzer</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Upload Your Resume
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Support for PDF and DOCX formats up to 10 MB. In-memory processing guarantees complete data confidentiality.
        </p>
      </div>

      {/* Main Upload Box */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl relative">
        
        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs sm:text-sm flex items-start gap-3">
            <window.Icons.AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-600" />
            <div>
              <span className="font-bold">Upload Error: </span>
              {errorMessage}
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isAnalyzing ? (
          <div className="py-16 text-center space-y-6">
            <div className="relative w-20 h-20 mx-auto">
              <div className="w-20 h-20 rounded-full border-4 border-blue-200 dark:border-blue-950 border-t-blue-600 dark:border-t-blue-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <window.Icons.Sparkles className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Analyzing Your Resume...
              </h3>
              <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-semibold h-6 transition-all">
                {analysisSteps[analysisStep]}
              </p>
            </div>

            {/* Stepper Progress Indicator */}
            <div className="max-w-md mx-auto flex items-center justify-between gap-2 pt-4">
              {analysisSteps.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    i <= analysisStep
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept=".pdf,.docx,.txt"
              className="hidden"
            />

            {/* Dropzone or Selected File Display */}
            {!fileDetails ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className={`border-2 border-dashed rounded-3xl p-8 sm:p-14 text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 scale-[1.01]'
                    : 'border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:bg-slate-50/50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <window.Icons.UploadCloud className="w-8 h-8" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                  Drag and drop your resume here, or <span className="text-blue-600 dark:text-blue-400 underline">browse</span>
                </h3>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Supported Formats: PDF (.pdf) and Microsoft Word (.docx) • Maximum size: 10 MB
                </p>

                {/* Instant Sample Resumes Section */}
                <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
                    Or select a pre-built sample resume to test immediately:
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLoadSample('frontend_senior');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-blue-950 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                    >
                      Senior Full Stack Engineer (Alex)
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLoadSample('product_manager');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-blue-950 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                    >
                      Technical Product Manager (Jordan)
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLoadSample('junior_developer');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-blue-950 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                    >
                      Junior Web Developer (Sam)
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              /* Uploaded File Selected Card */
              <div className="p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
                      <window.Icons.FileText className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-base">
                          {fileDetails.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                          {fileDetails.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        File Size: <strong>{fileDetails.sizeFormatted}</strong> • Ready for ATS Analysis
                      </p>
                    </div>
                  </div>

                  {/* Replace / Remove Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                    >
                      Replace File
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Remove file"
                    >
                      <window.Icons.Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Optional Target Job Description Accordion */}
            <div className="mt-6 border-t border-slate-200/60 dark:border-slate-800 pt-6">
              <button
                type="button"
                onClick={() => setShowJobInput(!showJobInput)}
                className="flex items-center justify-between w-full text-left text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600"
              >
                <div className="flex items-center gap-2">
                  <window.Icons.Target className="w-4 h-4 text-purple-600" />
                  <span>Compare with a Target Job Description (Optional)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300">
                    Recommended
                  </span>
                </div>
                {showJobInput ? (
                  <window.Icons.ChevronUp className="w-4 h-4" />
                ) : (
                  <window.Icons.ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showJobInput && (
                <div className="mt-4 space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Target Job Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Full Stack Engineer"
                      value={targetJobTitle}
                      onChange={(e) => setTargetJobTitle(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Paste Job Description
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Paste the full job description or key requirements here to calculate your job match percentage..."
                      value={targetJobDescription}
                      onChange={(e) => setTargetJobDescription(e.target.value)}
                      className="w-full p-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>

                  {/* Sample JD loader buttons */}
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Or load sample role:</span>
                    <button
                      type="button"
                      onClick={() => {
                        const sampleJd = window.DocumentParser.SAMPLE_JOB_DESCRIPTIONS[0];
                        setTargetJobTitle(sampleJd.title);
                        setTargetJobDescription(sampleJd.text);
                      }}
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      Senior Full Stack (Stripe)
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => {
                        const sampleJd = window.DocumentParser.SAMPLE_JOB_DESCRIPTIONS[1];
                        setTargetJobTitle(sampleJd.title);
                        setTargetJobDescription(sampleJd.text);
                      }}
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      Lead Product Manager (B2B SaaS)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Main CTA: Analyze Resume Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <window.Icons.ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Secure • In-memory parsing • No file retention</span>
              </div>

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={!fileDetails}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 ${
                  fileDetails
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                <window.Icons.Sparkles className="w-4 h-4" />
                <span>Analyze Resume</span>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
