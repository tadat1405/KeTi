import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import {
  getCourseById,
  getLessonsByCourseCode,
  groupLessonsByModule,
} from "@/lib/curriculum";
import { getCourses } from "@/lib/courses";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getCourses().map((course) => ({ id: String(course.id) }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const course = getCourseById(Number(id));
  return {
    title: course ? `${course.name} — KiTe` : "Không tìm thấy khóa học",
  };
}

export default async function CoursePage({ params }: Readonly<PageProps>) {
  const { id } = await params;
  const course = getCourseById(Number(id));
  if (!course) notFound();

  const lessons = await getLessonsByCourseCode(course.code);
  const modules = groupLessonsByModule(lessons);
  const first = modules[0]?.[0];
  if (first == null) notFound();

  redirect(`/courses/${course.id}/hp/${first}`);
}
