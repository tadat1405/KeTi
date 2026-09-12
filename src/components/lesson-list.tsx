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

function displayTitle(files: Lesson[]) {
  return files[0]?.lessonTitle ?? "";
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

export function LessonList({ items }: Readonly<{ items: Lesson[] }>) {
  const lessons = groupByLesson(items);

  return (
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
        {lessons.map(([lessonNumber, files]) => {
          const slide = files.find((file) => file.materialType === "presentation");
          const document = files.find((file) => file.materialType !== "presentation");
          const title = displayTitle(files);
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
  );
}
