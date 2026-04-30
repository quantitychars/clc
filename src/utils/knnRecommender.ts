import { Student } from "@/data/students";
import { CampusEvent } from "@/data/events";

const ALL_INTERESTS = ["Computing", "Sports", "Gaming", "Arts", "Management", "Music", "Chess", "Film"];

function toVector(interests: string[]): number[] {
  return ALL_INTERESTS.map((cat) => (interests.includes(cat) ? 1 : 0));
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return magA && magB ? dot / (magA * magB) : 0;
}

export function getKNNRecommendations(
  userInterests: string[],
  students: Student[],
  events: CampusEvent[],
  k: number = 5
): { event: CampusEvent; matchScore: number }[] {
  console.log("[kNN] User interests:", userInterests);
  const userVec = toVector(userInterests);
  console.log("[kNN] User feature vector:", userVec);

const distances = students.map((s) => ({
  student: s,
  similarity: cosineSimilarity(userVec, toVector(s.interests)),
}));
  distances.sort((a, b) => b.similarity - a.similarity);
  const neighbours = distances.slice(0, k);
  console.log("[kNN] Nearest neighbours:", neighbours.map((n) => ({ id: n.student.id, sim: n.similarity.toFixed(2) })));

  const eventCounts: Record<string, number> = {};
  neighbours.forEach(({ student }) => {
    student.attendedEventIds.forEach((eid) => {
      eventCounts[eid] = (eventCounts[eid] || 0) + 1;
    });
  });
  console.log("[kNN] Event attendance counts from neighbours:", eventCounts);

  const scored = Object.entries(eventCounts)
    .map(([eid, count]) => {
      const event = events.find((e) => e.id === eid);
      return event ? { event, matchScore: Math.round((count / k) * 100) } : null;
    })
    .filter(Boolean) as { event: CampusEvent; matchScore: number }[];

  scored.sort((a, b) => b.matchScore - a.matchScore);
  const top3 = scored.slice(0, 3);
  console.log("[kNN] Top recommendations:", top3.map((r) => ({ title: r.event.title, score: r.matchScore })));
  return top3;
}
