import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAuth } from "./context/AuthContext";
import saltLogo from "./assets/salt-logo.webp";

export default function App() {
  const { isAuth, authReady } = useAuth();

  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
        <div className="w-full max-w-sm rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center shadow-sm">
          <img
            src={saltLogo}
            alt="Salt Essential IT logo"
            className="mx-auto h-10 w-auto"
          />
          <p className="mt-4 text-sm font-semibold text-[#0F172A]">Connecting to CMS…</p>
        </div>
      </div>
    );
  }

  if (!isAuth) return <LoginPage />;

  // TEMPORARY: allow any authenticated II user into the CMS UI
  return <HomePage />;
}