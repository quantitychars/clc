import { useLocation, useNavigate } from "react-router-dom";
import { Home, Calendar, Map, HelpCircle } from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, path: "/dashboard" },
  { label: "Events", icon: Calendar, path: "/events" },
  { label: "Map", icon: Map, path: "/map" },
  { label: "Help", icon: HelpCircle, path: "/help" },
];

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card" aria-label="Main navigation">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition-colors ${
                active ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
