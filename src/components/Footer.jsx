import { Link } from "react-router-dom";

const C = {
  purple: {
    gradLight: "linear-gradient(100deg, rgba(75,12,166,0.1) 0%, rgba(122,28,203,0.1) 58%, rgba(158,59,255,0.1) 114%)",
    gradBg: "linear-gradient(100deg, rgba(75,12,166,0.05) 0%, rgba(122,28,203,0.05) 58%, rgba(158,59,255,0.05) 114%)",
    shadowLight: "0px 0px 17px rgba(80,14,170,0.1)",
  },
};

export default function Footer() {
  return (
    <footer
      className="section-padding"
      style={{
        padding: "48px clamp(16px, 5vw, 260px)",
        backgroundImage: C.purple.gradBg,
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
        <p style={{ fontSize: 13, color: "rgba(0,0,0,0.4)", margin: 0 }}>&copy; 2025 YIELDO — All rights reserved</p>
        <div style={{ display: "flex", gap: 8 }}>
          {["\u{1D54F}", "\u2708", "\u25B6", "M"].map((icon, i) => (
            <div
              key={i}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundImage: C.purple.gradLight,
                boxShadow: C.purple.shadowLight,
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
  );
}
