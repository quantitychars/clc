import TopBar from "@/components/TopBar";
import NavBar from "@/components/NavBar";
import { Building2, BookOpen, Coffee, Dumbbell, Monitor, GraduationCap } from "lucide-react";

const campuses = [
  {
    name: "Aungier Street Campus",
    buildings: [
      { icon: BookOpen, name: "Library", desc: "Main student library with study spaces and printing" },
      { icon: Coffee, name: "Canteen", desc: "Ground floor cafeteria with hot meals and coffee" },
      { icon: Building2, name: "Main Lecture Halls", desc: "Rooms 101–401 across 4 floors" },
      { icon: GraduationCap, name: "Student Services", desc: "Registration, fees, and student support" },
    ],
  },
  {
    name: "CQ Building (Grangegorman)",
    buildings: [
      { icon: Monitor, name: "Computer Labs", desc: "Rooms CQ-301 to CQ-610 with high-spec workstations" },
      { icon: Building2, name: "Lecture Rooms", desc: "Modern lecture theatres and seminar rooms" },
    ],
  },
  {
    name: "Grangegorman Campus",
    buildings: [
      { icon: Dumbbell, name: "Sports Hall", desc: "Indoor courts, gym, and fitness facilities" },
      { icon: GraduationCap, name: "Mathematics Block", desc: "Rooms 101–305 for maths and sciences" },
    ],
  },
];

export default function MapPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Campus Map" />
      <main className="mx-auto max-w-lg px-4 py-6">
        <h2 className="text-2xl font-bold text-foreground">Campus Locations</h2>

        {/* Placeholder map image */}
        <div className="mt-4 flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted">
          <span className="text-sm font-medium text-muted-foreground">Campus Map – Grangegorman</span>
        </div>

        <div className="mt-6 space-y-6">
          {campuses.map((campus) => (
            <section key={campus.name} aria-label={campus.name}>
              <h3 className="text-lg font-semibold text-foreground">{campus.name}</h3>
              <div className="mt-3 space-y-2">
                {campus.buildings.map((b) => (
                  <div key={b.name} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-sm animate-fade-in">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <b.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{b.name}</p>
                      <p className="text-sm text-muted-foreground">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <NavBar />
    </div>
  );
}
