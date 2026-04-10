const interestColors: Record<string, string> = {
  Computing: "bg-primary text-primary-foreground",
  Sports: "bg-success text-success-foreground",
  Gaming: "bg-warning text-warning-foreground",
  Arts: "bg-destructive text-destructive-foreground",
  Management: "bg-secondary text-secondary-foreground",
  Music: "bg-primary text-primary-foreground",
  Chess: "bg-warning text-warning-foreground",
  Film: "bg-destructive text-destructive-foreground",
};

export default function InterestChip({ label, onRemove }: { label: string; onRemove?: () => void }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-pill px-3 py-1 text-xs font-medium ${interestColors[label] || "bg-muted text-muted-foreground"}`}>
      {label}
      {onRemove && (
        <button onClick={onRemove} aria-label={`Remove ${label}`} className="ml-1 hover:opacity-70">×</button>
      )}
    </span>
  );
}
