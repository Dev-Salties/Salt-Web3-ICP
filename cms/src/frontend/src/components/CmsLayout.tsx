import { type ReactNode, useState } from "react";
import {
  LayoutDashboard,
  Newspaper,
  Package,
  Users,
  LogOut,
  ChevronRight,
  ShieldCheck,
  FolderTree,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export type SectionKey = "overview" | "articles" | "team" | "products" | "categories" | "cats";

type CmsLayoutProps = {
  activeSection: SectionKey;
  onSectionChange: (section: SectionKey) => void;
  children: ReactNode;
};

const NAV = [
  { key: "overview" as SectionKey, label: "Overview", icon: LayoutDashboard },
  { key: "articles" as SectionKey, label: "Articles", icon: Newspaper },
  { key: "team" as SectionKey, label: "Team", icon: Users },
  { key: "products" as SectionKey, label: "Products", icon: Package },
  { key: "categories" as SectionKey, label: "Categories", icon: FolderTree },
  { key: "cats" as SectionKey, label: "CATS Links", icon: ShieldCheck },
];

export default function CmsLayout({
  activeSection,
  onSectionChange,
  children,
}: CmsLayoutProps) {
  const { principal, logout } = useAuth();
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-[#E2E8F0] bg-white">
        <div className="h-[2px] w-full bg-gradient-to-r from-[#1E3A8A] via-[#0064A8] to-[#0075C4]" />

        <div className="flex items-center gap-3 border-b border-[#E2E8F0] px-5 py-5">
          <div className="flex h-10 w-20 items-center justify-center overflow-hidden rounded-xl bg-white px-2 ring-1 ring-slate-200">
            {!logoError ? (
              <img
                src="/salt-logo.webp"
                alt="Salt Essential IT logo"
                className="h-full w-full object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#0064A8] text-lg font-black text-white">
                S
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-extrabold text-[#0F172A]">Salt CMS</p>
            <p className="text-[10px] text-[#64748B]">Website content dashboard</p>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {NAV.map(({ key, label, icon: Icon }) => {
            const active = activeSection === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => onSectionChange(key)}
                className={[
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-[#EFF6FF] text-[#0064A8]"
                    : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0064A8]",
                ].join(" ")}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
                {active && <ChevronRight className="ml-auto h-3 w-3 opacity-70" />}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-[#E2E8F0] px-4 py-4">
          <div className="flex items-center gap-2 truncate text-[10px] font-mono text-[#94A3B8]">
            <User className="h-4 w-4 shrink-0 text-[#0064A8]" />
            <span className="truncate">
              {principal ? `${principal.slice(0, 10)}...` : ""}
            </span>
          </div>
          <button
            type="button"
            onClick={() => void logout()}
            className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#64748B] transition hover:text-[#0064A8]"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="h-screen flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}