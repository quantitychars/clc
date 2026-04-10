export interface CampusEvent {
  id: string;
  title: string;
  date: string;
  room: string;
  category: "Computing" | "Sports" | "Gaming" | "Arts" | "Management";
  tags: string[];
}

export const events: CampusEvent[] = [
  { id: "evt_1", title: "Hackathon: Build a Chatbot", date: "2026-03-14", room: "CQ-401", category: "Computing", tags: ["Computing", "Gaming"] },
  { id: "evt_2", title: "5-a-Side Football Tournament", date: "2026-03-16", room: "Grangegorman Sports Hall", category: "Sports", tags: ["Sports"] },
  { id: "evt_3", title: "Retro Game Night", date: "2026-03-18", room: "CQ-302", category: "Gaming", tags: ["Gaming", "Computing"] },
  { id: "evt_4", title: "Watercolour Workshop", date: "2026-03-20", room: "Aungier-201", category: "Arts", tags: ["Arts"] },
  { id: "evt_5", title: "Start-Up Pitch Competition", date: "2026-03-22", room: "Aungier-305", category: "Management", tags: ["Management", "Computing"] },
  { id: "evt_6", title: "AI & Ethics Panel Discussion", date: "2026-03-25", room: "CQ-501", category: "Computing", tags: ["Computing"] },
  { id: "evt_7", title: "Badminton Open Day", date: "2026-03-27", room: "Grangegorman Sports Hall", category: "Sports", tags: ["Sports"] },
  { id: "evt_8", title: "Board Game Café", date: "2026-03-29", room: "Aungier-110", category: "Gaming", tags: ["Gaming", "Chess"] },
  { id: "evt_9", title: "Photography Exhibition", date: "2026-04-01", room: "Aungier-401", category: "Arts", tags: ["Arts", "Film"] },
  { id: "evt_10", title: "Marketing Case Challenge", date: "2026-04-03", room: "Aungier-305", category: "Management", tags: ["Management"] },
  { id: "evt_11", title: "Open-Source Contribution Day", date: "2026-04-05", room: "CQ-410", category: "Computing", tags: ["Computing"] },
  { id: "evt_12", title: "Yoga & Mindfulness Session", date: "2026-04-08", room: "Grangegorman Sports Hall", category: "Sports", tags: ["Sports", "Music"] },
  { id: "evt_13", title: "Esports FIFA Championship", date: "2026-04-10", room: "CQ-302", category: "Gaming", tags: ["Gaming", "Sports"] },
  { id: "evt_14", title: "Short Film Screening Night", date: "2026-04-12", room: "Aungier-201", category: "Arts", tags: ["Arts", "Film", "Music"] },
  { id: "evt_15", title: "Finance & Investment Talk", date: "2026-04-15", room: "Aungier-301", category: "Management", tags: ["Management"] },
];
