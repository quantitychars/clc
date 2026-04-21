import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { highContrast } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError("Email is required"); return; }
    const stored = localStorage.getItem("campus_user");
    if (stored) {
      const user = JSON.parse(stored);
      if (user.email === email.trim()) {
        login(user);
        navigate("/dashboard");
        return;
      }
    }
    setError("No account found with that email");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mx-auto mb-6 flex items-center justify-center">
          <img
            src={highContrast ? "/tudublin-logo.png" : "/tudublin-logo-color.png"}
            alt="Technological University Dublin logo"
            className="h-20 w-auto rounded-lg object-contain"
          />
        </div>
        <h1 className="text-center text-3xl font-bold text-foreground">Welcome Back</h1>
        <p className="mb-8 text-center text-muted-foreground">Log in to your account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">Student Email</label>
            <input
              id="email" type="email" placeholder="Student Email" value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="w-full rounded-pill border border-input bg-card px-5 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-invalid={!!error}
            />
            {error && <p className="mt-1 text-sm text-destructive" role="alert">{error}</p>}
          </div>
          <button type="submit" className="w-full rounded-pill bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:opacity-90">
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/" className="font-semibold text-primary hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
