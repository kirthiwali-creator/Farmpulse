import pptxgen from 'pptxgenjs';
import { PLATFORM_PRESENTATION_SLIDES } from '../data/mockData';

export async function generatePptx(options: { isSimpleWords?: boolean } = {}) {
  const { isSimpleWords = true } = options;
  const pres = new pptxgen();

  pres.layout = 'LAYOUT_16x9';
  pres.author = 'Farmpulse Team (SIH26132)';
  pres.company = 'Smart India Hackathon 2024 / 2026';
  pres.title = 'SIH26132: Strengthening Market Linkages and Price Discovery for Farmers';
  pres.subject = 'Farmpulse Presentation Deck';

  // Define Colors
  const BG_DARK = '1C1917'; // stone-900
  const TEXT_WHITE = 'FFFFFF';
  const TEXT_MUTED = 'D6D3D1';
  const ACCENT_EMERALD = '059669'; // emerald-600
  const ACCENT_AMBER = 'F59E0B'; // amber-500
  const ACCENT_LIGHT_EMERALD = '10B981';
  const BOX_BG = '292524'; // stone-800
  const BORDER_COLOR = '44403C'; // stone-700

  // Title Slide
  const titleSlide = pres.addSlide();
  titleSlide.background = { color: BG_DARK };

  // Tag
  titleSlide.addText('SMART INDIA HACKATHON • PROBLEM STATEMENT SIH26132', {
    x: 0.8,
    y: 1.2,
    w: 8.4,
    h: 0.4,
    fontSize: 12,
    bold: true,
    color: ACCENT_AMBER,
    fontFace: 'Arial'
  });

  // Main Title
  titleSlide.addText('Strengthening Market Linkages & Price Discovery for Farmers', {
    x: 0.8,
    y: 1.7,
    w: 8.4,
    h: 1.4,
    fontSize: 26,
    bold: true,
    color: TEXT_WHITE,
    fontFace: 'Arial'
  });

  // Subtitle
  titleSlide.addText('Farmpulse: Direct Buyer Linkages, Transparent Mandi Rates & AI Harvest Intelligence', {
    x: 0.8,
    y: 3.2,
    w: 8.4,
    h: 0.8,
    fontSize: 16,
    color: ACCENT_LIGHT_EMERALD,
    fontFace: 'Arial'
  });

  // Presenter Info
  titleSlide.addText('Prepared for SIH Evaluation | Simple Words & Farmer-Friendly Edition\nIncludes 8 Detailed Slides, Measurable Advantages & Real-World Case Study', {
    x: 0.8,
    y: 4.3,
    w: 8.4,
    h: 0.8,
    fontSize: 12,
    color: TEXT_MUTED,
    fontFace: 'Arial'
  });

  // Add 8 Slides
  for (const s of PLATFORM_PRESENTATION_SLIDES) {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };

    // Slide Header Badge
    slide.addText(`SLIDE ${s.slideNumber} • ${s.sihFocus.toUpperCase()}`, {
      x: 0.8,
      y: 0.4,
      w: 8.4,
      h: 0.35,
      fontSize: 10,
      bold: true,
      color: ACCENT_AMBER,
      fontFace: 'Arial'
    });

    // Slide Title
    const slideTitle = isSimpleWords ? s.simpleTitle : s.title;
    slide.addText(slideTitle, {
      x: 0.8,
      y: 0.75,
      w: 8.4,
      h: 0.65,
      fontSize: 20,
      bold: true,
      color: TEXT_WHITE,
      fontFace: 'Arial'
    });

    // Subtitle / Simple Summary
    slide.addText(isSimpleWords ? s.simpleSummary : s.subtitle, {
      x: 0.8,
      y: 1.45,
      w: 8.4,
      h: 0.55,
      fontSize: 12,
      italic: true,
      color: ACCENT_LIGHT_EMERALD,
      fontFace: 'Arial'
    });

    // Key points
    const points = isSimpleWords ? s.simpleKeyPoints : s.keyPoints;
    const bulletItems = points.map(pt => ({
      text: pt + '\n',
      options: { bullet: true, fontSize: 11, color: TEXT_MUTED }
    }));

    // If there is a real-world example or advantages, layout in two columns
    if (s.realWorldExample) {
      // Left: key points
      slide.addText(bulletItems, {
        x: 0.8,
        y: 2.1,
        w: 4.2,
        h: 2.8,
        fontFace: 'Arial'
      });

      // Right: Real-world example card
      const rw = s.realWorldExample;
      slide.addShape(pres.ShapeType.rect, {
        x: 5.2,
        y: 2.1,
        w: 4.0,
        h: 2.8,
        fill: { color: BOX_BG },
        line: { color: BORDER_COLOR, width: 1 }
      });

      slide.addText(`REAL-WORLD COMPARISON: ${rw.farmerName.toUpperCase()}`, {
        x: 5.4,
        y: 2.2,
        w: 3.6,
        h: 0.3,
        fontSize: 10,
        bold: true,
        color: ACCENT_AMBER,
        fontFace: 'Arial'
      });

      slide.addText(
        `• Crop: ${rw.crop} (${rw.quantity})\n` +
        `• OLD WAY (Middleman): ₹${rw.oldWayScenario.totalEarnings.toLocaleString('en-IN')}\n` +
        `  (Local dalal took ₹150 cuts & gave only ₹${rw.oldWayScenario.netInHand}/Q)\n\n` +
        `• FARMPULSE WAY: ₹${rw.newWayScenario.totalEarnings.toLocaleString('en-IN')}\n` +
        `  (AI advised hold 6 days -> Direct FPO pickup at ₹${rw.newWayScenario.netInHand}/Q)\n\n` +
        `NET EXTRA MONEY: +₹${rw.netExtraCash.toLocaleString('en-IN')} (+69.7% More Cash!)`,
        {
          x: 5.4,
          y: 2.55,
          w: 3.6,
          h: 2.2,
          fontSize: 10,
          color: TEXT_WHITE,
          fontFace: 'Arial'
        }
      );
    } else if (s.advantages && s.advantages.length > 0) {
      // Left: key points
      slide.addText(bulletItems, {
        x: 0.8,
        y: 2.1,
        w: 4.4,
        h: 2.8,
        fontFace: 'Arial'
      });

      // Right: Advantages
      slide.addShape(pres.ShapeType.rect, {
        x: 5.4,
        y: 2.1,
        w: 3.8,
        h: 2.8,
        fill: { color: BOX_BG },
        line: { color: BORDER_COLOR, width: 1 }
      });

      slide.addText('KEY ADVANTAGES (TRIPLE-WIN)', {
        x: 5.6,
        y: 2.2,
        w: 3.4,
        h: 0.3,
        fontSize: 10,
        bold: true,
        color: ACCENT_LIGHT_EMERALD,
        fontFace: 'Arial'
      });

      const advText = s.advantages.map(a => 
        `• For ${a.audience}: ${a.benefit}\n  "${a.simpleExplanation}"\n`
      ).join('\n');

      slide.addText(advText, {
        x: 5.6,
        y: 2.55,
        w: 3.4,
        h: 2.2,
        fontSize: 10,
        color: TEXT_WHITE,
        fontFace: 'Arial'
      });
    } else {
      // Full width key points
      slide.addText(bulletItems, {
        x: 0.8,
        y: 2.1,
        w: 8.4,
        h: 2.8,
        fontFace: 'Arial'
      });
    }

    // Bottom Metric & Highlight banner
    if (s.metricsOrHighlight) {
      slide.addText(`Key Impact: ${s.metricsOrHighlight}`, {
        x: 0.8,
        y: 4.9,
        w: 8.4,
        h: 0.35,
        fontSize: 10,
        bold: true,
        color: ACCENT_AMBER,
        fontFace: 'Arial'
      });
    }

    // Speaker notes
    if (s.speakerNotes) {
      slide.addNotes(s.speakerNotes);
    }
  }

  // Final Conclusion Slide
  const endSlide = pres.addSlide();
  endSlide.background = { color: BG_DARK };

  endSlide.addText('SIH26132: Farmpulse Solution Summary', {
    x: 0.8,
    y: 1.2,
    w: 8.4,
    h: 0.6,
    fontSize: 22,
    bold: true,
    color: ACCENT_AMBER,
    fontFace: 'Arial'
  });

  endSlide.addText(
    '1. True Price Discovery: Net realization after deducting transport & mandi cess.\n' +
    '2. AI Hold vs. Sell Guidance: 14-day price forecasting with storage cost math.\n' +
    '3. Direct Buyer Marketplace: Bypassing middlemen with verified FPOs & corporate buyers.\n' +
    '4. Guaranteed Digital Escrow: 100% payment security deposited in advance before truck leaves.\n' +
    '5. Rural-First Simplicity: Designed for smallholders with regional languages & voice.',
    {
      x: 0.8,
      y: 2.0,
      w: 8.4,
      h: 2.2,
      fontSize: 13,
      color: TEXT_WHITE,
      fontFace: 'Arial'
    }
  );

  endSlide.addText('Ready for Live Demonstration | Smart India Hackathon', {
    x: 0.8,
    y: 4.4,
    w: 8.4,
    h: 0.5,
    fontSize: 14,
    bold: true,
    color: ACCENT_LIGHT_EMERALD,
    fontFace: 'Arial'
  });

  // Save the presentation
  const fileName = `SIH26132_Farmpulse_Presentation_${isSimpleWords ? 'Simple_Words' : 'Technical'}.pptx`;
  await pres.writeFile({ fileName });
  return fileName;
}
