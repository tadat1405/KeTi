import courses from "@/data/courses.json";

export type Course = {
  id: number;
  code: string;
  name: string;
  color: string;
  description: string | null;
  lessonCount: number;
};

export function getCourses(): Course[] {
  return courses;
}
