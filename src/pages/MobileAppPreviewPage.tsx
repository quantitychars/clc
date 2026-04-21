import { useMemo, useState } from "react";

const MOBILE_ROUTES = [
  { label: "Register", path: "/" },
  { label: "Login", path: "/login" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Events", path: "/events" },
  { label: "Map", path: "/map" },
  { label: "Help", path: "/help" },
];

export default function MobileAppPreviewPage() {
  const [activePath, setActivePath] = useState("/");
  const previewUrl = useMemo(() => activePath, [activePath]);

  return (
    <main className="min-h-screen bg-background p-4 text-foreground">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-xl font-bold">Full App Mobile Preview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Select any app screen to preview it inside a mobile viewport frame.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {MOBILE_ROUTES.map((route) => (
            <button
              key={route.path}
              onClick={() => setActivePath(route.path)}
              className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                activePath === route.path
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:bg-muted"
              }`}
            >
              {route.label}
            </button>
          ))}
        </div>

        <section className="mt-5 flex justify-center">
          <div className="w-full max-w-[390px] overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-md">
            <div className="border-b border-border px-3 py-2 text-center text-xs text-muted-foreground">
              {activePath}
            </div>
            <iframe
              title="Mobile app preview"
              src={previewUrl}
              className="h-[664px] w-full bg-background"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
