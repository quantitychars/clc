import { ScheduleEntry } from "@/data/courses";

const typeColors: Record<string, string> = {
  Lecture: "bg-primary",
  Lab: "bg-success",
  Seminar: "bg-destructive",
};

export default function ClassCard({ entry }: { entry: ScheduleEntry }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-sm animate-fade-in">
      <div className="flex flex-col items-center">
        <span className="text-sm font-bold text-foreground">{entry.startTime}</span>
        <div className={`mt-1 h-3 w-3 rounded-full ${typeColors[entry.type] || "bg-muted"}`} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground truncate">{entry.module}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm text-muted-foreground">{entry.room}</p>
        <p className="text-xs text-muted-foreground">{entry.type}</p>
      </div>
    </div>
  );
}
