import { CampusEvent } from "@/data/events";

const categoryColors: Record<string, string> = {
  Computing: "border-l-primary",
  Sports: "border-l-success",
  Gaming: "border-l-warning",
  Arts: "border-l-destructive",
  Management: "border-l-secondary",
};

export default function EventCard({ event, matchScore }: { event: CampusEvent; matchScore?: number }) {
  return (
    <div className={`rounded-lg border border-border bg-card p-4 shadow-sm border-l-4 ${categoryColors[event.category] || ""} animate-fade-in`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground">{event.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date(event.date).toLocaleDateString("en-IE")} · {event.room}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {event.tags.map((tag) => (
              <span key={tag} className="rounded-pill bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
        {matchScore !== undefined && (
          <span className="shrink-0 rounded-pill bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
            {matchScore}% match
          </span>
        )}
      </div>
    </div>
  );
}
