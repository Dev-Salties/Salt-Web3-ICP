import { useAuth } from "../context/AuthContext";
import ArticlesPage from "./ArticlesPage";

export default function HomePage() {
  const { principal, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0064A8] text-lg font-black text-white">
              S
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Salt Essential CMS</div>
              <div className="text-xs text-slate-500">Admin Console</div>
            </div>
          </div>

          <button
            onClick={() => void logout()}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Home</h1>
        <p className="mt-1 text-sm text-slate-500">
          You are signed in successfully. This is the placeholder dashboard until the full CMS screens are added.
        </p>

        <main className="mx-auto max-w-6xl px-6 py-8">
          <ArticlesPage />
        </main>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Your Principal</div>
          <div className="mt-2 break-all rounded-lg bg-slate-50 px-3 py-2 font-mono text-xs text-slate-800">
            {principal}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-sm font-semibold text-slate-900">Content</div>
              <div className="mt-1 text-xs text-slate-500">Articles, categories, team, sessions</div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-sm font-semibold text-slate-900">Status</div>
              <div className="mt-1 text-xs text-slate-500">Backend connected (next step: show live counts)</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}