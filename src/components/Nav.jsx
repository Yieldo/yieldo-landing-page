import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const C = {
  black: "#121212",
  purple: {
    grad: "linear-gradient(100deg, #4B0CA6 0%, #7A1CCB 58%, #9E3BFF 114%)",
    shadow: "0px 0px 17px rgba(80,14,170,0.15)",
  },
};

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

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const currentPath = location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { path: "/wallet", label: "For Wallets" },
    { path: "/vault", label: "For Vaults" },
    { path: "/creator", label: "For Creators" },
  ];

  const navTo = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const linkStyle = (path) => ({
    padding: "8px 18px",
    fontSize: 15,
    color: currentPath === path ? C.black : "rgba(0,0,0,0.6)",
    fontWeight: currentPath === path ? 600 : 400,
    borderBottom: currentPath === path ? "2px solid #7A1CCB" : "2px solid transparent",
    cursor: "pointer",
    textDecoration: "none",
    borderRadius: 0,
    transition: "color 0.2s",
  });

  return (
    <>
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
          background: scrolled ? "rgba(255,255,255,0.92)" : "#fff",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "inherit" }}>
          <img src="/yieldo-new.png" alt="Yieldo" style={{ width: 32, height: 32, borderRadius: 8 }} />
          <span style={{ fontSize: 18, fontWeight: 600, color: C.black, letterSpacing: "0.05em" }}>YIELDO</span>
        </Link>
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} style={linkStyle(link.path)}>{link.label}</Link>
          ))}
          <span style={{ padding: "8px 18px", fontSize: 15, color: "rgba(0,0,0,0.3)", cursor: "not-allowed", opacity: 0.5 }}>Docs</span>
        </div>
        <div className="nav-actions">
          <button
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              border: "none",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 15,
              cursor: "pointer",
              background: "rgba(0,0,0,0.05)",
              color: "rgba(0,0,0,0.6)",
            }}
            onClick={() => window.open("https://app.yieldo.xyz", "_blank")}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/apply")}
            style={{
              backgroundImage: C.purple.grad,
              boxShadow: C.purple.shadow,
              borderRadius: 8,
              padding: "10px 18px",
              border: "none",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Integrate Now
          </button>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
          <HamburgerIcon open={mobileMenuOpen} />
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", padding: 8 }}
            aria-label="Close menu"
          >
            <HamburgerIcon open={true} />
          </button>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)} style={{ color: "rgba(0,0,0,0.7)", textDecoration: "none", fontWeight: 500 }}>{link.label}</Link>
          ))}
          <span style={{ color: "rgba(0,0,0,0.25)", fontWeight: 500 }}>Docs (Coming Soon)</span>
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            <button
              style={{ padding: "16px", borderRadius: 12, border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 18, cursor: "pointer", background: "rgba(0,0,0,0.05)", color: "rgba(0,0,0,0.6)" }}
              onClick={() => { setMobileMenuOpen(false); window.open("https://app.yieldo.xyz", "_blank"); }}
            >
              Dashboard
            </button>
            <button
              onClick={() => navTo("/apply")}
              style={{
                backgroundImage: C.purple.grad,
                boxShadow: C.purple.shadow,
                borderRadius: 12,
                padding: "16px",
                border: "none",
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 18,
                cursor: "pointer",
                width: "100%",
              }}
            >
              Integrate Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
