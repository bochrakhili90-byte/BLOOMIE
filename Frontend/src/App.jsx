import { useState, useEffect } from "react";
import "./App.css";

// ─── SVG CAFETERIA SCENE ────────────────────────────────────────────────────
function CafeteriaScene() {
  return (
    <svg viewBox="0 0 560 240" className="cafe-svg" xmlns="http://www.w3.org/2000/svg">
      {/* Sky / warm background */}
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF8E7"/>
          <stop offset="100%" stopColor="#FFE0B2"/>
        </linearGradient>
        <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFCC80"/>
          <stop offset="100%" stopColor="#FFA726"/>
        </linearGradient>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF3E0"/>
          <stop offset="100%" stopColor="#FFE0B2"/>
        </linearGradient>
        <filter id="soft"><feGaussianBlur stdDeviation="1.5"/></filter>
        <filter id="softer"><feGaussianBlur stdDeviation="3"/></filter>
      </defs>

      {/* Wall */}
      <rect width="560" height="240" fill="url(#wallGrad)" rx="14"/>

      {/* Warm light from window */}
      <ellipse cx="440" cy="40" rx="80" ry="60" fill="#FFF9C4" opacity="0.5" filter="url(#softer)"/>

      {/* Windows */}
      <rect x="370" y="14" width="80" height="58" rx="8" fill="#B3E5FC" stroke="#90CAF9" strokeWidth="2.5"/>
      <rect x="460" y="14" width="80" height="58" rx="8" fill="#B3E5FC" stroke="#90CAF9" strokeWidth="2.5"/>
      <line x1="410" y1="14" x2="410" y2="72" stroke="#90CAF9" strokeWidth="2"/>
      <line x1="370" y1="43" x2="450" y2="43" stroke="#90CAF9" strokeWidth="2"/>
      <line x1="500" y1="14" x2="500" y2="72" stroke="#90CAF9" strokeWidth="2"/>
      <line x1="460" y1="43" x2="540" y2="43" stroke="#90CAF9" strokeWidth="2"/>
      {/* Sun through window */}
      <circle cx="425" cy="30" r="12" fill="#FFD600" opacity="0.7"/>
      <circle cx="515" cy="30" r="12" fill="#FFD600" opacity="0.7"/>

      {/* Wall decoration - chalk board */}
      <rect x="14" y="14" width="130" height="70" rx="6" fill="#80CBC4" opacity="0.7"/>
      <rect x="18" y="18" width="122" height="62" rx="4" fill="#4DB6AC" opacity="0.5"/>
      <text x="79" y="52" fill="white" fontSize="10" fontFamily="'Baloo 2',cursive" textAnchor="middle" opacity="0.9">Be Kind Today!</text>

      {/* Floor */}
      <rect x="0" y="175" width="560" height="65" fill="url(#floorGrad)" rx="0"/>
      {/* Floor tiles */}
      {[0,1,2,3,4,5,6].map(i=>(
        <rect key={i} x={i*80} y="175" width="80" height="65"
          fill={i%2===0?"rgba(255,255,255,0.12)":"rgba(0,0,0,0.04)"}/>
      ))}

      {/* ── GROUP TABLE (right side, background) ──────── */}
      {/* Table */}
      <ellipse cx="390" cy="168" rx="90" ry="14" fill="#A1887F" opacity="0.9"/>
      <rect x="302" y="165" width="176" height="10" fill="#8D6E63" rx="4"/>
      {/* Table legs */}
      <rect x="330" y="174" width="10" height="30" fill="#795548" rx="3"/>
      <rect x="440" y="174" width="10" height="30" fill="#795548" rx="3"/>

      {/* Group kid 1 - dark hair girl */}
      <g transform="translate(315,95)">
        <ellipse cx="0" cy="55" rx="14" ry="8" fill="#5D4037" opacity="0.2" filter="url(#soft)"/>
        <rect x="-12" y="30" width="24" height="28" fill="#CE93D8" rx="6"/>
        <circle cx="0" cy="24" r="16" fill="#FFCC80"/>
        <path d="M-16 16 Q0 2 16 16 Q18 28 16 35 Q8 40 0 38 Q-8 40 -16 35 Q-18 28 -16 16Z" fill="#4E342E"/>
        <circle cx="-5" cy="20" r="2.5" fill="#3E2723"/>
        <circle cx="5" cy="20" r="2.5" fill="#3E2723"/>
        <path d="M-4 28 Q0 32 4 28" stroke="#BF360C" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <ellipse cx="-8" cy="26" rx="4" ry="3" fill="#FF8A65" opacity="0.4"/>
        <ellipse cx="8" cy="26" rx="4" ry="3" fill="#FF8A65" opacity="0.4"/>
        <circle cx="-6" cy="17" r="1.2" fill="white" opacity="0.7"/>
      </g>

      {/* Group kid 2 - laughing */}
      <g transform="translate(378,88)">
        <ellipse cx="0" cy="58" rx="14" ry="8" fill="#5D4037" opacity="0.2" filter="url(#soft)"/>
        <rect x="-13" y="32" width="26" height="28" fill="#80DEEA" rx="6"/>
        <circle cx="0" cy="26" r="17" fill="#FFAB91"/>
        <path d="M-17 18 Q0 4 17 18" fill="#D84315"/>
        <path d="M-14 18 Q0 8 14 18" fill="#BF360C" opacity="0.7"/>
        <circle cx="-6" cy="22" r="2.8" fill="#4E342E"/>
        <circle cx="6" cy="22" r="2.8" fill="#4E342E"/>
        <path d="M-7 31 Q0 37 7 31" stroke="#BF360C" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        <ellipse cx="-10" cy="29" rx="4" ry="3" fill="#FF7043" opacity="0.5"/>
        <ellipse cx="10" cy="29" rx="4" ry="3" fill="#FF7043" opacity="0.5"/>
      </g>

      {/* Group kid 3 */}
      <g transform="translate(448,92)">
        <ellipse cx="0" cy="56" rx="13" ry="7" fill="#5D4037" opacity="0.2" filter="url(#soft)"/>
        <rect x="-12" y="30" width="24" height="26" fill="#FFCC02" rx="6"/>
        <circle cx="0" cy="24" r="16" fill="#FFD54F"/>
        <path d="M-16 17 Q-8 8 0 10 Q8 8 16 17" fill="#5D4037"/>
        <circle cx="-5" cy="20" r="2.4" fill="#3E2723"/>
        <circle cx="5" cy="20" r="2.4" fill="#3E2723"/>
        <path d="M-4 28 Q0 33 4 28" stroke="#E65100" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      </g>

      {/* Food on group table */}
      <rect x="330" y="155" width="120" height="12" fill="#FFF9C4" rx="4" opacity="0.8"/>
      <circle cx="350" cy="160" r="5" fill="#EF5350"/>
      <circle cx="366" cy="160" r="4" fill="#66BB6A"/>
      <rect x="376" y="156" width="16" height="8" fill="#FFB74D" rx="3"/>
      <circle cx="406" cy="160" r="4" fill="#9C27B0" opacity="0.7"/>
      <rect x="416" y="155" width="10" height="12" fill="#80CBC4" rx="2"/>

      {/* Speech bubble for group */}
      <rect x="310" y="54" width="110" height="26" fill="white" rx="10" opacity="0.92" stroke="#F8BBD0" strokeWidth="1.5"/>
      <path d="M355 80 L360 90 L350 80" fill="white" opacity="0.92"/>
      <text x="365" y="72" fill="#C2185B" fontSize="11" fontFamily="'Baloo 2',cursive" fontWeight="700" textAnchor="middle">Ha ha! 😄</text>

      {/* ── LONELY CHILD (center-left, foreground) ──────── */}
      {/* Table */}
      <ellipse cx="160" cy="172" rx="70" ry="12" fill="#BCAAA4" opacity="0.9"/>
      <rect x="92" y="169" width="136" height="10" fill="#A1887F" rx="4"/>
      <rect x="112" y="178" width="10" height="28" fill="#8D6E63" rx="3"/>
      <rect x="195" y="178" width="10" height="28" fill="#8D6E63" rx="3"/>

      {/* Lone child body */}
      <g transform="translate(160,82)">
        <ellipse cx="0" cy="72" rx="20" ry="10" fill="#5D4037" opacity="0.18" filter="url(#soft)"/>
        {/* Hoodie */}
        <rect x="-18" y="36" width="36" height="36" fill="#5C6BC0" rx="8"/>
        {/* Hoodie strings */}
        <line x1="-4" y1="40" x2="-2" y2="55" stroke="#3949AB" strokeWidth="1.5"/>
        <line x1="4" y1="40" x2="2" y2="55" stroke="#3949AB" strokeWidth="1.5"/>
        {/* Arms crossed */}
        <rect x="-22" y="46" width="14" height="9" fill="#5C6BC0" rx="4" transform="rotate(20,-15,50)"/>
        <rect x="8" y="46" width="14" height="9" fill="#5C6BC0" rx="4" transform="rotate(-20,15,50)"/>
        {/* Head */}
        <circle cx="0" cy="24" r="20" fill="#FFCC80"/>
        {/* Hair - dark brown */}
        <path d="M-20 18 Q-10 2 0 0 Q10 2 20 18 Q22 30 20 38" fill="#3E2723"/>
        <path d="M-20 18 Q-22 32 -18 40" fill="#3E2723"/>
        {/* Sad eyes - looking down */}
        <circle cx="-7" cy="21" r="3.5" fill="white"/>
        <circle cx="7" cy="21" r="3.5" fill="white"/>
        <circle cx="-7" cy="23" r="2.5" fill="#3E2723"/>
        <circle cx="7" cy="23" r="2.5" fill="#3E2723"/>
        {/* Furrowed brows */}
        <path d="M-11 16 Q-7 13 -3 16" stroke="#5D4037" strokeWidth="2" fill="none"/>
        <path d="M3 16 Q7 13 11 16" stroke="#5D4037" strokeWidth="2" fill="none"/>
        {/* Sad mouth */}
        <path d="M-6 30 Q0 26 6 30" stroke="#BF360C" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Tear */}
        <ellipse cx="-7" cy="27" rx="1.8" ry="2.8" fill="#90CAF9" opacity="0.9"/>
        <ellipse cx="7" cy="27" rx="1.8" ry="2.8" fill="#90CAF9" opacity="0.9"/>
        {/* Cheeks flushed */}
        <ellipse cx="-13" cy="28" rx="5" ry="4" fill="#FF8A65" opacity="0.3"/>
        <ellipse cx="13" cy="28" rx="5" ry="4" fill="#FF8A65" opacity="0.3"/>
      </g>

      {/* Lunch tray lonely */}
      <rect x="110" y="161" width="100" height="12" fill="#ECEFF1" rx="5" stroke="#CFD8DC" strokeWidth="1.5"/>
      <circle cx="132" cy="167" r="6" fill="#EF9A9A"/>
      <rect x="143" y="162" width="20" height="9" fill="#A5D6A7" rx="3"/>
      <rect x="167" y="162" width="14" height="9" fill="#FFE082" rx="3"/>
      {/* Water bottle */}
      <rect x="196" y="150" width="12" height="24" fill="#81D4FA" rx="4"/>
      <rect x="196" y="148" width="12" height="7" fill="#4FC3F7" rx="3"/>

      {/* Thought bubble */}
      <circle cx="100" cy="95" r="5" fill="white" stroke="#CFD8DC" strokeWidth="1.5" opacity="0.9"/>
      <circle cx="88" cy="82" r="8" fill="white" stroke="#CFD8DC" strokeWidth="1.5" opacity="0.9"/>
      <rect x="70" y="58" width="38" height="26" rx="10" fill="white" stroke="#CFD8DC" strokeWidth="1.5" opacity="0.9"/>
      <text x="89" y="75" fill="#78909C" fontSize="13" textAnchor="middle">😔</text>

      {/* Scene label */}
      <rect x="170" y="220" width="220" height="18" rx="6" fill="rgba(255,255,255,0.6)"/>
      <text x="280" y="233" fill="#795548" fontSize="11" fontFamily="'Quicksand',sans-serif"
        fontWeight="700" textAnchor="middle">☀️ Lunchtime at school</text>
    </svg>
  );
}

// ─── BLOOMIE FLOWER MASCOT ───────────────────────────────────────────────────
function BloomieMascot() {
  return (
    <div className="mascot-root">
      <div className="mascot-speech">
        <p>Hi there! 💗</p>
        <p>Let's make kind choices together!</p>
        <div className="speech-tail-left"/>
      </div>
      <div className="mascot-flower">
        {/* Petals */}
        <div className="mascot-petals">
          {[0,1,2,3,4,5,6,7].map(i=>(
            <div key={i} className={`mpetal mpetal-${i}`}/>
          ))}
        </div>
        {/* Face */}
        <div className="mascot-face">
          <div className="mf-eyes">
            <div className="mf-eye"><div className="mf-pupil"><div className="mf-shine"/></div></div>
            <div className="mf-eye"><div className="mf-pupil"><div className="mf-shine"/></div></div>
          </div>
          <div className="mf-nose"/>
          <div className="mf-smile"/>
          <div className="mf-cheeks">
            <div className="mf-cheek"/><div className="mf-cheek"/>
          </div>
        </div>
      </div>
      {/* Stem */}
      <div className="mascot-stem">
        <div className="mascot-leaf mascot-leaf-l"/>
        <div className="mascot-leaf mascot-leaf-r"/>
      </div>
      {/* Pot */}
      <div className="mascot-pot-group">
        <div className="mascot-pot-rim"/>
        <div className="mascot-pot">
          <div className="mascot-pot-label">BLOOMIE</div>
          <div className="mascot-pot-shine"/>
        </div>
      </div>
      {/* Mission card below */}
      <div className="mission-card">
        <div className="mission-card-title">Today's Mission 🌸</div>
        <div className="mission-card-text">Every choice helps someone bloom 💗</div>
      </div>
    </div>
  );
}

// ─── AURA ROBOT ─────────────────────────────────────────────────────────────
function AuraBot({ feedback }) {
  return (
    <div className="aura-root">
      <div className="aura-speech">
        <p><strong>I'm AURA!</strong></p>
        <p>I'm here to listen, cheer you on, and help you grow! 💜</p>
        <div className="speech-tail-right"/>
      </div>
      <div className="aura-figure">
        {/* Glow ring */}
        <div className="aura-glow-outer">
          <div className="aura-glow-inner"/>
        </div>
        {/* Antenna */}
        <div className="aura-antenna">
          <div className="aura-orb"><div className="aura-orb-core"/></div>
        </div>
        {/* Head */}
        <div className="aura-head">
          <div className="aura-head-shine"/>
          <div className="aura-face-panel">
            <div className="aura-eyes-row">
              <div className="aura-eye-glow"><div className="aura-eye-core"><div className="aura-scan-line"/></div></div>
              <div className="aura-eye-glow"><div className="aura-eye-core"><div className="aura-scan-line"/></div></div>
            </div>
            <div className="aura-smile-line"/>
          </div>
          <div className="aura-ear aura-ear-l"/>
          <div className="aura-ear aura-ear-r"/>
        </div>
        {/* Body */}
        <div className="aura-body">
          <div className="aura-arm aura-arm-l">
            <div className="aura-hand-l"/>
          </div>
          <div className="aura-chest">
            <div className="aura-heart-icon">♥</div>
            <div className="aura-chest-dots">
              <span className="aura-dot g"/><span className="aura-dot y"/><span className="aura-dot p"/>
            </div>
          </div>
          <div className="aura-arm aura-arm-r">
            <div className="aura-hand-r"/>
          </div>
        </div>
        {/* Legs */}
        <div className="aura-legs">
          <div className="aura-leg"><div className="aura-foot"/></div>
          <div className="aura-leg"><div className="aura-foot"/></div>
        </div>
      </div>
      <div className="aura-feedback-area">
        <div className="aura-fb-label">AURA's Feedback 💗</div>
        <div className="aura-fb-text">
          {feedback || "Share your thoughts and I'll give you kind feedback!"}
        </div>
      </div>
    </div>
  );
}

// ─── LEAF BUTTON ────────────────────────────────────────────────────────────
function LeafBtn({ id, label, icon, active, onClick }) {
  return (
    <button className={`leaf-btn ${active?"leaf-active":""}`} onClick={()=>onClick(id)}>
      <div className="leaf-shape">
        <div className="leaf-vein-main"/>
        <div className="leaf-vein-l"/><div className="leaf-vein-r"/>
        <div className="leaf-content">
          <span className="leaf-text">{label}</span>
          <span className="leaf-flower">{icon}</span>
        </div>
      </div>
      <div className="leaf-stem-stub"/>
    </button>
  );
}

// ─── NOTEBOOK ───────────────────────────────────────────────────────────────
function Notebook({ value, onChange, onSubmit, feedback }) {
  return (
    <div className="notebook-root">
      {/* Spiral rings */}
      <div className="nb-spiral">
        {[...Array(12)].map((_,i)=>(
          <div key={i} className="nb-ring">
            <div className="nb-ring-hole"/>
          </div>
        ))}
      </div>
      {/* Left page */}
      <div className="nb-left-page">
        <div className="nb-page-title">
          <span>Your Reflection Journal</span>
          <span className="nb-flower-icon">🌸</span>
        </div>
        <div className="nb-lines-wrap">
          <div className="nb-margin-line"/>
          {[...Array(8)].map((_,i)=><div key={i} className="nb-line"/>)}
          <textarea
            className="nb-textarea"
            value={value}
            onChange={e=>onChange(e.target.value)}
            placeholder={"Why did you choose this?\nHow did it make you feel?"}
            rows={8}
          />
        </div>
        <button className="nb-send-btn" onClick={onSubmit}>
          Send to AURA 🌸
        </button>
      </div>
      {/* Right page */}
      <div className="nb-right-page">
        <div className="nb-sticky">
          <div className="nb-sticky-header">AURA's Feedback 🤍</div>
          <div className="nb-sticky-text">
            {feedback || "Share your thoughts and I'll give you kind feedback! 🌙 ☺"}
          </div>
          <div className="nb-sticky-flower">🌸</div>
        </div>
        <div className="nb-deco-pencil">
          <div className="nb-pencil"/>
        </div>
        <div className="nb-deco-smiley">☺</div>
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ─────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id:"home",     icon:"🏠", label:"Home"      },
  { id:"garden",   icon:"🌱", label:"My Garden"  },
  { id:"progress", icon:"📊", label:"Progress"   },
  { id:"journal",  icon:"📓", label:"Journal"    },
  { id:"profile",  icon:"👤", label:"Profile"    },
];

function BottomNav({ active, setActive }) {
  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(n=>(
        <button key={n.id} className={`nav-item ${active===n.id?"nav-active":""}`}
          onClick={()=>setActive(n.id)}>
          <span className="nav-icon">{n.icon}</span>
          <span className="nav-label">{n.label}</span>
        </button>
      ))}
    </nav>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
const CHOICES = [
  { id:"a", label:"Invite them to join you", icon:"🌸" },
  { id:"b", label:"Ask if they are okay",    icon:"💙" },
  { id:"c", label:"Stay quiet",              icon:"💛" },
];

const WARM_REPLIES = [
  "That's a beautiful choice! 🌟 Reaching out to someone who feels alone takes real courage. Your kindness creates ripples — keep shining!",
  "Wow, you paused to think about how someone else was feeling. That's emotional wisdom! You're growing every day. 💜",
  "You wrote from the heart and that means everything! Every feeling you share helps you bloom a little more. 🌸",
  "Such a thoughtful reflection! Remember — kindness starts with noticing, and you did exactly that. You're amazing! 🌈",
];

export default function App() {
  const [backendMsg, setBackendMsg] = useState("Checking...");
  const [chosen, setChosen] = useState(null);
  const [reflection, setReflection] = useState("");
  const [feedback, setFeedback] = useState("");
  const [navActive, setNavActive] = useState("home");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/")
      .then(r=>r.json())
      .then(d=>setBackendMsg(d.message||"BLOOMIE backend is running"))
      .catch(()=>setBackendMsg("BLOOMIE backend is running"));
  }, []);

  const handleSend = () => {
    if (!reflection.trim()) {
      setFeedback("Take a moment and write a few words — every feeling matters! 🌱");
    } else {
      setFeedback(WARM_REPLIES[Math.floor(Math.random()*WARM_REPLIES.length)]);
    }
  };

  return (
    <div className="app-shell">
      {/* Ambient light orbs */}
      <div className="amb-orb orb1"/><div className="amb-orb orb2"/><div className="amb-orb orb3"/>

      {/* ── HEADER ── */}
      <header className="app-header">
        <div className="header-logo">
          <span className="logo-flower-icon">🌸</span>
          <div className="logo-text-col">
            <span className="logo-main">BLOOMIE</span>
            <span className="logo-tagline">Feel. Reflect. Grow.</span>
            <span className="logo-heart">🤍</span>
          </div>
        </div>
        <div className="backend-badge">
          <span className="backend-dot"/>
          <div className="backend-lines">
            <span className="backend-label">Backend status 🌸</span>
            <span className="backend-msg">{backendMsg}</span>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="app-main">
        {/* Left */}
        <aside className="col-left"><BloomieMascot/></aside>

        {/* Center */}
        <section className="col-center">
          <div className="scenario-card">
            <div className="scenario-header">
              <span className="scenario-leaf-icon">🌿</span>
              Today's Scenario
              <span className="scenario-leaf-icon">🌿</span>
            </div>
            <p className="scenario-question">
              You notice a classmate sitting alone during lunch.<br/>
              What would you do?
            </p>
            <div className="scene-wrap">
              <CafeteriaScene/>
            </div>
            <div className="leaf-choices">
              {CHOICES.map(c=>(
                <LeafBtn key={c.id} {...c} active={chosen===c.id} onClick={setChosen}/>
              ))}
            </div>
            {chosen && (
              <div className="chosen-pill">
                ✅ You chose: <strong>{CHOICES.find(c=>c.id===chosen)?.label}</strong>
              </div>
            )}
          </div>
        </section>

        {/* Right */}
        <aside className="col-right"><AuraBot feedback={feedback}/></aside>
      </main>

      {/* ── NOTEBOOK ── */}
      <section className="notebook-section">
        <Notebook
          value={reflection}
          onChange={setReflection}
          onSubmit={handleSend}
          feedback={feedback}
        />
      </section>

      {/* ── BOTTOM NAV ── */}
      <BottomNav active={navActive} setActive={setNavActive}/>
    </div>
  );
}