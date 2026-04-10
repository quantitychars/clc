export interface ScheduleEntry {
  id: string;
  dayOfWeek: number;
  dayName: string;
  startTime: string;
  endTime: string;
  module: string;
  room: string;
  type: "Lecture" | "Lab" | "Seminar";
}

export interface Course {
  courseId: string;
  courseName: string;
  weeklySchedule: ScheduleEntry[];
}

export const courses: Course[] = [
  {
    courseId: "course_bsc_management",
    courseName: "BSc Management",
    weeklySchedule: [
      { id: "mgt_1", dayOfWeek: 1, dayName: "Monday", startTime: "09:00", endTime: "11:00", module: "Nature of Enterprise Computing", room: "Aungier-101", type: "Lecture" },
      { id: "mgt_2", dayOfWeek: 1, dayName: "Monday", startTime: "13:00", endTime: "15:00", module: "Business Mathematics", room: "Aungier-201", type: "Lab" },
      { id: "mgt_3", dayOfWeek: 2, dayName: "Tuesday", startTime: "10:00", endTime: "12:00", module: "Marketing Basics", room: "Aungier-105", type: "Lecture" },
      { id: "mgt_4", dayOfWeek: 2, dayName: "Tuesday", startTime: "14:00", endTime: "16:00", module: "HR Management", room: "Aungier-110", type: "Seminar" },
      { id: "mgt_5", dayOfWeek: 3, dayName: "Wednesday", startTime: "09:00", endTime: "11:00", module: "Microeconomics", room: "Aungier-301", type: "Lecture" },
      { id: "mgt_6", dayOfWeek: 3, dayName: "Wednesday", startTime: "12:00", endTime: "14:00", module: "Financial Accounting", room: "Aungier-302", type: "Lecture" },
      { id: "mgt_7", dayOfWeek: 4, dayName: "Thursday", startTime: "11:00", endTime: "13:00", module: "Nature of Enterprise Computing", room: "Aungier-101", type: "Lab" },
      { id: "mgt_8", dayOfWeek: 4, dayName: "Thursday", startTime: "15:00", endTime: "17:00", module: "Business Ethics", room: "Aungier-105", type: "Lecture" },
      { id: "mgt_9", dayOfWeek: 5, dayName: "Friday", startTime: "10:00", endTime: "12:00", module: "Organizational Behaviour", room: "Aungier-202", type: "Seminar" },
      { id: "mgt_10", dayOfWeek: 5, dayName: "Friday", startTime: "14:00", endTime: "16:00", module: "Marketing Basics", room: "Aungier-105", type: "Lab" },
    ],
  },
  {
    courseId: "course_bsc_cs",
    courseName: "BSc Computer Science",
    weeklySchedule: [
      { id: "cs_1", dayOfWeek: 1, dayName: "Monday", startTime: "09:00", endTime: "11:00", module: "Intro to Programming", room: "CQ-401", type: "Lecture" },
      { id: "cs_2", dayOfWeek: 1, dayName: "Monday", startTime: "12:00", endTime: "14:00", module: "Computer Architecture", room: "CQ-405", type: "Lecture" },
      { id: "cs_3", dayOfWeek: 2, dayName: "Tuesday", startTime: "10:00", endTime: "12:00", module: "Web Development", room: "CQ-302", type: "Lab" },
      { id: "cs_4", dayOfWeek: 2, dayName: "Tuesday", startTime: "14:00", endTime: "16:00", module: "Database Systems", room: "CQ-305", type: "Lecture" },
      { id: "cs_5", dayOfWeek: 3, dayName: "Wednesday", startTime: "09:00", endTime: "11:00", module: "Algorithms", room: "CQ-401", type: "Lecture" },
      { id: "cs_6", dayOfWeek: 3, dayName: "Wednesday", startTime: "13:00", endTime: "15:00", module: "Intro to Programming", room: "CQ-410", type: "Lab" },
      { id: "cs_7", dayOfWeek: 4, dayName: "Thursday", startTime: "10:00", endTime: "12:00", module: "Operating Systems", room: "CQ-201", type: "Lecture" },
      { id: "cs_8", dayOfWeek: 4, dayName: "Thursday", startTime: "14:00", endTime: "16:00", module: "Web Development", room: "CQ-302", type: "Lecture" },
      { id: "cs_9", dayOfWeek: 5, dayName: "Friday", startTime: "09:00", endTime: "11:00", module: "Software Engineering", room: "CQ-405", type: "Seminar" },
      { id: "cs_10", dayOfWeek: 5, dayName: "Friday", startTime: "12:00", endTime: "14:00", module: "Database Systems", room: "CQ-305", type: "Lab" },
    ],
  },
  {
    courseId: "course_bsc_int_biz",
    courseName: "BSc International Business",
    weeklySchedule: [
      { id: "ib_1", dayOfWeek: 1, dayName: "Monday", startTime: "10:00", endTime: "12:00", module: "Global Trade", room: "Aungier-305", type: "Lecture" },
      { id: "ib_2", dayOfWeek: 1, dayName: "Monday", startTime: "14:00", endTime: "16:00", module: "Business Spanish", room: "Aungier-306", type: "Seminar" },
      { id: "ib_3", dayOfWeek: 2, dayName: "Tuesday", startTime: "09:00", endTime: "11:00", module: "Macroeconomics", room: "Aungier-201", type: "Lecture" },
      { id: "ib_4", dayOfWeek: 2, dayName: "Tuesday", startTime: "13:00", endTime: "15:00", module: "Cross-Cultural Management", room: "Aungier-205", type: "Lecture" },
      { id: "ib_5", dayOfWeek: 3, dayName: "Wednesday", startTime: "11:00", endTime: "13:00", module: "Global Trade", room: "Aungier-305", type: "Seminar" },
      { id: "ib_6", dayOfWeek: 3, dayName: "Wednesday", startTime: "15:00", endTime: "17:00", module: "International Law", room: "Aungier-401", type: "Lecture" },
      { id: "ib_7", dayOfWeek: 4, dayName: "Thursday", startTime: "10:00", endTime: "12:00", module: "Business Spanish", room: "Aungier-306", type: "Lab" },
      { id: "ib_8", dayOfWeek: 4, dayName: "Thursday", startTime: "14:00", endTime: "16:00", module: "Macroeconomics", room: "Aungier-201", type: "Seminar" },
      { id: "ib_9", dayOfWeek: 5, dayName: "Friday", startTime: "09:00", endTime: "11:00", module: "Global Finance", room: "Aungier-301", type: "Lecture" },
      { id: "ib_10", dayOfWeek: 5, dayName: "Friday", startTime: "12:00", endTime: "14:00", module: "Cross-Cultural Management", room: "Aungier-205", type: "Lab" },
    ],
  },
  {
    courseId: "course_bsc_ds",
    courseName: "BSc Data Science",
    weeklySchedule: [
      { id: "ds_1", dayOfWeek: 1, dayName: "Monday", startTime: "09:00", endTime: "11:00", module: "Probability & Statistics", room: "CQ-501", type: "Lecture" },
      { id: "ds_2", dayOfWeek: 1, dayName: "Monday", startTime: "13:00", endTime: "15:00", module: "Python for Data Analysis", room: "CQ-505", type: "Lab" },
      { id: "ds_3", dayOfWeek: 2, dayName: "Tuesday", startTime: "10:00", endTime: "12:00", module: "Machine Learning Fundamentals", room: "CQ-401", type: "Lecture" },
      { id: "ds_4", dayOfWeek: 2, dayName: "Tuesday", startTime: "14:00", endTime: "16:00", module: "Database Systems", room: "CQ-305", type: "Lecture" },
      { id: "ds_5", dayOfWeek: 3, dayName: "Wednesday", startTime: "09:00", endTime: "11:00", module: "Linear Algebra", room: "CQ-501", type: "Lecture" },
      { id: "ds_6", dayOfWeek: 3, dayName: "Wednesday", startTime: "12:00", endTime: "14:00", module: "Data Visualization", room: "CQ-510", type: "Lab" },
      { id: "ds_7", dayOfWeek: 4, dayName: "Thursday", startTime: "11:00", endTime: "13:00", module: "Probability & Statistics", room: "CQ-501", type: "Seminar" },
      { id: "ds_8", dayOfWeek: 4, dayName: "Thursday", startTime: "15:00", endTime: "17:00", module: "Machine Learning Fundamentals", room: "CQ-401", type: "Lab" },
      { id: "ds_9", dayOfWeek: 5, dayName: "Friday", startTime: "10:00", endTime: "12:00", module: "Data Ethics", room: "CQ-301", type: "Lecture" },
      { id: "ds_10", dayOfWeek: 5, dayName: "Friday", startTime: "14:00", endTime: "16:00", module: "Python for Data Analysis", room: "CQ-505", type: "Lecture" },
    ],
  },
  {
    courseId: "course_bsc_maths",
    courseName: "BSc Mathematics",
    weeklySchedule: [
      { id: "math_1", dayOfWeek: 1, dayName: "Monday", startTime: "10:00", endTime: "12:00", module: "Calculus I", room: "Grangegorman-101", type: "Lecture" },
      { id: "math_2", dayOfWeek: 1, dayName: "Monday", startTime: "14:00", endTime: "16:00", module: "Discrete Mathematics", room: "Grangegorman-105", type: "Seminar" },
      { id: "math_3", dayOfWeek: 2, dayName: "Tuesday", startTime: "09:00", endTime: "11:00", module: "Linear Algebra", room: "Grangegorman-201", type: "Lecture" },
      { id: "math_4", dayOfWeek: 2, dayName: "Tuesday", startTime: "13:00", endTime: "15:00", module: "Computational Maths", room: "Grangegorman-210", type: "Lab" },
      { id: "math_5", dayOfWeek: 3, dayName: "Wednesday", startTime: "11:00", endTime: "13:00", module: "Calculus I", room: "Grangegorman-101", type: "Seminar" },
      { id: "math_6", dayOfWeek: 3, dayName: "Wednesday", startTime: "15:00", endTime: "17:00", module: "Number Theory", room: "Grangegorman-301", type: "Lecture" },
      { id: "math_7", dayOfWeek: 4, dayName: "Thursday", startTime: "09:00", endTime: "11:00", module: "Discrete Mathematics", room: "Grangegorman-105", type: "Lecture" },
      { id: "math_8", dayOfWeek: 4, dayName: "Thursday", startTime: "12:00", endTime: "14:00", module: "Computational Maths", room: "Grangegorman-210", type: "Lecture" },
      { id: "math_9", dayOfWeek: 5, dayName: "Friday", startTime: "10:00", endTime: "12:00", module: "Linear Algebra", room: "Grangegorman-201", type: "Seminar" },
      { id: "math_10", dayOfWeek: 5, dayName: "Friday", startTime: "14:00", endTime: "16:00", module: "Mathematical Modeling", room: "Grangegorman-305", type: "Lecture" },
    ],
  },
  {
    courseId: "course_bsc_cloud",
    courseName: "BSc Cloud Computing",
    weeklySchedule: [
      { id: "cloud_1", dayOfWeek: 1, dayName: "Monday", startTime: "09:00", endTime: "11:00", module: "Cloud Foundations", room: "CQ-601", type: "Lecture" },
      { id: "cloud_2", dayOfWeek: 1, dayName: "Monday", startTime: "13:00", endTime: "15:00", module: "Linux Systems", room: "CQ-605", type: "Lab" },
      { id: "cloud_3", dayOfWeek: 2, dayName: "Tuesday", startTime: "10:00", endTime: "12:00", module: "Networking Basics", room: "CQ-402", type: "Lecture" },
      { id: "cloud_4", dayOfWeek: 2, dayName: "Tuesday", startTime: "14:00", endTime: "16:00", module: "DevOps Practices", room: "CQ-610", type: "Seminar" },
      { id: "cloud_5", dayOfWeek: 3, dayName: "Wednesday", startTime: "09:00", endTime: "11:00", module: "Cloud Foundations", room: "CQ-601", type: "Lab" },
      { id: "cloud_6", dayOfWeek: 3, dayName: "Wednesday", startTime: "12:00", endTime: "14:00", module: "Cybersecurity Basics", room: "CQ-502", type: "Lecture" },
      { id: "cloud_7", dayOfWeek: 4, dayName: "Thursday", startTime: "11:00", endTime: "13:00", module: "Networking Basics", room: "CQ-402", type: "Lab" },
      { id: "cloud_8", dayOfWeek: 4, dayName: "Thursday", startTime: "15:00", endTime: "17:00", module: "DevOps Practices", room: "CQ-610", type: "Lab" },
      { id: "cloud_9", dayOfWeek: 5, dayName: "Friday", startTime: "10:00", endTime: "12:00", module: "Linux Systems", room: "CQ-605", type: "Lecture" },
      { id: "cloud_10", dayOfWeek: 5, dayName: "Friday", startTime: "14:00", endTime: "16:00", module: "Cloud Architecture", room: "CQ-601", type: "Lecture" },
    ],
  },
];
