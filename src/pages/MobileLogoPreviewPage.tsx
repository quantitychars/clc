import { useTheme } from "@/context/ThemeContext";

export default function MobileLogoPreviewPage() {
  const { highContrast, toggleHighContrast } = useTheme();

  return (
    <main className="min-h-screen bg-background text-foreground p-4 flex items-center justify-center">
      <section className="w-full max-w-[390px] min-h-[664px] rounded-2xl border border-border bg-card shadow-md p-4 flex flex-col">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-sm font-semibold">Mobile Logo Preview</h1>
          <button
            onClick={toggleHighContrast}
            className="rounded-md border border-border px-3 py-1 text-xs hover:bg-muted"
          >
            {highContrast ? "Light" : "Dark"}
          </button>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <img
            src={highContrast ? "/tudublin-logo.png" : "/tudublin-logo-color.png"}
            alt="Technological University Dublin logo preview"
            className="w-full max-w-[280px] h-auto object-contain"
          />
          <p className="text-xs text-muted-foreground text-center">
            Theme-aware logo preview in mobile-sized frame.
          </p>
        </div>
      </section>
    </main>
  );
}
