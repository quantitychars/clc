import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { courses } from "@/data/courses";
import { useTheme } from "@/context/ThemeContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [courseId, setCourseId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const { highContrast } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    if (!password || password.length < 6) errs.password = "Password must be at least 6 characters";
    if (!courseId) errs.course = "Please select a course";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    const course = courses.find((c) => c.courseId === courseId);
    const { error } = await register(
      name.trim(),
      email.trim(),
      password,
      courseId,
      course?.courseName || ""
    );
    setSubmitting(false);

    if (error) {
      setErrors({ form: error });
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
        <h1 className="text-center text-3xl font-bold text-foreground">Campus Companion</h1>
        <p className="mb-8 text-center text-muted-foreground">Create your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.form && (
            <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
              {errors.form}
            </p>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
            <input
              id="name" type="text" placeholder="Jane Smith" value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="w-full rounded-pill border border-input bg-card px-5 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && <p id="name-error" className="mt-1 text-sm text-destructive" role="alert">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Student Email</label>
            <input
              id="email" type="email" placeholder="you@mytudublin.ie" value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              id="password" type="password" placeholder="At least 6 characters" value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full rounded-pill border border-input bg-card px-5 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && <p id="password-error" className="mt-1 text-sm text-destructive" role="alert">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="course" className="block text-sm font-medium text-foreground mb-1">Course</label>
            <select
              id="course" value={courseId} onChange={(e) => setCourseId(e.target.value)}
              className="w-full rounded-pill border border-input bg-card px-5 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
              aria-invalid={!!errors.course}
              aria-describedby={errors.course ? "course-error" : undefined}
            >
              <option value="" disabled>Select your course</option>
              {courses.map((c) => (
                <option key={c.courseId} value={c.courseId}>{c.courseName}</option>
              ))}
            </select>
            {errors.course && <p id="course-error" className="mt-1 text-sm text-destructive" role="alert">{errors.course}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-pill bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs italic text-muted-foreground">
          We only collect essential data needed for student verification purposes.
        </p>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
