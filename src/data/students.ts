export interface Student {
  id: string;
  courseId: string;
  interests: string[];
  attendedEventIds: string[];
}

const courseIds = [
  "course_bsc_management", "course_bsc_cs", "course_bsc_int_biz",
  "course_bsc_ds", "course_bsc_maths", "course_bsc_cloud",
];

const allInterests = ["Computing", "Sports", "Gaming", "Arts", "Management", "Music", "Chess", "Film"];

// Deterministic pseudo-random generation
function seededInterests(i: number): string[] {
  const count = 2 + (i % 3); // 2-4 interests
  const start = i % allInterests.length;
  const result: string[] = [];
  for (let j = 0; j < count; j++) {
    result.push(allInterests[(start + j * 3) % allInterests.length]);
  }
  return [...new Set(result)];
}

function seededEvents(i: number): string[] {
  const count = 2 + (i % 4); // 2-5 events
  const start = (i * 3) % 15;
  const result: string[] = [];
  for (let j = 0; j < count; j++) {
    result.push(`evt_${((start + j * 2) % 15) + 1}`);
  }
  return [...new Set(result)];
}

export const students: Student[] = Array.from({ length: 100 }, (_, i) => ({
  id: `student_${i + 1}`,
  courseId: courseIds[i % courseIds.length],
  interests: seededInterests(i),
  attendedEventIds: seededEvents(i),
}));
