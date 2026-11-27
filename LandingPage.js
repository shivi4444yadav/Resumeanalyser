// Landing Page Component
window.LandingPage = ({ onStartAnalysis, onTrySample, onSelectRoleMatch }) => {
  const [activeFaq, setActiveFaq] = React.useState(null);

  const features = [
    {
      icon: window.Icons.Zap,
      title: "Instant ATS Score",
      description: "Receive a real-time compatibility score (0-100) calculated by analyzing layout, section hierarchy, and parsing readability.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: window.Icons.Sparkles,
      title: "AI Resume Analysis",
      description: "Deep semantic evaluation of contact details, work history, education, and skill profiles against modern hiring algorithms.",
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: window.Icons.Target,
      title: "Keyword Optimization",
      description: "Identify high-priority industry keywords and technical proficiencies missing from your resume before you apply.",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: window.Icons.TrendingUp,
      title: "Resume Improvement Suggestions",
      description: "Get concrete, personalized recommendations with side-by-side STAR-format before-and-after bullet rewrites.",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: window.Icons.Briefcase,
      title: "Job Description Matching",
      description: "Paste any target job description to pinpoint matching percentages, skill gaps, and custom tailoring advice.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: window.Icons.Download,
      title: "Executive PDF Reports",
      description: "Download polished PDF audit summaries and clean ATS-compliant resume templates ready to submit.",
      color: "from-amber-500 to-orange-600"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Upload Your Resume",
      description: "Drop your PDF or DOCX file (up to 10 MB). Our secure in-browser parser extracts every token cleanly.",
      icon: window.Icons.UploadCloud
    },
    {
      step: "02",
      title: "AI Analyzes Content",
      description: "The engine parses sections, checks 120+ active leadership verbs, and assesses quantifiable metric ratios.",
      icon: window.Icons.Code
    },
    {
      step: "03",
      title: "Get Your ATS Score",
      description: "Review your circular score indicator across formatting, keywords, experience, skills, and readability.",
      icon: window.Icons.Award
    },
    {
      step: "04",
      title: "Improve & Win Interviews",
      description: "Apply one-click AI rewrites, bridge missing keywords, and download an interview-ready resume.",
      icon: window.Icons.CheckCheck
    }
  ];

  const testimonials = [
    {
      name: "Marcus Vance",
      role: "Senior Frontend Engineer",
      company: "Now at Google",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      content: "ResumeAI pointed out that 70% of my bullet points were task descriptions without quantifiable outcomes. Once I applied the STAR rewrites and metrics, my interview callback rate jumped from 5% to over 35% in three weeks."
    },
    {
      name: "Sarah Jenkins",
      role: "Lead Product Manager",
      company: "Now at Stripe",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      content: "The Job Description Matching feature is a game changer. Being able to paste the exact job posting and see the specific missing keywords allowed me to tailor each application with surgical precision."
    },
    {
      name: "David Kim",
      role: "DevOps & Cloud Architect",
      company: "Now at Datadog",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      content: "I didn't realize how many ATS systems choke on multi-column tables and non-standard section titles. ResumeAI helped me restructure everything into a clean, modern layout that passed every ATS test."
    }
  ];

  const faqs = [
    {
      q: "What is an ATS (Applicant Tracking System) score?",
      a: "An ATS is software used by over 98% of Fortune 500 companies to filter and rank resumes before a human recruiter ever sees them. Our ATS score is an estimated compatibility index (0-100) that evaluates your resume's formatting, keyword optimization, quantifiable metrics, section hierarchy, and readability against standard ATS parsing rubrics."
    },
    {
      q: "Is a PDF or DOCX file better for ATS parsers?",
      a: "Modern ATS platforms parse standard text-based PDF and DOCX files equally well. However, poorly formatted PDFs with complex columns, text frames, or embedded images can get mangled. Our analyzer tests both formats and checks whether your text is cleanly extractable."
    },
    {
      q: "Does getting a 95+ score guarantee I will land an interview?",
      a: "No automated tool can guarantee a job offer. The ATS score is an estimated compatibility score based on established recruitment standards, not a guarantee of passing any specific proprietary employer ATS. However, candidates with high scores, measurable outcomes, and aligned keywords consistently experience significantly higher response rates."
    },
    {
      q: "Is my resume data kept private and secure?",
      a: "Yes, absolutely. Your resume is parsed in-memory right in your browser or local session. We never sell, lease, or share your resume text, personal contact details, or job history with any third parties or recruitment agencies."
    },
    {
      q: "Can I compare my resume against a specific job posting?",
      a: "Yes! Use our 'Job Match' tab or enable the target job toggle during upload. You can paste the job description, and our AI will calculate a match percentage, highlight matched keywords, and show you exactly which skills you need to add."
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 overflow-hidden">
        
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Resume Optimization & Job Matching Engine</span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Beat the ATS. <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Land Your Dream Job.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Upload your resume and get an instant AI-powered ATS score with actionable suggestions to improve your chances of getting shortlisted.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartAnalysis}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-base shadow-xl shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <window.Icons.Sparkles className="w-5 h-5" />
              <span>Analyze My Resume</span>
              <window.Icons.ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const target = document.getElementById('features-section');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 font-semibold text-base shadow-sm transition-all"
            >
              Learn More
            </button>
          </div>

          {/* Quick 1-Click Sample Pill */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>No resume handy?</span>
            <button
              onClick={() => onTrySample('frontend_senior')}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-1"
            >
              Try with a Sample Resume →
            </button>
          </div>

          {/* Hero Live Mock Showcase */}
          <div className="mt-14 max-w-4xl mx-auto p-4 sm:p-6 rounded-3xl glass-panel shadow-2xl relative border border-slate-200/80 dark:border-slate-800 animate-float">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-left">
              
              {/* Circular Gauge Preview */}
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-blue-50/50 to-indigo-50/50 dark:from-slate-800/60 dark:to-slate-800/30 border border-blue-100 dark:border-slate-700/60 text-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200 dark:text-slate-700" />
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="37.6" strokeLinecap="round" className="text-blue-600" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">85</span>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Very Good</span>
                  </div>
                </div>
                <div className="mt-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Estimated ATS Pass Rate: 92%
                </div>
              </div>

              {/* Real-time Insights Preview */}
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 border-b border-slate-200/60 dark:border-slate-700 pb-2">
                  <span>ATS PARAMETER</span>
                  <span>SCORE</span>
                </div>
                {[
                  { label: "Keyword Optimization", score: 88, color: "bg-blue-600" },
                  { label: "Action Verbs & Impact", score: 82, color: "bg-purple-600" },
                  { label: "Formatting & Readability", score: 94, color: "bg-emerald-500" },
                  { label: "Quantifiable Achievements", score: 76, color: "bg-indigo-600" }
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
                      <span>{item.label}</span>
                      <span className="text-slate-900 dark:text-white">{item.score}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                ))}
                <div className="pt-2 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  <window.Icons.CheckCircle2 className="w-4 h-4" />
                  <span>14 Quantifiable metrics & STAR bullet points detected</span>
                </div>
              </div>

            </div>
          </div>

          {/* Social Proof Stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-slate-200/80 dark:border-slate-800 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">98%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">ATS Filtering Rate</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-blue-600">3.4x</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">More Interview Invites</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-purple-600">120+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Action Verbs Checked</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">100%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">In-Memory Privacy</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Step-by-Step Flow</h2>
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            How ResumeAI Works
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm">
            Transform your resume into a top 5% candidate application in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((s, idx) => (
            <div 
              key={idx} 
              className="relative p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-blue-600/30 group-hover:text-blue-600 transition-colors">
                  {s.step}
                </span>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <s.icon className="w-5 h-5" />
                </div>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {s.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section id="features-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2">Comprehensive SaaS Features</h2>
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Engineered to Beat Every Screening Filter
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm">
            Everything you need to audit, optimize, match, and export an irresistible job application.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div
              key={i}
              className="p-7 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} text-white flex items-center justify-center mb-5 shadow-md`}>
                <feat.icon className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {feat.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SUCCESS STORIES / TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Proven Results</h2>
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Job Seekers Landing Dream Roles
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm">
            See how professionals elevated their resumes and passed initial recruiter screens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-7 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-200/60 dark:border-slate-800">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</div>
                  <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">{t.role}</div>
                  <div className="text-[10px] text-slate-400">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2">Got Questions?</h2>
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <window.Icons.ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0 ml-4" />
                  ) : (
                    <window.Icons.ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 ml-4" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 sm:p-14 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
              Ready to See How Your Resume Ranks?
            </h3>
            <p className="mt-4 text-blue-100 text-sm sm:text-base leading-relaxed">
              Join thousands of job seekers who improved their ATS pass rates and landed interviews at industry-leading companies.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onStartAnalysis}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Analyze My Resume Now
              </button>
              <button
                onClick={() => onTrySample('frontend_senior')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-700/40 hover:bg-blue-700/60 border border-blue-300/40 text-white font-semibold text-sm transition-all"
              >
                Try Sample Resume
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
