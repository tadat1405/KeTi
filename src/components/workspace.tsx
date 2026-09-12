import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Course } from "@/lib/courses";
import type { Lesson } from "@/lib/curriculum";
import { courseIcon } from "@/lib/icons";

export function Workspace({
  course,
  modules,
  currentModule,
  children,
}: Readonly<{
  course: Course;
  modules: [number, Lesson[]][];
  currentModule?: number;
  children: ReactNode;
}>) {
  const totalFiles = modules.reduce((sum, [, items]) => sum + items.length, 0);

  return (
    <div className="flex h-full bg-wash">
      <aside className="flex w-[280px] shrink-0 flex-col border-r border-line bg-white p-5">
        <Link href="/" className="text-sm text-muted hover:text-brand">
          ← Thư viện
        </Link>

        <Image
          src={courseIcon(course)}
          alt=""
          width={56}
          height={56}
          className="mt-5 size-14 rounded-xl object-cover"
        />

        <h1 className="mt-3 text-lg font-semibold">{course.name}</h1>
        <p className="mt-1 text-sm text-muted">{course.code}</p>
        <p className="mt-2 text-sm text-muted">
          {modules.length} học phần · {totalFiles} tài liệu
        </p>

        <nav className="mt-5 min-h-0 flex-1 space-y-1 overflow-y-auto">
          {modules.map(([moduleNumber, items]) => {
            const active = currentModule === moduleNumber;
            const lessonCount = new Set(items.map((item) => item.lessonNumber)).size;
            return (
              <Link
                key={moduleNumber}
                href={`/courses/${course.id}/hp/${moduleNumber}`}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                  active
                    ? "bg-blue-50 font-medium text-brand"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>Học phần {moduleNumber}</span>
                <span className={active ? "text-brand/70" : "text-muted"}>{lessonCount}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <section className="min-w-0 flex-1 overflow-hidden bg-white">{children}</section>
    </div>
  );
}
