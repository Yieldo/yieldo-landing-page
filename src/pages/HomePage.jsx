import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const COLORS = {
  black: "#121212",
  white: "#FFFFFF",
  purple: {
    gradient: "linear-gradient(100deg, #4B0CA6 0%, #7A1CCB 58%, #9E3BFF 114%)",
    gradientLight: "linear-gradient(100deg, rgba(75,12,166,0.1) 0%, rgba(122,28,203,0.1) 58%, rgba(158,59,255,0.1) 114%)",
    gradientBg: "linear-gradient(100deg, rgba(75,12,166,0.05) 0%, rgba(122,28,203,0.05) 58%, rgba(158,59,255,0.05) 114%)",
    shadow: "0px 0px 17px 0px rgba(80,14,170,0.15)",
    shadowLight: "0px 0px 17px 0px rgba(80,14,170,0.1)",
  },
  teal: {
    gradient: "linear-gradient(101deg, #45C7F2 0%, #4FE3C1 58%, #4596F2 114%)",
    shadow: "0px 0px 17px 0px rgba(69,199,242,0.35)",
  },
};

function GradientText({ children, style, className = "" }) {
  return (
    <span
      className={className}
      style={{
        backgroundImage: COLORS.purple.gradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function PrimaryButton({ children, large, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundImage: COLORS.purple.gradient,
        boxShadow: COLORS.purple.shadow,
        borderRadius: 4,
        padding: large ? "14px 28px" : "12px 18px",
        border: "none",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontSize: large ? 18 : 16,
        cursor: "pointer",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundImage: COLORS.purple.gradientLight,
        boxShadow: COLORS.purple.shadowLight,
        borderRadius: 4,
        padding: "12px 18px",
        border: "none",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontSize: 16,
        cursor: "pointer",
        backgroundClip: "padding-box",
      }}
    >
      <GradientText>{children}</GradientText>
    </button>
  );
}

function Tag({ children }) {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4px 14px",
        borderRadius: 100,
      }}
    >
      <span
        style={{
          position: "absolute",
          filter: "blur(6px)",
          fontWeight: 700,
          fontSize: 18,
          color: "rgba(69,150,242,0.8)",
          letterSpacing: "-0.36px",
        }}
      >
        {children}
      </span>
      <span
        style={{
          position: "relative",
          fontSize: 14,
          color: "rgba(100,100,120,0.9)",
          fontWeight: 500,
        }}
      >
        {children}
      </span>
    </div>
  );
}

function SectionHeader({ tag, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      {tag && <Tag>{tag}</Tag>}
      <h2
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 48,
          fontWeight: 400,
          color: COLORS.black,
          textTransform: "uppercase",
          margin: 0,
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 20,
            color: COLORS.black,
            maxWidth: 700,
            margin: 0,
            lineHeight: 1.5,
            opacity: 0.7,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function CheckItem({ children }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="#7A1CCB" strokeWidth="1.5" />
        <path d="M8 12.5L11 15.5L16 9.5" stroke="#7A1CCB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontSize: 16, color: "rgba(0,0,0,0.6)", fontFamily: "'Inter', sans-serif" }}>
        {children}
      </span>
    </div>
  );
}

function StatCard({ number, label, sublabel }) {
  return (
    <div
      style={{
        flex: "1 1 0",
        padding: "32px 28px",
        borderRadius: 12,
        background: "rgba(122,28,203,0.04)",
        border: "1px solid rgba(122,28,203,0.08)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 40, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
        <GradientText>{number}</GradientText>
      </div>
      <div style={{ fontSize: 16, color: COLORS.black, fontWeight: 500, marginTop: 4 }}>{label}</div>
      {sublabel && <div style={{ fontSize: 13, color: "rgba(0,0,0,0.45)", marginTop: 4 }}>{sublabel}</div>}
    </div>
  );
}

// Icons
function PlugIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="rgba(122,28,203,0.08)" />
      <path d="M14 18H26M14 22H26M18 14V18M22 14V18M16 26H24C25.1046 26 26 25.1046 26 24V18H14V24C14 25.1046 14.8954 26 16 26Z" stroke="#7A1CCB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="rgba(122,28,203,0.08)" />
      <path d="M20 28C20 28 27 24 27 19V14L20 12L13 14V19C13 24 20 28 20 28Z" stroke="#7A1CCB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 19.5L19 21.5L23 17.5" stroke="#7A1CCB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="rgba(122,28,203,0.08)" />
      <circle cx="20" cy="20" r="7" stroke="#7A1CCB" strokeWidth="1.5" />
      <path d="M20 16V24M18 18C18 17.4 18.9 17 20 17C21.1 17 22 17.4 22 18C22 18.8 20 19 20 20C20 20.6 20.9 21 22 21C21.1 23 18 22.6 18 22" stroke="#7A1CCB" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="rgba(122,28,203,0.08)" />
      <path d="M20 14L28 18L20 22L12 18L20 14Z" stroke="#7A1CCB" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 22L20 26L28 22" stroke="#7A1CCB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WalletLogo({ name }) {
  const logos = {
    Nightly: (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg, #1a1a2e, #16213e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#e0e0ff", fontSize: 14 }}>N</span>
        </div>
        <span style={{ fontSize: 16, fontWeight: 500, color: COLORS.black }}>Nightly</span>
      </div>
    ),
    Phantom: (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg, #AB9FF2, #7B61FF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>👻</span>
        </div>
        <span style={{ fontSize: 16, fontWeight: 500, color: COLORS.black }}>Phantom</span>
      </div>
    ),
    MetaMask: (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg, #F6851B, #E2761B)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontSize: 12 }}>🦊</span>
        </div>
        <span style={{ fontSize: 16, fontWeight: 500, color: COLORS.black }}>MetaMask</span>
      </div>
    ),
    Rabby: (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg, #7084FF, #4B5EFC)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontSize: 12 }}>🐰</span>
        </div>
        <span style={{ fontSize: 16, fontWeight: 500, color: COLORS.black }}>Rabby</span>
      </div>
    ),
    Zerion: (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg, #2962EF, #0052FF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>Z</span>
        </div>
        <span style={{ fontSize: 16, fontWeight: 500, color: COLORS.black }}>Zerion</span>
      </div>
    ),
  };

  return logos[name] || null;
}

export default function YieldoHomepage() {
  const navigate = useNavigate();
  const [hoveredPillar, setHoveredPillar] = useState(null);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: COLORS.black, overflowX: "hidden" }}>
      {/* NAV */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px clamp(20px, 5vw, 260px)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          flexWrap: "wrap",
          gap: "12px",
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "inherit", cursor: "pointer" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #4B0CA6, #7A1CCB)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Y</span>
          </div>
          <span style={{ fontSize: 18, fontWeight: 600, color: COLORS.black, letterSpacing: "0.05em" }}>YIELDO</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <Link to="/wallet" style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.6)", cursor: "pointer", textDecoration: "none" }}>For Wallets</Link>
          <Link to="/vault" style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.6)", cursor: "pointer", textDecoration: "none" }}>For Vaults</Link>
          <Link to="/creator" style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.6)", cursor: "pointer", textDecoration: "none" }}>For Creators</Link>
          <span style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.3)", cursor: "not-allowed", opacity: 0.5 }}>Docs</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ padding: "12px 18px", borderRadius: 4, border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer", background: "rgba(0,0,0,0.06)", color: "rgba(0,0,0,0.6)" }} onClick={() => window.open("https://app.yieldo.xyz", "_blank")}>Dashboard</button>
          <PrimaryButton onClick={() => navigate("/apply")}>Integrate Now</PrimaryButton>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          padding: "140px clamp(20px, 5vw, 260px) 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          marginTop: "80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: "50%",
            transform: "translateX(-50%)",
            width: 1400,
            height: 800,
            background: "radial-gradient(ellipse at center, rgba(212,205,255,0.4) 0%, rgba(255,255,255,0) 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Tag>The Yield Gateway</Tag>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 400,
              textTransform: "uppercase",
              lineHeight: 1.1,
              margin: "24px auto 0",
              maxWidth: 900,
              letterSpacing: "-0.02em",
            }}
          >
            The Stripe for<br />
            <GradientText style={{ fontSize: 64, fontWeight: 400 }}>on-chain yield</GradientText>
          </h1>
          <p style={{ fontSize: 22, maxWidth: 700, margin: "28px auto 0", lineHeight: 1.6, color: "rgba(0,0,0,0.6)" }}>
            One API. Every vault. Automatic revenue share.
            <br />
            Stop integrating 20 protocols — plug in Yieldo and ship yield in days.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40 }}>
            <PrimaryButton large onClick={() => navigate("/apply")}>Start Integration</PrimaryButton>
            <button style={{ backgroundImage: COLORS.purple.gradientLight, boxShadow: COLORS.purple.shadowLight, borderRadius: 4, padding: "12px 18px", border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 16, cursor: "not-allowed", opacity: 0.5 }} disabled><GradientText>View Documentation →</GradientText></button>
          </div>
          {/*<div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 56, alignItems: "center", flexWrap: "wrap" }}>
            {["Nightly", "Phantom", "MetaMask", "Rabby", "Zerion"].map((name) => (
              <div key={name} style={{ opacity: 0.5 }}>
                <WalletLogo name={name} />
              </div>
            ))}
          </div>*/}
        </div>
      </section>

      {/* PROBLEM / WHY */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)", background: "rgba(122,28,203,0.02)" }}>
        <SectionHeader
          tag="The Problem"
          title="Resource exhaustion kills wallet yield features"
          subtitle="Wallets face an impossible trilemma when trying to offer yield: too many protocols, zero monetization path, and unbearable complexity."
        />
        <div style={{ display: "flex", gap: 24, marginTop: 64, flexWrap: "wrap" }}>
          {[
            {
              icon: <LayersIcon />,
              title: "Market Fragmentation",
              desc: "Morpho, Aave, Compound, Yearn, Pendle — 20+ protocols across multiple chains. Each one is a separate integration nightmare for your engineering team.",
              stat: "20+",
              statLabel: "protocols to integrate",
            },
            {
              icon: <DollarIcon />,
              title: "Missing Incentives",
              desc: "Protocols want liquidity, not wallet partnerships. They have zero motivation to set up revenue-share for your distribution. Yield is a cost center, not a profit center.",
              stat: "0 bps",
              statLabel: "revenue for wallets today",
            },
            {
              icon: <ShieldIcon />,
              title: "Complexity Overload",
              desc: "Different vaults, different risks, different scoring systems. Which vault do you show first? How do you explain risk to users? You need curated middleware.",
              stat: "∞",
              statLabel: "risk combinations",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                flex: "1 1 0",
                minWidth: "280px",
                padding: 32,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid rgba(122,28,203,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {item.icon}
              <h3 style={{ fontSize: 20, fontWeight: 600, margin: 0, letterSpacing: "-0.01em" }}>{item.title}</h3>
              <p style={{ fontSize: 15, color: "rgba(0,0,0,0.55)", lineHeight: 1.6, margin: 0, flex: 1 }}>{item.desc}</p>
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 16, marginTop: 8 }}>
                <GradientText style={{ fontSize: 28, fontWeight: 600 }}>{item.stat}</GradientText>
                <div style={{ fontSize: 13, color: "rgba(0,0,0,0.4)", marginTop: 2 }}>{item.statLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THREE PILLARS */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)" }}>
        <SectionHeader
          tag="USP"
          title="Your Yield Infrastructure Layer"
          subtitle="Three pillars that turn yield from a maintenance burden into a revenue stream."
        />
        <div style={{ display: "flex", gap: 24, marginTop: 64, flexWrap: "wrap" }}>
          {[
            {
              id: "zero",
              icon: <PlugIcon />,
              label: "Zero-Maintenance Yield",
              title: "Integrate once, access every vault",
              bullets: [
                "Single API/SDK for all top yield protocols",
                "Morpho, Aave, Pendle + dozens more — auto-updated",
                "Multi-chain routing out of the box",
                "No per-protocol maintenance",
              ],
            },
            {
              id: "rev",
              icon: <DollarIcon />,
              label: "Revenue-as-a-Service",
              title: "Yield becomes your profit center",
              bullets: [
                "Automatic revenue share from 10 bps entry fee",
                "No custom fee-taking smart contracts needed",
                "Transparent on-chain tracking & dashboards",
                "You earn while users earn",
              ],
            },
            {
              id: "risk",
              icon: <ShieldIcon />,
              label: "Risk-Layer Abstraction",
              title: "Curator of curators",
              bullets: [
                "Aggregated scores from Credora, Bluechip & more",
                "Standardized risk format for your UI",
                "AI-curated strategy recommendations",
                "You're a platform, not an advisor",
              ],
            },
          ].map((pillar) => (
            <div
              key={pillar.id}
              onMouseEnter={() => setHoveredPillar(pillar.id)}
              onMouseLeave={() => setHoveredPillar(null)}
              style={{
                flex: "1 1 0",
                minWidth: "280px",
                padding: 32,
                borderRadius: 16,
                background: hoveredPillar === pillar.id ? "rgba(122,28,203,0.05)" : "#fff",
                border: hoveredPillar === pillar.id ? "1px solid rgba(122,28,203,0.2)" : "1px solid rgba(0,0,0,0.06)",
                boxShadow: hoveredPillar === pillar.id ? "0 8px 32px rgba(122,28,203,0.1)" : "none",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                cursor: "default",
              }}
            >
              {pillar.icon}
              <GradientText style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.02em" }}>{pillar.label}</GradientText>
              <h3 style={{ fontSize: 22, fontWeight: 600, margin: 0, lineHeight: 1.3, letterSpacing: "-0.01em" }}>{pillar.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {pillar.bullets.map((b, i) => (
                  <CheckItem key={i}>{b}</CheckItem>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE YIELD TABLE */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)", background: "rgba(122,28,203,0.02)" }}>
        <SectionHeader
          tag="Live Preview"
          title="Top AI-curated Yield Opportunities"
          subtitle="Preview the strategies your users will see. Real protocols, real yields, real-time updates."
        />
        <div style={{ marginTop: 56, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", background: "#fff", overflowX: "auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 80px",
              padding: "14px 20px",
              background: "rgba(122,28,203,0.04)",
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(0,0,0,0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              minWidth: "800px",
            }}
          >
            <span>Strategy</span>
            <span>APY Range</span>
            <span>Risk</span>
            <span>Chain</span>
            <span></span>
          </div>
          {[
            { name: "USDC Lending Optimizer", type: "Morpho + Aave", apy: "8.2% → 14.5%", risk: "Low", riskColor: "#45f265", chain: "Ethereum" },
            { name: "ETH Staking Yield", type: "Lido + Pendle", apy: "5.1% → 9.8%", risk: "Medium", riskColor: "#f2de45", chain: "Ethereum" },
            { name: "Stablecoin Compounder", type: "Yearn + Morpho", apy: "12.5% → 34%", risk: "Low", riskColor: "#45f265", chain: "Base" },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 80px",
                padding: "18px 20px",
                borderTop: "1px solid rgba(0,0,0,0.04)",
                alignItems: "center",
                fontSize: 15,
                minWidth: "800px",
              }}
            >
              <div>
                <div style={{ fontWeight: 500 }}>{row.name}</div>
                <div style={{ fontSize: 13, color: "rgba(0,0,0,0.4)", marginTop: 2 }}>{row.type}</div>
              </div>
              <div style={{ fontWeight: 500 }}>
                <span style={{ color: "#f24548" }}>{row.apy.split("→")[0]}</span>
                <span style={{ color: "rgba(0,0,0,0.3)", margin: "0 4px" }}>→</span>
                <span style={{ color: "#45f265" }}>{row.apy.split("→")[1]}</span>
              </div>
              <div>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 4,
                    background: `${row.riskColor}15`,
                    border: `1px solid ${row.riskColor}`,
                    color: row.riskColor,
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {row.risk}
                </span>
              </div>
              <div style={{ color: "rgba(0,0,0,0.6)" }}>{row.chain}</div>
              <div style={{ textAlign: "right" }}>
                <span style={{ cursor: "pointer", color: "#7A1CCB", fontSize: 18 }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)" }}>
        <SectionHeader
          tag="Integration"
          title="How It Works"
          subtitle="Go from zero to yield in three steps. No smart contract development required."
        />
        <div style={{ display: "flex", gap: 80, marginTop: 64, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            {
              step: "01",
              title: "Integrate",
              desc: "Drop in our SDK or call our API. One endpoint, standardized data for all vaults.",
              icon: "🔌",
            },
            {
              step: "02",
              title: "Curate",
              desc: "Choose which strategies to show your users. AI-scored, risk-rated, auto-updated.",
              icon: "⭐",
            },
            {
              step: "03",
              title: "Earn",
              desc: "Automatic revenue share from every deposit. Track your AUM-time in real-time dashboards.",
              icon: "💰",
            },
          ].map((s, i) => (
            <div key={i} style={{ flex: "1 1 0", minWidth: "250px", maxWidth: "350px", textAlign: "center", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 280,
                  height: 120,
                  background: "radial-gradient(ellipse at center, rgba(122,28,203,0.08) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px" }}>
                  <GradientText style={{ fontSize: 14, opacity: 0.5 }}>STEP</GradientText>
                  <GradientText style={{ fontSize: 48, opacity: 0.3 }}>{s.step}</GradientText>
                </div>
                <div style={{ fontSize: 48, margin: "8px 0 16px" }}>{s.icon}</div>
                <h3 style={{ fontSize: 36, fontWeight: 400, margin: "0 0 12px" }}>{s.title}</h3>
                <p style={{ fontSize: 15, color: "rgba(0,0,0,0.55)", lineHeight: 1.6, maxWidth: 300, margin: "0 auto" }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ECONOMICS */}
      <section style={{ padding: "80px clamp(20px, 5vw, 260px)" }}>
        <div
          style={{
            borderRadius: 16,
            padding: "64px 80px",
            background: COLORS.purple.gradientBg,
            boxShadow: "0px 0px 47px 0px rgba(122,28,203,0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 200,
              background: "radial-gradient(ellipse at center bottom, rgba(141,31,249,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", textAlign: "center" }}>
            <Tag>Economics</Tag>
            <h2 style={{ fontSize: 48, fontWeight: 400, textTransform: "uppercase", margin: "16px 0 40px", letterSpacing: "-0.02em" }}>
              Transparent & Aligned
            </h2>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
              <StatCard number="10 bps" label="Entry Fee" sublabel="0.1% — industry lowest" />
              <StatCard number="5 bps" label="Your Revenue Share" sublabel="50% goes directly to you" />
              <StatCard number="$500K+" label="Annual at $500M Volume" sublabel="Scales with your AUM" />
              <StatCard number="0" label="Dev Overhead" sublabel="No smart contract work needed" />
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)" }}>
        <SectionHeader
          tag="Vision"
          title="The Most Trusted Filter in DeFi"
          subtitle="From curated middleware to decentralized yield governance."
        />
        <div style={{ display: "flex", gap: 0, marginTop: 56, position: "relative", flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ position: "absolute", top: "50%", left: 80, right: 80, height: 2, background: "linear-gradient(90deg, rgba(122,28,203,0.15) 0%, rgba(122,28,203,0.3) 50%, rgba(122,28,203,0.15) 100%)", transform: "translateY(-50%)", display: "none" }} />
          {[
            { phase: "Today", title: "Curated Middleware", desc: "Yieldo selects vaults based on external scoring (Credora, Bluechip). One API, best yields." },
            { phase: "Tomorrow", title: "Community Governance", desc: "Token holders and curators vote on which vaults enter the Recommended tier for partner wallets." },
            { phase: "Future", title: "Chainlink for Yield", desc: "Decentralized curation network. Risk ownership shifts to the system. Yieldo becomes the trust layer." },
          ].map((v, i) => (
            <div key={i} style={{ flex: "1 1 0", minWidth: "280px", maxWidth: "350px", textAlign: "center", position: "relative", zIndex: 1, marginBottom: 40 }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundImage: COLORS.purple.gradient,
                  margin: "0 auto 20px",
                  boxShadow: "0 0 12px rgba(122,28,203,0.4)",
                }}
              />
              <GradientText style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{v.phase}</GradientText>
              <h3 style={{ fontSize: 20, fontWeight: 600, margin: "8px 0", letterSpacing: "-0.01em" }}>{v.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(0,0,0,0.5)", lineHeight: 1.6, maxWidth: 280, margin: "0 auto" }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px clamp(20px, 5vw, 260px) 100px" }}>
        <div
          style={{
            borderRadius: 16,
            padding: "80px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            backgroundImage: COLORS.purple.gradientBg,
            boxShadow: "0px 0px 47px rgba(69,199,242,0.1)",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 300,
              background: "radial-gradient(ellipse at center bottom, rgba(141,31,249,0.2) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative" }}>
            <Tag>Get Started</Tag>
            <h2 style={{ fontSize: 56, fontWeight: 400, textTransform: "uppercase", margin: "16px 0 32px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Ready to turn yield<br />into revenue?
            </h2>
            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <PrimaryButton large onClick={() => navigate("/apply")}>Start Integration</PrimaryButton>
              <SecondaryButton onClick={() => navigate("/apply")}>Book a Demo</SecondaryButton>
            </div>
            <p style={{ fontSize: 14, color: "rgba(0,0,0,0.4)", marginTop: 16 }}>
              Free to start · No minimum volume · Ship in days
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "48px clamp(20px, 5vw, 260px)",
          backgroundImage: COLORS.purple.gradientBg,
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg, #4B0CA6, #7A1CCB)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 12 }}>Y</span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "0.05em" }}>YIELDO</span>
            </div>
            <p style={{ fontSize: 15, color: "rgba(0,0,0,0.5)", maxWidth: 400, lineHeight: 1.5 }}>
              The intelligent distribution layer for on-chain yield. One API for every wallet.
            </p>
          </div>
          <div style={{ display: "flex", gap: 32, fontSize: 15, color: "rgba(0,0,0,0.5)", flexWrap: "wrap" }}>
            <Link to="/wallet" style={{ color: "inherit", textDecoration: "none" }}>For Wallets</Link>
            <Link to="/vault" style={{ color: "inherit", textDecoration: "none" }}>For Vaults</Link>
            <Link to="/creator" style={{ color: "inherit", textDecoration: "none" }}>For Creators</Link>
            <span style={{ color: "rgba(0,0,0,0.3)", opacity: 0.5, cursor: "not-allowed" }}>Documentation</span>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 13, color: "rgba(0,0,0,0.4)", margin: 0 }}>© 2025 YIELDO — All rights reserved</p>
          <div style={{ display: "flex", gap: 8 }}>
            {["𝕏", "✈", "▶", "M"].map((icon, i) => (
              <div
                key={i}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 4,
                  backgroundImage: COLORS.purple.gradientLight,
                  boxShadow: COLORS.purple.shadowLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 14,
                  color: "rgba(0,0,0,0.5)",
                }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
