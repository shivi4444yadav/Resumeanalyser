// Document Parsing Engine (PDF.js, Mammoth.js & Sample Resumes)
window.DocumentParser = (() => {
  // Configure PDF.js worker
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  // Sample Resumes for instant testing
  const SAMPLE_RESUMES = {
    frontend_senior: {
      name: "Alex Rivera - Senior Full Stack Engineer.pdf",
      size: 42800,
      type: "pdf",
      text: `ALEX RIVERA
San Francisco, CA | (555) 382-9102 | alex.rivera.dev@gmail.com
LinkedIn: linkedin.com/in/alexrivera-tech | GitHub: github.com/alexrivera-dev | Portfolio: alexrivera.io

PROFESSIONAL SUMMARY
Senior Full Stack Software Engineer with 6+ years of experience architecting resilient cloud-native applications and scalable web platforms. Proven track record leading cross-functional engineering squads, reducing system latency by 42%, and improving user retention across platforms serving 2M+ active monthly users. Expert in React, TypeScript, Node.js, Next.js, and AWS microservices.

CORE TECHNICAL SKILLS
- Languages: TypeScript, JavaScript (ES6+), Python, SQL, HTML5, CSS3
- Frontend: React 18, Next.js, Redux Toolkit, Tailwind CSS, Vue.js, Webpack, Vite, Jest, Cypress
- Backend: Node.js, Express, NestJS, RESTful APIs, GraphQL, PostgreSQL, MongoDB, Redis
- Cloud & DevOps: Amazon Web Services (AWS - S3, Lambda, ECS, CloudFront), Docker, Kubernetes, CI/CD (GitHub Actions), Terraform
- Methodologies: Agile/Scrum, Test-Driven Development (TDD), System Architecture, Microservices, Performance Optimization

WORK EXPERIENCE
Lead Frontend & Full Stack Engineer | CloudScale Systems, San Francisco, CA
March 2022 – Present
- Spearheaded the architectural migration of core client dashboard to React 18 and Next.js, boosting page load speeds by 48% and reducing customer bounce rate by 22%.
- Engineered high-throughput GraphQL APIs and Node.js microservices processing 15M+ daily requests with 99.98% uptime.
- Directed a team of 7 software engineers across sprint planning, comprehensive code reviews, and pair programming to elevate sprint velocity by 35%.
- Implemented real-time telemetry and WebSocket caching layers using Redis, decreasing database queries by 60% and cutting cloud infrastructure costs by $45,000 annually.
- Orchestrated end-to-end CI/CD test automation pipelines with GitHub Actions, Cypress, and Jest, maintaining 94% test code coverage.

Senior Software Engineer | DataPulse Media, San Jose, CA
August 2019 – February 2022
- Developed responsive web interfaces and interactive data visualization dashboards using React, D3.js, and Tailwind CSS for 300+ enterprise clients.
- Automated ETL pipeline monitoring tools in Python and PostgreSQL, reducing incident response time from 45 minutes to under 5 minutes.
- Refactored legacy monolithic backend into modular Docker containers deployed to AWS ECS, cutting deployment rollbacks by 75%.
- Collaborated with Product and UX teams in bi-weekly design sprints to launch 12 high-impact SaaS features that drove $1.2M in annual recurring revenue.

Software Engineer | NextGen Apps, Austin, TX
June 2018 – July 2019
- Built RESTful web endpoints and customer-facing authentication modules using Node.js, Express, and JWT.
- Designed schema migrations and database indexing strategies in PostgreSQL, optimizing query execution times by 30%.
- Participated in weekly on-call rotation and resolved 150+ production bug tickets with zero downtime.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | 2014 – 2018
Honors: Dean's Honor List (3 Semesters) | Magna Cum Laude

CERTIFICATIONS & PROJECTS
- AWS Certified Solutions Architect – Associate (2023)
- Open Source: Contributor to Next.js documentation and Tailwind CSS plugins (800+ GitHub stars)
- Project: DevPulse (Open source developer productivity dashboard built with React, Vite, and Supabase)`
    },

    product_manager: {
      name: "Jordan Taylor - Technical Product Manager.docx",
      size: 38200,
      type: "docx",
      text: `JORDAN TAYLOR
Austin, TX | (512) 490-2819 | jordan.taylor.pm@gmail.com | linkedin.com/in/jordantaylor-pm

SUMMARY
Results-oriented Product Manager with 4+ years of experience leading B2B SaaS product roadmaps, stakeholder alignment, and customer discovery. Skilled at translating complex business requirements into high-value product backlogs and managing agile sprint teams.

SKILLS
Product Strategy, Agile / Scrum, User Stories, Jira, Figma, Product Roadmaps, Stakeholder Management, A/B Testing, Google Analytics, SQL, Customer Interviews, PRD Writing, Feature Prioritization, Wireframing.

PROFESSIONAL EXPERIENCE
Product Manager | NexaTech Solutions, Austin, TX
Jan 2021 – Present
- Responsible for managing the core enterprise dashboard product roadmap and prioritizing backlog items in Jira.
- Worked with engineering and design teams to launch new billing module and workflow automation tools.
- Conducted regular customer interviews and surveys to gather user feedback on upcoming product releases.
- Organized bi-weekly sprint planning meetings, retrospectives, and daily stand-ups for a squad of 8 engineers.
- Helped improve product onboarding flow which resulted in better user activation rates.

Associate Product Manager | VentureLoop, Austin, TX
July 2019 – Dec 2020
- Assisted senior product managers with competitive analysis, user testing sessions, and feature specification documentation.
- Wrote detailed user stories and acceptance criteria for checkout and payments funnel.
- Tracked product KPIs and churn metrics using Mixpanel and Google Analytics, preparing monthly executive reports.
- Participated in weekly stakeholder alignment meetings across sales, marketing, and customer success teams.

EDUCATION
Bachelor of Business Administration in Management Information Systems
University of Texas at Austin | 2015 – 2019`
    },

    junior_developer: {
      name: "Sam Chen - Junior Web Developer.pdf",
      size: 29400,
      type: "pdf",
      text: `SAM CHEN
Email: samchen.dev@yahoo.com | Phone: 555-019-2834
Chicago, IL

Objective:
Hardworking junior developer looking for an entry-level position where I can utilize my programming skills and grow with the company.

Skills:
HTML, CSS, JavaScript, React basics, Git, GitHub, Python, Team player, Problem solving, Fast learner.

Experience:
Web Development Intern | Local Agency, Chicago
June 2023 - Present
- Worked on client websites using HTML, CSS, and basic JavaScript.
- Responsible for fixing styling bugs and updating website content.
- Helped senior developers with testing pages on mobile phones.
- Did maintenance work on WordPress sites.

Freelance Website Builder | Self-Employed
2022 - 2023
- Built small websites for family friends and local small businesses.
- Created contact forms and landing pages.
- Handled domain names and hosting setup.

Education:
Associate Degree in Information Technology
City College of Chicago | 2021 - 2023`
    }
  };

  // Sample Job Descriptions for instant matching
  const SAMPLE_JOB_DESCRIPTIONS = [
    {
      title: "Senior Full Stack Engineer (React, Node.js, AWS)",
      company: "Stripe / Cloud Unicorn",
      text: `Job Title: Senior Full Stack Software Engineer
Location: Remote / Hybrid
About the Role:
We are looking for a Senior Full Stack Engineer to lead the architecture and development of our next-generation SaaS payments platform. You will build highly scalable user interfaces in React, TypeScript, and Tailwind CSS, backed by resilient Node.js microservices deployed on AWS.

Key Responsibilities:
- Architect and ship mission-critical web applications with React 18, Next.js, and TypeScript.
- Design scalable RESTful and GraphQL APIs using Node.js, NestJS, and PostgreSQL.
- Build and optimize cloud infrastructure on AWS (Lambda, ECS, S3, CloudFront) using Docker and Terraform.
- Collaborate with Product Managers and Designers to deliver seamless user experiences.
- Champion code quality, write comprehensive unit and integration tests (Jest, Cypress), and lead code reviews.
- Mentor junior and mid-level software engineers to accelerate engineering excellence.

Requirements:
- 5+ years of software development experience building production web applications.
- Strong proficiency with TypeScript, React, Next.js, State Management (Redux/Zustand), and modern CSS (Tailwind).
- Deep experience with Node.js backend development, relational databases (PostgreSQL), and caching (Redis).
- Hands-on experience with AWS cloud services, Docker containerization, and CI/CD pipelines.
- Demonstrated ability to deliver measurable business impact with strong problem-solving skills.`
    },
    {
      title: "Lead Product Manager (B2B SaaS)",
      company: "GrowthPlatform Inc.",
      text: `Job Title: Lead Product Manager - Enterprise SaaS
Location: New York, NY / Remote

Role Overview:
We are looking for an experienced Product Manager to own the end-to-end strategy, roadmap, and execution for our core B2B product line.

Key Responsibilities:
- Define product vision, quarterly OKRs, and detailed product requirement documents (PRDs).
- Conduct deep customer discovery interviews, qualitative research, and quantitative data analysis.
- Lead cross-functional agile sprint teams (Engineering, Design, Data, Product Marketing).
- Analyze retention, churn, conversion rates, and MRR growth using Mixpanel, SQL, and Amplitude.
- Drive A/B testing experiments and feature prioritization using RICE / MoSCoW frameworks.

Requirements:
- 4+ years of product management experience in B2B SaaS or technology companies.
- Proven track record of launching successful features that drove measurable ARR growth.
- Expertise in agile product development, Jira, user story writing, and backlog grooming.
- Strong analytical skills: ability to query SQL databases and interpret complex metrics.
- Exceptional written communication and executive stakeholder presentation skills.`
    }
  ];

  // Real document parser
  async function parseFile(file) {
    if (!file) throw new Error("No file provided");

    // Check file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new Error(`File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds maximum allowed size of 10 MB.`);
    }

    const fileName = file.name || "resume.pdf";
    const extension = fileName.split('.').pop().toLowerCase();

    // Check extension
    if (!['pdf', 'docx', 'txt'].includes(extension)) {
      throw new Error(`Unsupported file format (.${extension}). Please upload a PDF (.pdf), Word Document (.docx), or Text file (.txt).`);
    }

    let extractedText = '';

    if (extension === 'pdf') {
      extractedText = await parsePdfFile(file);
    } else if (extension === 'docx') {
      extractedText = await parseDocxFile(file);
    } else {
      extractedText = await file.text();
    }

    extractedText = extractedText.trim();
    if (extractedText.length < 50) {
      throw new Error("Unable to extract sufficient text from the document. The document may be an image scan or password-protected. Please upload a text-based PDF or DOCX.");
    }

    const wordCount = extractedText.split(/\s+/).filter(Boolean).length;

    return {
      name: fileName,
      size: file.size,
      sizeFormatted: formatBytes(file.size),
      type: extension,
      text: extractedText,
      wordCount: wordCount
    };
  }

  // Parse PDF using PDF.js
  async function parsePdfFile(file) {
    if (!window.pdfjsLib) {
      // Fallback if PDF.js is unavailable
      const text = await file.text();
      if (text.length > 100) return text;
      throw new Error("PDF.js library is loading. Please try again in a moment.");
    }

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText;
  }

  // Parse DOCX using Mammoth.js
  async function parseDocxFile(file) {
    if (!window.mammoth) {
      throw new Error("Mammoth.js library is loading. Please try again in a moment.");
    }

    const arrayBuffer = await file.arrayBuffer();
    const result = await window.mammoth.extractRawText({ arrayBuffer: arrayBuffer });
    return result.value || '';
  }

  function formatBytes(bytes, decimals = 1) {
    if (!bytes || bytes === 0) return '0 KB';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  return {
    parseFile,
    SAMPLE_RESUMES,
    SAMPLE_JOB_DESCRIPTIONS,
    formatBytes
  };
})();
