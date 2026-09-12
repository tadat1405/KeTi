"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/lib/courses";
import { courseIcon } from "@/lib/icons";

export function CourseCatalog({
  courses,
  totalLessons,
}: Readonly<{ courses: Course[]; totalLessons: number }>) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(
      (course) =>
        course.name.toLowerCase().includes(q) ||
        course.code.toLowerCase().includes(q),
    );
  }, [courses, query]);

  return (
    <div className="flex h-full bg-wash">
      <aside className="flex w-[280px] shrink-0 flex-col border-r border-line bg-white p-6">
        <p className="text-sm text-muted">Thư viện</p>
        <h1 className="mt-2 text-2xl font-semibold">Giáo án công nghệ</h1>
        <p className="mt-3 text-sm text-muted">
          {courses.length} khóa học · {totalLessons} tài liệu
        </p>
        <label className="mt-auto block pt-8">
          <span className="sr-only">Tìm khóa học</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm khóa học"
            className="w-full rounded-lg border border-line bg-wash px-3 py-2.5 text-sm outline-none placeholder:text-muted focus:border-brand"
          />
        </label>
      </aside>

      <section className="min-w-0 flex-1 overflow-y-auto p-6">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted">Không tìm thấy khóa học.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((course) => (
              <li key={course.id}>
                <Link
                  href={`/courses/${course.id}`}
                  className="flex items-center gap-4 rounded-xl border border-line bg-white p-4 hover:border-brand/40 hover:shadow-sm"
                >
                  <Image
                    src={courseIcon(course)}
                    alt=""
                    width={56}
                    height={56}
                    className="size-14 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{course.name}</p>
                    <p className="mt-0.5 text-xs text-muted">{course.code}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-brand">
                    {course.lessonCount} tài liệu
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
