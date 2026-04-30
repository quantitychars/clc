import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { courses } from "@/data/courses";
import { events } from "@/data/events";
import TopBar from "@/components/TopBar";
import NavBar from "@/components/NavBar";
import ClassCard from "@/components/ClassCard";
import { Calendar, HelpCircle, Map, Settings } from "lucide-react";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const now = new Date();
  const jsDay = now.getDay(); // 0=Sun
  const [selectedDay, setSelectedDay] = useState(jsDay >= 1 && jsDay <= 5 ? jsDay : 0);

  const course = courses.find((c) => c.courseId === user?.courseId);
  const schedule = course?.weeklySchedule.filter((s) => s.dayOfWeek === selectedDay) || [];

  const dateStr = now.toLocaleDateString("en-IE");
  const isWeekend = jsDay === 0 || jsDay === 6;

  const openTickets = 0; // placeholder

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Dashboard" />
      <main id="main-content" className="mx-auto max-w-lg px-4 py-6">
        <h2 className="text-2xl font-bold text-foreground">Hi, {user?.name}</h2>
        <p className="text-muted-foreground">{user?.courseName} – Year 1</p>

        <section className="mt-6" aria-label="Today's schedule">
          <h3 className="text-lg font-semibold text-foreground">Today's Schedule</h3>
          <p className="text-sm text-muted-foreground">{dayNames[jsDay]} – {dateStr}</p>

          {/* Day selector */}
          <div className="mt-3 flex gap-2" role="group" aria-label="Select day">
            {weekDays.map((d, i) => (
              <button
                key={d}
                onClick={() => setSelectedDay(i + 1)}
                aria-pressed={selectedDay === i + 1}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
                  selectedDay === i + 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            {isWeekend && selectedDay === jsDay ? (
              <p className="py-8 text-center text-lg text-muted-foreground">No classes today 🎉</p>
            ) : schedule.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">No classes on this day</p>
            ) : (
              <>
                {schedule.map((entry) => (
                  <ClassCard key={entry.id} entry={entry} />
                ))}
                {schedule.length > 3 && (
                  <p className="text-center text-xs text-muted-foreground">↓ Scroll for more</p>
                )}
              </>
            )}
          </div>
        </section>

        <section className="mt-8" aria-label="Quick links">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: `Events – ${events.length} Upcoming`, icon: Calendar, path: "/events" },
              { label: `Helpdesk – ${openTickets} open ticket`, icon: HelpCircle, path: "/help" },
              { label: "Campus Map", icon: Map, path: "/map" },
              { label: "Settings", icon: Settings, path: "" },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => link.path && navigate(link.path)}
                aria-disabled={!link.path || undefined}
                className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center shadow-sm transition-colors hover:bg-muted"
              >
                <link.icon className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium text-foreground">{link.label}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
      <NavBar />
    </div>
  );
}
