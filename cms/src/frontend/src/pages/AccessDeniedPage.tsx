import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { bootstrapAdmin } from "../lib/admin";

export default function AccessDeniedPage() {
  const { principal, logout, identity } = useAuth();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleBootstrap = async () => {
    if (!identity) return;
    setLoading(true);
    setMsg(null);
    try {
      const res = await bootstrapAdmin(identity);

      // res is your CmsResult variant (#ok or #err Text)
      // @ts-ignore
      if ("ok" in res) {
        setMsg("Bootstrap successful. Reloading…");
        window.location.reload();
      } else {
        // @ts-ignore
        setMsg(("err" in res) ? res.err : "Bootstrap failed");
      }
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Bootstrap failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-extrabold text-slate-900">Access denied</h1>
        <p className="mt-2 text-sm text-slate-500">
          Your principal is not authorized to access the CMS. Please contact an administrator to be added.
        </p>

        <div className="mt-5 break-all rounded-lg bg-slate-50 px-3 py-2 font-mono text-xs text-slate-800">
          {principal}
        </div>

        {msg && (
          <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
            {msg}
          </p>
        )}

        {/* Bootstrap button for first-time setup (safe because backend allows it ONLY when empty) */}
        <button
          type="button"
          disabled={!identity || loading}
          onClick={() => void handleBootstrap()}
          className="mt-6 w-full rounded-full bg-[#0064A8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0075C4] disabled:opacity-50"
        >
          {loading ? "Bootstrapping…" : "Make me admin (first-time setup)"}
        </button>

        <button
          type="button"
          onClick={() => void logout()}
          className="mt-3 w-full rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
}