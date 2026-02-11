import { useState } from "react";
import { Link } from "react-router-dom";

const COLORS = {
  black: "#121212",
  purple: {
    gradient: "linear-gradient(100deg, #4B0CA6 0%, #7A1CCB 58%, #9E3BFF 114%)",
    gradientLight: "linear-gradient(100deg, rgba(75,12,166,0.1) 0%, rgba(122,28,203,0.1) 58%, rgba(158,59,255,0.1) 114%)",
    gradientBg: "linear-gradient(100deg, rgba(75,12,166,0.05) 0%, rgba(122,28,203,0.05) 58%, rgba(158,59,255,0.05) 114%)",
    shadow: "0px 0px 17px 0px rgba(80,14,170,0.15)",
    shadowLight: "0px 0px 17px 0px rgba(80,14,170,0.1)",
  },
  teal: {
    gradient: "linear-gradient(101deg, #45C7F2 0%, #4FE3C1 58%, #4596F2 114%)",
  },
  green: "#45f265",
  gold: "#f2de45",
};

function GradientText({ children, style = {} }) {
  return (
    <span style={{ backgroundImage: COLORS.purple.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", ...style }}>
      {children}
    </span>
  );
}

function PrimaryButton({ children, large, onClick }) {
  return (
    <button onClick={onClick} style={{ backgroundImage: COLORS.purple.gradient, boxShadow: COLORS.purple.shadow, borderRadius: 4, padding: large ? "14px 28px" : "12px 18px", border: "none", color: "#fff", fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: large ? 18 : 16, cursor: "pointer" }}>
      {children}
    </button>
  );
}

function SecondaryButton({ children }) {
  return (
    <button style={{ backgroundImage: COLORS.purple.gradientLight, boxShadow: COLORS.purple.shadowLight, borderRadius: 4, padding: "12px 18px", border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer" }}>
      <GradientText>{children}</GradientText>
    </button>
  );
}

function Tag({ children }) {
  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "4px 14px", borderRadius: 100 }}>
      <span style={{ position: "absolute", filter: "blur(6px)", fontWeight: 700, fontSize: 18, color: "rgba(69,150,242,0.8)", letterSpacing: "-0.36px" }}>{children}</span>
      <span style={{ position: "relative", fontSize: 14, color: "rgba(100,100,120,0.9)", fontWeight: 500 }}>{children}</span>
    </div>
  );
}

function SectionHeader({ tag, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      {tag && <Tag>{tag}</Tag>}
      <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 48, fontWeight: 400, color: COLORS.black, textTransform: "uppercase", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{title}</h2>
      {subtitle && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, color: COLORS.black, maxWidth: 720, margin: 0, lineHeight: 1.5, opacity: 0.7 }}>{subtitle}</p>}
    </div>
  );
}

function CheckItem({ children }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="#7A1CCB" strokeWidth="1.5" />
        <path d="M8 12.5L11 15.5L16 9.5" stroke="#7A1CCB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontSize: 15, color: "rgba(0,0,0,0.6)", fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>{children}</span>
    </div>
  );
}

/* ============ CAMPAIGN BUILDER INTERACTIVE ============ */
function CampaignBuilder() {
  const [baseBps, setBaseBps] = useState(10);
  const [boostBps, setBoostBps] = useState(20);
  const [lockDays, setLockDays] = useState(60);
  const [minAum, setMinAum] = useState(50000);

  const formatNum = (n) => n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;

  return (
    <div style={{ background: "#0a0a14", borderRadius: 16, padding: 32, color: "#fff", fontFamily: "'Inter', sans-serif", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <span style={{ fontSize: 18, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>Campaign Builder</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: 10, padding: "3px 8px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4 }}>Preview</span>
        </div>
        <div style={{ fontSize: 12, color: "#45C7F2" }}>⚡ Live Preview</div>
      </div>

      {/* Revenue Share Tiers */}
      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 24, marginBottom: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>Revenue Share Tiers</div>

        {/* Base Tier */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, padding: "16px 20px", background: "rgba(122,28,203,0.1)", borderRadius: 8, border: "1px solid rgba(122,28,203,0.2)" }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, backgroundImage: COLORS.purple.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📊</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Base Tier</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Revenue share on any AUM routed through partner wallets</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <input
              type="range"
              min={1}
              max={30}
              value={baseBps}
              onChange={(e) => setBaseBps(Number(e.target.value))}
              style={{ width: 80, accentColor: "#9E3BFF" }}
            />
            <div style={{ minWidth: 60, textAlign: "right" }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: "#9E3BFF" }}>{baseBps}%</span>
            </div>
          </div>
        </div>

        {/* Boost Tier */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: "rgba(69,242,101,0.06)", borderRadius: 8, border: "1px solid rgba(69,242,101,0.15)" }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg, #45f265, #2dd84e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🚀</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.green, marginBottom: 2 }}>Loyalty Boost</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Bonus for AUM that stays ≥ {lockDays} days</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <input
              type="range"
              min={baseBps + 1}
              max={50}
              value={boostBps}
              onChange={(e) => setBoostBps(Number(e.target.value))}
              style={{ width: 80, accentColor: "#45f265" }}
            />
            <div style={{ minWidth: 60, textAlign: "right" }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: COLORS.green }}>{boostBps}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Criteria */}
      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 24, marginBottom: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>Campaign Criteria</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ padding: "14px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>Min. AUM per Wallet</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="range"
                min={1000}
                max={500000}
                step={1000}
                value={minAum}
                onChange={(e) => setMinAum(Number(e.target.value))}
                style={{ flex: 1, accentColor: "#45C7F2" }}
              />
              <span style={{ fontSize: 16, fontWeight: 600, color: "#45C7F2", minWidth: 50, textAlign: "right" }}>{formatNum(minAum)}</span>
            </div>
          </div>
          <div style={{ padding: "14px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>Loyalty Lock Period</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="range"
                min={7}
                max={180}
                value={lockDays}
                onChange={(e) => setLockDays(Number(e.target.value))}
                style={{ flex: 1, accentColor: "#45C7F2" }}
              />
              <span style={{ fontSize: 16, fontWeight: 600, color: "#45C7F2", minWidth: 50, textAlign: "right" }}>{lockDays}d</span>
            </div>
          </div>
          <div style={{ padding: "14px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>Campaign Duration</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>90 days</div>
          </div>
          <div style={{ padding: "14px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>Eligible Partners</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>All Wallets</div>
          </div>
        </div>
      </div>

      {/* Simulation */}
      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>Projected Impact @ $10M AUM</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <div style={{ textAlign: "center", padding: 16 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>Base Rev. Share</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#9E3BFF" }}>${((10000000 * baseBps) / 100 / 100).toLocaleString()}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{baseBps}% of 10 bps fee</div>
          </div>
          <div style={{ textAlign: "center", padding: 16 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>Loyalty Boost Pool</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.green }}>${((10000000 * boostBps) / 100 / 100 * 0.6).toLocaleString()}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>~60% qualify for {lockDays}d lock</div>
          </div>
          <div style={{ textAlign: "center", padding: 16 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>Wallet Motivation</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#45C7F2" }}>High</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Top 20% priority listing</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ TIER VISUAL ============ */
function TierVisual() {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      {/* Base */}
      <div style={{ flex: 1, borderRadius: 14, border: "1px solid rgba(122,28,203,0.15)", overflow: "hidden", background: "#fff" }}>
        <div style={{ padding: "20px 24px", backgroundImage: COLORS.purple.gradientLight }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}><GradientText>BASE TIER</GradientText></div>
          <div style={{ fontSize: 32, fontWeight: 600, marginTop: 4, color: COLORS.black }}>10%<span style={{ fontSize: 16, fontWeight: 400, color: "rgba(0,0,0,0.4)", marginLeft: 4 }}>rev share</span></div>
        </div>
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 14, color: "rgba(0,0,0,0.5)", lineHeight: 1.6 }}>
            Wallets receive a cut of the Yieldo fee on every dollar of AUM they route to your vault. No lock-up required.
          </div>
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "rgba(0,0,0,0.4)" }}>Condition</span>
              <span style={{ fontWeight: 500 }}>Any AUM routed</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "rgba(0,0,0,0.4)" }}>Min. lock</span>
              <span style={{ fontWeight: 500 }}>None</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "rgba(0,0,0,0.4)" }}>Payout</span>
              <span style={{ fontWeight: 500 }}>Continuous</span>
            </div>
          </div>
        </div>
      </div>

      {/* Boost */}
      <div style={{ flex: 1, borderRadius: 14, border: "2px solid rgba(69,242,101,0.3)", overflow: "hidden", background: "#fff", position: "relative" }}>
        <div style={{ position: "absolute", top: 12, right: 12, background: COLORS.green, color: "#000", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, letterSpacing: "0.03em" }}>RECOMMENDED</div>
        <div style={{ padding: "20px 24px", background: "rgba(69,242,101,0.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "#2aa845" }}>LOYALTY BOOST</div>
          <div style={{ fontSize: 32, fontWeight: 600, marginTop: 4, color: COLORS.black }}>20%<span style={{ fontSize: 16, fontWeight: 400, color: "rgba(0,0,0,0.4)", marginLeft: 4 }}>rev share</span></div>
        </div>
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 14, color: "rgba(0,0,0,0.5)", lineHeight: 1.6 }}>
            Wallets earn double rev share on AUM that stays in your vault for 60+ days. Sticky capital = higher reward.
          </div>
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "rgba(0,0,0,0.4)" }}>Condition</span>
              <span style={{ fontWeight: 500, color: "#2aa845" }}>AUM stays ≥ 60 days</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "rgba(0,0,0,0.4)" }}>Min. AUM</span>
              <span style={{ fontWeight: 500 }}>$50K per wallet</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "rgba(0,0,0,0.4)" }}>Payout</span>
              <span style={{ fontWeight: 500 }}>After lock period</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom */}
      <div style={{ flex: 1, borderRadius: 14, border: "1px solid rgba(69,199,242,0.2)", overflow: "hidden", background: "#fff" }}>
        <div style={{ padding: "20px 24px", background: "rgba(69,199,242,0.05)" }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "#3a9cc7" }}>CUSTOM CAMPAIGN</div>
          <div style={{ fontSize: 32, fontWeight: 600, marginTop: 4, color: COLORS.black }}>You set<span style={{ fontSize: 16, fontWeight: 400, color: "rgba(0,0,0,0.4)", marginLeft: 4 }}>the rules</span></div>
        </div>
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 14, color: "rgba(0,0,0,0.5)", lineHeight: 1.6 }}>
            Full campaign builder: set tiers, thresholds, lock periods, and bonus structures. Target specific wallet partners or KOLs.
          </div>
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "rgba(0,0,0,0.4)" }}>Condition</span>
              <span style={{ fontWeight: 500 }}>Fully customizable</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "rgba(0,0,0,0.4)" }}>Targeting</span>
              <span style={{ fontWeight: 500 }}>By wallet or KOL</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "rgba(0,0,0,0.4)" }}>Analytics</span>
              <span style={{ fontWeight: 500 }}>Full funnel tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ FLOW DIAGRAM ============ */
function FlowDiagram() {
  const boxStyle = (bg, border) => ({
    padding: "14px 20px",
    borderRadius: 10,
    background: bg,
    border: `1px solid ${border}`,
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
  });
  const arrow = { fontSize: 20, color: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center" };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "24px 0" }}>
      <div style={boxStyle("rgba(122,28,203,0.06)", "rgba(122,28,203,0.15)")}>
        <div style={{ fontSize: 22, marginBottom: 4 }}>🏦</div>
        <GradientText style={{ fontWeight: 600 }}>Your Vault</GradientText>
        <div style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", marginTop: 2 }}>Sets rev share tiers</div>
      </div>
      <div style={arrow}>→</div>
      <div style={boxStyle("rgba(158,59,255,0.06)", "rgba(158,59,255,0.15)")}>
        <div style={{ fontSize: 22, marginBottom: 4 }}>⚡</div>
        <GradientText style={{ fontWeight: 600 }}>Yieldo</GradientText>
        <div style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", marginTop: 2 }}>Routes & tracks AUM</div>
      </div>
      <div style={arrow}>→</div>
      <div style={boxStyle("rgba(69,199,242,0.06)", "rgba(69,199,242,0.15)")}>
        <div style={{ fontSize: 22, marginBottom: 4 }}>👛</div>
        <span style={{ fontWeight: 600, color: "#3a9cc7" }}>Wallet Partners</span>
        <div style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", marginTop: 2 }}>Earn rev share on AUM</div>
      </div>
      <div style={arrow}>→</div>
      <div style={boxStyle("rgba(69,242,101,0.06)", "rgba(69,242,101,0.15)")}>
        <div style={{ fontSize: 22, marginBottom: 4 }}>👤</div>
        <span style={{ fontWeight: 600, color: "#2aa845" }}>End Users</span>
        <div style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", marginTop: 2 }}>Get best yield, seamless UX</div>
      </div>
    </div>
  );
}

/* ============ MAIN PAGE ============ */
export default function ForVaultsV2() {
  const [activeTab, setActiveTab] = useState("revenue");
  const [hoveredBenefit, setHoveredBenefit] = useState(null);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: COLORS.black, overflowX: "hidden" }}>
      {/* NAV */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px clamp(20px, 5vw, 260px)", position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, flexWrap: "wrap", gap: "12px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "inherit", cursor: "pointer" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #4B0CA6, #7A1CCB)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Y</span>
          </div>
          <span style={{ fontSize: 18, fontWeight: 600, color: COLORS.black, letterSpacing: "0.05em" }}>YIELDO</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <Link to="/wallet" style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.6)", cursor: "pointer", textDecoration: "none" }}>For Wallets</Link>
          <Link to="/vault" style={{ padding: "8px 18px", fontSize: 15, fontWeight: 600, color: COLORS.black, cursor: "pointer", borderBottom: "2px solid #7A1CCB", textDecoration: "none" }}>For Vaults</Link>
          <Link to="/creator" style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.6)", cursor: "pointer", textDecoration: "none" }}>For Creators</Link>
          <span style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.3)", cursor: "not-allowed", opacity: 0.5 }}>Docs</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <SecondaryButton>Dashboard</SecondaryButton>
          <PrimaryButton>List Your Vault</PrimaryButton>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "140px clamp(20px, 5vw, 260px) 80px", textAlign: "center", position: "relative", overflow: "hidden", marginTop: "80px" }}>
        <div style={{ position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)", width: 1400, height: 800, background: "radial-gradient(ellipse at center, rgba(212,205,255,0.35) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Tag>For Vault Protocols & Curators</Tag>
          <h1 style={{ fontSize: 64, fontWeight: 400, textTransform: "uppercase", lineHeight: 1.1, margin: "24px auto 0", maxWidth: 1000, letterSpacing: "-0.02em" }}>
            Incentivize wallets.<br />
            <GradientText style={{ fontSize: 64, fontWeight: 400 }}>Grow your AUM.</GradientText>
          </h1>
          <p style={{ fontSize: 22, maxWidth: 750, margin: "28px auto 0", lineHeight: 1.6, color: "rgba(0,0,0,0.6)" }}>
            Offer tiered revenue share and run targeted campaigns to attract sticky capital from the largest wallet distribution network in DeFi.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40 }}>
            <PrimaryButton large>Create a Campaign</PrimaryButton>
            <SecondaryButton>See How It Works →</SecondaryButton>
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section style={{ padding: "40px clamp(20px, 5vw, 260px) 60px" }}>
        <FlowDiagram />
      </section>

      {/* REVENUE SHARE MODEL — HERO SECTION */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)", background: "rgba(122,28,203,0.02)" }}>
        <SectionHeader
          tag="Revenue Share"
          title="Your vault, their motivation"
          subtitle="Wallets actively promote vaults that pay them. Set your revenue share tiers and watch distribution partners compete to bring you AUM."
        />

        <div style={{ marginTop: 56 }}>
          <TierVisual />
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <p style={{ fontSize: 16, color: "rgba(0,0,0,0.5)", maxWidth: 650, margin: "0 auto 24px", lineHeight: 1.6 }}>
            Higher revenue share = higher priority in wallet UIs. Wallets see your offer alongside competing vaults and route users to the best deal. It's a transparent marketplace.
          </p>
          <PrimaryButton>Set Up Revenue Share</PrimaryButton>
        </div>
      </section>

      {/* CAMPAIGN BUILDER */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)" }}>
        <SectionHeader
          tag="Campaigns"
          title="Build campaigns that attract sticky capital"
          subtitle="Define criteria, set rewards, and let the wallet network do the rest. Full control, full transparency."
        />

        <div style={{ display: "flex", gap: 40, marginTop: 56, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 0", display: "flex", flexDirection: "column", gap: 24 }}>
            <h3 style={{ fontSize: 24, fontWeight: 400, margin: 0, lineHeight: 1.4 }}>
              Define exactly what you want —<br />
              <GradientText style={{ fontWeight: 500 }}>Yieldo finds the wallets that deliver.</GradientText>
            </h3>
            <p style={{ fontSize: 16, color: "rgba(0,0,0,0.55)", lineHeight: 1.7, margin: 0 }}>
              Campaigns let you go beyond flat revenue share. Set AUM thresholds, lock periods, 
              bonus tiers, and target specific wallet partners. Yieldo tracks everything on-chain 
              and distributes rewards automatically.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <CheckItem>Tiered incentives: base rate + loyalty boost for sticky AUM</CheckItem>
              <CheckItem>Campaign criteria: min AUM, lock period, wallet type, chain</CheckItem>
              <CheckItem>Automatic payout: smart-contract-enforced reward distribution</CheckItem>
              <CheckItem>Real-time analytics: track which wallets hit your criteria</CheckItem>
              <CheckItem>A/B test: run multiple campaigns and compare conversion</CheckItem>
            </div>
          </div>
          <div style={{ flex: "1.2 1 0" }}>
            <CampaignBuilder />
          </div>
        </div>
      </section>

      {/* WHY WALLETS CARE */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)", background: "rgba(122,28,203,0.02)" }}>
        <SectionHeader
          tag="Wallet Perspective"
          title="Why wallets will push your vault"
          subtitle="Understanding the wallet's incentive structure is key to maximizing your distribution."
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 56 }}>
          <div style={{ padding: 32, borderRadius: 14, background: "#fff", border: "1px solid rgba(122,28,203,0.08)" }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}><GradientText>Without Yieldo</GradientText></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Yield is a feature — costs dev time, earns nothing",
                "Each protocol requires separate integration",
                "No revenue share, no incentive to promote",
                "Which vault to show first? No data to decide",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "#f24548", fontSize: 16, flexShrink: 0, marginTop: 1 }}>✕</span>
                  <span style={{ fontSize: 14, color: "rgba(0,0,0,0.5)", lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: 32, borderRadius: 14, background: "#fff", border: "2px solid rgba(69,242,101,0.2)", position: "relative" }}>
            <div style={{ position: "absolute", top: 12, right: 16, background: "rgba(69,242,101,0.1)", color: "#2aa845", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100 }}>WHAT WALLETS SEE</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#2aa845", marginBottom: 16 }}>With Yieldo + Your Campaign</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Yield is a profit center — automatic revenue share",
                "One SDK, all vaults, zero maintenance",
                "Your 20% loyalty boost = priority promotion slot",
                "AI-curated ranking, your vault promoted first",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "#45f265", fontSize: 16, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 14, color: "rgba(0,0,0,0.6)", lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 40, padding: "24px 32px", borderRadius: 12, background: "rgba(242,222,69,0.06)", border: "1px solid rgba(242,222,69,0.2)", display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ fontSize: 28, flexShrink: 0 }}>💡</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.black, marginBottom: 4 }}>The key insight</div>
            <div style={{ fontSize: 14, color: "rgba(0,0,0,0.6)", lineHeight: 1.6 }}>
              Wallets rank vaults by a blend of APY, risk score, and <strong>revenue share offer</strong>. A vault offering 20% loyalty boost will consistently appear above a vault offering 0%. You're not paying for ads — you're paying for aligned incentives.
            </div>
          </div>
        </div>
      </section>

      {/* EXAMPLE SCENARIOS */}
      <section style={{ padding: "100px clamp(20px, 5vw, 260px)" }}>
        <SectionHeader
          tag="Examples"
          title="Campaign strategies that work"
        />

        <div style={{ display: "flex", gap: 20, marginTop: 48 }}>
          {[
            {
              title: "The Sticky Capital Play",
              vault: "USDC Lending Vault",
              config: "10% base + 25% for 90-day lock",
              result: "72% of AUM stays 90+ days",
              color: "#9E3BFF",
              bg: "rgba(158,59,255,0.04)",
              border: "rgba(158,59,255,0.12)",
            },
            {
              title: "The Growth Sprint",
              vault: "ETH Staking Strategy",
              config: "15% flat, no lock, 30-day campaign",
              result: "3x AUM in first month",
              color: "#45C7F2",
              bg: "rgba(69,199,242,0.04)",
              border: "rgba(69,199,242,0.12)",
            },
            {
              title: "The Whale Magnet",
              vault: "Multi-asset Compounder",
              config: "8% base + 30% for AUM > $500K",
              result: "Average deposit size ↑ 4.2x",
              color: "#45f265",
              bg: "rgba(69,242,101,0.04)",
              border: "rgba(69,242,101,0.12)",
            },
          ].map((ex, i) => (
            <div key={i} style={{ flex: 1, borderRadius: 14, overflow: "hidden", border: `1px solid ${ex.border}`, background: "#fff" }}>
              <div style={{ padding: "20px 24px", background: ex.bg }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: ex.color, letterSpacing: "0.02em", marginBottom: 4 }}>{ex.title}</div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>{ex.vault}</div>
              </div>
              <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(0,0,0,0.35)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Campaign Config</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{ex.config}</div>
                </div>
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 12 }}>
                  <div style={{ fontSize: 11, color: "rgba(0,0,0,0.35)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Result</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: ex.color }}>{ex.result}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ padding: "80px clamp(20px, 5vw, 260px)", background: "rgba(122,28,203,0.02)" }}>
        <SectionHeader tag="Comparison" title="Revenue Share vs. Traditional Marketing" />
        <div style={{ marginTop: 48, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", background: "#fff" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", background: "rgba(122,28,203,0.04)" }}>
            <div style={{ padding: "16px 24px" }}></div>
            <div style={{ padding: "16px 24px", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center" }}><GradientText>Yieldo Campaigns</GradientText></div>
            <div style={{ padding: "16px 24px", fontSize: 13, fontWeight: 600, color: "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center" }}>Ads / Grants / BD</div>
          </div>
          {[
            { feature: "Pay for", yieldo: "Actual AUM delivered", trad: "Impressions / clicks" },
            { feature: "Capital stickiness", yieldo: "Incentivized with lock tiers", trad: "No retention mechanism" },
            { feature: "Attribution", yieldo: "100% on-chain", trad: "Approximate UTMs" },
            { feature: "Time to AUM", yieldo: "Days (existing wallets)", trad: "Months (build audience)" },
            { feature: "Cost predictability", yieldo: "% of volume (scales)", trad: "Fixed burn rate" },
            { feature: "Partner alignment", yieldo: "Wallets earn when you earn", trad: "No shared incentive" },
          ].map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
              <div style={{ padding: "14px 24px", fontSize: 14, fontWeight: 500 }}>{row.feature}</div>
              <div style={{ padding: "14px 24px", fontSize: 14, textAlign: "center", color: "#4B0CA6", fontWeight: 500, background: "rgba(122,28,203,0.02)" }}>{row.yieldo}</div>
              <div style={{ padding: "14px 24px", fontSize: 14, textAlign: "center", color: "rgba(0,0,0,0.4)" }}>{row.trad}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px clamp(20px, 5vw, 260px) 100px" }}>
        <div style={{ borderRadius: 16, padding: "80px", textAlign: "center", position: "relative", overflow: "hidden", backgroundImage: COLORS.purple.gradientBg, boxShadow: "0px 0px 47px rgba(69,199,242,0.1)" }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 300, background: "radial-gradient(ellipse at center bottom, rgba(141,31,249,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <Tag>Get Started</Tag>
            <h2 style={{ fontSize: 56, fontWeight: 400, textTransform: "uppercase", margin: "16px 0 20px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Turn wallets into<br />your distribution army
            </h2>
            <p style={{ fontSize: 18, color: "rgba(0,0,0,0.55)", maxWidth: 650, margin: "0 auto 32px", lineHeight: 1.6 }}>
              Set your revenue share, launch a campaign, and let the wallet network compete to bring you the most AUM. Aligned incentives, on-chain transparency.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <PrimaryButton large>Create Your First Campaign</PrimaryButton>
              <SecondaryButton>Talk to the Team</SecondaryButton>
            </div>
            <p style={{ fontSize: 14, color: "rgba(0,0,0,0.4)", marginTop: 16 }}>
              No listing fees · No minimum volume · Campaign builder included
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "48px clamp(20px, 5vw, 260px)", backgroundImage: COLORS.purple.gradientBg, display: "flex", flexDirection: "column", gap: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg, #4B0CA6, #7A1CCB)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 12 }}>Y</span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "0.05em" }}>YIELDO</span>
            </div>
            <p style={{ fontSize: 15, color: "rgba(0,0,0,0.5)", maxWidth: 400, lineHeight: 1.5 }}>The intelligent distribution layer for on-chain yield.</p>
          </div>
          <div style={{ display: "flex", gap: 32, fontSize: 15, color: "rgba(0,0,0,0.5)" }}>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>For Wallets</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>For Vaults</a>
            <span style={{ color: "rgba(0,0,0,0.3)", opacity: 0.5, cursor: "not-allowed" }}>Documentation</span>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 13, color: "rgba(0,0,0,0.4)", margin: 0 }}>© 2025 YIELDO — All rights reserved</p>
          <div style={{ display: "flex", gap: 8 }}>
            {["𝕏", "✈", "▶", "M"].map((icon, i) => (
              <div key={i} style={{ width: 36, height: 36, borderRadius: 4, backgroundImage: COLORS.purple.gradientLight, boxShadow: COLORS.purple.shadowLight, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: "rgba(0,0,0,0.5)" }}>{icon}</div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
