import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import { useAuth } from "./context/AuthContext";
import { isEditor } from "./lib/access"; // or isAdmin

export default function App() {
  const { isAuth, authReady, identity } = useAuth();
  const [checked, setChecked] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!identity) return;

      setChecked(false);
      try {
        // Timeout wrapper so the UI never hangs forever
        const ok = await Promise.race([
          isEditor(identity), // or isAdmin(identity)
          new Promise<boolean>((_, reject) =>
            setTimeout(() => reject(new Error("Access check timed out")), 8000)
          ),
        ]);

        if (!cancelled) {
          setAllowed(Boolean(ok));
          setChecked(true);
        }
      } catch (e) {
        console.error("[access-check] failed:", e);
        if (!cancelled) {
          setAllowed(false);
          setChecked(true); // move forward -> will show AccessDenied
        }
      }
    }

    void run();
    return () => { cancelled = true; };
  }, [identity]);

  if (!authReady) return <div className="p-8">Connecting…</div>;
  if (!isAuth) return <LoginPage />;

  if (!checked) return <div className="p-8">Checking access…</div>;
  if (!allowed) return <AccessDeniedPage />;

  return <HomePage />;
}