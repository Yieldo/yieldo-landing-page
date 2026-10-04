import { useState } from "react";

// Hero report-card snapshot (static, refresh by hand)
const SNAPSHOT = {
  date: "4 Oct 2026",
  name: "Spark USDC Vault",
  tags: ["Base", "Morpho", "USDC"],
  score: 79,
  bars: { Risk: 86, Trust: 66, Capital: 94, Performance: 65 },
  tvl: "$333.2M",
  topDepositors: "37.6% of TVL",
  apyVsAave: "+0.21 pp",
  trackRecord: "642 days",
};

const DOCS_URL = "https://docs.yieldo.xyz/Scoring/scoring-model";
const ext = { target: "_blank", rel: "noopener noreferrer" };

const MONO = "'JetBrains Mono', ui-monospace, monospace";

const eyebrow = {
  fontFamily: MONO,
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#00766C",
};
const h2Style = { margin: 0, lineHeight: 1.08, fontWeight: 800, letterSpacing: "-0.03em" };
const bodyP = { margin: 0, fontSize: 17, lineHeight: 1.6, color: "#3A3350" };
const monoLabels = { display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 12, color: "#5E5773" };
const signalCard = {
  padding: 32,
  borderRadius: 20,
  background: "#ffffff",
  border: "1px solid #E3DDEE",
  display: "flex",
  flexDirection: "column",
  gap: 20,
};
const signalTitle = { fontSize: 24, fontWeight: 700, letterSpacing: "-0.01em" };
const signalP = { margin: 0, fontSize: 16, lineHeight: 1.6, color: "#3A3350" };
const iconProps = {
  width: 40,
  height: 40,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#4B0CA6",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const scoreRows = [
  ["Risk", "35%", SNAPSHOT.bars.Risk],
  ["Trust", "25%", SNAPSHOT.bars.Trust],
  ["Capital", "20%", SNAPSHOT.bars.Capital],
  ["Performance", "20%", SNAPSHOT.bars.Performance],
];

const reportStats = [
  ["TVL", SNAPSHOT.tvl, null],
  ["Top 5 depositors", SNAPSHOT.topDepositors, null],
  ["Net APY vs Aave base rate", SNAPSHOT.apyVsAave, "#00766C"],
  ["Track record", SNAPSHOT.trackRecord, null],
];

const proofItems = [
  ["100+", "vaults scored"],
  ["8", "chains covered"],
  ["48h", "from request to scored report"],
  ["Public", <>scoring formula &amp; weights. <a href={DOCS_URL} {...ext}>See it</a></>],
  ["$0", "taken from the vaults we score"],
];

const problems = [
  ["APY is inflated", "Incentives and short windows make headline yield look better than what the vault actually earns over time."],
  ["TVL hides concentration", "A big number can be a handful of wallets. When they leave, liquidity and yield leave with them."],
  ["Manual DD doesn't scale", "Each vault takes weeks of contract reviews, Dune queries and Discord reading, and the work is stale the day after."],
];

const offers = [
  ["01", "Yieldo Score for every vault you send", "One composite number and four dimension scores, comparable across protocols, curators and chains."],
  ["02", "The data room behind the score", "Admin and pause history, depositor concentration, yield vs. Aave base rate. The raw on-chain evidence, ready to paste into your memo."],
  ["03", "Live alerts in Telegram", "HIGH, MEDIUM and LOW alerts on the vaults your wallets hold. Pauses, admin changes, depositor exits, yield collapses."],
  ["04", "A methodology you can audit", "The composite formula and weights are public. You can defend every number to your LPs."],
];

const alertBadge = {
  padding: "4px 10px",
  borderRadius: 6,
  fontFamily: MONO,
  fontSize: 12,
  fontWeight: 700,
};
const alerts = [
  ["HIGH", { background: "#ffffff", color: "#140A2A" }, "[Vault] contract paused by admin multisig", "example · 14:02 UTC"],
  ["MED", { background: "#9E3BFF", color: "#ffffff" }, "Top depositor withdrew 18% of [Vault] TVL", "example · 09:41 UTC"],
  ["LOW", { border: "1.5px solid #A99FC0", color: "#CFC7E0" }, "[Vault] APY fell below Aave base rate (7d)", "example · yesterday"],
];

const steps = [
  ["1", "Send your vaults", "The shortlist you're evaluating, plus the wallet addresses you want monitored."],
  ["2", "Scored within 48 hours", "Every vault scored, with the underlying data loaded into your dashboard."],
  ["3", "Monitored from then on", "Ongoing Telegram alerts for every vault your wallets hold."],
];

function Nav() {
  return (
    <nav style={{ borderBottom: "1px solid #ECE8F3" }}>
      <div className="fh-wrap fh-nav">
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 12, color: "#140A2A" }}>
          <img src="/yieldo-new.png" alt="" width={32} height={32} style={{ width: 32, height: 32, borderRadius: 8, objectFit: "cover" }} />
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>Yieldo</span>
        </a>
        <div className="fh-nav-links">
          <a className="fh-nav-link" href="#signals" style={{ color: "#3A3350" }}>What we check</a>
          <a className="fh-nav-link" href="#how" style={{ color: "#3A3350" }}>How it works</a>
          <a className="fh-nav-link" href={DOCS_URL} {...ext} style={{ color: "#3A3350" }}>Methodology</a>
          <a className="fh-nav-cta" href="#scan" style={{ borderRadius: 10, background: "#4B0CA6", color: "#ffffff", fontWeight: 600 }}>
            Request a vault scan
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section>
      <div className="fh-wrap fh-hero">
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ ...eyebrow, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00C6B5", flexShrink: 0 }} />
            Independent vault analytics for allocators
          </div>
          <h1 className="fh-h1" style={{ margin: 0, lineHeight: 1.02, fontWeight: 800, letterSpacing: "-0.035em" }}>
            Due diligence for on-chain yield. <span style={{ color: "#4B0CA6" }}>In 48 hours, not weeks.</span>
          </h1>
          <p style={{ margin: 0, fontSize: 21, lineHeight: 1.55, color: "#3A3350", maxWidth: 560 }}>
            Yieldo scores and monitors DeFi vaults on raw on-chain data, so your team decides on evidence, not on APY screenshots and TVL headlines.
          </p>
          <div className="fh-hero-btns">
            <a href="#scan" style={{ padding: "18px 28px", borderRadius: 12, background: "linear-gradient(135deg, #4B0CA6, #7A1CCB)", color: "#ffffff", fontSize: 17, fontWeight: 600 }}>
              Send us vaults to score
            </a>
            <a href={DOCS_URL} {...ext} style={{ padding: "17px 26px", borderRadius: 12, border: "1.5px solid #D6CCE8", color: "#140A2A", fontSize: 17, fontWeight: 600 }}>
              Read the methodology
            </a>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: "#5E5773" }}>We don't tell you where to allocate. We give you the data to decide.</p>
        </div>

        <div style={{ border: "1px solid #E3DDEE", borderRadius: 20, background: "#ffffff", boxShadow: "0 24px 60px rgba(75, 12, 166, 0.10)", overflow: "hidden" }}>
          <div style={{ padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FAF8FD", borderBottom: "1px solid #ECE8F3", fontFamily: MONO, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#5E5773" }}>
            <span>Vault report</span>
            <span style={{ padding: "4px 10px", borderRadius: 6, background: "#ECE8F3", color: "#3A3350" }}>Snapshot · {SNAPSHOT.date}</span>
          </div>
          <div className="fh-report-body">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{SNAPSHOT.name}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: 13, fontWeight: 500 }}>
                  {SNAPSHOT.tags.map((t) => (
                    <span key={t} style={{ padding: "4px 10px", borderRadius: 6, background: "#F1ECFA", color: "#4B0CA6" }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 64, lineHeight: 1, fontWeight: 800, letterSpacing: "-0.04em", color: "#4B0CA6" }}>{SNAPSHOT.score}</div>
                <div style={{ fontSize: 13, color: "#5E5773", marginTop: 4 }}>Yieldo Score / 100</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {scoreRows.map(([label, weight, value]) => (
                <div key={label} className="fh-bar-row">
                  <span style={{ fontWeight: 600 }}>
                    {label} <span style={{ color: "#5E5773", fontWeight: 400 }}>· {weight}</span>
                  </span>
                  <span style={{ height: 8, borderRadius: 4, background: "#F1ECFA", display: "block" }}>
                    <span style={{ display: "block", height: 8, width: `${value}%`, borderRadius: 4, background: "#4B0CA6" }} />
                  </span>
                  <span style={{ textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
              {reportStats.map(([label, value, color]) => (
                <div key={label} style={{ padding: "14px 16px", borderRadius: 12, border: "1px solid #ECE8F3" }}>
                  <div style={{ fontSize: 12, color: "#5E5773" }}>{label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4, ...(color ? { color } : {}) }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section>
      <div className="fh-wrap">
        <div className="fh-proof">
          {proofItems.map(([big, small]) => (
            <div key={big}>
              <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", color: "#4B0CA6" }}>{big}</div>
              <div style={{ fontSize: 14, color: "#3A3350", marginTop: 4 }}>{small}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section>
      <div className="fh-wrap fh-py-lg fh-stack">
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 820 }}>
          <div style={eyebrow}>The problem</div>
          <h2 className="fh-h2" style={h2Style}>APY and TVL are marketing numbers. Your IC needs evidence.</h2>
        </div>
        <div className="fh-grid3" style={{ gap: 32 }}>
          {problems.map(([title, body]) => (
            <div key={title} style={{ paddingTop: 28, borderTop: "3px solid #4B0CA6", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{title}</div>
              <p style={bodyP}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Signals() {
  return (
    <section id="signals" style={{ background: "#FAF8FD" }}>
      <div className="fh-wrap fh-py-md fh-stack">
        <div className="fh-sig-head">
          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 760 }}>
            <div style={eyebrow}>What we check</div>
            <h2 className="fh-h2" style={h2Style}>The signals you won't find on a yield dashboard.</h2>
          </div>
          <p style={{ ...bodyP, maxWidth: 400 }}>
            Every vault is scored on four weighted dimensions (Risk 35%, Trust 25%, Capital 20%, Performance 20%) and benchmarked against Aave V3.
          </p>
        </div>

        <div className="fh-grid3" style={{ gap: 24 }}>
          <div style={signalCard}>
            <svg {...iconProps}><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M10 8v8" /><path d="M14 8v8" /></svg>
            <div style={signalTitle}>Pause &amp; admin history</div>
            <p style={signalP}>Has the contract ever been paused, upgraded or had parameters changed? When, by whom, and how fast did it recover?</p>
            <div style={{ marginTop: "auto", display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ flexGrow: 1, height: 6, borderRadius: 3, background: "#D6CCE8" }} />
              <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#4B0CA6" }} />
              <span style={{ flexGrow: 1, height: 6, borderRadius: 3, background: "#D6CCE8" }} />
              <span style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid #4B0CA6", boxSizing: "border-box" }} />
              <span style={{ flexGrow: 2, height: 6, borderRadius: 3, background: "#D6CCE8" }} />
            </div>
            <div style={monoLabels}><span>deploy</span><span>paused</span><span>upgrade</span><span>today</span></div>
          </div>

          <div style={signalCard}>
            <svg {...iconProps}><circle cx="12" cy="12" r="9" /><path d="M12 3v9l6.4 6.4" /></svg>
            <div style={signalTitle}>Depositor concentration</div>
            <p style={signalP}>What share of TVL sits in the top wallets, and what the vault looks like if they withdraw tomorrow.</p>
            <div style={{ marginTop: "auto", display: "flex", height: 28, borderRadius: 8, overflow: "hidden" }}>
              <span style={{ width: "38%", background: "#4B0CA6" }} />
              <span style={{ width: "22%", background: "#9E3BFF" }} />
              <span style={{ width: "40%", background: "#E3DDEE" }} />
            </div>
            <div style={monoLabels}><span>top 10</span><span>next 40</span><span>everyone else</span></div>
          </div>

          <div style={signalCard}>
            <svg {...iconProps}><path d="M3 17l6-6 4 4 8-8" /><path d="M3 21h18" /></svg>
            <div style={signalTitle}>Yield vs. the on-chain T-bill</div>
            <p style={signalP}>How the vault's APY moves against Aave's base lending rate over time. Is the extra risk actually paid for?</p>
            <svg style={{ marginTop: "auto" }} width="100%" height="64" viewBox="0 0 300 64" preserveAspectRatio="none" fill="none">
              <path d="M0 30 L40 26 L80 20 L120 28 L160 18 L200 22 L240 14 L300 18" stroke="#4B0CA6" strokeWidth="2.5" />
              <path d="M0 44 L40 43 L80 42 L120 44 L160 41 L200 42 L240 40 L300 41" stroke="#00C6B5" strokeWidth="2.5" strokeDasharray="5 4" />
            </svg>
            <div style={{ ...monoLabels, justifyContent: "flex-start", gap: 20 }}><span>— vault APY</span><span>- - Aave base rate</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section>
      <div className="fh-wrap fh-py-xl fh-offer">
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={eyebrow}>What you get</div>
          <h2 className="fh-h2" style={h2Style}>The Yieldo Allocator Desk.</h2>
          <p style={{ margin: 0, fontSize: 19, lineHeight: 1.6, color: "#3A3350" }}>
            Everything your team needs to put a vault in front of the investment committee, and to know when something changes after you're in.
          </p>
          <div style={{ marginTop: 12, width: 64, height: 4, borderRadius: 2, background: "linear-gradient(90deg, #4B0CA6, #9E3BFF)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {offers.map(([num, title, body], i) => (
            <div
              key={num}
              style={{
                padding: "28px 0",
                borderTop: "1px solid #E3DDEE",
                ...(i === offers.length - 1 ? { borderBottom: "1px solid #E3DDEE" } : {}),
                display: "grid",
                gridTemplateColumns: "72px minmax(0, 1fr)",
                gap: 24,
              }}
            >
              <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1, color: "#D6CCE8" }}>{num}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 24, fontWeight: 700 }}>{title}</div>
                <p style={bodyP}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AlertPreview() {
  return (
    <section>
      <div className="fh-wrap">
        <div className="fh-alert">
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ ...eyebrow, color: "#00C6B5" }}>Monitoring</div>
            <h3 className="fh-h3" style={{ margin: 0, lineHeight: 1.12, fontWeight: 800, letterSpacing: "-0.02em", color: "#ffffff" }}>
              Know before it's on Crypto Twitter.
            </h3>
            <p style={{ ...bodyP, color: "#CFC7E0" }}>Alerts are tiered by severity, so a parameter tweak doesn't wake you up and a pause does.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {alerts.map(([level, badge, text, meta]) => (
              <div key={level} style={{ padding: "18px 20px", borderRadius: 14, background: "#241640", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ ...alertBadge, ...badge }}>{level}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ color: "#ffffff", fontSize: 16, fontWeight: 600 }}>{text}</span>
                  <span style={{ color: "#A99FC0", fontSize: 13, fontFamily: MONO }}>{meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how">
      <div className="fh-wrap fh-py-lg fh-stack">
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 760 }}>
          <div style={eyebrow}>How it works</div>
          <h2 className="fh-h2" style={h2Style}>Three steps. No integration.</h2>
        </div>
        <div className="fh-grid3" style={{ gap: 24 }}>
          {steps.map(([n, title, body]) => (
            <div key={n} style={{ padding: 36, borderRadius: 20, border: "1px solid #E3DDEE", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "#4B0CA6", color: "#ffffff", fontSize: 20, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{title}</div>
              <p style={bodyP}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const MSG_FINE = "We reply within one business day. No newsletter.";
const MSG_INVALID = "Fill in name, firm, a valid work email and at least one vault.";
const MSG_FAILED = "Something went wrong and your request was not sent. Please try again, or message us on X @YieldoHQ.";

function FinalCta() {
  const [values, setValues] = useState({ name: "", firm: "", email: "", vaults: "", telegram: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const { name, firm, email, vaults, telegram } = values;
    if (!name.trim() || !firm.trim() || !emailOk(email.trim()) || !vaults.trim()) {
      setError(MSG_INVALID);
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const res = await fetch(import.meta.env.VITE_SHEET_BEST_SCAN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "homepage-scan",
          name: name.trim(),
          firm: firm.trim(),
          email: email.trim(),
          vaults: vaults.trim(),
          telegram: telegram.trim(),
          timestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("not ok");
      setStatus("done");
    } catch {
      setError(MSG_FAILED);
      setStatus("idle");
    }
  };

  return (
    <section id="scan" style={{ background: "linear-gradient(135deg, #4B0CA6 0%, #7A1CCB 60%, #9E3BFF 100%)" }}>
      <div className="fh-wrap fh-cta">
        <div>
          <h2 className="fh-h2-cta" style={{ margin: 0, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.035em", color: "#ffffff" }}>
            Your first vault scan is on us.
          </h2>
          <p style={{ margin: "24px 0 0", fontSize: 20, lineHeight: 1.55, color: "#EFE6FF", maxWidth: 520 }}>
            Send one vault you're evaluating. You get the full score and the data behind it, free. Judge the work before you commit.
          </p>
          <ul className="fh-cta-list">
            <li>Scored report within 48 hours</li>
            <li>No integration, no wallet connection</li>
            <li>A person replies, not a drip campaign</li>
          </ul>
        </div>

        {status === "done" ? (
          <div className="fh-done">
            <b style={{ fontSize: 24 }}>Request received.</b>
            <p style={{ margin: 0, color: "#3A3350", fontSize: 16, lineHeight: 1.6 }}>
              We'll reply within one business day with your scored report timeline.
            </p>
          </div>
        ) : (
          <form className="fh-form" onSubmit={submit} noValidate>
            <div className="fh-row2">
              <div className="fh-f">
                <label htmlFor="fh-name">Name</label>
                <input id="fh-name" name="name" autoComplete="name" placeholder="Jane Doe" required value={values.name} onChange={set("name")} />
              </div>
              <div className="fh-f">
                <label htmlFor="fh-firm">Fund / firm</label>
                <input id="fh-firm" name="firm" autoComplete="organization" placeholder="Acme Capital" required value={values.firm} onChange={set("firm")} />
              </div>
            </div>
            <div className="fh-f">
              <label htmlFor="fh-email">Work email</label>
              <input id="fh-email" name="email" type="email" autoComplete="email" placeholder="jane@acmecapital.com" required value={values.email} onChange={set("email")} />
            </div>
            <div className="fh-f">
              <label htmlFor="fh-vaults">Vault to scan <em>· address or link, one per line</em></label>
              <textarea id="fh-vaults" name="vaults" placeholder="0xbeef0173…a64cb  (Ethereum)" required value={values.vaults} onChange={set("vaults")} />
            </div>
            <div className="fh-f">
              <label htmlFor="fh-tg">Telegram <em>· optional, for alerts</em></label>
              <input id="fh-tg" name="telegram" placeholder="@handle" value={values.telegram} onChange={set("telegram")} />
            </div>
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Get your free vault scan"}
            </button>
            <p role="status" style={{ margin: 0, fontSize: 13, textAlign: "center", color: error ? "#B3261E" : "#5E5773" }}>
              {error || MSG_FINE}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  const link = { color: "#3A3350" };
  return (
    <footer style={{ borderTop: "1px solid #ECE8F3" }}>
      <div className="fh-wrap fh-footer">
        <span>© Yieldo</span>
        <span style={{ maxWidth: 560, textAlign: "center" }}>Yieldo provides data and analytics only. Nothing on this site is investment advice.</span>
        <div className="fh-footer-links">
          <a href={DOCS_URL} {...ext} style={link}>Methodology</a>
          <a href="https://x.com/YieldoHQ" {...ext} style={link}>X @YieldoHQ</a>
          <a href="https://discord.gg/5qvKa5FhjM" {...ext} style={link}>Discord</a>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div
      id="top"
      className="fh-root"
      style={{ display: "flex", flexDirection: "column", background: "#ffffff", fontFamily: "'Inter', system-ui, sans-serif", color: "#140A2A" }}
    >
      <Nav />
      <Hero />
      <ProofStrip />
      <Problem />
      <Signals />
      <Offer />
      <AlertPreview />
      <HowItWorks />
      <FinalCta />
      <Footer />
    </div>
  );
}
