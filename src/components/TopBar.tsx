import { Settings, LogOut, User } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface TopBarProps {
  title?: string;
}

export default function TopBar({ title = "Campus Companion" }: TopBarProps) {
  const { toggleHighContrast, highContrast } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
      <button
        onClick={toggleHighContrast}
        aria-label={highContrast ? "Disable high contrast mode" : "Enable high contrast mode"}
        className="rounded-lg p-2 transition-colors hover:bg-primary-foreground/20"
      >
        <Settings className="h-5 w-5" />
      </button>
      <h1 className="text-lg font-bold">{title}</h1>
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Account menu"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/20 transition-colors hover:bg-primary-foreground/30"
        >
          <User className="h-5 w-5" />
        </button>
        {showMenu && (
          <div className="absolute right-0 top-12 w-48 rounded-lg border border-border bg-card p-2 shadow-lg animate-fade-in">
            {user && <p className="px-3 py-2 text-sm font-medium text-card-foreground">{user.name}</p>}
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-muted"
            >
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
