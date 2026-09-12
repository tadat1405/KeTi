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
  return (
    <div className="flex h-full bg-wash">
      <aside className="flex w-[280px] shrink-0 flex-col border-r border-line bg-white p-5">
        <Link href="/" className="w-fit text-sm text-muted hover:text-brand">
          ← <span className="text-base text-brand underline">Thư viện</span>
        </Link>

        <div className="mt-5 flex items-center gap-3">
          <img
            src={courseIcon(course)}
            alt=""
            width={56}
            height={56}
            className="size-14 shrink-0 rounded-xl object-cover"
          />
          <h1 className="text-lg font-semibold leading-snug">{course.name}</h1>
        </div>

        <nav className="mt-5 min-h-0 flex-1 space-y-1 overflow-y-auto">
          {modules.map(([moduleNumber]) => {
            const active = currentModule === moduleNumber;
            return (
              <Link
                key={moduleNumber}
                href={`/courses/${course.id}/hp/${moduleNumber}`}
                className={`block rounded-lg px-3 py-2 text-sm ${
                  active
                    ? "bg-blue-50 font-medium text-brand"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Học phần {moduleNumber}
              </Link>
            );
          })}
        </nav>
      </aside>

      <section className="min-w-0 flex-1 overflow-hidden bg-white">{children}</section>
    </div>
  );
}
