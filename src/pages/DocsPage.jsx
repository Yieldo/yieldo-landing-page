import { useState } from "react";

const C = {
  bg: "#faf9fe", white: "#ffffff", black: "#121212", surface: "#f5f4f9",
  border: "rgba(0,0,0,0.06)", border2: "rgba(0,0,0,0.1)",
  text: "#121212", text2: "rgba(0,0,0,0.6)", text3: "rgba(0,0,0,0.38)", text4: "rgba(0,0,0,0.2)",
  purple: "#7A1CCB", purpleDim: "rgba(122,28,203,0.06)",
  purpleGrad: "linear-gradient(100deg, #4B0CA6 0%, #7A1CCB 58%, #9E3BFF 114%)",
  teal: "#2E9AB8", green: "#1a9d3f", greenDim: "rgba(26,157,63,0.06)",
  red: "#d93636", redDim: "rgba(217,54,54,0.06)",
  amber: "#d97706", amberDim: "rgba(217,119,6,0.06)",
  blue: "#2563eb", blueDim: "rgba(37,99,235,0.06)",
  codeBg: "#1e1b2e", codeText: "#e2dff5",
};

/* ============ COMPONENTS ============ */
function Badge({ children, color = C.purple, bg }) {
  return <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4, background: bg || `${color}12`, color, whiteSpace: "nowrap", fontFamily: "'Inter',sans-serif" }}>{children}</span>;
}
function MethodBadge({ method }) {
  const m = { GET: { color: C.green, bg: C.greenDim }, POST: { color: C.blue, bg: C.blueDim }, PUT: { color: C.amber, bg: C.amberDim }, DELETE: { color: C.red, bg: C.redDim } };
  const s = m[method] || m.GET;
  return <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4, background: s.bg, color: s.color, fontFamily: "'JetBrains Mono', monospace", letterSpacing: ".03em" }}>{method}</span>;
}

function CodeBlock({ code, lang = "typescript", title, compact }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(code).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div style={{ background: C.codeBg, borderRadius: 10, overflow: "hidden", fontSize: compact ? 12 : 13, lineHeight: 1.7, border: "1px solid rgba(255,255,255,0.04)" }}>
      {title && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "'Inter',sans-serif" }}>{title}</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "'Inter',sans-serif" }}>{lang}</span>
            <button onClick={handleCopy} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 4, padding: "3px 8px", fontSize: 10, color: "rgba(255,255,255,0.4)", cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>{copied ? "✓ Copied" : "Copy"}</button>
          </div>
        </div>
      )}
      <pre style={{ padding: compact ? "10px 14px" : "14px 18px", margin: 0, overflow: "auto", color: C.codeText, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{code}</pre>
    </div>
  );
}

function ParamTable({ params }) {
  return (
    <div style={{ borderRadius: 8, border: `1px solid ${C.border}`, overflow: "hidden", fontSize: 13 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr .6fr .5fr 2fr", padding: "8px 14px", background: C.surface, fontSize: 11, fontWeight: 600, color: C.text3, textTransform: "uppercase", letterSpacing: ".04em" }}>
        <div>Parameter</div><div>Type</div><div>Required</div><div>Description</div>
      </div>
      {params.map((p, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr .6fr .5fr 2fr", padding: "9px 14px", borderTop: `1px solid ${C.border}`, alignItems: "flex-start" }}>
          <code style={{ fontSize: 12, color: C.purple, fontFamily: "'JetBrains Mono', monospace" }}>{p.name}</code>
          <span style={{ fontSize: 12, color: C.text3 }}>{p.type}</span>
          <span style={{ fontSize: 12, color: p.required ? C.red : C.text4 }}>{p.required ? "Yes" : "No"}</span>
          <span style={{ fontSize: 12, color: C.text2, lineHeight: 1.5 }}>{p.desc}</span>
        </div>
      ))}
    </div>
  );
}

function Callout({ type = "info", children }) {
  const styles = { info: { bg: C.blueDim, border: C.blue, icon: "ℹ️" }, warning: { bg: C.amberDim, border: C.amber, icon: "⚠️" }, success: { bg: C.greenDim, border: C.green, icon: "✅" }, danger: { bg: C.redDim, border: C.red, icon: "🚫" } };
  const s = styles[type];
  return <div style={{ padding: "12px 16px", borderRadius: 8, background: s.bg, border: `1px solid ${s.border}20`, display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: C.text2, lineHeight: 1.6 }}><span style={{ fontSize: 14, flexShrink: 0 }}>{s.icon}</span><div>{children}</div></div>;
}

/* ============ NAV DATA ============ */
const NAV = [
  { id: "overview", label: "Overview", icon: "📖" },
  { id: "quickstart", label: "Quick Start", icon: "⚡" },
  { id: "auth", label: "Authentication", icon: "🔑" },
  { id: "vaults", label: "Vaults", icon: "🏦", endpoints: true },
  { id: "deposits", label: "Deposits", icon: "💰", endpoints: true },
  { id: "portfolio", label: "Portfolio", icon: "📊", endpoints: true },
  { id: "revenue", label: "Revenue", icon: "💵", endpoints: true },
  { id: "campaigns", label: "Campaigns", icon: "🎯", endpoints: true },
  { id: "webhooks", label: "Webhooks", icon: "🔔" },
  { id: "sdks", label: "SDKs & Libraries", icon: "📦" },
  { id: "errors", label: "Errors & Limits", icon: "⚠️" },
];

/* ============ MAIN ============ */
export default function DocsPage() {
  const [page, setPage] = useState("overview");
  const [lang, setLang] = useState("ts");

  const langLabel = { ts: "TypeScript", py: "Python", curl: "cURL" };

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: C.bg, color: C.text, minHeight: "100vh", display: "flex" }}>
      {/* SIDEBAR */}
      <aside style={{ width: 240, background: C.white, borderRight: `1px solid ${C.border}`, position: "sticky", top: 0, height: "100vh", overflow: "auto", flexShrink: 0 }}>
        <div style={{ padding: "18px 18px 14px", display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, backgroundImage: C.purpleGrad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 700, fontSize: 11 }}>Y</span></div>
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: ".05em" }}>YIELDO</span>
          <Badge color={C.text3} bg={C.surface}>Docs</Badge>
        </div>
        <div style={{ padding: "8px" }}>
          <div style={{ padding: "8px 12px", marginBottom: 4 }}>
            <input placeholder="Search docs..." style={{ width: "100%", padding: "7px 10px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 12, fontFamily: "'Inter',sans-serif", outline: "none", color: C.text, boxSizing: "border-box" }} />
          </div>
          <div style={{ fontSize: 10, fontWeight: 600, color: C.text4, textTransform: "uppercase", letterSpacing: ".06em", padding: "10px 12px 4px" }}>Getting Started</div>
          {NAV.slice(0, 3).map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", background: page === n.id ? C.purpleDim : "transparent", border: "none", borderRadius: 6, color: page === n.id ? C.purple : C.text3, fontSize: 13, fontWeight: page === n.id ? 600 : 400, cursor: "pointer", fontFamily: "'Inter',sans-serif", textAlign: "left" }}>
              <span style={{ fontSize: 13 }}>{n.icon}</span>{n.label}
            </button>
          ))}
          <div style={{ fontSize: 10, fontWeight: 600, color: C.text4, textTransform: "uppercase", letterSpacing: ".06em", padding: "14px 12px 4px" }}>API Reference</div>
          {NAV.slice(3, 8).map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", background: page === n.id ? C.purpleDim : "transparent", border: "none", borderRadius: 6, color: page === n.id ? C.purple : C.text3, fontSize: 13, fontWeight: page === n.id ? 600 : 400, cursor: "pointer", fontFamily: "'Inter',sans-serif", textAlign: "left" }}>
              <span style={{ fontSize: 13 }}>{n.icon}</span>{n.label}
            </button>
          ))}
          <div style={{ fontSize: 10, fontWeight: 600, color: C.text4, textTransform: "uppercase", letterSpacing: ".06em", padding: "14px 12px 4px" }}>Resources</div>
          {NAV.slice(8).map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", background: page === n.id ? C.purpleDim : "transparent", border: "none", borderRadius: 6, color: page === n.id ? C.purple : C.text3, fontSize: 13, fontWeight: page === n.id ? 600 : 400, cursor: "pointer", fontFamily: "'Inter',sans-serif", textAlign: "left" }}>
              <span style={{ fontSize: 13 }}>{n.icon}</span>{n.label}
            </button>
          ))}
        </div>
        <div style={{ padding: "12px 16px", margin: "8px", background: C.purpleDim, borderRadius: 8, border: `1px solid ${C.purple}15` }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.purple, marginBottom: 4 }}>Need help?</div>
          <div style={{ fontSize: 11, color: C.text3, lineHeight: 1.4, marginBottom: 6 }}>Join our Discord or email us for integration support.</div>
          <div style={{ display: "flex", gap: 4 }}>
            <span style={{ padding: "4px 8px", borderRadius: 4, background: C.purple + "12", color: C.purple, fontSize: 10, fontWeight: 500, cursor: "pointer" }}>Discord</span>
            <span style={{ padding: "4px 8px", borderRadius: 4, background: C.purple + "12", color: C.purple, fontSize: 10, fontWeight: 500, cursor: "pointer" }}>Email</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, maxWidth: 920, padding: "32px 48px", overflow: "auto" }}>
        {/* Language switcher */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div />
          <div style={{ display: "flex", gap: 2, background: C.surface, borderRadius: 6, padding: 2, border: `1px solid ${C.border}` }}>
            {["ts", "py", "curl"].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: lang === l ? 600 : 400, padding: "5px 12px", borderRadius: 4, border: "none", cursor: "pointer", background: lang === l ? C.white : "transparent", color: lang === l ? C.purple : C.text3, boxShadow: lang === l ? "0 1px 3px rgba(0,0,0,0.06)" : "none" }}>{langLabel[l]}</button>
            ))}
          </div>
        </div>

        {/* ===== OVERVIEW ===== */}
        {page === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700 }}>📖 Yieldo API Documentation</h1>
              <p style={{ fontSize: 16, color: C.text2, lineHeight: 1.6, margin: 0 }}>Everything you need to integrate yield opportunities into your wallet, app, or platform. One API for vault discovery, deposits, withdrawals, revenue tracking, and campaign management.</p>
            </div>
            <Callout type="info"><strong>Base URL:</strong> <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.purple }}>https://api.yieldo.io/v1</code> — All endpoints require authentication via API key.</Callout>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[
                { icon: "⚡", title: "Quick Start", desc: "Get up and running in 5 minutes with our SDK.", link: "quickstart" },
                { icon: "🏦", title: "Vault Endpoints", desc: "List, filter, and get details on available vaults.", link: "vaults" },
                { icon: "💰", title: "Deposit & Withdraw", desc: "Route user deposits and handle withdrawals.", link: "deposits" },
                { icon: "💵", title: "Revenue", desc: "Track your revenue share, payouts, and analytics.", link: "revenue" },
                { icon: "🎯", title: "Campaigns", desc: "Discover and enroll in vault campaigns for bonuses.", link: "campaigns" },
                { icon: "🔔", title: "Webhooks", desc: "Real-time events for deposits, payouts, and more.", link: "webhooks" },
              ].map((c, i) => (
                <div key={i} onClick={() => setPage(c.link)} style={{ padding: 20, borderRadius: 10, background: C.white, border: `1px solid ${C.border}`, cursor: "pointer", transition: "all .15s", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: C.text3, lineHeight: 1.4 }}>{c.desc}</div>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 12px" }}>API at a Glance</h3>
              <div style={{ borderRadius: 8, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                {[
                  ["GET", "/vaults", "List available vaults with filters"],
                  ["GET", "/vaults/:id", "Get vault details, APY history, risk scores"],
                  ["POST", "/deposits", "Create a deposit transaction"],
                  ["POST", "/withdrawals", "Create a withdrawal transaction"],
                  ["GET", "/portfolio/:address", "Get user's active positions"],
                  ["GET", "/revenue", "Get partner revenue summary"],
                  ["GET", "/revenue/payouts", "List payout history"],
                  ["GET", "/campaigns", "List available campaigns"],
                  ["POST", "/campaigns/:id/enroll", "Enroll in a campaign"],
                  ["POST", "/webhooks", "Register a webhook endpoint"],
                ].map(([method, path, desc], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: ".4fr 1.2fr 2fr", padding: "9px 14px", borderTop: i > 0 ? `1px solid ${C.border}` : "none", alignItems: "center", fontSize: 13 }}>
                    <MethodBadge method={method} />
                    <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.purple }}>{path}</code>
                    <span style={{ color: C.text3 }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== QUICK START ===== */}
        {page === "quickstart" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700 }}>⚡ Quick Start</h1>
              <p style={{ fontSize: 16, color: C.text2, lineHeight: 1.6, margin: 0 }}>Get your first vault list and deposit working in under 5 minutes.</p>
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 10px" }}>1. Install the SDK</h3>
              <CodeBlock title="Terminal" lang="bash" code={lang === "ts" ? "npm i" + "nstall @yieldo" + "/sdk" : lang === "py" ? "pip install yieldo" : "# No installation needed for cURL"} />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 10px" }}>2. Initialize the client</h3>
              <CodeBlock title={lang === "curl" ? "Request" : `init.${lang === "ts" ? "ts" : "py"}`} lang={langLabel[lang]} code={
                lang === "ts" ? `imp` + `ort { Yieldo } fr` + `om '@yieldo/sdk';\n\nconst yieldo = new Yieldo({\n  apiKey: 'yd_live_your_key_here',\n  partnerId: 'your-partner-id',\n});` :
                lang === "py" ? `fr` + `om yieldo imp` + `ort Yieldo\n\nyieldo = Yieldo(\n    api_key="yd_live_your_key_here",\n    partner_id="your-partner-id",\n)` :
                `# Set your API key\nexport YIELDO_API_KEY="yd_live_your_key_here"`
              } />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 10px" }}>3. Fetch vaults</h3>
              <CodeBlock title={lang === "curl" ? "Request" : `vaults.${lang === "ts" ? "ts" : "py"}`} lang={langLabel[lang]} code={
                lang === "ts" ? `const vaults = await yieldo.getVaults({\n  chain: 'ethereum',\n  riskMax: 'medium',\n  sortBy: 'apy',\n  limit: 10,\n});\n\nconsole.log(vaults[0]);\n// { id: "vault_abc", name: "USDC Lending Optimizer",\n//   apy: 12.4, risk: "low", tvl: 4200000, ... }` :
                lang === "py" ? `vaults = yieldo.get_vaults(\n    chain="ethereum",\n    risk_max="medium",\n    sort_by="apy",\n    limit=10,\n)\n\nprint(vaults[0])\n# {"id": "vault_abc", "name": "USDC Lending Optimizer",\n#  "apy": 12.4, "risk": "low", "tvl": 4200000, ...}` :
                `curl -X GET "https://api.yieldo.io/v1/vaults?chain=ethereum&risk_max=medium&sort_by=apy&limit=10" \\\n  -H "Authorization: Bearer $YIELDO_API_KEY" \\\n  -H "Content-Type: application/json"`
              } />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 10px" }}>4. Create a deposit</h3>
              <CodeBlock title={lang === "curl" ? "Request" : `deposit.${lang === "ts" ? "ts" : "py"}`} lang={langLabel[lang]} code={
                lang === "ts" ? `const tx = await yieldo.deposit({\n  vaultId: 'vault_abc',\n  amount: '10000',       // 10,000 USDC (6 decimals)\n  token: 'USDC',\n  chain: 'ethereum',\n  userAddress: '0xAb3...f12',\n});\n\n// tx.hash — on-chain transaction hash\n// tx.status — "pending" | "confirmed"\n// Revenue share is tracked automatically` :
                lang === "py" ? `tx = yieldo.deposit(\n    vault_id="vault_abc",\n    amount="10000",\n    token="USDC",\n    chain="ethereum",\n    user_address="0xAb3...f12",\n)\n\n# tx.hash — on-chain transaction hash\n# tx.status — "pending" | "confirmed"\n# Revenue share is tracked automatically` :
                `curl -X POST "https://api.yieldo.io/v1/deposits" \\\n  -H "Authorization: Bearer $YIELDO_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "vault_id": "vault_abc",\n    "amount": "10000",\n    "token": "USDC",\n    "chain": "ethereum",\n    "user_address": "0xAb3...f12"\n  }'`
              } />
            </div>
            <Callout type="success">That's it! Your partner revenue share is automatically tracked on-chain for every deposit routed through your API key. View earnings in the <strong>Partner Dashboard</strong> or via the <code>/revenue</code> endpoint.</Callout>
          </div>
        )}

        {/* ===== AUTHENTICATION ===== */}
        {page === "auth" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700 }}>🔑 Authentication</h1>
              <p style={{ fontSize: 16, color: C.text2, lineHeight: 1.6, margin: 0 }}>All API requests require authentication via Bearer token in the Authorization header.</p>
            </div>
            <CodeBlock title="Request header" lang="http" code={`Authorization: Bearer yd_live_your_api_key_here`} />
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 10px" }}>API Key Types</h3>
              <div style={{ borderRadius: 8, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                {[
                  { key: "yd_live_*", env: "Production", desc: "Live API key. All transactions are real and revenue is tracked.", color: C.green },
                  { key: "yd_test_*", env: "Sandbox", desc: "Test API key. Returns mock data. No real transactions or revenue.", color: C.amber },
                ].map((k, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, padding: "14px 18px", borderTop: i > 0 ? `1px solid ${C.border}` : "none", alignItems: "center" }}>
                    <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.purple, minWidth: 100 }}>{k.key}</code>
                    <Badge color={k.color}>{k.env}</Badge>
                    <span style={{ fontSize: 13, color: C.text2 }}>{k.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <Callout type="warning"><strong>Never expose your API key in client-side code.</strong> Use the SDK's server-side initialization or proxy requests through your backend. Test keys can be used in development.</Callout>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 10px" }}>Partner ID</h3>
              <p style={{ fontSize: 14, color: C.text2, lineHeight: 1.6 }}>Your <code style={{ fontFamily: "'JetBrains Mono', monospace", color: C.purple }}>partnerId</code> is included in all deposit transactions to attribute revenue. It's assigned during onboarding and visible in your Partner Dashboard under Settings.</p>
            </div>
          </div>
        )}

        {/* ===== VAULTS ===== */}
        {page === "vaults" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
              <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700 }}>🏦 Vaults</h1>
              <p style={{ fontSize: 16, color: C.text2, lineHeight: 1.6, margin: 0 }}>Discover, filter, and get details on yield vaults available through Yieldo.</p>
            </div>

            {/* List Vaults */}
            <div style={{ padding: 24, background: C.white, borderRadius: 12, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <MethodBadge method="GET" />
                <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: C.text }}>/vaults</code>
              </div>
              <p style={{ fontSize: 14, color: C.text2, margin: "0 0 16px" }}>Returns a list of available vaults with filtering, sorting, and pagination.</p>
              <h4 style={{ fontSize: 13, fontWeight: 600, margin: "0 0 8px", color: C.text3 }}>Query Parameters</h4>
              <ParamTable params={[
                { name: "chain", type: "string", required: false, desc: "Filter by chain: ethereum, base, arbitrum, polygon, optimism" },
                { name: "asset_type", type: "string", required: false, desc: "Filter by asset type: stablecoin, eth, btc" },
                { name: "risk_max", type: "string", required: false, desc: "Maximum risk level: low, medium, high" },
                { name: "platform", type: "string", required: false, desc: "Filter by platform: morpho, aave, yearn, etc." },
                { name: "curator", type: "string", required: false, desc: "Filter by curator: gauntlet, steakhouse, etc." },
                { name: "apy_min", type: "number", required: false, desc: "Minimum APY (e.g. 5.0 for 5%)" },
                { name: "tvl_min", type: "number", required: false, desc: "Minimum TVL in USD" },
                { name: "has_campaign", type: "boolean", required: false, desc: "Only return vaults with active campaigns" },
                { name: "sort_by", type: "string", required: false, desc: "Sort field: apy, tvl, risk, yieldo_score (default)" },
                { name: "limit", type: "integer", required: false, desc: "Results per page (default: 20, max: 100)" },
                { name: "offset", type: "integer", required: false, desc: "Pagination offset" },
              ]} />
              <h4 style={{ fontSize: 13, fontWeight: 600, margin: "20px 0 8px", color: C.text3 }}>Response</h4>
              <CodeBlock title="200 OK" lang="json" code={`{\n  "data": [\n    {\n      "id": "vault_abc123",\n      "name": "USDC Lending Optimizer",\n      "asset": "USDC",\n      "asset_type": "stablecoin",\n      "platform": "morpho",\n      "curator": "gauntlet",\n      "chain": "ethereum",\n      "apy": 12.4,\n      "apy_7d_avg": 11.8,\n      "risk": "low",\n      "yieldo_score": 92,\n      "tvl": 4200000,\n      "depositors": 1847,\n      "age_days": 186,\n      "flag": "none",\n      "ext_scores": {\n        "bluechip": true,\n        "credora": true\n      },\n      "campaign": {\n        "active": true,\n        "type": "A",\n        "bonus_bps": 15\n      }\n    }\n  ],\n  "total": 142,\n  "limit": 20,\n  "offset": 0\n}`} />
            </div>

            {/* Get Vault */}
            <div style={{ padding: 24, background: C.white, borderRadius: 12, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <MethodBadge method="GET" />
                <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: C.text }}>/vaults/:id</code>
              </div>
              <p style={{ fontSize: 14, color: C.text2, margin: "0 0 16px" }}>Get full details for a single vault, including APY history, protocol breakdown, and risk scoring.</p>
              <h4 style={{ fontSize: 13, fontWeight: 600, margin: "0 0 8px", color: C.text3 }}>Path Parameters</h4>
              <ParamTable params={[{ name: "id", type: "string", required: true, desc: "Vault ID (e.g. vault_abc123)" }]} />
              <h4 style={{ fontSize: 13, fontWeight: 600, margin: "20px 0 8px", color: C.text3 }}>Response includes</h4>
              <p style={{ fontSize: 13, color: C.text3, lineHeight: 1.6 }}>All fields from the list endpoint, plus: <code>apy_history</code> (30d array), <code>tvl_history</code> (30d array), <code>protocols</code> (detailed breakdown), <code>risk_details</code> (per-factor scores), <code>contracts</code> (on-chain addresses).</p>
            </div>
          </div>
        )}

        {/* ===== DEPOSITS ===== */}
        {page === "deposits" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
              <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700 }}>💰 Deposits & Withdrawals</h1>
              <p style={{ fontSize: 16, color: C.text2, lineHeight: 1.6, margin: 0 }}>Route user deposits into vaults and handle withdrawals. Revenue share is tracked automatically.</p>
            </div>
            <div style={{ padding: 24, background: C.white, borderRadius: 12, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <MethodBadge method="POST" />
                <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: C.text }}>/deposits</code>
              </div>
              <p style={{ fontSize: 14, color: C.text2, margin: "0 0 16px" }}>Create a deposit transaction. Returns a transaction object that can be signed by the user's wallet.</p>
              <h4 style={{ fontSize: 13, fontWeight: 600, margin: "0 0 8px", color: C.text3 }}>Request Body</h4>
              <ParamTable params={[
                { name: "vault_id", type: "string", required: true, desc: "Target vault ID" },
                { name: "amount", type: "string", required: true, desc: "Deposit amount in token's smallest unit" },
                { name: "token", type: "string", required: true, desc: "Token symbol (USDC, ETH, WBTC, etc.)" },
                { name: "chain", type: "string", required: true, desc: "Target chain" },
                { name: "user_address", type: "string", required: true, desc: "Depositor's wallet address" },
                { name: "slippage_bps", type: "integer", required: false, desc: "Max slippage in basis points (default: 50)" },
              ]} />
              <h4 style={{ fontSize: 13, fontWeight: 600, margin: "20px 0 8px", color: C.text3 }}>Response</h4>
              <CodeBlock title="201 Created" lang="json" code={`{\n  "id": "dep_xyz789",\n  "vault_id": "vault_abc123",\n  "amount": "10000000000",\n  "token": "USDC",\n  "chain": "ethereum",\n  "user_address": "0xAb3...f12",\n  "tx": {\n    "to": "0x7A1...CCB",\n    "data": "0x...",\n    "value": "0"\n  },\n  "estimated_apy": 12.4,\n  "partner_revenue_bps": 5,\n  "status": "pending_signature"\n}`} />
              <Callout type="info">The <code>tx</code> object contains the unsigned transaction. Pass it to the user's wallet for signing. Once confirmed on-chain, the deposit status updates automatically via webhook.</Callout>
            </div>
            <div style={{ padding: 24, background: C.white, borderRadius: 12, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <MethodBadge method="POST" />
                <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: C.text }}>/withdrawals</code>
              </div>
              <p style={{ fontSize: 14, color: C.text2, margin: "0 0 16px" }}>Create a withdrawal from an active vault position. Same flow as deposits — returns an unsigned transaction.</p>
              <ParamTable params={[
                { name: "vault_id", type: "string", required: true, desc: "Vault to withdraw from" },
                { name: "amount", type: "string", required: true, desc: "Withdrawal amount (or \"max\" for full)" },
                { name: "token", type: "string", required: true, desc: "Desired output token" },
                { name: "chain", type: "string", required: true, desc: "Chain to withdraw on" },
                { name: "user_address", type: "string", required: true, desc: "User's wallet address" },
              ]} />
            </div>
          </div>
        )}

        {/* ===== PORTFOLIO ===== */}
        {page === "portfolio" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
              <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700 }}>📊 Portfolio</h1>
              <p style={{ fontSize: 16, color: C.text2, lineHeight: 1.6, margin: 0 }}>Get a user's active vault positions, accrued yield, and transaction history.</p>
            </div>
            <div style={{ padding: 24, background: C.white, borderRadius: 12, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <MethodBadge method="GET" />
                <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: C.text }}>/portfolio/:address</code>
              </div>
              <ParamTable params={[
                { name: "address", type: "string", required: true, desc: "User's wallet address" },
                { name: "chain", type: "string", required: false, desc: "Filter by chain (default: all)" },
              ]} />
              <h4 style={{ fontSize: 13, fontWeight: 600, margin: "20px 0 8px", color: C.text3 }}>Response</h4>
              <CodeBlock title="200 OK" lang="json" code={`{\n  "address": "0xAb3...f12",\n  "total_value_usd": 24831.42,\n  "total_yield_earned": 1247.80,\n  "positions": [\n    {\n      "vault_id": "vault_abc123",\n      "vault_name": "USDC Lending Optimizer",\n      "deposited": "10000000000",\n      "current_value": "10412000000",\n      "yield_earned": "412000000",\n      "apy_at_deposit": 12.4,\n      "current_apy": 11.8,\n      "deposited_at": "2025-01-15T10:30:00Z",\n      "chain": "ethereum"\n    }\n  ]\n}`} />
            </div>
          </div>
        )}

        {/* ===== REVENUE ===== */}
        {page === "revenue" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
              <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700 }}>💵 Revenue</h1>
              <p style={{ fontSize: 16, color: C.text2, lineHeight: 1.6, margin: 0 }}>Track your partner revenue share, earnings breakdown, and payout history.</p>
            </div>
            <div style={{ padding: 24, background: C.white, borderRadius: 12, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <MethodBadge method="GET" />
                <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: C.text }}>/revenue</code>
              </div>
              <p style={{ fontSize: 14, color: C.text2, margin: "0 0 16px" }}>Get revenue summary for the authenticated partner.</p>
              <ParamTable params={[
                { name: "period", type: "string", required: false, desc: "Time period: 7d, 30d, 90d, all (default: 30d)" },
              ]} />
              <CodeBlock title="200 OK" lang="json" code={`{\n  "partner_id": "phantom",\n  "period": "30d",\n  "total_earned_usd": 4231.00,\n  "base_earned_usd": 3419.00,\n  "campaign_earned_usd": 812.00,\n  "total_volume_usd": 6838000,\n  "total_depositors": 847,\n  "base_rate_bps": 5,\n  "next_payout": "2025-02-14T00:00:00Z",\n  "daily_breakdown": [\n    { "date": "2025-02-08", "earned": 142.30, "volume": 284600 }\n  ]\n}`} />
            </div>
            <div style={{ padding: 24, background: C.white, borderRadius: 12, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <MethodBadge method="GET" />
                <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: C.text }}>/revenue/payouts</code>
              </div>
              <p style={{ fontSize: 14, color: C.text2, margin: "0 0 16px" }}>List historical payouts with transaction hashes.</p>
              <CodeBlock title="200 OK" lang="json" compact code={`{\n  "payouts": [\n    {\n      "id": "pay_001",\n      "date": "2025-02-01",\n      "amount_usd": 3890.00,\n      "token": "USDC",\n      "tx_hash": "0xa3f...2b1",\n      "type": "base"\n    }\n  ]\n}`} />
            </div>
          </div>
        )}

        {/* ===== CAMPAIGNS ===== */}
        {page === "campaigns" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
              <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700 }}>🎯 Campaigns</h1>
              <p style={{ fontSize: 16, color: C.text2, lineHeight: 1.6, margin: 0 }}>Vault curators create campaigns offering bonus revenue share. Browse and enroll programmatically.</p>
            </div>
            <div style={{ padding: 24, background: C.white, borderRadius: 12, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <MethodBadge method="GET" />
                <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: C.text }}>/campaigns</code>
              </div>
              <ParamTable params={[
                { name: "status", type: "string", required: false, desc: "Filter: available, enrolled, expired" },
                { name: "type", type: "string", required: false, desc: "Campaign type: A (on-chain), B (marketing)" },
              ]} />
              <CodeBlock title="200 OK" lang="json" code={`{\n  "campaigns": [\n    {\n      "id": "camp_001",\n      "vault_id": "vault_abc123",\n      "vault_name": "USDC Lending Optimizer",\n      "type": "A",\n      "bonus_bps": 15,\n      "criteria": "AUM stays deposited for 60+ days",\n      "start_date": "2025-01-01",\n      "end_date": "2025-06-30",\n      "status": "available",\n      "your_aum": null,\n      "your_earned": null\n    }\n  ]\n}`} />
            </div>
            <div style={{ padding: 24, background: C.white, borderRadius: 12, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <MethodBadge method="POST" />
                <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: C.text }}>/campaigns/:id/enroll</code>
              </div>
              <p style={{ fontSize: 14, color: C.text2, margin: "0 0 12px" }}>Enroll in a campaign. Once enrolled, all qualifying deposits automatically earn the campaign bonus.</p>
              <Callout type="success">Campaign bonuses are <strong>additive</strong> — they stack on top of your base 5 bps rate. A 15 bps campaign means you earn 20 bps total on qualifying deposits.</Callout>
            </div>
          </div>
        )}

        {/* ===== WEBHOOKS ===== */}
        {page === "webhooks" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700 }}>🔔 Webhooks</h1>
              <p style={{ fontSize: 16, color: C.text2, lineHeight: 1.6, margin: 0 }}>Receive real-time notifications for deposits, withdrawals, payouts, and vault changes.</p>
            </div>
            <div style={{ padding: 24, background: C.white, borderRadius: 12, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <MethodBadge method="POST" />
                <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: C.text }}>/webhooks</code>
              </div>
              <p style={{ fontSize: 14, color: C.text2, margin: "0 0 12px" }}>Register a webhook endpoint to receive events.</p>
              <ParamTable params={[
                { name: "url", type: "string", required: true, desc: "Your HTTPS endpoint URL" },
                { name: "events", type: "string[]", required: true, desc: "Event types to subscribe to" },
                { name: "secret", type: "string", required: false, desc: "Signing secret for payload verification" },
              ]} />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 10px" }}>Event Types</h3>
              <div style={{ borderRadius: 8, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                {[
                  ["deposit.confirmed", "A deposit transaction is confirmed on-chain"],
                  ["deposit.failed", "A deposit transaction failed or was reverted"],
                  ["withdrawal.confirmed", "A withdrawal is confirmed on-chain"],
                  ["payout.sent", "A revenue payout has been sent to your address"],
                  ["vault.apy_change", "A vault's APY changed by more than 2%"],
                  ["vault.risk_change", "A vault's risk level or flag has changed"],
                  ["campaign.new", "A new campaign is available for enrollment"],
                  ["campaign.ended", "An enrolled campaign has ended"],
                ].map(([event, desc], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", padding: "10px 14px", borderTop: i > 0 ? `1px solid ${C.border}` : "none" }}>
                    <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.purple }}>{event}</code>
                    <span style={{ fontSize: 13, color: C.text2 }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 10px" }}>Webhook Payload</h3>
              <CodeBlock title="POST to your endpoint" lang="json" code={`{\n  "id": "evt_abc123",\n  "type": "deposit.confirmed",\n  "created_at": "2025-02-08T14:30:00Z",\n  "data": {\n    "deposit_id": "dep_xyz789",\n    "vault_id": "vault_abc123",\n    "amount": "10000000000",\n    "token": "USDC",\n    "user_address": "0xAb3...f12",\n    "tx_hash": "0xdef...456",\n    "partner_revenue_usd": 0.50\n  }\n}`} />
            </div>
          </div>
        )}

        {/* ===== SDKS ===== */}
        {page === "sdks" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700 }}>📦 SDKs & Libraries</h1>
              <p style={{ fontSize: 16, color: C.text2, lineHeight: 1.6, margin: 0 }}>Official client libraries for popular languages and frameworks.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { name: "TypeScript / JavaScript", pkg: "@yieldo" + "/sdk", install: "npm i" + "nstall @yieldo" + "/sdk", icon: "🟨", features: ["Full type safety", "React Native compatible", "Tree-shakeable", "Auto-retry & caching"] },
                { name: "Python", pkg: "yieldo", install: "pip install yieldo", icon: "🐍", features: ["Async support", "Type hints", "Django & FastAPI friendly", "Auto-pagination"] },
                { name: "React Components", pkg: "@yieldo" + "/react", install: "npm i" + "nstall @yieldo" + "/react", icon: "⚛️", features: ["Pre-built Yield Tab", "Vault Card component", "Deposit Modal", "Customizable themes"] },
                { name: "REST API", pkg: "No SDK needed", install: "curl https://api.yieldo.io/v1", icon: "🌐", features: ["Any language", "OpenAPI spec available", "Postman collection", "Rate limited"] },
              ].map((sdk, i) => (
                <div key={i} style={{ padding: 22, borderRadius: 10, background: C.white, border: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 22 }}>{sdk.icon}</span>
                    <div><div style={{ fontSize: 15, fontWeight: 600 }}>{sdk.name}</div><code style={{ fontSize: 11, color: C.purple, fontFamily: "'JetBrains Mono', monospace" }}>{sdk.pkg}</code></div>
                  </div>
                  <CodeBlock compact code={sdk.install} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 10 }}>
                    {sdk.features.map((f, j) => <div key={j} style={{ fontSize: 12, color: C.text3 }}>✓ {f}</div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== ERRORS & LIMITS ===== */}
        {page === "errors" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700 }}>⚠️ Errors & Rate Limits</h1>
              <p style={{ fontSize: 16, color: C.text2, lineHeight: 1.6, margin: 0 }}>Standard HTTP error codes and rate limiting policies.</p>
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 10px" }}>Error Codes</h3>
              <div style={{ borderRadius: 8, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                {[
                  ["200", "OK", "Request succeeded", C.green],
                  ["201", "Created", "Resource created (deposits, webhooks)", C.green],
                  ["400", "Bad Request", "Invalid parameters or malformed request body", C.amber],
                  ["401", "Unauthorized", "Missing or invalid API key", C.red],
                  ["403", "Forbidden", "Valid key but insufficient permissions", C.red],
                  ["404", "Not Found", "Resource doesn't exist", C.amber],
                  ["409", "Conflict", "Duplicate operation (e.g. double deposit)", C.amber],
                  ["429", "Rate Limited", "Too many requests — back off and retry", C.red],
                  ["500", "Server Error", "Internal error — contact support", C.red],
                ].map(([code, name, desc, color], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: ".3fr .5fr 2fr", padding: "9px 14px", borderTop: i > 0 ? `1px solid ${C.border}` : "none", alignItems: "center" }}>
                    <Badge color={color}>{code}</Badge>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{name}</span>
                    <span style={{ fontSize: 13, color: C.text3 }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 10px" }}>Error Response Format</h3>
              <CodeBlock title="Error response" lang="json" code={`{\n  "error": {\n    "code": "invalid_parameter",\n    "message": "Parameter 'chain' must be one of: ethereum, base, arbitrum, polygon, optimism",\n    "param": "chain",\n    "request_id": "req_abc123"\n  }\n}`} />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 10px" }}>Rate Limits</h3>
              <div style={{ borderRadius: 8, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                {[
                  ["Read endpoints (GET)", "1,000 / minute", "Vaults, portfolio, revenue"],
                  ["Write endpoints (POST)", "100 / minute", "Deposits, withdrawals"],
                  ["Webhook registration", "10 / minute", "Creating/updating webhooks"],
                  ["Sandbox (test keys)", "100 / minute", "All endpoints in test mode"],
                ].map(([endpoint, limit, note], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr 1.5fr", padding: "10px 14px", borderTop: i > 0 ? `1px solid ${C.border}` : "none" }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{endpoint}</span>
                    <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.purple }}>{limit}</code>
                    <span style={{ fontSize: 12, color: C.text3 }}>{note}</span>
                  </div>
                ))}
              </div>
              <Callout type="info">Rate limit headers are included in every response: <code>X-RateLimit-Limit</code>, <code>X-RateLimit-Remaining</code>, <code>X-RateLimit-Reset</code>. SDKs handle retry logic automatically with exponential backoff.</Callout>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
