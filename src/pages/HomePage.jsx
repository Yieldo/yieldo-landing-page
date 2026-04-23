import { useState, useEffect, useRef } from "react";
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

/* ===== SCROLL ANIMATION HOOK ===== */
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function AnimatedSection({ children, className = "", style = {} }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`fade-in-up ${className}`} style={style}>
      {children}
    </div>
  );
}

/* ===== SHARED COMPONENTS ===== */
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

function PrimaryButton({ children, large, onClick, className = "", style = {} }) {
  return (
    <button
      className={className}
      onClick={onClick}
      style={{
        backgroundImage: COLORS.purple.gradient,
        boxShadow: COLORS.purple.shadow,
        borderRadius: 8,
        padding: large ? "14px 28px" : "12px 18px",
        border: "none",
        color: "#fff",
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 500,
        fontSize: large ? 18 : 16,
        cursor: "pointer",
        letterSpacing: "-0.01em",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, className = "", style = {} }) {
  return (
    <button
      className={className}
      onClick={onClick}
      style={{
        backgroundImage: COLORS.purple.gradientLight,
        boxShadow: COLORS.purple.shadowLight,
        borderRadius: 8,
        padding: "12px 18px",
        border: "none",
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 500,
        fontSize: 16,
        cursor: "pointer",
        backgroundClip: "padding-box",
        ...style,
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
        className="section-title"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
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
          className="section-subtitle"
          style={{
            fontFamily: "'Outfit', sans-serif",
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="#7A1CCB" strokeWidth="1.5" />
        <path d="M8 12.5L11 15.5L16 9.5" stroke="#7A1CCB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontSize: 16, color: "rgba(0,0,0,0.6)", fontFamily: "'Outfit', sans-serif" }}>
        {children}
      </span>
    </div>
  );
}

function StatCard({ number, label, sublabel }) {
  return (
    <div
      className="stat-card"
      style={{
        flex: "1 1 0",
        padding: "32px 28px",
        borderRadius: 12,
        background: "rgba(122,28,203,0.04)",
        border: "1px solid rgba(122,28,203,0.08)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 40, fontWeight: 500, fontFamily: "'Outfit', sans-serif" }}>
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

/* ===== HAMBURGER ICON ===== */
function HamburgerIcon({ open }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="2" strokeLinecap="round">
      {open ? (
        <>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="6" y1="18" x2="18" y2="6" />
        </>
      ) : (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      )}
    </svg>
  );
}

export default function YieldoHomepage() {
  const navigate = useNavigate();
  const [hoveredPillar, setHoveredPillar] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  // Track scroll for nav shadow
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navTo = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#fff", color: COLORS.black, overflowX: "hidden" }}>
      {/* NAV */}
      <nav
        className="main-nav section-padding"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px clamp(16px, 5vw, 260px)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: navScrolled ? "rgba(255,255,255,0.92)" : "#fff",
          backdropFilter: navScrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: navScrolled ? "blur(16px)" : "none",
          boxShadow: navScrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "inherit", cursor: "pointer" }}>
          <img src="/yieldo-new.png" alt="Yieldo" style={{ width: 32, height: 32, borderRadius: 8 }} />
          <span style={{ fontSize: 18, fontWeight: 600, color: COLORS.black, letterSpacing: "0.05em" }}>YIELDO</span>
        </Link>
        <div className="nav-links">
          <Link to="/wallet" style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.6)", cursor: "pointer", textDecoration: "none", borderRadius: 6, transition: "background 0.2s" }}>For Wallets</Link>
          <Link to="/vault" style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.6)", cursor: "pointer", textDecoration: "none", borderRadius: 6, transition: "background 0.2s" }}>For Vaults</Link>
          <Link to="/creator" style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.6)", cursor: "pointer", textDecoration: "none", borderRadius: 6, transition: "background 0.2s" }}>For Creators</Link>
          <a href="https://docs.yieldo.xyz" target="_blank" rel="noopener noreferrer" style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.6)", cursor: "pointer", textDecoration: "none", borderRadius: 6, transition: "background 0.2s" }}>Docs</a>
        </div>
        <div className="nav-actions">
          <button style={{ padding: "10px 18px", borderRadius: 8, border: "none", fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: 15, cursor: "pointer", background: "rgba(0,0,0,0.05)", color: "rgba(0,0,0,0.6)" }} onClick={() => window.open("https://app.yieldo.xyz", "_blank")}>Dashboard</button>
          <PrimaryButton onClick={() => navigate("/apply")}>Integrate Now</PrimaryButton>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
          <HamburgerIcon open={mobileMenuOpen} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", padding: 8 }}
            aria-label="Close menu"
          >
            <HamburgerIcon open={true} />
          </button>
          <Link to="/wallet" onClick={() => setMobileMenuOpen(false)} style={{ color: "rgba(0,0,0,0.7)", textDecoration: "none", fontWeight: 500 }}>For Wallets</Link>
          <Link to="/vault" onClick={() => setMobileMenuOpen(false)} style={{ color: "rgba(0,0,0,0.7)", textDecoration: "none", fontWeight: 500 }}>For Vaults</Link>
          <Link to="/creator" onClick={() => setMobileMenuOpen(false)} style={{ color: "rgba(0,0,0,0.7)", textDecoration: "none", fontWeight: 500 }}>For Creators</Link>
          <a href="https://docs.yieldo.xyz" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} style={{ color: "rgba(0,0,0,0.7)", textDecoration: "none", fontWeight: 500 }}>Docs</a>
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            <button style={{ padding: "16px", borderRadius: 12, border: "none", fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: 18, cursor: "pointer", background: "rgba(0,0,0,0.05)", color: "rgba(0,0,0,0.6)" }} onClick={() => { setMobileMenuOpen(false); window.open("https://app.yieldo.xyz", "_blank"); }}>Dashboard</button>
            <PrimaryButton large onClick={() => navTo("/apply")} style={{ borderRadius: 12, width: "100%" }}>Integrate Now</PrimaryButton>
          </div>
        </div>
      )}

      {/* HERO */}
      <section
        className="hero-section section-padding"
        style={{
          padding: "140px clamp(16px, 5vw, 260px) 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          marginTop: "72px",
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
            className="hero-title"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
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
            <GradientText className="hero-title" style={{ fontWeight: 400 }}>on-chain yield</GradientText>
          </h1>
          <p className="hero-desc" style={{ fontSize: 22, maxWidth: 700, margin: "28px auto 0", lineHeight: 1.6, color: "rgba(0,0,0,0.6)" }}>
            One API. Every vault. Automatic revenue share.
            <br />
            Stop integrating 20 protocols. Plug in Yieldo and ship yield in days.
          </p>
          <div className="hero-buttons" style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40 }}>
            <PrimaryButton large onClick={() => navigate("/apply")}>Start Integration</PrimaryButton>
            <button onClick={() => window.open("https://docs.yieldo.xyz", "_blank")} style={{ backgroundImage: COLORS.purple.gradientLight, boxShadow: COLORS.purple.shadowLight, borderRadius: 8, padding: "12px 18px", border: "none", fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer" }}><GradientText>View Documentation →</GradientText></button>
          </div>
        </div>
      </section>

      {/* PROBLEM / WHY */}
      <section className="section-padding section-v-padding" style={{ padding: "100px clamp(16px, 5vw, 260px)", background: "rgba(122,28,203,0.02)" }}>
        <AnimatedSection>
          <SectionHeader
            tag="The Problem"
            title="Resource exhaustion kills wallet yield features"
            subtitle="Wallets face an impossible trilemma when trying to offer yield: too many protocols, zero monetization path, and unbearable complexity."
          />
        </AnimatedSection>
        <div className="cards-row" style={{ marginTop: 64 }}>
          {[
            {
              icon: <LayersIcon />,
              title: "Market Fragmentation",
              desc: "Morpho, Aave, Compound, Yearn, Pendle. 20+ protocols across multiple chains. Each one is a separate integration nightmare for your engineering team.",
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
            <AnimatedSection
              key={i}
              className="card-item"
              style={{
                padding: 32,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid rgba(122,28,203,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {item.icon}
              <h3 style={{ fontSize: 20, fontWeight: 600, margin: 0, letterSpacing: "-0.01em" }}>{item.title}</h3>
              <p style={{ fontSize: 15, color: "rgba(0,0,0,0.55)", lineHeight: 1.6, margin: 0, flex: 1 }}>{item.desc}</p>
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 16, marginTop: 8 }}>
                <GradientText style={{ fontSize: 28, fontWeight: 600 }}>{item.stat}</GradientText>
                <div style={{ fontSize: 13, color: "rgba(0,0,0,0.4)", marginTop: 2 }}>{item.statLabel}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="section-padding section-v-padding" style={{ padding: "100px clamp(16px, 5vw, 260px)" }}>
        <AnimatedSection>
          <SectionHeader
            tag="USP"
            title="Your Yield Infrastructure Layer"
            subtitle="Three pillars that turn yield from a maintenance burden into a revenue stream."
          />
        </AnimatedSection>
        <div className="cards-row" style={{ marginTop: 64 }}>
          {[
            {
              id: "zero",
              icon: <PlugIcon />,
              label: "Zero-Maintenance Yield",
              title: "Integrate once, access every vault",
              bullets: [
                "Single API/SDK for all top yield protocols",
                "Morpho, Aave, Pendle + dozens more, auto-updated",
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
          ].map((pillar, i) => (
            <AnimatedSection
              key={pillar.id}
              className="card-item"
              style={{
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
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div
                onMouseEnter={() => setHoveredPillar(pillar.id)}
                onMouseLeave={() => setHoveredPillar(null)}
                style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}
              >
                {pillar.icon}
                <GradientText style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.02em" }}>{pillar.label}</GradientText>
                <h3 style={{ fontSize: 22, fontWeight: 600, margin: 0, lineHeight: 1.3, letterSpacing: "-0.01em" }}>{pillar.title}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {pillar.bullets.map((b, j) => (
                    <CheckItem key={j}>{b}</CheckItem>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* LIVE YIELD TABLE */}
      <section className="section-padding section-v-padding" style={{ padding: "100px clamp(16px, 5vw, 260px)", background: "rgba(122,28,203,0.02)" }}>
        <AnimatedSection>
          <SectionHeader
            tag="Live Preview"
            title="Top AI-curated Yield Opportunities"
            subtitle="Preview the strategies your users will see. Real protocols, real yields, real-time updates."
          />
        </AnimatedSection>
        <AnimatedSection style={{ marginTop: 56 }}>
          <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", background: "#fff" }}>
            <div
              className="yield-table-header"
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
              }}
            >
              <span>Strategy</span>
              <span>APY Range</span>
              <span>Risk</span>
              <span>Chain</span>
              <span></span>
            </div>
            {[
              { name: "USDC Lending Optimizer", type: "Morpho + Aave", apy: "8.2% → 14.5%", risk: "Low", riskColor: "#1a9d3f", chain: "Ethereum" },
              { name: "ETH Staking Yield", type: "Lido + Pendle", apy: "5.1% → 9.8%", risk: "Medium", riskColor: "#b8960a", chain: "Ethereum" },
              { name: "Stablecoin Compounder", type: "Yearn + Morpho", apy: "12.5% → 34%", risk: "Low", riskColor: "#1a9d3f", chain: "Base" },
            ].map((row, i) => (
              <div
                key={i}
                className="yield-table-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 80px",
                  padding: "18px 20px",
                  borderTop: "1px solid rgba(0,0,0,0.04)",
                  alignItems: "center",
                  fontSize: 15,
                  transition: "background 0.15s",
                }}
              >
                <div>
                  <div style={{ fontWeight: 500 }}>{row.name}</div>
                  <div style={{ fontSize: 13, color: "rgba(0,0,0,0.4)", marginTop: 2 }}>{row.type}</div>
                </div>
                <div style={{ fontWeight: 500 }}>
                  <span style={{ color: "#f24548" }}>{row.apy.split("→")[0]}</span>
                  <span style={{ color: "rgba(0,0,0,0.3)", margin: "0 4px" }}>→</span>
                  <span style={{ color: "#1a9d3f" }}>{row.apy.split("→")[1]}</span>
                </div>
                <div>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: `${row.riskColor}15`,
                      border: `1px solid ${row.riskColor}30`,
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
        </AnimatedSection>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding section-v-padding" style={{ padding: "100px clamp(16px, 5vw, 260px)" }}>
        <AnimatedSection>
          <SectionHeader
            tag="Integration"
            title="How It Works"
            subtitle="Go from zero to yield in three steps. No smart contract development required."
          />
        </AnimatedSection>
        <div className="steps-row" style={{ marginTop: 64 }}>
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
            <AnimatedSection key={i} className="step-item" style={{ textAlign: "center", position: "relative", transitionDelay: `${i * 0.15}s` }}>
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
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ECONOMICS */}
      <section className="section-padding" style={{ padding: "80px clamp(16px, 5vw, 260px)" }}>
        <AnimatedSection>
          <div
            className="economics-box"
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
              <h2 className="section-title" style={{ fontSize: 48, fontWeight: 400, textTransform: "uppercase", margin: "16px 0 40px", letterSpacing: "-0.02em" }}>
                Transparent & Aligned
              </h2>
              <div className="economics-stats" style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
                <StatCard number="10 bps" label="Entry Fee" sublabel="0.1%, industry lowest" />
                <StatCard number="5 bps" label="Your Revenue Share" sublabel="50% goes directly to you" />
                <StatCard number="$500K+" label="Annual at $500M Volume" sublabel="Scales with your AUM" />
                <StatCard number="0" label="Dev Overhead" sublabel="No smart contract work needed" />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* VISION */}
      <section className="section-padding section-v-padding" style={{ padding: "100px clamp(16px, 5vw, 260px)" }}>
        <AnimatedSection>
          <SectionHeader
            tag="Vision"
            title="The Most Trusted Filter in DeFi"
            subtitle="From curated middleware to decentralized yield governance."
          />
        </AnimatedSection>
        <div className="vision-row" style={{ marginTop: 56 }}>
          {[
            { phase: "Today", title: "Curated Middleware", desc: "Yieldo selects vaults based on external scoring (Credora, Bluechip). One API, best yields." },
            { phase: "Tomorrow", title: "Community Governance", desc: "Token holders and curators vote on which vaults enter the Recommended tier for partner wallets." },
            { phase: "Future", title: "Chainlink for Yield", desc: "Decentralized curation network. Risk ownership shifts to the system. Yieldo becomes the trust layer." },
          ].map((v, i) => (
            <AnimatedSection key={i} className="vision-item" style={{ textAlign: "center", position: "relative", zIndex: 1, marginBottom: 40, transitionDelay: `${i * 0.15}s` }}>
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
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ padding: "80px clamp(16px, 5vw, 260px) 100px" }}>
        <AnimatedSection>
          <div
            className="cta-box"
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
              <h2 className="cta-title" style={{ fontSize: 56, fontWeight: 400, textTransform: "uppercase", margin: "16px 0 32px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                Ready to turn yield<br />into revenue?
              </h2>
              <div className="cta-buttons" style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                <PrimaryButton large onClick={() => navigate("/apply")}>Start Integration</PrimaryButton>
                <SecondaryButton onClick={() => navigate("/apply")}>Book a Demo</SecondaryButton>
              </div>
              <p style={{ fontSize: 14, color: "rgba(0,0,0,0.4)", marginTop: 16 }}>
                Free to start · No minimum volume · Ship in days
              </p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* FOOTER */}
      <footer
        className="section-padding"
        style={{
          padding: "48px clamp(16px, 5vw, 260px)",
          backgroundImage: COLORS.purple.gradientBg,
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <div className="footer-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <img src="/yieldo-new.png" alt="Yieldo" style={{ width: 28, height: 28, borderRadius: 6 }} />
              <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "0.05em" }}>YIELDO</span>
            </div>
            <p style={{ fontSize: 15, color: "rgba(0,0,0,0.5)", maxWidth: 400, lineHeight: 1.5 }}>
              The intelligent distribution layer for on-chain yield. One API for every wallet.
            </p>
          </div>
          <div className="footer-links" style={{ display: "flex", gap: 32, fontSize: 15, color: "rgba(0,0,0,0.5)", flexWrap: "wrap" }}>
            <Link to="/wallet" style={{ color: "inherit", textDecoration: "none" }}>For Wallets</Link>
            <Link to="/vault" style={{ color: "inherit", textDecoration: "none" }}>For Vaults</Link>
            <Link to="/creator" style={{ color: "inherit", textDecoration: "none" }}>For Creators</Link>
            <span style={{ color: "rgba(0,0,0,0.3)", opacity: 0.5, cursor: "not-allowed" }}>Documentation</span>
          </div>
        </div>
        <div className="footer-bottom" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 13, color: "rgba(0,0,0,0.4)", margin: 0 }}>&copy; 2025 YIELDO. All rights reserved</p>
          <div style={{ display: "flex", gap: 8 }}>
            {["𝕏", "✈", "▶", "M"].map((icon, i) => (
              <div
                key={i}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  backgroundImage: COLORS.purple.gradientLight,
                  boxShadow: COLORS.purple.shadowLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 14,
                  color: "rgba(0,0,0,0.5)",
                  transition: "transform 0.15s",
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
