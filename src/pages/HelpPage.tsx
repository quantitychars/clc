import { useState } from "react";
import TopBar from "@/components/TopBar";
import NavBar from "@/components/NavBar";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

interface Ticket {
  id: number;
  subject: string;
  description: string;
  status: "Pending" | "Resolved";
  date: string;
}

const resources = [
  { name: "TUD Library", url: "#" },
  { name: "IT Support", url: "#" },
  { name: "Student Union", url: "#" },
  { name: "Timetable Portal", url: "#" },
  { name: "Exam Office", url: "#" },
];

const faqs = [
  { q: "How do I reset my password?", a: "Visit the IT Support portal and click 'Forgot Password'. You'll receive a reset link via your student email." },
  { q: "Where is the canteen?", a: "The main canteen is on the ground floor of the Aungier Street campus. Grangegorman also has a cafeteria in the Central Quad." },
  { q: "How do I access the library?", a: "Present your student ID at the library entrance. Online resources can be accessed via the TUD Library website with your student login." },
  { q: "Who do I contact for accommodation issues?", a: "Contact the Student Services office via email at studentservices@tudublin.ie or visit their office on the Grangegorman campus." },
];

export default function HelpPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!subject.trim()) errs.subject = "Subject is required";
    if (!description.trim()) errs.description = "Description is required";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setTickets([
      { id: Date.now(), subject: subject.trim(), description: description.trim(), status: "Pending", date: new Date().toLocaleDateString("en-IE") },
      ...tickets,
    ]);
    setSubject("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Helpdesk" />
      <main className="mx-auto max-w-4xl px-4 py-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left panel */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">Student Resources</h2>
            <ul className="mt-3 space-y-2">
              {resources.map((r) => (
                <li key={r.name}>
                  <a href={r.url} className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-primary hover:bg-muted transition-colors">
                    <ExternalLink className="h-4 w-4" /> {r.name}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-semibold text-foreground">FAQ</h3>
            <div className="mt-3 space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-lg border border-border bg-card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between p-3 text-left text-sm font-medium text-foreground hover:bg-muted"
                    aria-expanded={openFaq === i}
                  >
                    {faq.q}
                    {openFaq === i ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <p className="border-t border-border px-3 py-3 text-sm text-muted-foreground animate-fade-in">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">Submit a Ticket</h2>
            <form onSubmit={handleSubmit} className="mt-3 space-y-3">
              <div>
                <label htmlFor="ticket-subject" className="sr-only">Subject</label>
                <input
                  id="ticket-subject" type="text" placeholder="Subject" value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-invalid={!!errors.subject}
                />
                {errors.subject && <p className="mt-1 text-sm text-destructive" role="alert">{errors.subject}</p>}
              </div>
              <div>
                <label htmlFor="ticket-desc" className="sr-only">Description</label>
                <textarea
                  id="ticket-desc" placeholder="Description" rows={4} value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  aria-invalid={!!errors.description}
                />
                {errors.description && <p className="mt-1 text-sm text-destructive" role="alert">{errors.description}</p>}
              </div>
              <button type="submit" className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground hover:opacity-90 transition-colors">
                Submit
              </button>
            </form>

            <h3 className="mt-6 text-lg font-semibold text-foreground">My Open Tickets</h3>
            {tickets.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">No tickets yet</p>
            ) : (
              <div className="mt-3 space-y-2">
                {tickets.map((t) => (
                  <div key={t.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                    <div>
                      <p className="font-medium text-foreground text-sm">{t.subject}</p>
                      <p className="text-xs text-muted-foreground">{t.date}</p>
                    </div>
                    <span className={`rounded-pill px-3 py-1 text-xs font-bold ${
                      t.status === "Pending" ? "bg-warning text-warning-foreground" : "bg-success text-success-foreground"
                    }`}>
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <NavBar />
    </div>
  );
}
