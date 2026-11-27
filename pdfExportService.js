// PDF & Report Export Engine (html2pdf & Text formats)
window.PdfExportService = (() => {

  /**
   * Download Comprehensive ATS Analysis Report as PDF
   */
  async function downloadAnalysisReport(analysis) {
    if (!analysis) return;

    // Create temporary export container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '800px';
    container.style.padding = '40px';
    container.style.backgroundColor = '#ffffff';
    container.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
    container.style.color = '#0f172a';

    const categoryRows = Object.entries(analysis.categoryScores || {}).map(([key, score]) => {
      const name = key.charAt(0).toUpperCase() + key.slice(1);
      return `
        <div style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
            <span>${name}</span>
            <span style="color: #2563eb;">${score}/100</span>
          </div>
          <div style="height: 8px; background: #e2e8f0; border-radius: 9999px; overflow: hidden;">
            <div style="height: 100%; width: ${score}%; background: linear-gradient(90deg, #2563eb, #7c3aed); border-radius: 9999px;"></div>
          </div>
        </div>
      `;
    }).join('');

    const strengthsList = (analysis.strengths || []).map(s => `
      <div style="padding: 10px 14px; background: #f0fdf4; border-left: 4px solid #10b981; border-radius: 6px; margin-bottom: 8px;">
        <div style="font-weight: 700; color: #065f46; font-size: 13px;">✓ ${s.title}</div>
        <div style="font-size: 12px; color: #166534; margin-top: 2px;">${s.description}</div>
      </div>
    `).join('');

    const weaknessesList = (analysis.weaknesses || []).map(w => `
      <div style="padding: 10px 14px; background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 6px; margin-bottom: 8px;">
        <div style="font-weight: 700; color: #92400e; font-size: 13px;">⚠ ${w.title}</div>
        <div style="font-size: 12px; color: #b45309; margin-top: 2px;">${w.description}</div>
      </div>
    `).join('');

    const suggestionsList = (analysis.suggestions || []).map((s, idx) => `
      <div style="padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 12px;">
        <div style="font-weight: 700; color: #1e293b; font-size: 13px; margin-bottom: 4px;">
          ${idx + 1}. ${s.category}
        </div>
        <div style="font-size: 12px; color: #475569; margin-bottom: 6px;">
          <strong>Problem:</strong> ${s.problem}
        </div>
        <div style="font-size: 12px; color: #2563eb; margin-bottom: 8px;">
          <strong>Action:</strong> ${s.recommendation}
        </div>
        ${s.example ? `
          <div style="font-size: 11px; background: #ffffff; padding: 8px; border-radius: 6px; border: 1px solid #cbd5e1;">
            <div style="color: #ef4444; margin-bottom: 2px;"><strong>Original:</strong> "${s.example.before}"</div>
            <div style="color: #059669;"><strong>Improved:</strong> "${s.example.after}"</div>
          </div>
        ` : ''}
      </div>
    `).join('');

    container.innerHTML = `
      <div style="border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #1e293b; letter-spacing: -0.5px;">
            ResumeAI <span style="font-size: 14px; font-weight: 500; color: #64748b;">| ATS Compatibility Audit</span>
          </h1>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">
            Document: <strong>${analysis.fileName}</strong> | Generated: ${new Date().toLocaleDateString()}
          </p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 28px; font-weight: 900; color: #2563eb;">${analysis.overallScore}<span style="font-size: 14px; color: #64748b;">/100</span></div>
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #7c3aed; letter-spacing: 0.5px;">${analysis.scoreTier} Tier</div>
        </div>
      </div>

      <!-- Executive Summary -->
      <div style="background: #f1f5f9; padding: 14px 18px; border-radius: 8px; margin-bottom: 24px; font-size: 13px; line-height: 1.6; color: #334155;">
        <strong>Executive Assessment:</strong> ${analysis.summary}
      </div>

      <!-- Breakdown & Scores Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
        <div>
          <h3 style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
            Category-wise Breakdown
          </h3>
          ${categoryRows}
        </div>
        <div>
          <h3 style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
            Target Keywords Found
          </h3>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${(analysis.matchedKeywords || []).slice(0, 15).map(k => `
              <span style="font-size: 11px; padding: 3px 8px; background: #e0e7ff; color: #3730a3; border-radius: 9999px; font-weight: 600;">
                ${k}
              </span>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Strengths & Weaknesses Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
        <div>
          <h3 style="font-size: 14px; font-weight: 700; color: #065f46; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">
            Key Strengths (${(analysis.strengths || []).length})
          </h3>
          ${strengthsList}
        </div>
        <div>
          <h3 style="font-size: 14px; font-weight: 700; color: #92400e; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">
            Areas for Improvement (${(analysis.weaknesses || []).length})
          </h3>
          ${weaknessesList}
        </div>
      </div>

      <!-- Actionable Suggestions -->
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
          Priority Recommendations & Rewrites
        </h3>
        ${suggestionsList}
      </div>

      <!-- Legal Disclaimer -->
      <div style="border-top: 1px solid #e2e8f0; padding-top: 14px; font-size: 10px; color: #94a3b8; text-align: center;">
        * Notice: The ATS score is an estimated compatibility score calculated using industry standard parsing rubrics, not a guarantee of passing any real employer's proprietary ATS.
      </div>
    `;

    document.body.appendChild(container);

    if (window.html2pdf) {
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${analysis.fileName.replace(/\.[^/.]+$/, "")}_ATS_Report.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      try {
        await window.html2pdf().set(opt).from(container).save();
      } catch (e) {
        console.error("html2pdf failed, falling back to print", e);
        window.print();
      } finally {
        document.body.removeChild(container);
      }
    } else {
      // Fallback
      window.print();
      document.body.removeChild(container);
    }
  }

  /**
   * Download Plain Text or Formatted Improved Resume
   */
  function downloadImprovedResumeText(resumeContent, fileName = "Improved_Resume.txt") {
    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Download Job Match Report
   */
  function downloadJobMatchReport(jobMatch, resumeFileName, jobTitle) {
    if (!jobMatch) return;
    const reportText = `===========================================================
RESUMEAI - JOB DESCRIPTION MATCH REPORT
===========================================================
Resume: ${resumeFileName}
Target Role: ${jobTitle || "Custom Job Description"}
Overall Match Score: ${jobMatch.matchPercentage}%
Date: ${new Date().toLocaleDateString()}

===========================================================
1. MATCHED KEYWORDS (${jobMatch.matchedKeywords.length})
===========================================================
${jobMatch.matchedKeywords.join(', ')}

===========================================================
2. MISSING KEYWORDS (${jobMatch.missingKeywords.length})
===========================================================
${jobMatch.missingKeywords.join(', ')}

===========================================================
3. MISSING CRITICAL SKILLS
===========================================================
${jobMatch.missingSkills.join(', ')}

===========================================================
4. AI RECOMMENDATIONS TO BRIDGE THE GAP
===========================================================
${jobMatch.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}

===========================================================
Generated by ResumeAI Platform
`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeFileName.replace(/\.[^/.]+$/, "")}_Job_Match_Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return {
    downloadAnalysisReport,
    downloadImprovedResumeText,
    downloadJobMatchReport
  };
})();
