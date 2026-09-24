FarmPulse
Know your true price. Sell at the right time. Get paid safely

FarmPulse is a web platform that helps farmers see the real money they will take homebvfrom a sale, decide whether to hold or sell their crop, and deal directly with verified buyers, all in one flow.

> Built for Smart India Hackathon 2026
> Problem Statement ID: SIH26132,
 Strengthening Market Linkages and Price Discovery for Farmers
> Theme: Agriculture, FoodTech & Rural Development 
· Category: Software
> Team: FarmPulse (Team ID 169929)



 The Problem

Farmers receive only 33–37% of the consumer rupee for tomato, onion and potato (RBI Working Paper, 2024). The main reasons:

| Pain point | What happens |

| Blind to real prices | Only the village rate is visible |
| Hidden transport cost | A higher mandi price may not cover the freight |
| Forced distress sale| Perishables get dumped during the harvest glut |
| Payment risk| Unverified buyers and delayed payments |

Our Solution

FarmPulse brings together three things that existing portals keep separate:

1. Net-in-hand price: the mandi rate minus freight, cess and handling
2. AI Hold / Sell signal: a 14-day outlook weighed against storage cost
3. Direct deals: verified FPOs and processors, with escrow-style milestones from offer to payout

| | Existing approach | FarmPulse |

| Price shown | Gross mandi / village rate | Net in-hand after freight, cess & handling |
| Sell decision | Guesswork, broker advice | Hold / Sell signal with storage-cost math |
| Buyer access | Broker chain, unverified buyers | Verified FPO & institutional buyer profiles |
| Payment | Delayed, unsecured | Escrow-style milestone tracking |

<sub>The prototype simulates escrow and payouts. A licensed payment partner is needed for production.</sub>



 Features

- Net-in-hand price discovery across mandis
- AI Hold / Sell verdict using the Google Gemini API, with a rule-based fallback when no API key is set
- Deal & escrow tracker(simulated) with milestones from offer to payout
- Farmer dashboard: check, get advice, list, deal (4 taps)
- Multilingual: English · हिन्दी · ಕನ್ನಡ
-  Responsive web app that runs in any browser, with no extra hardware

How the Numbers Work

Net in-hand price (₹ per quintal)
```
Net = Mandi price − (₹0.42 × distance in km) − ₹35 (cess & handling)
```

Projected net gain over 14 days
```
Gain % = (Future price − Today's price − 2 weeks of storage cost) ÷ Today's price
```

Example: the highest price isn't always the best price

| Mandi | Gross price | Distance | Net in-hand |

| Delhi | ₹3,600 | 1,680 km | ₹2,859 |
| Bengaluru | ₹3,150 | 410 km | ₹2,943 |




 Tech Stack

| Layer | Technologies |

| Frontend | React 19, Vite, TypeScript, Tailwind CSS 4, Motion, Lucide icons |
| Backend| Node.js, Express, TypeScript (tsx) |
| AI | Google Gemini API (`@google/genai`), rule-based fallback |
| Prototype data | In-memory store, browser localStorage, Agmarknet-schema sample data |
| Planned integrations | Agmarknet / data.gov.in, e-NAM, IMD Agromet, WDRA |



Getting Started

Prerequisites
- [Node.js](https://nodejs.org/) 18 or newer
- npm


Installation

```bash
# 1. Clone the repository
git clone https://github.com/aishwaryaangadi7952-creator/FarmPulse.git
cd FarmPulse

# 2. Install dependencies
npm install

# 3. (Optional) Add your Gemini API key
#    Create a .env file in the project root:
echo "GEMINI_API_KEY=your_api_key_here" > .env

# 4. Start the development server
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173` or `http://localhost:3000`).

>  Without a Gemini API key the app still works. The Hold/Sell advisor switches to its built-in rule-based engine.

>  Never commit your `.env` file. Make sure `.env` is listed in `.gitignore`.

---

Impact (Illustrative)

Scenario: 100 quintals of red onion

| Selling route | Farmer earnings |

| Village middleman (₹1,650/q net) | ₹1,65,000 |
| FarmPulse direct to FPO after holding (₹2,800/q) | ₹2,80,000 |
| Difference | +₹1,15,000 (+69.7%)|

<sub>This is a prototype scenario built on sample data, not measured field results.</sub>

Who benefits
-  Farmers: higher net realization, less distress selling
- FPOs & buyers: traceable direct sourcing, fewer middlemen
- Government / APMC: price transparency and early glut alerts
- Sustainability: less spoilage from forced harvest-time dumping

---

Challenges & How We Handle Them

| Challenge | Mitigation |

| Live data gaps or stale feeds | Cache with a freshness flag; offline rule-based fallback |
| Low digital literacy & connectivity | Simple 4-tap UI in 3 languages; voice & WhatsApp next |
| Forecast reliability | Show gain net of storage cost; back-test on Agmarknet history before pilot |
| Buyer trust & payment default | Verified buyer profiles; escrow via a licensed payment partner |

Roadmap

- [x] Working full-stack prototype (React + Node)
- [x] Net-in-hand price engine and Hold/Sell signal
- [x] Gemini advisor with offline fallback
- [x] English, Hindi and Kannada UI
- [ ] Live data ingestion from data.gov.in / Agmarknet
- [ ] ML price forecasting back-tested on Agmarknet history
- [ ] Real escrow through a licensed payment partner
- [ ] e-NAM / ONDC-ready APIs
- [ ] Voice and WhatsApp access in local languages
- [ ] Pilot with FPOs and KVKs

Prototype Status

This is a hackathon prototype. It runs on a simulated dataset in the Agmarknet field schema, and forecasts use per-crop seasonal rules. Escrow and payouts are simulated. Government portals are listed as the data sources the platform is designed around; they are not yet connected live.

References
Research
- RBI Working Paper (2024): Vegetables Inflation in India: A Study of Tomato, Onion and Potato(Gulati et al.)
- SIH 2026 Problem Statement 26132

Government data sources
- [Agmarknet (DMI)](https://agmarknet.gov.in)
- [Open Government Data Platform](https://data.gov.in)
- [e-NAM (SFAC)](https://enam.gov.in)
- [IMD Agromet](https://mausam.imd.gov.in)
- [WDRA Warehousing](https://wdra.gov.in)

Technology documentation
- [React](https://react.dev) · [Vite](https://vite.dev) · [Tailwind CSS](https://tailwindcss.com)
- [Node.js](https://nodejs.org) · [Express](https://expressjs.com)




