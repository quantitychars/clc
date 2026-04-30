import { useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { events } from "@/data/events";
import { students } from "@/data/students";
import { getKNNRecommendations } from "@/utils/knnRecommender";
import TopBar from "@/components/TopBar";
import NavBar from "@/components/NavBar";
import EventCard from "@/components/EventCard";
import InterestChip from "@/components/InterestChip";

const ALL_INTERESTS = ["Computing", "Sports", "Gaming", "Arts", "Management", "Music", "Chess", "Film"];

export default function EventsPage() {
  const { user, updateInterests } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [tempInterests, setTempInterests] = useState<string[]>(user?.interests || []);
  const [filterByInterests, setFilterByInterests] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "category">("date");

  const recommendations = useMemo(() => {
    if (!user?.interests.length) return [];
    return getKNNRecommendations(user.interests, students, events);
  }, [user?.interests]);

  const filteredEvents = useMemo(() => {
    let evts = [...events];
    if (filterByInterests && user?.interests.length) {
      evts = evts.filter((e) => e.tags.some((t) => user.interests.includes(t)));
    }
    evts.sort((a, b) =>
      sortBy === "date"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : a.category.localeCompare(b.category)
    );
    return evts;
  }, [filterByInterests, sortBy, user?.interests]);

  const handleSaveInterests = () => {
    updateInterests(tempInterests);
    setShowAddModal(false);
  };

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Events" />
      <main id="main-content" className="mx-auto max-w-lg px-4 py-6">
        {/* Interests */}
        <section aria-label="Your interests">
          <h2 className="text-lg font-semibold text-foreground">Your Interests</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {user?.interests.length ? (
              user.interests.map((i) => <InterestChip key={i} label={i} />)
            ) : (
              <p className="text-sm text-muted-foreground">No interests selected yet</p>
            )}
            <button
              onClick={() => { setTempInterests(user?.interests || []); setShowAddModal(true); }}
              className="rounded-pill border border-primary px-3 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Add interests"
            >
              + Add
            </button>
          </div>
        </section>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section className="mt-6" aria-label="Recommended events">
            <div className="rounded-lg bg-secondary px-4 py-2">
              <h2 className="text-sm font-bold text-secondary-foreground">Recommended for you:</h2>
            </div>
            <div className="mt-3 space-y-3">
              {recommendations.map((r) => (
                <EventCard key={r.event.id} event={r.event} matchScore={r.matchScore} />
              ))}
            </div>
          </section>
        )}

        {/* All events */}
        <section className="mt-6" aria-label="All upcoming events">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">All Upcoming Events</h2>
          </div>
          <div className="mt-2 flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "category")}
              className="rounded-lg border border-input bg-card px-3 py-1.5 text-sm text-foreground"
              aria-label="Sort events"
            >
              <option value="date">Sort by Date</option>
              <option value="category">Sort by Category</option>
            </select>
            <button
              onClick={() => setFilterByInterests(!filterByInterests)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                filterByInterests ? "bg-primary text-primary-foreground" : "border border-input bg-card text-foreground"
              }`}
              aria-pressed={filterByInterests}
            >
              Filter by Interests
            </button>
          </div>
          <div className="mt-3 space-y-3">
            {filteredEvents.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      </main>

      {/* Add Interests Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" role="dialog" aria-modal="true" aria-labelledby="interests-modal-title" onKeyDown={handleModalKeyDown}>
          <div className="w-full max-w-sm rounded-lg bg-card p-6 shadow-xl animate-fade-in">
            <h3 id="interests-modal-title" className="text-lg font-bold text-foreground mb-4" tabIndex={-1}>Select Your Interests</h3>
            <div className="grid grid-cols-2 gap-2">
              {ALL_INTERESTS.map((interest) => (
                <label key={interest} className="flex items-center gap-2 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted">
                  <input
                    type="checkbox"
                    checked={tempInterests.includes(interest)}
                    onChange={(e) => {
                      if (e.target.checked) setTempInterests([...tempInterests, interest]);
                      else setTempInterests(tempInterests.filter((i) => i !== interest));
                    }}
                    className="accent-primary"
                  />
                  <span className="text-sm text-foreground">{interest}</span>
                </label>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => setShowAddModal(false)} className="flex-1 rounded-lg border border-border py-2 text-sm text-foreground hover:bg-muted">
                Cancel
              </button>
              <button onClick={handleSaveInterests} className="flex-1 rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <NavBar />
    </div>
  );
}
