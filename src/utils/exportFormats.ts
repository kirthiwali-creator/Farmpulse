import { PLATFORM_PRESENTATION_SLIDES } from '../data/mockData';
import { generatePptx } from './pptxExport';

export { generatePptx };

/**
 * Downloads a standalone, offline-ready HTML presentation slide deck
 * that can be presented anywhere without an internet connection or converted to PDF.
 */
export function downloadHtmlPresentation(isSimpleWords: boolean = true) {
  const slidesHtml = PLATFORM_PRESENTATION_SLIDES.map((s, idx) => {
    const title = isSimpleWords ? s.simpleTitle : s.title;
    const summary = isSimpleWords ? s.simpleSummary : s.subtitle;
    const points = isSimpleWords ? s.simpleKeyPoints : s.keyPoints;

    const pointsHtml = points
      .map(p => `<li style="margin-bottom: 10px; font-size: 16px; line-height: 1.5; color: #d6d3d1;">${escapeHtml(p)}</li>`)
      .join('');

    let extraCardHtml = '';
    if (s.realWorldExample) {
      const rw = s.realWorldExample;
      extraCardHtml = `
        <div style="background: #292524; border: 1px solid #44403c; border-radius: 12px; padding: 18px; margin-top: 15px;">
          <div style="color: #f59e0b; font-weight: bold; font-size: 13px; text-transform: uppercase; margin-bottom: 8px;">
            Real-World Proof: ${escapeHtml(rw.farmerName)} (${escapeHtml(rw.location)})
          </div>
          <div style="font-size: 14px; color: #e7e5e4; margin-bottom: 8px;">
            Crop: <strong>${escapeHtml(rw.crop)}</strong> (${escapeHtml(rw.quantity)})
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 12px 0;">
            <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 10px;">
              <div style="font-size: 11px; color: #f87171; font-weight: bold;">OLD WAY (Middleman)</div>
              <div style="font-size: 18px; font-weight: bold; color: #fca5a5;">₹${rw.oldWayScenario.totalEarnings.toLocaleString('en-IN')}</div>
              <div style="font-size: 12px; color: #a8a29e;">₹${rw.oldWayScenario.netInHand}/Q after cuts</div>
            </div>
            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 10px;">
              <div style="font-size: 11px; color: #34d399; font-weight: bold;">FARMPULSE WAY</div>
              <div style="font-size: 18px; font-weight: bold; color: #6ee7b7;">₹${rw.newWayScenario.totalEarnings.toLocaleString('en-IN')}</div>
              <div style="font-size: 12px; color: #a8a29e;">Direct FPO farm-gate pickup</div>
            </div>
          </div>
          <div style="background: #064e3b; border-radius: 6px; padding: 8px 12px; font-weight: bold; color: #a7f3d0; font-size: 13px;">
            Net Extra Cash: +₹${rw.netExtraCash.toLocaleString('en-IN')} (+69.7% More Money!)
          </div>
        </div>
      `;
    } else if (s.advantages && s.advantages.length > 0) {
      const advItems = s.advantages.map(a => `
        <div style="background: #292524; border: 1px solid #44403c; border-radius: 8px; padding: 10px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <span style="font-size: 11px; font-weight: bold; background: #065f46; color: #6ee7b7; padding: 2px 6px; border-radius: 4px;">For ${escapeHtml(a.audience)}</span>
            <span style="font-size: 13px; font-weight: bold; color: #f59e0b;">${escapeHtml(a.benefit)}</span>
          </div>
          <div style="font-size: 12px; color: #d6d3d1;">"${escapeHtml(a.simpleExplanation)}"</div>
        </div>
      `).join('');

      extraCardHtml = `
        <div style="margin-top: 15px;">
          <div style="color: #10b981; font-weight: bold; font-size: 13px; text-transform: uppercase; margin-bottom: 8px;">Key Advantages (Triple-Win)</div>
          ${advItems}
        </div>
      `;
    }

    return `
      <section class="slide" id="slide-${idx + 1}" style="display: ${idx === 0 ? 'flex' : 'none'};">
        <div class="slide-header">
          <div class="slide-meta">
            <span class="badge sih-badge">SIH26132</span>
            <span class="badge focus-badge">${escapeHtml(s.sihFocus)}</span>
            <span class="slide-num">Slide ${s.slideNumber} of ${PLATFORM_PRESENTATION_SLIDES.length}</span>
          </div>
          <h2 class="slide-title">${escapeHtml(title)}</h2>
          <p class="slide-subtitle">${escapeHtml(summary)}</p>
        </div>

        <div class="slide-body">
          <div class="slide-points">
            <h3 style="color: #f59e0b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">Core Takeaways</h3>
            <ul>
              ${pointsHtml}
            </ul>
          </div>
          <div class="slide-aside">
            ${extraCardHtml}
          </div>
        </div>

        <div class="slide-footer">
          <div class="metric-highlight">
            <strong>Key Metric:</strong> ${escapeHtml(s.metricsOrHighlight || '')}
          </div>
          <div class="speaker-notes">
            <strong>Speaker Script:</strong> ${escapeHtml(s.speakerNotes || '')}
          </div>
        </div>
      </section>
    `;
  }).join('\n');

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SIH26132: Strengthening Market Linkages & Price Discovery for Farmers</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    body { background-color: #0c0a09; color: #f5f5f4; display: flex; flex-direction: column; min-height: 100vh; }
    
    header { background: #1c1917; border-bottom: 1px solid #292524; padding: 12px 24px; display: flex; justify-content: space-between; align-items: center; }
    .brand { display: flex; align-items: center; gap: 10px; font-weight: bold; font-size: 16px; color: #10b981; }
    .controls { display: flex; gap: 10px; align-items: center; }
    button { background: #292524; color: #e7e5e4; border: 1px solid #44403c; padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
    button:hover { background: #44403c; color: #fff; }
    button.primary { background: #059669; border-color: #047857; color: #fff; }
    button.primary:hover { background: #047857; }

    main { flex: 1; display: flex; justify-content: center; align-items: center; padding: 24px; }
    .slide-deck-container { width: 100%; max-width: 1100px; background: #1c1917; border: 1px solid #292524; border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); overflow: hidden; }
    
    .slide { display: flex; flex-direction: column; min-height: 580px; padding: 36px 44px; position: relative; }
    .slide-header { border-bottom: 1px solid #292524; padding-bottom: 16px; margin-bottom: 20px; }
    .slide-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; font-size: 12px; }
    .badge { padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px; text-transform: uppercase; }
    .sih-badge { background: #f59e0b; color: #000; }
    .focus-badge { background: #064e3b; color: #6ee7b7; border: 1px solid #047857; }
    .slide-num { margin-left: auto; color: #a8a29e; font-weight: 600; }
    .slide-title { font-size: 26px; font-weight: 800; color: #ffffff; margin-bottom: 6px; }
    .slide-subtitle { font-size: 15px; color: #34d399; }

    .slide-body { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 24px; flex: 1; align-items: start; }
    .slide-points ul { padding-left: 20px; }

    .slide-footer { margin-top: auto; padding-top: 16px; border-top: 1px solid #292524; font-size: 13px; }
    .metric-highlight { color: #fbbf24; margin-bottom: 6px; font-size: 13px; }
    .speaker-notes { background: #292524; padding: 10px 14px; border-radius: 8px; color: #d6d3d1; font-size: 12px; line-height: 1.4; }

    .deck-nav { display: flex; justify-content: space-between; align-items: center; background: #141211; border-top: 1px solid #292524; padding: 12px 24px; }
    .nav-btn { display: inline-flex; align-items: center; gap: 6px; }

    @media print {
      body { background: #fff !important; color: #000 !important; }
      header, .deck-nav { display: none !important; }
      .slide-deck-container { border: none; box-shadow: none; max-width: 100%; }
      .slide { display: flex !important; page-break-after: always; min-height: auto; border-bottom: 2px solid #ccc; background: #fff !important; color: #000 !important; }
      .slide-title { color: #000 !important; }
      .slide-subtitle { color: #047857 !important; }
      .slide-points li { color: #333 !important; }
      .speaker-notes { background: #f3f4f6 !important; color: #333 !important; }
    }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <span>🌾 Farmpulse (SIH26132)</span>
      <span style="font-size: 12px; color: #a8a29e; font-weight: normal;">• Presentation Slides</span>
    </div>
    <div class="controls">
      <button onclick="window.print()">🖨️ Print / Save as PDF</button>
      <button class="primary" onclick="toggleFullScreen()">⛶ Fullscreen</button>
    </div>
  </header>

  <main>
    <div class="slide-deck-container">
      ${slidesHtml}

      <div class="deck-nav">
        <button class="nav-btn" id="prevBtn" onclick="prevSlide()">← Previous Slide</button>
        <span style="font-size: 13px; color: #a8a29e;" id="indicator">Slide 1 of ${PLATFORM_PRESENTATION_SLIDES.length}</span>
        <button class="nav-btn primary" id="nextBtn" onclick="nextSlide()">Next Slide →</button>
      </div>
    </div>
  </main>

  <script>
    let currentSlide = 1;
    const totalSlides = ${PLATFORM_PRESENTATION_SLIDES.length};

    function showSlide(index) {
      if (index < 1) index = 1;
      if (index > totalSlides) index = totalSlides;
      currentSlide = index;

      for (let i = 1; i <= totalSlides; i++) {
        const el = document.getElementById('slide-' + i);
        if (el) el.style.display = (i === currentSlide) ? 'flex' : 'none';
      }

      document.getElementById('indicator').textContent = 'Slide ' + currentSlide + ' of ' + totalSlides;
      document.getElementById('prevBtn').disabled = (currentSlide === 1);
      document.getElementById('nextBtn').disabled = (currentSlide === totalSlides);
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    function toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { nextSlide(); }
      if (e.key === 'ArrowLeft') { prevSlide(); }
    });

    showSlide(1);
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SIH26132_Farmpulse_Interactive_Deck_${isSimpleWords ? 'Simple_Words' : 'Technical'}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Downloads full transcript, speaker notes, and presentation content as Markdown / Text file.
 */
export function downloadPresentationMarkdown(isSimpleWords: boolean = true) {
  let md = `# SIH26132: Strengthening Market Linkages and Price Discovery for Farmers\n`;
  md += `## Solution: Farmpulse Digital Farmer Platform\n`;
  md += `Prepared for: Smart India Hackathon Evaluation (Simple Words & Farmer-Friendly Edition)\n\n`;
  md += `---\n\n`;

  PLATFORM_PRESENTATION_SLIDES.forEach((s) => {
    const title = isSimpleWords ? s.simpleTitle : s.title;
    const summary = isSimpleWords ? s.simpleSummary : s.subtitle;
    const points = isSimpleWords ? s.simpleKeyPoints : s.keyPoints;

    md += `## Slide ${s.slideNumber}: ${title}\n`;
    md += `*${summary}*\n\n`;
    md += `**Focus Area:** ${s.sihFocus} | **Topic:** ${s.topicFocus}\n\n`;
    md += `### Key Points:\n`;
    points.forEach((p, idx) => {
      md += `${idx + 1}. ${p}\n`;
    });
    md += `\n`;

    if (s.realWorldExample) {
      const rw = s.realWorldExample;
      md += `### Real-World Example (${rw.farmerName} - ${rw.location}):\n`;
      md += `- **Crop:** ${rw.crop} (${rw.quantity})\n`;
      md += `- **Old Way (Local Middleman):** Gross ₹${rw.oldWayScenario.pricePerQ}/Q -> Net Take Home: ₹${rw.oldWayScenario.totalEarnings.toLocaleString('en-IN')}\n`;
      md += `- **Farmpulse Way (Direct FPO + AI):** Gross ₹${rw.newWayScenario.pricePerQ}/Q -> Net Take Home: ₹${rw.newWayScenario.totalEarnings.toLocaleString('en-IN')}\n`;
      md += `- **NET EXTRA MONEY FOR FARMER:** +₹${rw.netExtraCash.toLocaleString('en-IN')} (+69.7% more income!)\n`;
      md += `- **Key Lesson:** ${rw.keyLesson}\n\n`;
    }

    if (s.advantages && s.advantages.length > 0) {
      md += `### Key Advantages:\n`;
      s.advantages.forEach((a) => {
        md += `- **For ${a.audience}:** ${a.benefit} — "${a.simpleExplanation}"\n`;
      });
      md += `\n`;
    }

    if (s.metricsOrHighlight) {
      md += `**Impact Metric:** ${s.metricsOrHighlight}\n\n`;
    }

    md += `### Speaker Script & Talking Points:\n`;
    md += `> "${s.speakerNotes}"\n\n`;
    md += `---\n\n`;
  });

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SIH26132_Presentation_Notes_${isSimpleWords ? 'Simple_Words' : 'Technical'}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
