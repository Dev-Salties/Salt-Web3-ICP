import { useEffect, useState } from "react";
import OverviewPage from "./OverviewPage";
import ArticlesPage from "./ArticlesPage";
import TeamPage from "./TeamPage";
import ProductsPage from "./ProductsPage";
import CategoriesPage from "./CategoriesPage";
import CatsPage from "./CatsPage";
import CmsLayout, { type SectionKey } from "../components/CmsLayout";
import { CheckCircle2, X } from "lucide-react";

type ToastState = {
  message: string;
  visible: boolean;
};

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<SectionKey>(() => {
    if (typeof window === "undefined") return "overview";
    const saved = localStorage.getItem("cms-active-section");
    if (
      saved === "overview" ||
      saved === "articles" ||
      saved === "team" ||
      saved === "products" ||
      saved === "categories" ||
      saved === "cats"
    ) {
      return saved;
    }
    return "overview";
  });

  const [counts, setCounts] = useState({
    articles: 0,
    team: 0,
    products: 0,
    categories: 0,
    cats: 0,
  });

  const [toast, setToast] = useState<ToastState>({
    message: "",
    visible: false,
  });

  useEffect(() => {
    localStorage.setItem("cms-active-section", activeSection);
  }, [activeSection]);

  useEffect(() => {
    if (!toast.visible) return;

    const timer = setTimeout(() => {
      setToast({ message: "", visible: false });
    }, 2600);

    return () => clearTimeout(timer);
  }, [toast.visible]);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
  };

  return (
    <CmsLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      <div className="min-h-screen bg-[#F8FAFC] p-8">
        {/* Toast */}
        <div className="pointer-events-none fixed right-6 top-6 z-50">
          {toast.visible && (
            <div className="pointer-events-auto flex items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-lg">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium text-slate-800">
                {toast.message}
              </span>
              <button
                onClick={() => setToast({ message: "", visible: false })}
                className="ml-1 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {activeSection === "overview" && <OverviewPage />}

        {activeSection === "articles" && (
          <ArticlesPage
            onCountChange={(count: number) =>
              setCounts((prev) => ({ ...prev, articles: count }))
            }
            onNotify={showToast}
          />
        )}

        {activeSection === "team" && (
          <TeamPage
            onCountChange={(count: number) =>
              setCounts((prev) => ({ ...prev, team: count }))
            }
            onNotify={showToast}
          />
        )}

        {activeSection === "products" && (
          <ProductsPage
            onCountChange={(count: number) =>
              setCounts((prev) => ({ ...prev, products: count }))
            }
            onNotify={showToast}
          />
        )}

        {activeSection === "categories" && (
          <CategoriesPage
            onCountChange={(count: number) =>
              setCounts((prev) => ({ ...prev, categories: count }))
            }
            onNotify={showToast}
          />
        )}

        {activeSection === "cats" && (
          <CatsPage
            onCountChange={(count: number) =>
              setCounts((prev) => ({ ...prev, cats: count }))
            }
            onNotify={showToast}
          />
        )}
      </div>
    </CmsLayout>
  );
}