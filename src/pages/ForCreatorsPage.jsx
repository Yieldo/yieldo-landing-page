import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const C = {
  black: "#121212",
  purple: { grad: "linear-gradient(100deg, #4B0CA6 0%, #7A1CCB 58%, #9E3BFF 114%)", gradLight: "linear-gradient(100deg, rgba(75,12,166,0.1) 0%, rgba(122,28,203,0.1) 58%, rgba(158,59,255,0.1) 114%)", gradBg: "linear-gradient(100deg, rgba(75,12,166,0.05) 0%, rgba(122,28,203,0.05) 58%, rgba(158,59,255,0.05) 114%)", shadow: "0px 0px 17px rgba(80,14,170,0.15)", shadowLight: "0px 0px 17px rgba(80,14,170,0.1)" },
};

function GradientText({ children, style = {} }) {
  return <span style={{ backgroundImage: C.purple.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", ...style }}>{children}</span>;
}
function PrimaryButton({ children, large }) {
  return <button style={{ backgroundImage: C.purple.grad, boxShadow: C.purple.shadow, borderRadius: 6, padding: large ? "14px 28px" : "12px 18px", border: "none", color: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: large ? 18 : 16, cursor: "pointer" }}>{children}</button>;
}
function SecondaryButton({ children }) {
  return <button style={{ backgroundImage: C.purple.gradLight, boxShadow: C.purple.shadowLight, borderRadius: 6, padding: "12px 18px", border: "none", fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer" }}><GradientText>{children}</GradientText></button>;
}
function Tag({ children }) {
  return <div style={{ position: "relative", display: "inline-flex", alignItems: "center", padding: "4px 14px", borderRadius: 100 }}><span style={{ position: "absolute", filter: "blur(6px)", fontWeight: 700, fontSize: 18, color: "rgba(69,150,242,0.8)", letterSpacing: "-.36px" }}>{children}</span><span style={{ position: "relative", fontSize: 14, color: "rgba(100,100,120,0.9)", fontWeight: 500 }}>{children}</span></div>;
}
function SectionHeader({ tag, title, subtitle }) {
  return <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>{tag && <Tag>{tag}</Tag>}<h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: 48, fontWeight: 400, color: C.black, textTransform: "uppercase", margin: 0, letterSpacing: "-.02em", lineHeight: 1.15 }}>{title}</h2>{subtitle && <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 20, color: C.black, maxWidth: 720, margin: 0, lineHeight: 1.5, opacity: .7 }}>{subtitle}</p>}</div>;
}
function Check({ children, color = "#7A1CCB" }) {
  return <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><rect x="2" y="2" width="20" height="20" rx="4" stroke={color} strokeWidth="1.5" /><path d="M8 12.5L11 15.5L16 9.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 15, color: "rgba(0,0,0,0.6)", lineHeight: 1.5 }}>{children}</span></div>;
}

/* ============ EARNINGS TICKER ============ */
function EarningsTicker() {
  const [amounts, setAmounts] = useState([
    { name: "@defi_sage", amount: 342, time: "2m ago" },
    { name: "@yieldfarmer_", amount: 1205, time: "8m ago" },
    { name: "@cryptoalpha", amount: 89, time: "12m ago" },
    { name: "@onchain_dan", amount: 567, time: "18m ago" },
    { name: "@ethmaxi", amount: 2340, time: "25m ago" },
  ]);
  return (
    <div style={{ display: "flex", gap: 10, overflow: "hidden" }}>
      {amounts.map((a, i) => (
        <div key={i} style={{ padding: "8px 14px", background: "#fff", borderRadius: 8, border: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, backgroundImage: C.purple.grad, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>{a.name.slice(1, 3).toUpperCase()}</span>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#1a9d3f" }}>+${a.amount.toLocaleString()}</div>
            <div style={{ fontSize: 10, color: "rgba(0,0,0,0.3)" }}>{a.name} · {a.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============ KOL LANDING PAGE MOCKUP ============ */
function KolPageMockup() {
  return (
    <div style={{ width: 320, background: "#fff", borderRadius: 16, boxShadow: "0 16px 48px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)", overflow: "hidden", fontFamily: "'Inter',sans-serif" }}>
      {/* Profile header */}
      <div style={{ padding: "24px 20px 16px", textAlign: "center", backgroundImage: C.purple.gradBg }}>
        <div style={{ width: 56, height: 56, borderRadius: 28, backgroundImage: C.purple.grad, margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>🎯</span>
        </div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>@defi_sage</div>
        <div style={{ fontSize: 12, color: "rgba(0,0,0,0.4)", marginTop: 2 }}>DeFi analyst · 45K followers</div>
        <p style={{ fontSize: 13, color: "rgba(0,0,0,0.5)", margin: "10px 0 0", lineHeight: 1.5 }}>These are my personally vetted yield strategies. I use them myself.</p>
      </div>
      {/* Stats */}
      <div style={{ display: "flex", borderTop: "1px solid rgba(0,0,0,0.04)", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
        {[{ n: "$1.2M", l: "AUM Referred" }, { n: "847", l: "Depositors" }, { n: "12.4%", l: "Avg APY" }].map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRight: i < 2 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#7A1CCB" }}>{s.n}</div>
            <div style={{ fontSize: 9, color: "rgba(0,0,0,0.35)" }}>{s.l}</div>
          </div>
        ))}
      </div>
      {/* Picks */}
      <div style={{ padding: "12px 16px" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(0,0,0,0.3)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 8 }}>My Top Picks</div>
        {[
          { name: "USDC Lending Optimizer", apy: "12.4%", risk: "Low", riskColor: "#1a9d3f" },
          { name: "ETH Staking Yield", apy: "8.7%", risk: "Low", riskColor: "#1a9d3f" },
          { name: "Stablecoin Compounder", apy: "18.2%", risk: "Med", riskColor: "#b8960a" },
        ].map((v, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{v.name}</div>
              <span style={{ fontSize: 10, padding: "1px 5px", borderRadius: 3, background: v.riskColor + "12", color: v.riskColor }}>{v.risk}</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#7A1CCB" }}>{v.apy}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "8px 16px 16px" }}>
        <button style={{ width: "100%", padding: "11px", borderRadius: 10, backgroundImage: C.purple.grad, border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>Deposit Now</button>
        <div style={{ textAlign: "center", fontSize: 10, color: "rgba(0,0,0,0.25)", marginTop: 5 }}>Powered by Yieldo</div>
      </div>
    </div>
  );
}

/* ============ DASHBOARD PREVIEW ============ */
function DashboardPreview() {
  const data = [3, 5, 4, 8, 7, 12, 10, 18, 15, 22, 19, 28];
  const max = Math.max(...data) * 1.1; const min = 0;
  const w = 360; const h = 100;
  const pts = data.map((v, i) => ({ x: (i / (data.length - 1)) * w, y: h - ((v - min) / (max - min)) * (h - 8) - 4 }));
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaD = `${pathD} L${pts.at(-1).x},${h} L${pts[0].x},${h} Z`;
  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(0,0,0,0.3)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 8 }}>Your Earnings</div>
        <div style={{ display: "flex", gap: 24 }}>
          {[{ n: "$4,231", l: "This month", c: "#1a9d3f" }, { n: "$28,940", l: "All time", c: "#7A1CCB" }, { n: "1,847", l: "Depositors", c: "#2E9AB8" }].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.c }}>{s.n}</div>
              <div style={{ fontSize: 11, color: "rgba(0,0,0,0.35)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "12px 20px" }}>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
          <defs><linearGradient id="dp-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#45f265" stopOpacity=".15" /><stop offset="100%" stopColor="#45f265" stopOpacity="0" /></linearGradient></defs>
          <path d={areaD} fill="url(#dp-grad)" />
          <path d={pathD} fill="none" stroke="#1a9d3f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={pts.at(-1).x} cy={pts.at(-1).y} r="4" fill="#1a9d3f" />
        </svg>
      </div>
    </div>
  );
}

/* ============ EARNINGS CALCULATOR ============ */
function EarningsCalc() {
  const [followers, setFollowers] = useState(25000);
  const [convRate, setConvRate] = useState(2);
  const [avgDeposit, setAvgDeposit] = useState(1500);

  const depositors = Math.floor(followers * (convRate / 100));
  const volume = depositors * avgDeposit;
  const baseEarning = volume * 0.0005;
  const campaignBonus = baseEarning * 0.4;
  const total = baseEarning + campaignBonus;

  const fmt = (n) => n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `$${(n / 1e3).toFixed(1)}K` : `$${n.toFixed(0)}`;

  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(122,28,203,0.1)", overflow: "hidden", boxShadow: "0 4px 20px rgba(122,28,203,0.06)" }}>
      <div style={{ padding: "18px 24px", backgroundImage: C.purple.gradBg, borderBottom: "1px solid rgba(122,28,203,0.08)" }}>
        <div style={{ fontSize: 16, fontWeight: 600 }}>Earnings Calculator</div>
        <div style={{ fontSize: 13, color: "rgba(0,0,0,0.45)", marginTop: 2 }}>Estimate your monthly revenue from referrals</div>
      </div>
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { label: "Your Audience Size", value: followers, set: setFollowers, min: 1000, max: 500000, step: 1000, fmt: v => v.toLocaleString(), color: "#7A1CCB" },
          { label: "Conversion Rate", value: convRate, set: setConvRate, min: 0.5, max: 10, step: 0.5, fmt: v => `${v}%`, color: "#2E9AB8" },
          { label: "Avg. Deposit", value: avgDeposit, set: setAvgDeposit, min: 100, max: 25000, step: 100, fmt: v => `$${v.toLocaleString()}`, color: "#1a9d3f" },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: "rgba(0,0,0,0.5)" }}>{s.label}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: s.color }}>{s.fmt(s.value)}</span>
            </div>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.value} onChange={e => s.set(+e.target.value)} style={{ width: "100%", accentColor: s.color, height: 4 }} />
          </div>
        ))}
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div style={{ textAlign: "center", padding: 12, background: "rgba(122,28,203,0.04)", borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: "rgba(0,0,0,0.4)" }}>Monthly Depositors</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#7A1CCB" }}>{depositors.toLocaleString()}</div>
            </div>
            <div style={{ textAlign: "center", padding: 12, background: "rgba(26,157,63,0.05)", borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: "rgba(0,0,0,0.4)" }}>Monthly Volume</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#1a9d3f" }}>{fmt(volume)}</div>
            </div>
          </div>
          <div style={{ textAlign: "center", padding: 16, background: "rgba(122,28,203,0.04)", borderRadius: 10, border: "1px solid rgba(122,28,203,0.1)" }}>
            <div style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", marginBottom: 2 }}>Estimated Monthly Earnings</div>
            <div style={{ fontSize: 32, fontWeight: 700 }}><GradientText>{fmt(total)}</GradientText></div>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 6, fontSize: 11, color: "rgba(0,0,0,0.35)" }}>
              <span>Base: {fmt(baseEarning)}</span>
              <span>+</span>
              <span style={{ color: "#1a9d3f" }}>Campaign bonuses: ~{fmt(campaignBonus)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ MAIN PAGE ============ */
export default function ForKOLsPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: "#fff", color: C.black, overflowX: "hidden" }}>
      {/* NAV */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px clamp(20px, 5vw, 260px)", position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, flexWrap: "wrap", gap: "12px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "inherit", cursor: "pointer" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, backgroundImage: C.purple.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Y</span></div>
          <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: ".05em" }}>YIELDO</span>
        </Link>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link to="/wallet" style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.6)", cursor: "pointer", textDecoration: "none" }}>For Wallets</Link>
          <Link to="/vault" style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.6)", cursor: "pointer", textDecoration: "none" }}>For Vaults</Link>
          <Link to="/creator" style={{ padding: "8px 18px", fontSize: 15, fontWeight: 600, borderBottom: "2px solid #7A1CCB", cursor: "pointer", textDecoration: "none" }}>For Creators</Link>
          <span style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.3)", cursor: "not-allowed", opacity: 0.5 }}>Docs</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <SecondaryButton>Dashboard</SecondaryButton>
          <PrimaryButton>Apply Now</PrimaryButton>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "120px clamp(20px, 5vw, 260px) 60px", position: "relative", overflow: "hidden", marginTop: "80px" }}>
        <div style={{ position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)", width: 1600, height: 900, background: "radial-gradient(ellipse at center, rgba(212,205,255,0.3) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "flex", gap: 60, alignItems: "center" }}>
          <div style={{ flex: "1.2 1 0" }}>
            <Tag>For DeFi Creators & KOLs</Tag>
            <h1 style={{ fontSize: 58, fontWeight: 400, textTransform: "uppercase", lineHeight: 1.1, margin: "20px 0 0", letterSpacing: "-.02em" }}>
              Your audience trusts you.<br /><GradientText style={{ fontSize: 58 }}>Now get paid for it.</GradientText>
            </h1>
            <p style={{ fontSize: 20, maxWidth: 560, margin: "24px 0 0", lineHeight: 1.6, color: "rgba(0,0,0,0.55)" }}>
              Share your curated yield picks with a personal referral page. Earn revenue every time someone deposits. No code, no contracts, just a link.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 36 }}>
              <PrimaryButton large>Apply to Join</PrimaryButton>
              <SecondaryButton>See How It Works →</SecondaryButton>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
              {[{ n: "$2.4M+", l: "Earned by KOLs" }, { n: "180+", l: "Active creators" }, { n: "< 5 min", l: "Setup time" }].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: 24, fontWeight: 600 }}><GradientText>{s.n}</GradientText></div>
                  <div style={{ fontSize: 13, color: "rgba(0,0,0,0.4)", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: "0 0 auto" }}>
            <KolPageMockup />
          </div>
        </div>
      </section>

      {/* LIVE TICKER */}
      <section style={{ padding: "40px clamp(20px, 5vw, 260px)", background: "rgba(26,157,63,0.03)", borderTop: "1px solid rgba(26,157,63,0.08)", borderBottom: "1px solid rgba(26,157,63,0.08)" }}>
        <div style={{ textAlign: "center", fontSize: 12, fontWeight: 500, color: "rgba(0,0,0,0.3)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 14 }}>Creators earning right now</div>
        <EarningsTicker />
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)" }}>
        <SectionHeader tag="How It Works" title="Three steps to start earning" subtitle="No SDK. No smart contracts. No code. Just pick vaults, share your link, and earn." />
        <div style={{ display: "flex", gap: 24, marginTop: 56 }}>
          {[
            { step: "01", icon: "🎨", title: "Build your page", desc: "Pick your favorite vaults from the Yieldo catalog. Add your bio, branding, and commentary. Your personal yield page is live in minutes.", details: ["Choose from 100+ curated vaults", "Add your own risk commentary", "Custom URL: yieldo.io/@yourname", "Mobile-optimized automatically"] },
            { step: "02", icon: "📣", title: "Share your link", desc: "Post your Yieldo page on Twitter, YouTube, Discord, newsletter — anywhere you already have an audience. Every click is tracked.", details: ["One link for all platforms", "Per-vault deep links available", "UTM tracking for campaigns", "QR code for IRL events"] },
            { step: "03", icon: "💰", title: "Earn revenue", desc: "Every deposit through your page earns you a base revenue share plus campaign bonuses from vault curators who want your audience.", details: ["5 bps base on all volume", "Campaign bonuses up to 20%+", "Real-time earnings dashboard", "Monthly payouts in USDC"] },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: 28, borderRadius: 14, background: "#fff", border: `1px solid ${activeStep === i ? "rgba(122,28,203,0.15)" : "rgba(0,0,0,0.06)"}`, boxShadow: activeStep === i ? "0 4px 20px rgba(122,28,203,0.06)" : "0 1px 4px rgba(0,0,0,0.02)", cursor: "default", transition: "all .2s" }} onMouseEnter={() => setActiveStep(i)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, backgroundImage: C.purple.grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
                <span style={{ fontSize: 36, fontWeight: 200, color: "rgba(122,28,203,0.15)" }}>{s.step}</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 8px" }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(0,0,0,0.5)", lineHeight: 1.6, margin: "0 0 16px" }}>{s.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {s.details.map((d, j) => <Check key={j}>{d}</Check>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* YOUR PERSONAL YIELD PAGE */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)", background: "rgba(122,28,203,0.015)" }}>
        <div style={{ display: "flex", gap: 56, alignItems: "center" }}>
          <div style={{ flex: "1 1 0" }}>
            <Tag>Your Brand</Tag>
            <h2 style={{ fontSize: 48, fontWeight: 400, textTransform: "uppercase", margin: "16px 0 0", letterSpacing: "-.02em", lineHeight: 1.15 }}>A yield page<br />that's uniquely yours</h2>
            <p style={{ fontSize: 18, color: "rgba(0,0,0,0.55)", margin: "20px 0 0", lineHeight: 1.6, maxWidth: 480 }}>
              Your personal Yieldo page showcases your curated vault picks with your bio, commentary, and track record. It's your reputation — on-chain.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 28 }}>
              <Check>Custom URL — yieldo.io/@yourname</Check>
              <Check>Profile with avatar, bio, and social links</Check>
              <Check>Hand-picked vault selection with your commentary</Check>
              <Check>Live stats: AUM referred, depositors, avg. APY</Check>
              <Check>Performance track record visible to your audience</Check>
              <Check>Mobile-first design, works everywhere</Check>
            </div>
          </div>
          <div style={{ flex: "0 0 auto" }}>
            <KolPageMockup />
          </div>
        </div>
      </section>

      {/* EARNINGS */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)" }}>
        <div style={{ display: "flex", gap: 56, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 0" }}>
            <Tag>Earnings</Tag>
            <h2 style={{ fontSize: 48, fontWeight: 400, textTransform: "uppercase", margin: "16px 0 0", letterSpacing: "-.02em", lineHeight: 1.15 }}>Real revenue,<br />not empty promises</h2>
            <p style={{ fontSize: 18, color: "rgba(0,0,0,0.55)", margin: "20px 0 0", lineHeight: 1.6, maxWidth: 480 }}>
              You earn a base 5 bps on every deposit through your referral link. But it gets better — vault curators run campaigns offering you 10–25% bonus rev share to incentivize your promotion.
            </p>
            <div style={{ marginTop: 28 }}>
              <DashboardPreview />
            </div>
          </div>
          <div style={{ flex: "1 1 0" }}>
            <EarningsCalc />
          </div>
        </div>
      </section>

      {/* WHY YIELDO > DIRECT DEALS */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)", background: "rgba(122,28,203,0.015)" }}>
        <SectionHeader tag="Why Yieldo?" title="Better than direct protocol deals" subtitle="No more DM'ing BD teams, negotiating one-offs, or chasing invoices." />
        <div style={{ display: "flex", gap: 20, marginTop: 48 }}>
          {[
            { icon: "🎯", title: "One dashboard, all protocols", desc: "Instead of separate deals with 10 protocols, access 100+ vaults through one platform. One referral page, one earnings stream." },
            { icon: "📊", title: "Transparent attribution", desc: "Every click, deposit, and withdrawal tracked on-chain. No disputes about who referred what. Your earnings are auditable." },
            { icon: "💸", title: "Stacking revenue streams", desc: "Base rev share from Yieldo PLUS campaign bonuses from vault curators. Multiple vaults = multiple income streams from one link." },
            { icon: "🛡️", title: "Curated, not risky", desc: "Only promote vaults that pass Yieldo's screening with aggregated risk scores. Protect your reputation — we filter the noise." },
            { icon: "⚡", title: "No negotiation needed", desc: "Standard rev share terms. No back-and-forth with BD teams. Apply once, start earning immediately from all vaults." },
            { icon: "🔄", title: "Recurring, not one-time", desc: "Unlike sponsored posts (one-time fee), you earn continuously as long as deposits stay. Sticky capital = recurring revenue." },
          ].map((item, i) => (
            <div key={i} style={{ flex: 1, padding: 24, borderRadius: 12, background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.02)" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 6px" }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: "rgba(0,0,0,0.5)", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ padding: "80px clamp(20px, 5vw, 260px)" }}>
        <SectionHeader tag="Comparison" title="Yieldo vs. the alternatives" />
        <div style={{ marginTop: 48, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", background: "#fff" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", background: "rgba(122,28,203,0.03)" }}>
            <div style={{ padding: "14px 24px" }} />
            <div style={{ padding: "14px 18px", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em", textAlign: "center" }}><GradientText>Yieldo Referrals</GradientText></div>
            <div style={{ padding: "14px 18px", fontSize: 13, fontWeight: 600, color: "rgba(0,0,0,0.35)", textTransform: "uppercase", letterSpacing: ".05em", textAlign: "center" }}>Sponsored Posts</div>
            <div style={{ padding: "14px 18px", fontSize: 13, fontWeight: 600, color: "rgba(0,0,0,0.35)", textTransform: "uppercase", letterSpacing: ".05em", textAlign: "center" }}>Direct Deals</div>
          </div>
          {[
            ["Revenue model", "Recurring (as long as AUM stays)", "One-time payment", "Custom (varies)"],
            ["Setup time", "5 minutes", "Hours of negotiation", "Days to weeks"],
            ["# of protocols", "100+ vaults", "1 per deal", "1 per deal"],
            ["Attribution", "On-chain, transparent", "None", "Trust-based"],
            ["Your reputation risk", "Low (vaults pre-screened)", "High (you vouch)", "Medium"],
            ["Revenue upside", "Unlimited (scales with AUM)", "Fixed fee", "Usually capped"],
            ["Campaign bonuses", "Up to 20%+ from curators", "N/A", "Rare"],
          ].map(([feat, yieldo, spon, direct], i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
              <div style={{ padding: "12px 24px", fontSize: 14, fontWeight: 500 }}>{feat}</div>
              <div style={{ padding: "12px 18px", fontSize: 14, textAlign: "center", color: "#4B0CA6", fontWeight: 500, background: "rgba(122,28,203,0.015)" }}>{yieldo}</div>
              <div style={{ padding: "12px 18px", fontSize: 14, textAlign: "center", color: "rgba(0,0,0,0.35)" }}>{spon}</div>
              <div style={{ padding: "12px 18px", fontSize: 14, textAlign: "center", color: "rgba(0,0,0,0.35)" }}>{direct}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TIERS */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)", background: "rgba(122,28,203,0.015)" }}>
        <SectionHeader tag="Creator Tiers" title="Grow your tier, grow your rate" subtitle="The more AUM you bring, the better your revenue share gets." />
        <div style={{ display: "flex", gap: 20, marginTop: 48 }}>
          {[
            { name: "Explorer", icon: "🌱", range: "< $100K AUM", base: "5 bps", bonus: "Standard campaigns", perks: ["Personal yield page", "Basic analytics", "Monthly payouts"], color: "#2E9AB8" },
            { name: "Creator", icon: "⭐", range: "$100K – $1M AUM", base: "7 bps", bonus: "Priority campaigns", perks: ["Everything in Explorer", "Advanced analytics", "Bi-weekly payouts", "Featured in vault catalog"], color: "#7A1CCB", featured: true },
            { name: "Partner", icon: "💎", range: "> $1M AUM", base: "10 bps", bonus: "Exclusive campaigns", perks: ["Everything in Creator", "Custom campaigns with vaults", "Weekly payouts", "Direct vault relationships", "Yieldo Partner badge"], color: "#d97706" },
          ].map((tier, i) => (
            <div key={i} style={{ flex: 1, borderRadius: 14, background: "#fff", border: `${tier.featured ? "2" : "1"}px solid ${tier.featured ? tier.color + "30" : "rgba(0,0,0,0.06)"}`, overflow: "hidden", boxShadow: tier.featured ? `0 4px 24px ${tier.color}12` : "0 1px 4px rgba(0,0,0,0.02)" }}>
              {tier.featured && <div style={{ padding: "6px", textAlign: "center", backgroundImage: C.purple.grad, color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: ".05em" }}>MOST POPULAR</div>}
              <div style={{ padding: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 32 }}>{tier.icon}</span>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 600, color: tier.color }}>{tier.name}</div>
                    <div style={{ fontSize: 13, color: "rgba(0,0,0,0.4)" }}>{tier.range}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 16, marginBottom: 20, padding: "14px 0", borderTop: "1px solid rgba(0,0,0,0.05)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <div>
                    <div style={{ fontSize: 10, color: "rgba(0,0,0,0.35)", textTransform: "uppercase" }}>Base Rate</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: tier.color }}>{tier.base}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "rgba(0,0,0,0.35)", textTransform: "uppercase" }}>Campaigns</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "rgba(0,0,0,0.6)" }}>{tier.bonus}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {tier.perks.map((p, j) => <Check key={j} color={tier.color}>{p}</Check>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)" }}>
        <SectionHeader tag="Creators" title="Hear from our creators" />
        <div style={{ display: "flex", gap: 20, marginTop: 48 }}>
          {[
            { name: "@defi_sage", followers: "45K", earned: "$28K+", quote: "I went from getting $500 per sponsored post to earning $4K/month passively. The yield page is basically my portfolio — except it pays me.", avatar: "DS" },
            { name: "@yieldfarmer_", followers: "120K", earned: "$94K+", quote: "I was already recommending vaults in my newsletter. Now I just link to my Yieldo page and the revenue tracks automatically. Best decision I made.", avatar: "YF" },
            { name: "@onchain_dan", followers: "22K", earned: "$11K+", quote: "Even with a smaller audience, the conversion rate is insane because people trust my picks. Quality over quantity — Yieldo rewards that.", avatar: "OD" },
          ].map((t, i) => (
            <div key={i} style={{ flex: 1, padding: 28, borderRadius: 14, background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.02)" }}>
              <div style={{ fontSize: 30, marginBottom: 12, color: "rgba(122,28,203,0.2)" }}>"</div>
              <p style={{ fontSize: 15, color: "rgba(0,0,0,0.6)", lineHeight: 1.6, margin: "0 0 20px", fontStyle: "italic" }}>{t.quote}</p>
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.04)", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 18, backgroundImage: C.purple.grad, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: 11 }}>{t.avatar}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(0,0,0,0.35)" }}>{t.followers} followers</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#1a9d3f" }}>{t.earned}</div>
                  <div style={{ fontSize: 10, color: "rgba(0,0,0,0.3)" }}>earned</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px clamp(20px, 5vw, 260px)", background: "rgba(122,28,203,0.015)" }}>
        <SectionHeader tag="FAQ" title="Common questions" />
        <div style={{ maxWidth: 680, margin: "48px auto 0", display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { q: "Do I need any technical skills?", a: "None. You pick vaults from a visual catalog, customize your page, and share a link. Everything else is handled." },
            { q: "How do I get paid?", a: "Monthly payouts in USDC to your wallet. Creator tier and above get bi-weekly or weekly payouts." },
            { q: "What if a vault I recommend loses money?", a: "You're sharing data-backed opportunities, not giving financial advice. All vaults include risk scores. Your page includes a standard disclaimer." },
            { q: "Can I promote specific vaults over others?", a: "Yes — you curate which vaults appear on your page and in what order. You can also add commentary explaining your reasoning." },
            { q: "Is there an application process?", a: "Yes, a brief review to ensure quality. We look for genuine DeFi expertise, not follower count. Smaller creators with engaged audiences are welcome." },
          ].map((faq, i) => (
            <div key={i} style={{ padding: "18px 24px", background: "#fff", borderRadius: 10, border: "1px solid rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{faq.q}</div>
              <div style={{ fontSize: 14, color: "rgba(0,0,0,0.5)", lineHeight: 1.6 }}>{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px clamp(20px, 5vw, 260px) 100px" }}>
        <div style={{ borderRadius: 16, padding: "80px", textAlign: "center", position: "relative", overflow: "hidden", backgroundImage: C.purple.gradBg, boxShadow: "0 0 47px rgba(69,199,242,0.1)" }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 300, background: "radial-gradient(ellipse at center bottom, rgba(141,31,249,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <Tag>Join the Network</Tag>
            <h2 style={{ fontSize: 56, fontWeight: 400, textTransform: "uppercase", margin: "16px 0 20px", lineHeight: 1.15, letterSpacing: "-.02em" }}>
              Your audience is waiting.<br />Start earning today.
            </h2>
            <p style={{ fontSize: 18, color: "rgba(0,0,0,0.5)", maxWidth: 620, margin: "0 auto 32px", lineHeight: 1.6 }}>
              Apply in 2 minutes. Get your personal yield page. Share your link. Earn recurring revenue from every deposit.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <PrimaryButton large>Apply to Join</PrimaryButton>
              <SecondaryButton>View Example Page →</SecondaryButton>
            </div>
            <p style={{ fontSize: 13, color: "rgba(0,0,0,0.35)", marginTop: 16 }}>Free to join · No minimum followers · Payouts from day one</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "48px clamp(20px, 5vw, 260px)", backgroundImage: C.purple.gradBg, display: "flex", flexDirection: "column", gap: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, backgroundImage: C.purple.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 700, fontSize: 12 }}>Y</span></div>
              <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: ".05em" }}>YIELDO</span>
            </div>
            <p style={{ fontSize: 15, color: "rgba(0,0,0,0.45)", maxWidth: 400, lineHeight: 1.5 }}>The intelligent distribution layer for on-chain yield.</p>
          </div>
          <div style={{ display: "flex", gap: 32, fontSize: 15, color: "rgba(0,0,0,0.45)" }}>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>For Wallets</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>For Vaults</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>For Creators</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 13, color: "rgba(0,0,0,0.35)", margin: 0 }}>© 2025 YIELDO — All rights reserved</p>
          <div style={{ display: "flex", gap: 8 }}>
            {["𝕏", "✈", "▶"].map((icon, i) => (
              <div key={i} style={{ width: 36, height: 36, borderRadius: 4, backgroundImage: C.purple.gradLight, boxShadow: C.purple.shadowLight, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: "rgba(0,0,0,0.45)" }}>{icon}</div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
