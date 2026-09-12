import { CourseCatalog } from "@/components/course-catalog";
import { getCourses } from "@/lib/courses";

export default function Home() {
  const courses = getCourses();
  const totalLessons = courses.reduce((sum, course) => sum + course.lessonCount, 0);

  return (
    <main className="h-full">
      <CourseCatalog courses={courses} totalLessons={totalLessons} />
    </main>
  );
}
