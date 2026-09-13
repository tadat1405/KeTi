"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatCount, type Course } from "@/lib/courses";
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
      <aside className="flex w-[300px] shrink-0 flex-col border-r border-line bg-[#eaf3fc] px-7 py-8">
        <h1 className="text-[28px] leading-snug font-bold tracking-tight text-ink">
          Giáo án công nghệ
        </h1>
        <div className="mt-6 space-y-2">
          <p className="rounded-xl bg-white px-4 py-2.5 text-[17px]">
            <span className="font-semibold text-brand">{courses.length}</span>{" "}
            <span className="text-slate-500">khóa học</span>
          </p>
          <p className="rounded-xl bg-white px-4 py-2.5 text-[17px]">
            <span className="font-semibold text-brand">{formatCount(totalLessons)}</span>{" "}
            <span className="text-slate-500">tài liệu</span>
          </p>
        </div>

        <label className="mt-auto block pt-8">
          <span className="sr-only">Tìm khóa học</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm khóa học"
            className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-muted focus:border-brand"
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
                    {formatCount(course.lessonCount)} tài liệu
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
