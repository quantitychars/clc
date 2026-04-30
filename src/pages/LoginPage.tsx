import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const { highContrast } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!email.trim()) errs.email = "Email is required";
    if (!password) errs.password = "Password is required";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    const { error } = await login(email.trim(), password);
    setSubmitting(false);

    if (error) {
      setErrors({ form: "Invalid email or password" });
      return;
    }
    navigate("/dashboard");
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
          {errors.form && (
            <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
              {errors.form}
            </p>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Student Email</label>
            <input
              id="email" type="email" placeholder="you@mytudublin.ie" value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
              autoComplete="email"
              className="w-full rounded-pill border border-input bg-card px-5 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <p id="email-error" className="mt-1 text-sm text-destructive" role="alert">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">Password</label>
            <input
              id="password" type="password" placeholder="Your password" value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors({}); }}
              autoComplete="current-password"
              className="w-full rounded-pill border border-input bg-card px-5 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && <p id="password-error" className="mt-1 text-sm text-destructive" role="alert">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-pill bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Logging in…" : "Log In"}
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
