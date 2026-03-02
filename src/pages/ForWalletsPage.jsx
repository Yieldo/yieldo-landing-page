import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const C = {
  black: "#121212",
  purple: { grad: "linear-gradient(100deg, #4B0CA6 0%, #7A1CCB 58%, #9E3BFF 114%)", gradLight: "linear-gradient(100deg, rgba(75,12,166,0.1) 0%, rgba(122,28,203,0.1) 58%, rgba(158,59,255,0.1) 114%)", gradBg: "linear-gradient(100deg, rgba(75,12,166,0.05) 0%, rgba(122,28,203,0.05) 58%, rgba(158,59,255,0.05) 114%)", shadow: "0px 0px 17px rgba(80,14,170,0.15)", shadowLight: "0px 0px 17px rgba(80,14,170,0.1)" },
};

function GradientText({ children, style = {} }) {
  return <span style={{ backgroundImage: C.purple.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", ...style }}>{children}</span>;
}
function PrimaryButton({ children, large, onClick }) {
  return <button onClick={onClick} style={{ backgroundImage: C.purple.grad, boxShadow: C.purple.shadow, borderRadius: 6, padding: large ? "14px 28px" : "12px 18px", border: "none", color: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: large ? 18 : 16, cursor: "pointer" }}>{children}</button>;
}
function SecondaryButton({ children, onClick }) {
  return <button onClick={onClick} style={{ backgroundImage: C.purple.gradLight, boxShadow: C.purple.shadowLight, borderRadius: 6, padding: "12px 18px", border: "none", fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer" }}><GradientText>{children}</GradientText></button>;
}
function Tag({ children }) {
  return <div style={{ position: "relative", display: "inline-flex", alignItems: "center", padding: "4px 14px", borderRadius: 100 }}><span style={{ position: "absolute", filter: "blur(6px)", fontWeight: 700, fontSize: 18, color: "rgba(69,150,242,0.8)", letterSpacing: "-.36px" }}>{children}</span><span style={{ position: "relative", fontSize: 14, color: "rgba(100,100,120,0.9)", fontWeight: 500 }}>{children}</span></div>;
}
function SectionHeader({ tag, title, subtitle }) {
  return <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>{tag && <Tag>{tag}</Tag>}<h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: 48, fontWeight: 400, color: C.black, textTransform: "uppercase", margin: 0, letterSpacing: "-.02em", lineHeight: 1.15 }}>{title}</h2>{subtitle && <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 20, color: C.black, maxWidth: 720, margin: 0, lineHeight: 1.5, opacity: .7 }}>{subtitle}</p>}</div>;
}
function Check({ children }) {
  return <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><rect x="2" y="2" width="20" height="20" rx="4" stroke="#7A1CCB" strokeWidth="1.5" /><path d="M8 12.5L11 15.5L16 9.5" stroke="#7A1CCB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 15, color: "rgba(0,0,0,0.6)", lineHeight: 1.5 }}>{children}</span></div>;
}

/* ========== DATA ========== */
const WALLETS = [
  { id: "phantom", name: "Phantom", accent: "#AB9FF2", icon: "👻", bg: "#f8f7ff" },
  { id: "nightly", name: "Nightly", accent: "#1a1a2e", icon: "🌙", bg: "#f5f4f9" },
  { id: "metamask", name: "MetaMask", accent: "#F6851B", icon: "🦊", bg: "#fffaf5" },
  { id: "generic", name: "Your Wallet", accent: "#7A1CCB", icon: "👛", bg: "#f8f7fc" },
];
const VAULTS = [
  { name: "USDC Lending Optimizer", protocol: "Morpho + Aave", apy: "12.4%", risk: "Low", riskColor: "#1a9d3f", tvl: "$4.2M", icon: "💵" },
  { name: "ETH Staking Yield", protocol: "Lido + Pendle", apy: "8.7%", risk: "Low", riskColor: "#1a9d3f", tvl: "$1.8M", icon: "⟠" },
  { name: "Stablecoin Compounder", protocol: "Yearn + Morpho", apy: "18.2%", risk: "Medium", riskColor: "#b8960a", tvl: "$920K", icon: "🔄" },
  { name: "DAI Savings Plus", protocol: "Spark + Morpho", apy: "9.8%", risk: "Low", riskColor: "#1a9d3f", tvl: "$1.1M", icon: "◆" },
];

/* ========== INTERACTIVE PHONE ========== */
function PhoneShell({ wallet, children }) {
  return (
    <div style={{ width: 340, background: wallet.bg, borderRadius: 28, boxShadow: "0 24px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)", overflow: "hidden", fontFamily: "'Inter',sans-serif", flexShrink: 0 }}>
      <div style={{ padding: "8px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "rgba(0,0,0,0.4)" }}><span style={{ fontWeight: 600 }}>9:41</span><div style={{ display: "flex", gap: 4, fontSize: 10 }}><span>📶</span><span>🔋</span></div></div>
      <div style={{ padding: "8px 18px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: wallet.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{wallet.icon}</div>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{wallet.name}</span>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}><span style={{ fontSize: 10, color: "rgba(0,0,0,0.3)" }}>0xAb3...f12</span><div style={{ width: 6, height: 6, borderRadius: 3, background: "#45f265" }} /></div>
      </div>
      <div style={{ padding: "10px 18px 8px", textAlign: "center" }}>
        <div style={{ fontSize: 10, color: "rgba(0,0,0,0.35)" }}>Total Balance</div>
        <div style={{ fontSize: 26, fontWeight: 700, marginTop: 1 }}>$24,831.42</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 8 }}>
          {["Send", "Receive", "Swap"].map(a => (
            <div key={a} style={{ textAlign: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: 16, background: "rgba(0,0,0,0.04)", margin: "0 auto 2px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{a === "Send" ? "↑" : a === "Receive" ? "↓" : "⇄"}</div>
              <div style={{ fontSize: 9, color: "rgba(0,0,0,0.35)" }}>{a}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 0, padding: "0 18px", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        {["Tokens", "NFTs", "Yield"].map((t, i) => (
          <div key={t} style={{ padding: "7px 14px", fontSize: 12, fontWeight: i === 2 ? 600 : 400, color: i === 2 ? "#7A1CCB" : "rgba(0,0,0,0.3)", borderBottom: i === 2 ? "2px solid #7A1CCB" : "2px solid transparent" }}>{t}</div>
        ))}
      </div>
      {children}
      <div style={{ display: "flex", justifyContent: "space-around", padding: "8px 0 14px", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
        {["🏠", "🔄", "📊", "⚙️"].map((ico, i) => <div key={i} style={{ fontSize: 14, color: "rgba(0,0,0,0.25)" }}>{ico}</div>)}
      </div>
    </div>
  );
}

function YieldTabContent({ selectedVault, setSelectedVault, depositScreen, setDepositScreen }) {
  if (depositScreen !== null) {
    const v = VAULTS[depositScreen];
    return (
      <div style={{ padding: "14px 18px", fontFamily: "'Inter',sans-serif" }}>
        <button onClick={() => setDepositScreen(null)} style={{ background: "none", border: "none", fontSize: 12, color: "rgba(0,0,0,0.4)", cursor: "pointer", fontFamily: "'Inter',sans-serif", padding: 0, marginBottom: 10 }}>← Back</button>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 24, marginBottom: 4 }}>{v.icon}</div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{v.name}</div>
          <div style={{ fontSize: 11, color: "rgba(0,0,0,0.35)", marginTop: 2 }}>{v.protocol}</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 6 }}>
            <span style={{ padding: "2px 6px", borderRadius: 4, background: v.riskColor + "12", color: v.riskColor, fontSize: 10, fontWeight: 500 }}>{v.risk} Risk</span>
            <span style={{ padding: "2px 6px", borderRadius: 4, background: "rgba(0,0,0,0.03)", color: "rgba(0,0,0,0.4)", fontSize: 10 }}>TVL {v.tvl}</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, padding: "10px 0", marginBottom: 12, borderTop: "1px solid rgba(0,0,0,0.05)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 20, fontWeight: 700, color: "#7A1CCB" }}>{v.apy}</div><div style={{ fontSize: 9, color: "rgba(0,0,0,0.3)" }}>Current APY</div></div>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 20, fontWeight: 700, color: "#2E9AB8" }}>7d</div><div style={{ fontSize: 9, color: "rgba(0,0,0,0.3)" }}>Lock Period</div></div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 10, color: "rgba(0,0,0,0.4)", fontWeight: 600, display: "block", marginBottom: 3 }}>Amount</label>
          <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 10, padding: "8px 12px", background: "rgba(0,0,0,0.015)" }}>
            <input type="text" defaultValue="1,000" style={{ border: "none", background: "transparent", fontSize: 18, fontWeight: 700, outline: "none", flex: 1, fontFamily: "'Inter',sans-serif", color: "#121212", width: "100%" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 3, padding: "3px 6px", background: "rgba(0,0,0,0.04)", borderRadius: 5 }}>
              <span style={{ fontSize: 11 }}>💵</span><span style={{ fontSize: 12, fontWeight: 600 }}>USDC</span><span style={{ fontSize: 9, color: "rgba(0,0,0,0.3)" }}>▼</span>
            </div>
          </div>
          <div style={{ fontSize: 10, color: "rgba(0,0,0,0.3)", marginTop: 3, textAlign: "right" }}>Balance: 24,831 USDC</div>
        </div>
        <div style={{ padding: 10, background: "rgba(26,157,63,0.04)", borderRadius: 8, marginBottom: 12, fontSize: 11 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "rgba(0,0,0,0.4)" }}>Projected yearly</span><span style={{ fontWeight: 600, color: "#1a9d3f" }}>$124.00</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}><span style={{ color: "rgba(0,0,0,0.4)" }}>Network fee</span><span style={{ color: "rgba(0,0,0,0.4)" }}>~$0.42</span></div>
        </div>
        <button style={{ width: "100%", padding: "12px", borderRadius: 12, backgroundImage: C.purple.grad, border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif", boxShadow: C.purple.shadow }}>Confirm Deposit</button>
        <div style={{ textAlign: "center", fontSize: 9, color: "rgba(0,0,0,0.2)", marginTop: 5 }}>Powered by Yieldo · Your wallet earns revenue</div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter',sans-serif" }}>
      <div style={{ padding: "0 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, paddingTop: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(0,0,0,0.35)", textTransform: "uppercase", letterSpacing: ".04em" }}>Yield Opportunities</span>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, backgroundImage: C.purple.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 6, fontWeight: 700 }}>Y</span></div>
            <span style={{ fontSize: 9, color: "rgba(0,0,0,0.2)" }}>Yieldo</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
          {["All", "Stablecoin", "ETH", "Low Risk"].map((f, i) => (
            <span key={f} style={{ padding: "3px 8px", borderRadius: 20, fontSize: 10, fontWeight: i === 0 ? 600 : 400, background: i === 0 ? "#7A1CCB12" : "rgba(0,0,0,0.03)", color: i === 0 ? "#7A1CCB" : "rgba(0,0,0,0.35)", whiteSpace: "nowrap" }}>{f}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 8px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
        {VAULTS.map((v, i) => (
          <div key={i} onClick={() => setSelectedVault(i)} style={{
            padding: "10px 12px", borderRadius: 10, cursor: "pointer", transition: "all .15s",
            border: selectedVault === i ? "1.5px solid rgba(122,28,203,0.25)" : "1px solid rgba(0,0,0,0.05)",
            background: selectedVault === i ? "rgba(122,28,203,0.03)" : "#fff",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 3 }}>
              <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                <span style={{ fontSize: 14 }}>{v.icon}</span>
                <div><div style={{ fontSize: 12, fontWeight: 600 }}>{v.name}</div><div style={{ fontSize: 9, color: "rgba(0,0,0,0.3)" }}>{v.protocol}</div></div>
              </div>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 15, fontWeight: 700, color: "#7A1CCB" }}>{v.apy}</div><div style={{ fontSize: 8, color: "rgba(0,0,0,0.3)" }}>APY</div></div>
            </div>
            <div style={{ display: "flex", gap: 4, fontSize: 9 }}>
              <span style={{ padding: "1px 5px", borderRadius: 3, background: v.riskColor + "12", color: v.riskColor, fontWeight: 500 }}>{v.risk}</span>
              <span style={{ color: "rgba(0,0,0,0.25)" }}>TVL {v.tvl}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "4px 12px 14px" }}>
        <button onClick={() => setDepositScreen(selectedVault)} style={{ width: "100%", padding: "11px", borderRadius: 12, backgroundImage: C.purple.grad, border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif", boxShadow: C.purple.shadow }}>
          Deposit into {VAULTS[selectedVault].name.split(" ")[0]}
        </button>
        <div style={{ textAlign: "center", fontSize: 8, color: "rgba(0,0,0,0.2)", marginTop: 4 }}>You earn revenue on every deposit · Powered by Yieldo</div>
      </div>
    </div>
  );
}

/* ========== CODE SNIPPET ========== */
function CodeBlock() {
  const lines = [
    { indent: 0, code: "imp" + "ort { Yieldo } fr" + "om '@yieldo/sdk';", color: "rgba(0,0,0,0.4)" },
    { indent: 0, code: "", color: "transparent" },
    { indent: 0, code: "const yieldo = new Yieldo({", color: "#121212" },
    { indent: 1, code: "apiKey: 'yd_live_...',", color: "#7A1CCB" },
    { indent: 1, code: "partnerId: 'phantom',", color: "#7A1CCB" },
    { indent: 0, code: "});", color: "#121212" },
    { indent: 0, code: "", color: "transparent" },
    { indent: 0, code: "// Get curated vaults for your users", color: "rgba(0,0,0,0.3)" },
    { indent: 0, code: "const vaults = await yieldo.getVaults({", color: "#121212" },
    { indent: 1, code: "chain: 'ethereum',", color: "#2E9AB8" },
    { indent: 1, code: "riskMax: 'medium',", color: "#2E9AB8" },
    { indent: 1, code: "sortBy: 'apy',", color: "#2E9AB8" },
    { indent: 0, code: "});", color: "#121212" },
    { indent: 0, code: "", color: "transparent" },
    { indent: 0, code: "// Deposit — revenue share auto-tracked", color: "rgba(0,0,0,0.3)" },
    { indent: 0, code: "const tx = await yieldo.deposit({", color: "#121212" },
    { indent: 1, code: "vaultId: vaults[0].id,", color: "#1a9d3f" },
    { indent: 1, code: "amount: '10000',", color: "#1a9d3f" },
    { indent: 1, code: "token: 'USDC',", color: "#1a9d3f" },
    { indent: 1, code: "userAddress: wallet.address,", color: "#1a9d3f" },
    { indent: 0, code: "});", color: "#121212" },
  ];
  return (
    <div style={{ background: "#faf9fe", borderRadius: 12, border: "1px solid rgba(122,28,203,0.1)", overflow: "hidden", fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 13, lineHeight: 1.7 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", borderBottom: "1px solid rgba(0,0,0,0.04)", background: "rgba(122,28,203,0.03)" }}>
        <div style={{ display: "flex", gap: 6 }}>{[0, 1, 2].map(i => <div key={i} style={{ width: 10, height: 10, borderRadius: 5, background: "rgba(0,0,0,0.08)" }} />)}</div>
        <span style={{ fontSize: 11, color: "rgba(0,0,0,0.3)", fontFamily: "'Inter',sans-serif" }}>integration.ts</span>
      </div>
      <div style={{ padding: "16px 20px" }}>
        {lines.map((l, i) => <div key={i} style={{ paddingLeft: l.indent * 20, color: l.color, minHeight: l.code ? "auto" : 12 }}>{l.code}</div>)}
      </div>
    </div>
  );
}

/* ========== REVENUE CALCULATOR ========== */
function RevenueCalculator() {
  const [mau, setMau] = useState(50000);
  const [adopt, setAdopt] = useState(8);
  const [avg, setAvg] = useState(2000);
  const depositors = Math.floor(mau * (adopt / 100));
  const volume = depositors * avg;
  const monthly = volume * 0.0005;
  const annual = monthly * 12;
  const fmt = (n) => n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `$${(n / 1e3).toFixed(1)}K` : `$${n.toFixed(0)}`;
  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(122,28,203,0.1)", overflow: "hidden", boxShadow: "0 4px 20px rgba(122,28,203,0.06)" }}>
      <div style={{ padding: "16px 24px", backgroundImage: C.purple.gradBg, borderBottom: "1px solid rgba(122,28,203,0.08)" }}>
        <div style={{ fontSize: 16, fontWeight: 600 }}>Revenue Calculator</div>
        <div style={{ fontSize: 13, color: "rgba(0,0,0,0.45)", marginTop: 2 }}>Estimate your monthly revenue from the Yield tab</div>
      </div>
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
        {[
          { label: "Monthly Active Users", value: mau, set: setMau, min: 1000, max: 1000000, step: 5000, fmt: v => v.toLocaleString(), color: "#7A1CCB" },
          { label: "Yield Tab Adoption", value: adopt, set: setAdopt, min: 1, max: 25, step: 1, fmt: v => `${v}%`, color: "#2E9AB8" },
          { label: "Avg Deposit Size", value: avg, set: setAvg, min: 100, max: 25000, step: 100, fmt: v => `$${v.toLocaleString()}`, color: "#1a9d3f" },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: "rgba(0,0,0,0.5)" }}>{s.label}</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.fmt(s.value)}</span>
            </div>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.value} onChange={e => s.set(+e.target.value)} style={{ width: "100%", accentColor: s.color, height: 4 }} />
          </div>
        ))}
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div style={{ textAlign: "center", padding: 14, background: "rgba(122,28,203,0.04)", borderRadius: 10 }}>
              <div style={{ fontSize: 10, color: "rgba(0,0,0,0.4)" }}>Monthly Revenue</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}><GradientText>{fmt(monthly)}</GradientText></div>
            </div>
            <div style={{ textAlign: "center", padding: 14, background: "rgba(69,199,242,0.06)", borderRadius: 10 }}>
              <div style={{ fontSize: 10, color: "rgba(0,0,0,0.4)" }}>Annual Revenue</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#2E9AB8" }}>{fmt(annual)}</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: "rgba(0,0,0,0.35)", textAlign: "center" }}>Based on 5 bps (0.05%) revenue share · campaigns can add 10–20%+</div>
        </div>
      </div>
    </div>
  );
}

/* ========== MAIN PAGE ========== */
export default function ForWalletsPageMerged() {
  const navigate = useNavigate();
  const [hoveredStep, setHoveredStep] = useState(null);
  const [activeWallet, setActiveWallet] = useState(0);
  const [selectedVault, setSelectedVault] = useState(0);
  const [depositScreen, setDepositScreen] = useState(null);
  const [embedStyle, setEmbedStyle] = useState("tab");
  const [activeFeature, setActiveFeature] = useState(0);

  const wallet = WALLETS[activeWallet];

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: "#fff", color: C.black, overflowX: "hidden" }}>
      {/* NAV */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px clamp(20px, 5vw, 260px)", position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, flexWrap: "wrap", gap: "12px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "inherit", cursor: "pointer" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, backgroundImage: C.purple.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Y</span></div>
          <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: ".05em" }}>YIELDO</span>
        </Link>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link to="/wallet" style={{ padding: "8px 18px", fontSize: 15, fontWeight: 600, color: C.black, borderBottom: "2px solid #7A1CCB", cursor: "pointer", textDecoration: "none" }}>For Wallets</Link>
          <Link to="/vault" style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.6)", cursor: "pointer", textDecoration: "none" }}>For Vaults</Link>
          <Link to="/creator" style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.6)", cursor: "pointer", textDecoration: "none" }}>For Creators</Link>
          <span style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.3)", cursor: "not-allowed", opacity: 0.5 }}>Docs</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ padding: "12px 18px", borderRadius: 6, border: "none", fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer", background: "rgba(0,0,0,0.06)", color: "rgba(0,0,0,0.6)" }} onClick={() => window.open("https://app.yieldo.xyz", "_blank")}>Dashboard</button>
          <PrimaryButton onClick={() => navigate("/apply")}>Start Integrating</PrimaryButton>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "120px clamp(20px, 5vw, 260px) 60px", position: "relative", overflow: "hidden", marginTop: "80px" }}>
        <div style={{ position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)", width: 1600, height: 900, background: "radial-gradient(ellipse at center, rgba(212,205,255,0.3) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "flex", gap: 48, alignItems: "center" }}>
          <div style={{ flex: "1.2 1 0" }}>
            <Tag>For Wallets & Portfolio Apps</Tag>
            <h1 style={{ fontSize: 58, fontWeight: 400, textTransform: "uppercase", lineHeight: 1.1, margin: "20px 0 0", letterSpacing: "-.02em" }}>
              Turn idle balances into<br /><GradientText style={{ fontSize: 58 }}>your revenue stream</GradientText>
            </h1>
            <p style={{ fontSize: 20, maxWidth: 560, margin: "24px 0 0", lineHeight: 1.6, color: "rgba(0,0,0,0.55)" }}>
              One SDK. Every yield protocol. Automatic revenue share. Ship a "Yield" tab in days — not months.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 36 }}>
              <PrimaryButton large onClick={() => navigate("/apply")}>Start Integrating</PrimaryButton>
              <button style={{ backgroundImage: C.purple.gradLight, boxShadow: C.purple.shadowLight, borderRadius: 6, padding: "12px 18px", border: "none", fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 16, cursor: "not-allowed", opacity: 0.5 }} disabled><GradientText>View Documentation →</GradientText></button>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
              {[{ n: "5 bps", l: "Your rev share" }, { n: "1 SDK", l: "All protocols" }, { n: "< 1 day", l: "Integration time" }].map((s, i) => (
                <div key={i}><div style={{ fontSize: 24, fontWeight: 600 }}><GradientText>{s.n}</GradientText></div><div style={{ fontSize: 13, color: "rgba(0,0,0,0.4)", marginTop: 2 }}>{s.l}</div></div>
              ))}
            </div>
          </div>
          {/* Interactive phone in hero */}
          <div style={{ flex: "0 0 auto" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", gap: 4 }}>
                {WALLETS.map((w, i) => (
                  <button key={w.id} onClick={() => { setActiveWallet(i); setDepositScreen(null); }} style={{
                    padding: "5px 10px", borderRadius: 6, display: "flex", alignItems: "center", gap: 4, cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: 11,
                    border: activeWallet === i ? `1.5px solid ${w.accent}` : "1px solid rgba(0,0,0,0.06)",
                    background: activeWallet === i ? w.accent + "0a" : "#fff",
                    fontWeight: activeWallet === i ? 600 : 400, color: activeWallet === i ? w.accent : "rgba(0,0,0,0.4)",
                    transition: "all .2s",
                  }}><span style={{ fontSize: 12 }}>{w.icon}</span>{w.name}</button>
                ))}
              </div>
              <PhoneShell wallet={wallet}>
                <YieldTabContent selectedVault={selectedVault} setSelectedVault={setSelectedVault} depositScreen={depositScreen} setDepositScreen={setDepositScreen} />
              </PhoneShell>
            </div>
          </div>
        </div>
      </section>

      {/*<section style={{ padding: "60px clamp(20px, 5vw, 260px)", background: "radial-gradient(ellipse at center top, rgba(212,205,255,0.25) 0%, transparent 70%)" }}>
        <div style={{ textAlign: "center", fontSize: 14, fontWeight: 500, color: "rgba(0,0,0,0.3)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 28 }}>Built for leading wallets</div>
        <div style={{ display: "flex", gap: 48, justifyContent: "center", alignItems: "center" }}>
          {[
            { name: "Nightly", bg: "#1a1a2e", letter: "N" }, { name: "Phantom", bg: "#AB9FF2", letter: "👻" }, { name: "MetaMask", bg: "#F6851B", letter: "🦊" },
            { name: "Rabby", bg: "#7084FF", letter: "🐰" }, { name: "Zerion", bg: "#2962EF", letter: "Z" }, { name: "CoinStats", bg: "#1a1a2e", letter: "C" },
          ].map(w => (
            <div key={w.name} style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0.4 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: w.bg, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{w.letter}</span></div>
              <span style={{ fontSize: 15, fontWeight: 500, color: C.black }}>{w.name}</span>
            </div>
          ))}
        </div>
      </section>*/}

      {/* THE PROBLEM */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)" }}>
        <SectionHeader tag="The Problem" title="Yield should be a profit center, not a cost center" subtitle="Adding yield to your wallet means integrating 20+ protocols, getting zero revenue, and shouldering all the maintenance." />
        <div style={{ display: "flex", gap: 20, marginTop: 56 }}>
          {[
            { icon: "🔧", title: "Integration Nightmare", stat: "20+", statLabel: "protocols to maintain", desc: "Morpho, Aave, Compound, Yearn, Pendle — each with its own API, data format, and chain support. And they keep changing." },
            { icon: "💸", title: "Zero Revenue", stat: "$0", statLabel: "earned by wallets today", desc: "Protocols don't share fees with distributors. You invest engineering resources for a feature that earns you nothing." },
            { icon: "⚖️", title: "Risk Liability", stat: "∞", statLabel: "risk combinations", desc: "Which vault is safe? Which scoring to trust? If a user loses money, they blame you — not the protocol." },
          ].map((item, i) => (
            <div key={i} style={{ flex: 1, padding: 28, borderRadius: 14, background: "#fff", border: "1px solid rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.02)" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(122,28,203,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{item.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(0,0,0,0.5)", lineHeight: 1.6, margin: 0, flex: 1 }}>{item.desc}</p>
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: 14 }}><GradientText style={{ fontSize: 28, fontWeight: 600 }}>{item.stat}</GradientText><div style={{ fontSize: 12, color: "rgba(0,0,0,0.35)", marginTop: 2 }}>{item.statLabel}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTION */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)", background: "rgba(122,28,203,0.015)" }}>
        <SectionHeader tag="The Solution" title="Yieldo handles everything" subtitle="One integration replaces 20 protocols. You earn on every deposit. We handle the complexity." />
        <div style={{ display: "flex", gap: 24, marginTop: 56 }}>
          {[
            { label: "Zero-Maintenance Yield", icon: "🔌", title: "Plug in once, access every vault", bullets: ["Single SDK for Morpho, Aave, Pendle, Yearn + more", "Standardized data: APY, TVL, risk, chain — one format", "Multi-chain routing (Ethereum, Base, Arbitrum, Polygon)", "We maintain protocol integrations — you never touch them"] },
            { label: "Revenue-as-a-Service", icon: "💰", title: "Every deposit earns you money", bullets: ["5 bps automatic revenue share on all volume", "On-chain tracking — transparent, auditable", "No fee-taking smart contracts to build", "Vault curators can offer bonus rev share (up to 20%+)"] },
            { label: "Risk Abstraction", icon: "🛡️", title: "Curated, scored, standardized", bullets: ["Aggregated risk scores (Credora, Bluechip, etc.)", "AI-curated strategy recommendations", "Standardized risk labels for your UI", "You're a distributor, not an advisor"] },
          ].map((p, i) => (
            <div key={i} style={{ flex: 1, padding: 28, borderRadius: 14, background: "#fff", border: "1px solid rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.02)" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(122,28,203,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{p.icon}</div>
              <GradientText style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".02em" }}>{p.label}</GradientText>
              <h3 style={{ fontSize: 20, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>{p.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{p.bullets.map((b, j) => <Check key={j}>{b}</Check>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* USER EXPERIENCE — merged from embed preview */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)" }}>
        <SectionHeader tag="User Experience" title="Three taps to yield" subtitle="From discovering opportunities to depositing — all inside the wallet they already trust. Try the interactive demo above, or explore the embed formats below." />
        <div style={{ display: "flex", gap: 24, marginTop: 56 }}>
          {[
            { step: "1", title: "Discover", icon: "🔍", desc: "User opens the \"Yield\" tab. They see curated vaults sorted by APY, risk, and asset type. Filter chips make browsing effortless.", highlight: "Zero friction — already inside their wallet" },
            { step: "2", title: "Choose", icon: "📊", desc: "Tapping a vault reveals details: current APY, risk level, lock period, protocol info, and TVL. Everything they need to make a decision.", highlight: "Standardized data — easy to compare" },
            { step: "3", title: "Deposit", icon: "💰", desc: "One-tap deposit with amount input, token selector, projected yield, and fee estimate. Confirm with their wallet — funds route through Yieldo.", highlight: "Your wallet earns revenue on every deposit" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: 28, borderRadius: 14, background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, backgroundImage: C.purple.grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
                <span style={{ fontSize: 36, fontWeight: 200, color: "rgba(122,28,203,0.15)" }}>{s.step}</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 8px" }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(0,0,0,0.5)", lineHeight: 1.6, margin: "0 0 14px" }}>{s.desc}</p>
              <div style={{ padding: "8px 12px", borderRadius: 6, background: "rgba(26,157,63,0.05)", border: "1px solid rgba(26,157,63,0.1)" }}>
                <span style={{ fontSize: 12, color: "#1a9d3f", fontWeight: 500 }}>✓ {s.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EMBED FORMATS */}
      <section style={{ padding: "80px clamp(20px, 5vw, 260px)", background: "rgba(122,28,203,0.015)" }}>
        <SectionHeader tag="Embed Options" title="Multiple integration styles" subtitle="Choose the layout that fits your wallet's UX. All styles use the same SDK." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginTop: 48 }}>
          {[
            { id: "tab", name: "Yield Tab", desc: "Full tab experience. Best for wallets with tab navigation.", icon: "📑", preview: (
              <div style={{ background: "#f8f7fc", borderRadius: 8, border: "1px solid rgba(0,0,0,0.06)", padding: 8, fontSize: 10 }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 6 }}>{["Tokens", "NFTs", "Yield"].map((t, i) => <span key={t} style={{ padding: "2px 6px", borderRadius: 4, background: i === 2 ? "#7A1CCB12" : "transparent", color: i === 2 ? "#7A1CCB" : "rgba(0,0,0,0.3)", fontWeight: i === 2 ? 600 : 400 }}>{t}</span>)}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>{[1, 2, 3].map(i => <div key={i} style={{ height: 16, borderRadius: 4, background: "rgba(122,28,203,0.04)", border: "1px solid rgba(0,0,0,0.03)" }} />)}</div>
              </div>
            )},
            { id: "card", name: "Widget Card", desc: "Compact card for dashboards or portfolio views.", icon: "🃏", preview: (
              <div style={{ background: "#fff", borderRadius: 8, border: "1px solid rgba(0,0,0,0.06)", padding: 8, fontSize: 10 }}>
                <div style={{ fontSize: 9, color: "rgba(0,0,0,0.3)", marginBottom: 4 }}>Top Yield</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontWeight: 600 }}>USDC Opt.</span><span style={{ color: "#7A1CCB", fontWeight: 700 }}>12.4%</span></div>
                <div style={{ height: 22, borderRadius: 4, backgroundImage: C.purple.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 8, fontWeight: 600 }}>Deposit</span></div>
              </div>
            )},
            { id: "modal", name: "Modal Overlay", desc: "Full-screen modal triggered by a CTA button.", icon: "🪟", preview: (
              <div style={{ background: "rgba(0,0,0,0.04)", borderRadius: 8, padding: 6, display: "flex", alignItems: "center", justifyContent: "center", height: 70 }}>
                <div style={{ background: "#fff", borderRadius: 6, padding: "6px 10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", fontSize: 10, textAlign: "center" }}>
                  <div style={{ fontWeight: 600, marginBottom: 3 }}>Yield Opportunities</div>
                  <div style={{ height: 12, borderRadius: 3, background: "rgba(122,28,203,0.04)", marginBottom: 2 }} /><div style={{ height: 12, borderRadius: 3, background: "rgba(122,28,203,0.04)" }} />
                </div>
              </div>
            )},
            { id: "banner", name: "Smart Banner", desc: "Non-intrusive banner suggesting idle asset yield.", icon: "📢", preview: (
              <div style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 10 }}>
                <div style={{ height: 14, borderRadius: 4, background: "rgba(0,0,0,0.02)" }} /><div style={{ height: 14, borderRadius: 4, background: "rgba(0,0,0,0.02)" }} />
                <div style={{ padding: "4px 8px", borderRadius: 6, background: "rgba(122,28,203,0.05)", border: "1px solid rgba(122,28,203,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#7A1CCB", fontWeight: 500, fontSize: 9 }}>💡 Earn 12.4% on idle USDC</span><span style={{ color: "#7A1CCB", fontSize: 8 }}>→</span>
                </div>
              </div>
            )},
          ].map(s => (
            <div key={s.id} onClick={() => setEmbedStyle(s.id)} style={{
              padding: 20, borderRadius: 12, cursor: "pointer", transition: "all .2s",
              border: embedStyle === s.id ? "2px solid rgba(122,28,203,0.2)" : "1px solid rgba(0,0,0,0.06)",
              background: embedStyle === s.id ? "rgba(122,28,203,0.02)" : "#fff",
              boxShadow: embedStyle === s.id ? "0 4px 16px rgba(122,28,203,0.06)" : "0 1px 4px rgba(0,0,0,0.02)",
            }}>
              <div style={{ marginBottom: 12 }}>{s.preview}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{s.icon} {s.name}</div>
              <div style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", lineHeight: 1.4 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SDK INTEGRATION */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)" }}>
        <div style={{ display: "flex", gap: 56, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 0" }}>
            <Tag>Integration</Tag>
            <h2 style={{ fontSize: 48, fontWeight: 400, textTransform: "uppercase", margin: "16px 0 0", letterSpacing: "-.02em", lineHeight: 1.15 }}>Ship yield<br />in under a day</h2>
            <p style={{ fontSize: 18, color: "rgba(0,0,0,0.55)", margin: "20px 0 0", lineHeight: 1.6, maxWidth: 480 }}>Three API calls: list vaults, deposit, withdraw. That's it. Our SDK handles routing, fee tracking, and revenue share automatically.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 28 }}>
              {[
                { step: "01", title: "Install SDK", desc: "npm install @yieldo/sdk — TypeScript, React Native, or REST", time: "5 min" },
                { step: "02", title: "Fetch vaults", desc: "Get curated vaults filtered by chain, risk, APY — standardized format", time: "30 min" },
                { step: "03", title: "Enable deposits", desc: "Route deposits through Yieldo. Revenue share tracked automatically", time: "2 hrs" },
                { step: "04", title: "Go live", desc: "Users see yield opportunities. You earn revenue. Zero maintenance", time: "Ship it 🚀" },
              ].map((s, i) => (
                <div key={i} onMouseEnter={() => setHoveredStep(i)} onMouseLeave={() => setHoveredStep(null)} style={{
                  display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 16px", borderRadius: 10,
                  background: hoveredStep === i ? "rgba(122,28,203,0.04)" : "transparent",
                  border: `1px solid ${hoveredStep === i ? "rgba(122,28,203,0.12)" : "transparent"}`,
                  transition: "all .2s", cursor: "default",
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, backgroundImage: C.purple.grad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>{s.step}</span></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 15, fontWeight: 600 }}>{s.title}</span><span style={{ fontSize: 11, color: "rgba(0,0,0,0.3)", fontWeight: 500 }}>{s.time}</span></div>
                    <div style={{ fontSize: 13, color: "rgba(0,0,0,0.45)", marginTop: 2, lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: "1.1 1 0", position: "sticky", top: 40 }}><CodeBlock /></div>
        </div>
      </section>

      {/* REVENUE CALCULATOR */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)", background: "rgba(122,28,203,0.015)" }}>
        <div style={{ display: "flex", gap: 56, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 0" }}>
            <Tag>Economics</Tag>
            <h2 style={{ fontSize: 48, fontWeight: 400, textTransform: "uppercase", margin: "16px 0 0", letterSpacing: "-.02em", lineHeight: 1.15 }}>Model your<br />revenue</h2>
            <p style={{ fontSize: 18, color: "rgba(0,0,0,0.55)", margin: "20px 0 0", lineHeight: 1.6, maxWidth: 480 }}>You earn 5 bps on every deposit routed through your wallet. Plus, vault curators can offer additional bonus revenue share through campaigns — up to 20%+ on top.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 32 }}>
              <Check>Base: 5 bps (0.05%) on every deposit — automatic</Check>
              <Check>Bonus: Vault campaigns can offer 10–20%+ extra rev share</Check>
              <Check>Loyalty boosts: higher rate for AUM that stays 60+ days</Check>
              <Check>All tracked on-chain — transparent, auditable</Check>
              <Check>Monthly payouts or continuous streaming</Check>
            </div>
          </div>
          <div style={{ flex: "1 1 0" }}><RevenueCalculator /></div>
        </div>
      </section>

      {/* PARTNER DASHBOARD PREVIEW */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)" }}>
        <SectionHeader tag="Partner Dashboard" title="Full visibility into your earnings" subtitle="Track revenue, deposits, vault performance, and campaign bonuses in real time." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginTop: 48 }}>
          {[
            { icon: "📊", title: "Revenue Dashboard", desc: "Real-time earnings, payout history, and revenue projections across all vaults." },
            { icon: "🏦", title: "Vault Catalog", desc: "Browse 100+ vaults. Filter by chain, risk, APY, platform, curator. One-click enrollment." },
            { icon: "🎯", title: "Campaign Marketplace", desc: "Opt into vault campaigns for bonus revenue share. See which vaults offer the best deals." },
            { icon: "🔧", title: "Embed Configurator", desc: "Customize the yield widget appearance, select default chains, and control the end-user UX." },
          ].map((f, i) => (
            <div key={i} onMouseEnter={() => setActiveFeature(i)} style={{
              padding: 24, borderRadius: 12, cursor: "default",
              background: activeFeature === i ? "rgba(122,28,203,0.04)" : "#fff",
              border: `1px solid ${activeFeature === i ? "rgba(122,28,203,0.15)" : "rgba(0,0,0,0.06)"}`,
              boxShadow: activeFeature === i ? "0 4px 16px rgba(122,28,203,0.06)" : "none", transition: "all .2s",
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 6px" }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "rgba(0,0,0,0.45)", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section style={{ padding: "80px clamp(20px, 5vw, 260px)", background: "rgba(122,28,203,0.015)" }}>
        <SectionHeader tag="Comparison" title="Yieldo vs. Building In-House" />
        <div style={{ marginTop: 48, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", background: "#fff" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", background: "rgba(122,28,203,0.03)" }}>
            <div style={{ padding: "14px 24px" }} />
            <div style={{ padding: "14px 24px", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em", textAlign: "center" }}><GradientText>Yieldo SDK</GradientText></div>
            <div style={{ padding: "14px 24px", fontSize: 13, fontWeight: 600, color: "rgba(0,0,0,0.35)", textTransform: "uppercase", letterSpacing: ".05em", textAlign: "center" }}>DIY Integration</div>
          </div>
          {[
            ["Time to ship", "< 1 day", "3–6 months"],
            ["Protocols supported", "20+ (auto-updated)", "1–3 (manual)"],
            ["Revenue earned", "5 bps + campaign bonuses", "$0"],
            ["Maintenance", "Zero (we handle it)", "Ongoing engineering cost"],
            ["Risk scoring", "Aggregated & standardized", "Build your own"],
            ["Multi-chain", "Out of the box", "Per-chain integration"],
            ["Embed formats", "Tab / Card / Modal / Banner", "Custom build each"],
            ["Cost", "Free (revenue-share model)", "$100K+ eng. investment"],
          ].map(([feat, yieldo, diy], i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
              <div style={{ padding: "12px 24px", fontSize: 14, fontWeight: 500 }}>{feat}</div>
              <div style={{ padding: "12px 24px", fontSize: 14, textAlign: "center", color: "#4B0CA6", fontWeight: 500, background: "rgba(122,28,203,0.015)" }}>{yieldo}</div>
              <div style={{ padding: "12px 24px", fontSize: 14, textAlign: "center", color: "rgba(0,0,0,0.35)" }}>{diy}</div>
            </div>
          ))}
        </div>
      </section>

      {/*<section style={{ padding: "100px clamp(20px, 5vw, 260px)" }}>
        <SectionHeader tag="Partners" title="Trusted by leading wallets" />
        <div style={{ display: "flex", gap: 20, marginTop: 48 }}>
          {[
            { name: "Nightly", role: "Head of Product", quote: "Yieldo turned our idle asset feature from a cost center into a revenue stream. Integration took half a day.", avatar: "N", bg: "#1a1a2e" },
            { name: "CoinStats", role: "CTO", quote: "We evaluated building in-house vs. Yieldo. The SDK paid for itself in the first month through revenue share alone.", avatar: "C", bg: "#2962EF" },
            { name: "DeFi Portfolio App", role: "Founder", quote: "The campaign marketplace is a game-changer. Vaults compete to offer us better rev share — our users get better yields.", avatar: "D", bg: "#7A1CCB" },
          ].map((t, i) => (
            <div key={i} style={{ flex: 1, padding: 28, borderRadius: 14, background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.02)" }}>
              <div style={{ fontSize: 30, marginBottom: 12 }}>"</div>
              <p style={{ fontSize: 15, color: "rgba(0,0,0,0.6)", lineHeight: 1.6, margin: "0 0 20px", fontStyle: "italic" }}>{t.quote}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{t.avatar}</span></div>
                <div><div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div><div style={{ fontSize: 12, color: "rgba(0,0,0,0.4)" }}>{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>*/}

      {/* CTA */}
      <section style={{ padding: "80px clamp(20px, 5vw, 260px) 100px" }}>
        <div style={{ borderRadius: 16, padding: "80px", textAlign: "center", position: "relative", overflow: "hidden", backgroundImage: C.purple.gradBg, boxShadow: "0 0 47px rgba(69,199,242,0.1)" }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 300, background: "radial-gradient(ellipse at center bottom, rgba(141,31,249,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <Tag>Start Building</Tag>
            <h2 style={{ fontSize: 56, fontWeight: 400, textTransform: "uppercase", margin: "16px 0 20px", lineHeight: 1.15, letterSpacing: "-.02em" }}>Ready to monetize<br />your user base?</h2>
            <p style={{ fontSize: 18, color: "rgba(0,0,0,0.5)", maxWidth: 620, margin: "0 auto 32px", lineHeight: 1.6 }}>Ship a "Yield" tab in your wallet, earn revenue on every deposit, and never worry about protocol integrations again.</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <PrimaryButton large onClick={() => navigate("/apply")}>Start Integrating</PrimaryButton>
              <SecondaryButton onClick={() => navigate("/apply")}>Book a Demo</SecondaryButton>
            </div>
            <p style={{ fontSize: 13, color: "rgba(0,0,0,0.35)", marginTop: 16 }}>Free SDK · No minimum volume · Revenue share from day one</p>
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
            <span style={{ color: "rgba(0,0,0,0.3)", opacity: 0.5, cursor: "not-allowed" }}>Documentation</span>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 13, color: "rgba(0,0,0,0.35)", margin: 0 }}>© 2025 YIELDO — All rights reserved</p>
          <div style={{ display: "flex", gap: 8 }}>
            {["𝕏", "✈", "▶", "M"].map((icon, i) => (
              <div key={i} style={{ width: 36, height: 36, borderRadius: 4, backgroundImage: C.purple.gradLight, boxShadow: C.purple.shadowLight, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: "rgba(0,0,0,0.45)" }}>{icon}</div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
