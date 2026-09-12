import { notFound } from "next/navigation";
import { LessonList } from "@/components/lesson-list";
import { Workspace } from "@/components/workspace";
import {
  getCourseById,
  getLessonsByCourseCode,
  getModuleLessons,
  groupLessonsByModule,
} from "@/lib/curriculum";
import { getCourses, formatCount } from "@/lib/courses";

type PageProps = {
  params: Promise<{ id: string; module: string }>;
};

export async function generateStaticParams() {
  const params: { id: string; module: string }[] = [];
  for (const course of getCourses()) {
    const lessons = await getLessonsByCourseCode(course.code);
    for (const [moduleNumber] of groupLessonsByModule(lessons)) {
      params.push({ id: String(course.id), module: String(moduleNumber) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { id, module } = await params;
  const course = getCourseById(Number(id));
  return {
    title: course
      ? `Học phần ${module} — ${course.name}`
      : "Không tìm thấy học phần",
  };
}

export default async function ModulePage({ params }: Readonly<PageProps>) {
  const { id, module } = await params;
  const course = getCourseById(Number(id));
  const moduleNumber = Number(module);
  if (!course || Number.isNaN(moduleNumber)) notFound();

  const items = await getModuleLessons(course.code, moduleNumber);
  if (items.length === 0) notFound();

  const modules = groupLessonsByModule(await getLessonsByCourseCode(course.code));
  const lessonCount = new Set(items.map((item) => item.lessonNumber)).size;

  return (
    <Workspace course={course} modules={modules} currentModule={moduleNumber}>
      <LessonList
        items={items}
        heading={`Học phần ${moduleNumber}`}
        meta={`${lessonCount} bài · ${formatCount(items.length)} tài liệu`}
      />
    </Workspace>
  );
}
