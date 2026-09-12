import { readFile } from "node:fs/promises";
import path from "node:path";
import coursesCatalog from "@/data/courses.json";
import type { Course } from "@/lib/courses";

export type Lesson = {
  id: number;
  courseCode: string;
  moduleNumber: number;
  lessonNumber: number;
  lessonTitle: string;
  materialType: string;
  materialUrl: string | null;
  materialStatus: string | null;
};

type Snapshot = {
  lessons: Lesson[];
};

let snapshot: Snapshot | null = null;

async function loadSnapshot(): Promise<Snapshot> {
  if (snapshot) return snapshot;

  const raw = await readFile(path.join(process.cwd(), "data.json"), "utf8");
  const json = JSON.parse(raw)[0].result.data.json as {
    lessons: Lesson[];
  };

  snapshot = { lessons: json.lessons };
  return snapshot;
}

export function getCourseById(id: number): Course | undefined {
  return (coursesCatalog as Course[]).find((course) => course.id === id);
}

export async function getLessonsByCourseCode(courseCode: string): Promise<Lesson[]> {
  const { lessons } = await loadSnapshot();
  return lessons
    .filter((lesson) => lesson.courseCode === courseCode)
    .sort((a, b) => {
      if (a.moduleNumber !== b.moduleNumber) return a.moduleNumber - b.moduleNumber;
      if (a.lessonNumber !== b.lessonNumber) return a.lessonNumber - b.lessonNumber;
      return a.id - b.id;
    });
}

export function groupLessonsByModule(lessons: Lesson[]) {
  const modules = new Map<number, Lesson[]>();
  for (const lesson of lessons) {
    const list = modules.get(lesson.moduleNumber) ?? [];
    list.push(lesson);
    modules.set(lesson.moduleNumber, list);
  }
  return [...modules.entries()].sort((a, b) => a[0] - b[0]);
}

export async function getModuleLessons(courseCode: string, moduleNumber: number) {
  const lessons = await getLessonsByCourseCode(courseCode);
  return lessons.filter((lesson) => lesson.moduleNumber === moduleNumber);
}
