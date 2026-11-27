// Privacy & Security Disclosure Modal
window.PrivacyNoticeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto space-y-5">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <window.Icons.X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
            <window.Icons.ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Data Privacy & Security Guarantee
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              How we protect your resume, credentials, and job search privacy.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">
              1. 100% In-Memory Document Parsing
            </h3>
            <p>
              When you upload a PDF or DOCX file, text extraction runs locally in your browser session using PDF.js and Mammoth.js. Your raw resume documents are never permanently stored on external servers without your permission.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">
              2. Zero Data Selling or Recruiter Brokerage
            </h3>
            <p>
              We do not sell, trade, or distribute your candidate profile, email address, phone number, or work history to advertisers, headhunters, or external aggregators.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">
              3. Right to Complete Deletion
            </h3>
            <p>
              You maintain total control over your data. You can delete individual audit records or wipe all cached resume data in one click from the Candidate Workspace.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
