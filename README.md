# ResumeAI ✨
> *“Beat the ATS. Land Your Dream Job.”*

**ResumeAI** is a modern, responsive, professional AI-powered Resume Analyzer SaaS platform that helps job seekers analyze their resumes, calculate real ATS (Applicant Tracking System) compatibility scores (0–100), identify keyword gaps, match target job descriptions, and get actionable AI-powered suggestions and bullet point rewrites to land interviews.

Built with **React 18**, **Tailwind CSS**, **Lucide Icons**, **Supabase PostgreSQL & Auth**, **PDF.js**, **Mammoth.js**, **html2pdf.js**, and support for **OpenAI API (GPT-4o-mini)**, **Google Gemini API**, and a **Built-in High-Precision Deterministic ATS NLP Engine**.

---

## 🚀 Quick Start Guide

### Option 1: 1-Click Launch (Recommended)
Double-click [`start-server.bat`](file:///c:/Users/riyat/Downloads/project1/start-server.bat) in the project directory.
- Starts a local HTTP server at `http://localhost:3000/`.
- Opens automatically in your default browser (Google Chrome, Microsoft Edge, or Mozilla Firefox).
- Zero dependencies or Node.js installations required!

### Option 2: Direct Browser Launch
Double-click [`index.html`](file:///c:/Users/riyat/Downloads/project1/index.html) to open directly in any modern web browser.

---

## 🌟 Key Features

### 1. 🎨 Modern SaaS Design & Visuals
- **Palette**: Royal Blue (`#2563eb`), Vivid Indigo/Purple (`#7c3aed`), and Crisp White/Slate.
- **Glassmorphism**: Elegant translucent panels (`glass-panel`, `glass-nav`) with blur effects.
- **Smooth Animations**: Floating cards, animated circular progress SVG gauges, pulsing alerts, and festive confetti for high scores.
- **Dark Mode & Light Mode**: Seamless 1-click theme switch with persistent preference storage.
- **Fully Responsive**: Tailored layouts for desktop, tablet, and mobile screens.

### 2. 📄 Multi-Format Resume Upload
- **Drag-and-Drop Zone**: Intuitive file drop zone with hover highlights and file validation.
- **Supported Formats**: Text-based **PDF (.pdf)** and Microsoft Word **DOCX (.docx)** documents (and `.txt`).
- **File Validation**: Strict 10 MB maximum file size enforcement and format verification.
- **File Inspector**: Displays file name, formatted file size, and extension badge with replace and remove options.
- **1-Click Sample Resumes**: Pre-loaded with three realistic candidate profiles for instant testing:
  - *Alex Rivera* (Senior Full Stack Engineer)
  - *Jordan Taylor* (Technical Product Manager)
  - *Sam Chen* (Junior Web Developer)
- **Multi-Step Loading Sequence**: Visual step-by-step progress tracking (Reading bytes → Extracting text → Parsing sections → Auditing verbs & metrics → Generating recommendations).

### 3. 🎯 AI Resume Analysis & ATS Scoring (0–100)
- **Real In-Memory Text Extraction**:
  - **PDF.js**: Page-by-page text content extraction directly in the client.
  - **Mammoth.js**: DOCX raw XML text parsing.
- **Circular Compatibility Indicator**: SVG animated circular gauge with color-coded score brackets:
  - 🟢 **90–100: Excellent** (Top tier candidate)
  - 🔵 **75–89: Very Good** (Passed primary filters)
  - 🟡 **60–74: Average** (Needs keyword and metric tuning)
  - 🟠 **40–59: Needs Improvement** (Passive phrasing and missing sections)
  - 🔴 **0–39: Poor** (Format or structural issues)
- **11 Audited Parameters**:
  1. Resume formatting & standard section headers.
  2. Keyword optimization across 200+ industry terms.
  3. Skills relevance and breadth (hard and soft skills).
  4. Work experience chronological hierarchy.
  5. Education credentials, degree, and graduation dates.
  6. Professional summary clarity.
  7. Action verbs strength (120+ active leadership verbs vs. passive phrases).
  8. Achievements and measurable results (percentages, revenue, scale).
  9. Contact information integrity (email, phone, LinkedIn, GitHub, portfolio).
  10. Section organization and hierarchy.
  11. ATS plain-text readability.
- **Official ATS Notice**: Prominently explains that the score is an estimated compatibility index, not a legal guarantee of passing any company's proprietary ATS.

### 4. 📊 Detailed Analysis Dashboard
- **A. Overall Score**: Circular progress chart, score interpretation badge, and AI executive summary.
- **B. Category-wise Breakdown**: 6 dedicated progress bars for Formatting, Keywords, Skills, Experience, Education, and Readability.
- **C. Resume Strengths**: Verified positive items highlighting quantifiable metrics, active verbs, and complete contact links.
- **D. Areas for Improvement**: Pinpoints passive voice, missing KPIs, and omitted sections.
- **E. AI-Powered Suggestions**: Expandable cards detailing **Problem Identified**, **Why It Matters**, **Recommended Action**, and **Side-by-Side Example** with 1-click copy.
- **F. Missing Keywords**: Interactive tag cloud of missing terms matching the candidate's domain with 1-click copy.

### 5. 🎯 Job Description Matching
- Compare uploaded resume directly against any pasted job posting.
- **Job Match Gauge**: Calculates exact match percentage based on required and preferred terms.
- **Matched Keywords**: Tagged green pills showing overlapping terminology.
- **Missing Keywords & Skills**: Tagged red/amber pills identifying competency gaps.
- **AI Action Plan**: Strategic advice on bridging gaps to align with the specific job description.
- **Export Report**: Downloadable Job Match Report (`.txt`).

### 6. ✍️ AI Resume Improvement & Rewriting
- **STAR Method Rewriter**: Transforms weak, passive bullets into high-impact Situation-Task-Action-Result statements.
- **Custom Bullet Rewriter**: Paste any individual bullet point to instantly generate an action-oriented version with metrics.
- **Executive Summary Rewriter**: 3 custom options (Results-Driven, Technical-Focused, Leadership-Oriented) with 1-click copy.
- **Action Verb Power Bank**: 4 curated banks (Leadership, Engineering, Optimization, Delivery).
- **Download Clean Resume**: Exports a clean, ATS-optimized plain text resume ready to submit.

### 7. 📥 Downloads & Exporting
- **Executive PDF Audit Report**: Generates a professional multi-page or single-page PDF report with score gauge, breakdown bars, strengths, weaknesses, and improvement plan via `html2pdf.js`.
- **Clean Resume Export**: Formatted ATS text file.
- **Job Match Report**: Text summary of match percentages and missing keywords.
- **1-Click Copy**: Instant clipboard copy on all suggestions and rewritten bullets with toast notifications.

### 8. 🗄️ Candidate Workspace & History
- Overview metrics: Total Resumes Analyzed, Latest ATS Score, Average ATS Score, and Saved Rewrites.
- History table: Review past scans, reload analysis dashboards, or delete individual records.
- Saved Resumes: Store improved summaries and bullet points.
- Profile Settings: Manage name, email, target role, and preferred industry.
- Complete Data Deletion: 1-click wipe of all cached data for maximum user privacy.

---

## ⚡ Supabase Backend Integration

ResumeAI connects to **Supabase** for user authentication and cloud persistence, with a seamless LocalStorage fallback so everything works even without internet access.

### Database Schema Setup
1. Open your [Supabase Dashboard](https://supabase.com/dashboard) and go to your project.
2. In the left navigation, click **SQL Editor**.
3. Open [`supabase/schema.sql`](file:///c:/Users/riyat/Downloads/project1/supabase/schema.sql), copy its contents, and paste into the SQL Editor.
4. Click **Run**.

This automatically creates:
- `profiles`: User accounts, target job roles, lifetime stats.
- `resume_analyses`: Full resume audit records, category scores, strengths, weaknesses, and suggestions.
- `job_matches`: Job description comparison records.
- `improved_resumes`: Saved rewritten resumes and STAR bullets.
- **Row Level Security (RLS)**: Enforces strict data isolation so users only access their own records.
- Automatic registration trigger for new user signups.

---

## 🤖 AI Provider Configuration

ResumeAI features a **Smart Hybrid AI Architecture**:
1. **Built-in High-Precision Deterministic ATS Engine**:
   - Runs 100% locally in your browser.
   - Evaluates token frequencies, 120+ active leadership verbs, contact regexes, metric density ratios, and 200+ industry keywords.
   - **Zero API keys or payment required — works instantly out of the box!**
2. **OpenAI API Integration (Optional)**:
   - Configure your OpenAI API Key (`sk-...`) in Settings (`⚙️`).
   - Uses `gpt-4o-mini` with strict structured JSON output.
3. **Google Gemini API Integration (Optional)**:
   - Configure your Gemini API Key in Settings (`⚙️`).
   - Uses `gemini-1.5-flash` for high-speed analysis.

---

## 📁 Project Architecture

```
project1/
├── index.html                 # Main application entry point (Self-contained SPA)
├── start-server.bat           # 1-click Windows local server launcher
├── server.ps1                 # Lightweight PowerShell HTTP server
├── README.md                  # Comprehensive documentation
├── css/
│   └── styles.css             # Glassmorphism, circular gauges & print styles
├── supabase/
│   └── schema.sql             # Supabase PostgreSQL schema, tables & RLS policies
└── js/
    ├── bundle.js              # Full concatenated component bundle
    ├── app.js                 # Main React Application orchestrator
    ├── atsEngine.js           # Deterministic NLP parser & ATS evaluation engine
    ├── aiService.js           # Multi-provider coordinator (OpenAI / Gemini / Local)
    ├── documentParser.js      # PDF.js, Mammoth.js & sample resume loader
    ├── supabaseService.js     # Supabase auth, profile & storage service
    ├── pdfExportService.js    # html2pdf & report exporter
    └── components/
        ├── Icons.js           # Lucide React SVG icon set
        ├── Navbar.js          # Navigation, theme toggle & account menu
        ├── LandingPage.js     # Hero section, features, how it works, testimonials, FAQ
        ├── ResumeUpload.js    # Drag-and-drop zone, sample selector & progress loader
        ├── AnalysisDashboard.js # Circular gauge, category scores, strengths, suggestions
        ├── JobMatchSection.js # Job description match percentage & missing terms
        ├── ResumeImprovement.js # STAR rewrites, summary options & verb bank
        ├── UserDashboard.js   # History table, saved resumes & profile settings
        ├── AuthModal.js       # Supabase Sign In / Sign Up modal
        ├── SettingsModal.js   # API keys & Supabase configuration
        └── PrivacyNoticeModal.js # Privacy notice & in-memory handling guarantee
```

---

## 🔒 Privacy & Security

- **In-Memory Parsing**: Document text is parsed in-memory in your local browser session.
- **No Data Resale**: We never sell or broker candidate resumes to recruiters or third-party advertisers.
- **Client-Side Key Storage**: Your OpenAI or Gemini API keys remain strictly in your browser's private `localStorage` and are never exposed or transmitted to any middleman server.
- **One-Click Wipe**: Erase all session history and cached resumes anytime from the Candidate Workspace.

---

© 2026 ResumeAI. Beat the ATS. Land Your Dream Job.
