import React, { useEffect, useState } from "react";

// If you use wouter, this will work. If not, it simply does nothing.
let useNavigate: any;
try { ({ useLocation: useNavigate } = require("wouter")); } catch {}

const dbg = (...a: any[]) => console.log("[early-access]", ...a);

// Inline error boundary (no new file)
class ErrorProbe extends React.Component<
  { children: React.ReactNode },
  { err: any }
> {
  constructor(p: any) { super(p); this.state = { err: null }; }
  static getDerivedStateFromError(err: any) { return { err }; }
  componentDidCatch(err: any, info: any) {
    console.error("[early-access crash]", err, info);
  }
  render() {
    if (this.state.err) {
      return (
        <pre style={{ color: "red", padding: 16 }}>
{`early-access crashed in render:
${String(this.state.err)}
(see console for stack)`}
        </pre>
      );
    }
    return this.props.children as any;
  }
}

export default function EarlyAccess() {
  dbg("component start — React", (React as any).version);
  const [mounted, setMounted] = useState(false);
  const nav = typeof useNavigate === "function" ? useNavigate()[1] : null;

  useEffect(() => {
    setMounted(true);
    dbg("mounted");
    return () => dbg("unmounted");
  }, []);

  return (
    <ErrorProbe>
      <div style={{ padding: 24 }}>
        <h1>Early Access (probe)</h1>
        <p>
          If you see this, the route renders. The crash is in code we temporarily
          removed (imports/effects/form logic).
        </p>
        <p>Mounted: {String(mounted)}</p>
        <button onClick={() => nav && nav("/thank-you")}>
          Go to Thank-You
        </button>
      </div>
    </ErrorProbe>
  );
}