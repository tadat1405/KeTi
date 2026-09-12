"use client";

import { useMemo, useState } from "react";
import type { Lesson } from "@/lib/curriculum";

function groupByLesson(items: Lesson[]) {
  const map = new Map<number, Lesson[]>();
  for (const item of items) {
    const list = map.get(item.lessonNumber) ?? [];
    list.push(item);
    map.set(item.lessonNumber, list);
  }
  return [...map.entries()].sort((a, b) => a[0] - b[0]);
}

function FileLink({
  file,
  label,
}: Readonly<{ file?: Lesson; label: string }>) {
  const name = file?.lessonTitle ?? "";

  if (!file?.materialUrl) {
    return (
      <span className="text-slate-300" aria-label={name || label}>
        {label}
      </span>
    );
  }

  return (
    <a
      href={file.materialUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`${label}: ${name}`}
      className="group relative font-medium text-brand hover:underline"
    >
      {label}
      {name ? (
        <span className="pointer-events-none absolute top-full left-0 z-20 mt-1 hidden w-max max-w-xs rounded bg-slate-800 px-2 py-1 text-xs font-normal text-white group-hover:block">
          {name}
        </span>
      ) : null}
    </a>
  );
}

export function LessonList({
  items,
  heading,
  meta,
}: Readonly<{
  items: Lesson[];
  heading: string;
  meta: string;
}>) {
  const [query, setQuery] = useState("");
  const lessons = groupByLesson(items);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return lessons;
    return lessons.filter(([lessonNumber, files]) => {
      if (String(lessonNumber).includes(q)) return true;
      return files.some((file) => file.lessonTitle.toLowerCase().includes(q));
    });
  }, [lessons, query]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
        <div className="flex min-w-0 items-baseline gap-3">
          <h1 className="text-lg font-semibold">{heading}</h1>
          <p className="text-sm text-muted">{meta}</p>
        </div>
        <label className="block w-64 shrink-0">
          <span className="sr-only">Tìm bài học</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm bài học..."
            className="w-full rounded-lg border border-line bg-wash px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-brand"
          />
        </label>
      </div>

      <div className="min-h-0 flex-1 overflow-auto px-6 py-4">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted">Không tìm thấy bài phù hợp.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-muted">
                <th className="w-16 py-3 pr-4 font-medium">Bài</th>
                <th className="py-3 pr-4 font-medium">Tên bài</th>
                <th className="w-24 py-3 pr-4 font-medium">Slide</th>
                <th className="w-24 py-3 font-medium">Giáo án</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(([lessonNumber, files]) => {
                const slide = files.find((file) => file.materialType === "presentation");
                const document = files.find((file) => file.materialType !== "presentation");
                const title = files[0]?.lessonTitle ?? "";
                return (
                  <tr key={lessonNumber} className="border-b border-line last:border-b-0 hover:bg-wash">
                    <td className="py-3.5 pr-4 text-muted">{lessonNumber}</td>
                    <td className="py-3.5 pr-4">{title}</td>
                    <td className="relative py-3.5 pr-4">
                      <FileLink file={slide} label="Slide" />
                    </td>
                    <td className="relative py-3.5">
                      <FileLink file={document} label="Giáo án" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
