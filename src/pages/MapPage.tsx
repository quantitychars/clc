import { useEffect, useMemo, useState } from "react";
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
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocationError("Geolocation is not supported on this device.");
      return;
    }

    setIsLocating(true);
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setCurrentPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocationError("");
        setIsLocating(false);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setLocationError("Location permission denied. Please allow location access.");
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setLocationError("Unable to determine current location.");
        } else if (err.code === err.TIMEOUT) {
          setLocationError("Location request timed out. Please try again.");
        } else {
          setLocationError("Could not fetch location right now.");
        }
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const mapEmbedUrl = useMemo(() => {
    if (!currentPosition) {
      return "https://maps.google.com/maps?q=Technological%20University%20Dublin%20Grangegorman&z=15&output=embed";
    }
    return `https://maps.google.com/maps?q=${currentPosition.lat},${currentPosition.lng}&z=17&output=embed`;
  }, [currentPosition]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Campus Map" />
      <main className="mx-auto max-w-lg px-4 py-6">
        <h2 className="text-2xl font-bold text-foreground">Campus Locations</h2>

        <div className="mt-4 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <iframe
            title="Google map campus and live location"
            src={mapEmbedUrl}
            className="h-64 w-full md:h-72"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-3 rounded-lg border border-border bg-card p-3 text-sm">
          <p className="font-medium text-foreground">Live location</p>
          {isLocating && <p className="mt-1 text-muted-foreground">Finding your current location...</p>}
          {!isLocating && currentPosition && (
            <p className="mt-1 text-muted-foreground">
              Lat: {currentPosition.lat.toFixed(6)}, Lng: {currentPosition.lng.toFixed(6)}
            </p>
          )}
          {!isLocating && locationError && (
            <p className="mt-1 text-destructive">{locationError}</p>
          )}
          {currentPosition && (
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${currentPosition.lat},${currentPosition.lng}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-primary hover:underline"
            >
              Open in Google Maps
            </a>
          )}
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
