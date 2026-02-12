import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const C = {
  black: "#121212",
  purple: { grad: "linear-gradient(100deg, #4B0CA6 0%, #7A1CCB 58%, #9E3BFF 114%)", gradBg: "linear-gradient(100deg, rgba(75,12,166,0.05) 0%, rgba(122,28,203,0.05) 58%, rgba(158,59,255,0.05) 114%)", gradLight: "linear-gradient(100deg, rgba(75,12,166,0.1) 0%, rgba(122,28,203,0.1) 58%, rgba(158,59,255,0.1) 114%)", shadow: "0px 0px 17px rgba(80,14,170,0.15)" },
};

function GradientText({ children, style = {} }) {
  return <span style={{ backgroundImage: C.purple.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", ...style }}>{children}</span>;
}

const VAULTS = [
  { id: 1, name: "USDC Lending Optimizer", protocol: "Morpho + Aave", apy: 12.4, risk: "Low", riskColor: "#1a9d3f", tvl: "$4.2M", depositors: 1847, icon: "\u{1F4B5}", chain: "Ethereum", score: 92, comment: "My go-to stablecoin strategy. Morpho's optimization layer consistently outperforms vanilla Aave lending. Great risk-adjusted returns.", apyHistory: [10.2, 10.8, 11.1, 11.5, 11.8, 12.0, 11.6, 12.1, 12.3, 12.0, 12.2, 12.4, 12.1, 12.4] },
  { id: 2, name: "ETH Staking Yield", protocol: "Lido + Pendle", apy: 8.7, risk: "Low", riskColor: "#1a9d3f", tvl: "$1.8M", depositors: 923, icon: "\u27E0", chain: "Ethereum", score: 88, comment: "Solid ETH yield without the complexity. Lido staking plus Pendle's fixed-rate gives you predictable returns. I hold a significant position here.", apyHistory: [7.8, 8.0, 8.2, 8.1, 8.4, 8.3, 8.5, 8.6, 8.4, 8.7, 8.5, 8.8, 8.6, 8.7] },
  { id: 3, name: "Stablecoin Compounder", protocol: "Yearn + Morpho", apy: 18.2, risk: "Medium", riskColor: "#b8960a", tvl: "$920K", depositors: 412, icon: "\u{1F504}", chain: "Base", score: 78, comment: "Higher risk, higher reward. Yearn's auto-compounding on Base keeps gas costs minimal. Only allocate what you're comfortable losing.", apyHistory: [15.1, 16.2, 17.0, 16.8, 17.5, 18.0, 17.2, 18.4, 17.8, 18.1, 17.9, 18.5, 18.0, 18.2] },
  { id: 4, name: "DAI Savings Plus", protocol: "Spark + Morpho", apy: 9.8, risk: "Low", riskColor: "#1a9d3f", tvl: "$1.1M", depositors: 634, icon: "\u25C6", chain: "Ethereum", score: 85, comment: "DAI's native savings rate boosted by Spark. Very safe, very boring \u2014 exactly how I like my core allocation.", apyHistory: [9.0, 9.2, 9.4, 9.3, 9.5, 9.6, 9.4, 9.7, 9.5, 9.8, 9.6, 9.9, 9.7, 9.8] },
  { id: 5, name: "BTC Yield Strategy", protocol: "Compound + Pendle", apy: 6.3, risk: "Low", riskColor: "#1a9d3f", tvl: "$2.4M", depositors: 1102, icon: "\u20BF", chain: "Arbitrum", score: 90, comment: "Bitcoin yield is rare and usually sketchy. This one is legit \u2014 Compound lending plus Pendle fixed rate on Arbitrum. Conservative but real.", apyHistory: [5.8, 5.9, 6.0, 6.1, 6.0, 6.2, 6.1, 6.3, 6.2, 6.4, 6.2, 6.3, 6.1, 6.3] },
];

function Sparkline({ data, color = "#7A1CCB", w = 120, h = 32 }) {
  const max = Math.max(...data) * 1.05; const min = Math.min(...data) * 0.95; const range = max - min || 1;
  const pts = data.map((v, i) => ({ x: (i / (data.length - 1)) * w, y: 2 + (1 - (v - min) / range) * (h - 4) }));
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const gid = `sp-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".15" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <path d={`${d} L${pts.at(-1).x},${h} L${pts[0].x},${h} Z`} fill={`url(#${gid})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScoreRing({ score, size = 40 }) {
  const r = (size - 6) / 2; const circ = 2 * Math.PI * r; const offset = circ * (1 - score / 100);
  const color = score >= 85 ? "#1a9d3f" : score >= 70 ? "#b8960a" : "#d97706";
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="3" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.3, fontWeight: 700, color }}>{score}</div>
    </div>
  );
}

function DepositModal({ vault, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, fontFamily: "'Inter',sans-serif" }} onClick={onClose}>
      <div style={{ width: 420, background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "24px 28px 16px", textAlign: "center", backgroundImage: C.purple.gradBg }}>
          <div style={{ fontSize: 32, marginBottom: 6 }}>{vault.icon}</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{vault.name}</div>
          <div style={{ fontSize: 13, color: "rgba(0,0,0,0.4)", marginTop: 2 }}>{vault.protocol} &middot; {vault.chain}</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
            <span style={{ padding: "3px 10px", borderRadius: 4, background: vault.riskColor + "12", color: vault.riskColor, fontSize: 12, fontWeight: 500 }}>{vault.risk} Risk</span>
            <span style={{ padding: "3px 10px", borderRadius: 4, background: "rgba(0,0,0,0.03)", color: "rgba(0,0,0,0.4)", fontSize: 12 }}>TVL {vault.tvl}</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 28, padding: "14px 0", borderTop: "1px solid rgba(0,0,0,0.05)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 24, fontWeight: 700, color: "#7A1CCB" }}>{vault.apy}%</div><div style={{ fontSize: 10, color: "rgba(0,0,0,0.3)" }}>Current APY</div></div>
          <div style={{ textAlign: "center" }}><ScoreRing score={vault.score} size={44} /><div style={{ fontSize: 10, color: "rgba(0,0,0,0.3)", marginTop: 2 }}>Yieldo Score</div></div>
        </div>
        <div style={{ padding: "18px 28px 24px" }}>
          <label style={{ fontSize: 12, color: "rgba(0,0,0,0.4)", fontWeight: 600, display: "block", marginBottom: 6 }}>Amount</label>
          <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12, padding: "12px 16px", background: "rgba(0,0,0,0.015)", marginBottom: 12 }}>
            <input type="text" defaultValue="1,000" style={{ border: "none", background: "transparent", fontSize: 22, fontWeight: 700, outline: "none", flex: 1, fontFamily: "'Inter',sans-serif", color: "#121212", width: "100%" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", background: "rgba(0,0,0,0.04)", borderRadius: 8 }}>
              <span style={{ fontSize: 13 }}>{"\u{1F4B5}"}</span><span style={{ fontSize: 14, fontWeight: 600 }}>USDC</span><span style={{ fontSize: 10, color: "rgba(0,0,0,0.3)" }}>{"\u25BC"}</span>
            </div>
          </div>
          <div style={{ padding: 14, background: "rgba(26,157,63,0.04)", borderRadius: 10, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}><span style={{ color: "rgba(0,0,0,0.4)" }}>Projected yearly yield</span><span style={{ fontWeight: 600, color: "#1a9d3f" }}>${(1000 * vault.apy / 100).toFixed(0)}.00</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 4 }}><span style={{ color: "rgba(0,0,0,0.4)" }}>Network fee</span><span style={{ color: "rgba(0,0,0,0.4)" }}>~$0.42</span></div>
          </div>
          <button style={{ width: "100%", padding: "14px", borderRadius: 12, backgroundImage: C.purple.grad, border: "none", color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif", boxShadow: C.purple.shadow }}>Connect Wallet & Deposit</button>
          <div style={{ textAlign: "center", fontSize: 10, color: "rgba(0,0,0,0.2)", marginTop: 8 }}>Powered by Yieldo &middot; Referred by @defi_sage</div>
        </div>
      </div>
    </div>
  );
}

export default function CreatorDemoPage() {
  const navigate = useNavigate();
  const [expandedVault, setExpandedVault] = useState(null);
  const [depositVault, setDepositVault] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? VAULTS : filter === "low" ? VAULTS.filter(v => v.risk === "Low") : filter === "stablecoin" ? VAULTS.filter(v => ["\u{1F4B5}", "\u{1F504}", "\u25C6"].includes(v.icon)) : VAULTS.filter(v => ["\u27E0", "\u20BF"].includes(v.icon));

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: "#f8f7fc", color: C.black, minHeight: "100vh" }}>
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px clamp(20px, 5vw, 260px)", background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "inherit" }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, backgroundImage: C.purple.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 700, fontSize: 12 }}>Y</span></div>
          <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: ".05em", color: C.black }}>YIELDO</span>
        </Link>
        <button onClick={() => navigate(-1)} style={{ background: "none", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 6, padding: "6px 14px", fontSize: 13, fontFamily: "'Inter',sans-serif", cursor: "pointer", color: "rgba(0,0,0,0.5)" }}>&larr; Back</button>
      </nav>
      <div style={{ backgroundImage: C.purple.grad, padding: "10px 24px", textAlign: "center", fontSize: 13, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <span>{"\u{1F3AF}"} This is a demo creator page — see what your audience experiences</span>
        <button onClick={() => navigate("/apply")} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 4, padding: "4px 12px", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>Create Your Own &rarr;</button>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px 80px" }}>
        <div style={{ textAlign: "center", padding: "40px 0 24px" }}>
          <div style={{ width: 80, height: 80, borderRadius: 40, backgroundImage: C.purple.grad, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(122,28,203,0.2)" }}>
            <span style={{ color: "#fff", fontSize: 36 }}>{"\u{1F3AF}"}</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 2px" }}>@defi_sage</h1>
          <p style={{ fontSize: 14, color: "rgba(0,0,0,0.4)", margin: "0 0 10px" }}>DeFi analyst &middot; 45K followers &middot; Yield strategies & risk analysis</p>
          <p style={{ fontSize: 15, color: "rgba(0,0,0,0.55)", maxWidth: 440, margin: "0 auto 14px", lineHeight: 1.6 }}>
            These are my personally vetted yield strategies. I research, I deposit, I share what works. No paid promotions — just honest picks.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {[
              { label: "Twitter", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(0,0,0,0.45)"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
              { label: "YouTube", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(0,0,0,0.45)"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
              { label: "Telegram", svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(0,0,0,0.45)"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
            ].map((s, i) => (
              <div key={i} style={{ width: 34, height: 34, borderRadius: 8, backgroundImage: C.purple.gradLight, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>{s.svg}</div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", background: "#fff", marginBottom: 24 }}>
          {[
            { n: "$1.27M", l: "AUM Referred", c: "#7A1CCB" },
            { n: "847", l: "Depositors", c: "#2E9AB8" },
            { n: "10.8%", l: "Avg APY", c: "#1a9d3f" },
            { n: "186d", l: "Track Record", c: "#b8960a" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", padding: "14px 0", borderRight: i < 3 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: s.c }}>{s.n}</div>
              <div style={{ fontSize: 10, color: "rgba(0,0,0,0.35)" }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {[{ id: "all", label: "All Picks" }, { id: "low", label: "Low Risk" }, { id: "stablecoin", label: "Stablecoins" }, { id: "crypto", label: "ETH & BTC" }].map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{
                padding: "6px 14px", borderRadius: 20, fontSize: 13, fontFamily: "'Inter',sans-serif", cursor: "pointer", transition: "all .15s",
                border: filter === f.id ? "1.5px solid rgba(122,28,203,0.25)" : "1px solid rgba(0,0,0,0.08)",
                background: filter === f.id ? "rgba(122,28,203,0.06)" : "#fff",
                color: filter === f.id ? "#7A1CCB" : "rgba(0,0,0,0.4)",
                fontWeight: filter === f.id ? 600 : 400,
              }}>{f.label}</button>
            ))}
          </div>
          <span style={{ fontSize: 12, color: "rgba(0,0,0,0.25)" }}>{filtered.length} vaults</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(v => {
            const expanded = expandedVault === v.id;
            return (
              <div key={v.id} style={{ background: "#fff", borderRadius: 14, border: expanded ? "1.5px solid rgba(122,28,203,0.15)" : "1px solid rgba(0,0,0,0.06)", overflow: "hidden", transition: "all .2s", boxShadow: expanded ? "0 4px 20px rgba(122,28,203,0.06)" : "0 1px 3px rgba(0,0,0,0.02)" }}>
                <div onClick={() => setExpandedVault(expanded ? null : v.id)} style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(122,28,203,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{v.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 15, fontWeight: 600 }}>{v.name}</span>
                      <span style={{ fontSize: 11, padding: "2px 6px", borderRadius: 4, background: v.riskColor + "12", color: v.riskColor, fontWeight: 500 }}>{v.risk}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(0,0,0,0.35)" }}>{v.protocol} &middot; {v.chain}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginRight: 8 }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#7A1CCB" }}>{v.apy}%</div>
                    <div style={{ fontSize: 10, color: "rgba(0,0,0,0.3)" }}>APY</div>
                  </div>
                  <Sparkline data={v.apyHistory} w={80} h={28} />
                  <span style={{ fontSize: 16, color: "rgba(0,0,0,0.15)", transition: "transform .2s", transform: expanded ? "rotate(180deg)" : "rotate(0)" }}>{"\u25BE"}</span>
                </div>

                {expanded && (
                  <div style={{ padding: "0 20px 18px", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                    <div style={{ padding: "14px 16px", margin: "14px 0", background: "rgba(122,28,203,0.02)", borderRadius: 10, border: "1px solid rgba(122,28,203,0.06)", display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 28, height: 28, borderRadius: 14, backgroundImage: C.purple.grad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <span style={{ color: "#fff", fontSize: 12 }}>{"\u{1F3AF}"}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#7A1CCB", marginBottom: 3 }}>@defi_sage's take</div>
                        <div style={{ fontSize: 13, color: "rgba(0,0,0,0.55)", lineHeight: 1.6, fontStyle: "italic" }}>"{v.comment}"</div>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
                      {[
                        { label: "TVL", value: v.tvl, color: "#2E9AB8" },
                        { label: "Depositors", value: v.depositors.toLocaleString(), color: "#7A1CCB" },
                        { label: "Yieldo Score", value: v.score, color: v.score >= 85 ? "#1a9d3f" : "#b8960a" },
                        { label: "14d APY", value: `${v.apyHistory[0]}\u2013${v.apy}%`, color: "rgba(0,0,0,0.5)" },
                      ].map((m, i) => (
                        <div key={i} style={{ textAlign: "center", padding: "10px 0", background: "rgba(0,0,0,0.015)", borderRadius: 8 }}>
                          <div style={{ fontSize: 16, fontWeight: 700, color: m.color }}>{m.value}</div>
                          <div style={{ fontSize: 10, color: "rgba(0,0,0,0.3)" }}>{m.label}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(0,0,0,0.25)", marginBottom: 6 }}>14-DAY APY HISTORY</div>
                      <Sparkline data={v.apyHistory} w={600} h={48} color="#7A1CCB" />
                    </div>

                    <button onClick={(e) => { e.stopPropagation(); setDepositVault(v); }} style={{ width: "100%", padding: "13px", borderRadius: 12, backgroundImage: C.purple.grad, border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif", boxShadow: C.purple.shadow }}>
                      Deposit into {v.name.split(" ")[0]} &rarr;
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 24, padding: "14px 18px", borderRadius: 10, background: "rgba(217,119,6,0.04)", border: "1px solid rgba(217,119,6,0.1)" }}>
          <div style={{ fontSize: 12, color: "#d97706", lineHeight: 1.6 }}>
            {"\u26A0\uFE0F"} <strong>Disclaimer:</strong> The vaults shown are curated by @defi_sage and powered by Yieldo. This is not financial advice. All investments carry risk, including loss of principal. Yieldo Scores and external ratings are for informational purposes only. Do your own research before depositing. Past performance does not guarantee future results.
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 10, background: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, backgroundImage: C.purple.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 700, fontSize: 9 }}>Y</span></div>
            <span style={{ fontSize: 13, color: "rgba(0,0,0,0.35)" }}>Powered by <strong style={{ color: "#7A1CCB" }}>Yieldo</strong></span>
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: "rgba(0,0,0,0.25)" }}>
            Want your own yield page? <span onClick={() => navigate("/apply")} style={{ color: "#7A1CCB", cursor: "pointer", fontWeight: 500 }}>Apply as a creator &rarr;</span>
          </div>
        </div>
      </div>

      {depositVault && <DepositModal vault={depositVault} onClose={() => setDepositVault(null)} />}
    </div>
  );
}
