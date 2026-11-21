// Settings & API Configuration Modal
window.SettingsModal = ({ isOpen, onClose, darkMode, setDarkMode, showToast }) => {
  const [openAiKey, setOpenAiKey] = React.useState(window.AiService.getOpenAiKey());
  const [geminiKey, setGeminiKey] = React.useState(window.AiService.getGeminiKey());
  const [aiProvider, setAiProvider] = React.useState(window.AiService.getAiProvider());
  const [supabaseUrl, setSupabaseUrl] = React.useState(
    localStorage.getItem(window.SupabaseService.STORAGE_KEYS.URL) || "https://oltrjryytvfoodzfqutn.supabase.co"
  );
  const [supabaseKey, setSupabaseKey] = React.useState(
    localStorage.getItem(window.SupabaseService.STORAGE_KEYS.KEY) || "sb_publishable_ZE3jtG7TpibLn1-5WusAeQ_AeE8fon2"
  );

  if (!isOpen) return null;

  const handleSaveSettings = (e) => {
    e.preventDefault();
    window.AiService.setOpenAiKey(openAiKey);
    window.AiService.setGeminiKey(geminiKey);
    window.AiService.setAiProvider(aiProvider);
    localStorage.setItem(window.SupabaseService.STORAGE_KEYS.URL, supabaseUrl.trim());
    localStorage.setItem(window.SupabaseService.STORAGE_KEYS.KEY, supabaseKey.trim());
    window.SupabaseService.initClient();
    showToast("Settings and API credentials updated!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <window.Icons.X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <window.Icons.Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Platform & AI Settings
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure optional OpenAI / Gemini keys, Supabase, and theme settings.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-6">
          
          {/* AI Provider Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              AI Evaluation Engine
            </label>
            <select
              value={aiProvider}
              onChange={(e) => setAiProvider(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="auto">Auto (Smart: Uses OpenAI/Gemini if key provided, else Built-in NLP)</option>
              <option value="openai">OpenAI API (GPT-4o-mini)</option>
              <option value="gemini">Google Gemini API (Gemini 1.5 Flash)</option>
              <option value="local">Built-in Deterministic ATS Engine (Offline / Instant)</option>
            </select>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              * The built-in deterministic NLP engine is always available and requires no API keys or internet connection.
            </p>
          </div>

          {/* OpenAI Key Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              OpenAI API Key (Optional)
            </label>
            <div className="relative">
              <input
                type="password"
                value={openAiKey}
                onChange={(e) => setOpenAiKey(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-[10px] text-slate-400">
              Stored exclusively in your browser's encrypted localStorage. Never shared with any third party.
            </p>
          </div>

          {/* Gemini Key Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Google Gemini API Key (Optional)
            </label>
            <input
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Supabase Config Accordion */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Supabase Backend Credentials
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Project URL
              </label>
              <input
                type="text"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Publishable / Anon Key
              </label>
              <input
                type="password"
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Theme Switcher in Settings */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Appearance
              </div>
              <div className="text-[11px] text-slate-400">
                Toggle dark or light interface theme
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? (
                <>
                  <window.Icons.Sun className="w-4 h-4 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <window.Icons.Moon className="w-4 h-4 text-slate-600" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Save Settings
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
