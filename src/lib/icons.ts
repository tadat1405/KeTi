import type { Course } from "@/lib/courses";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const ICONS: Record<string, string> = {
  BLG: `${basePath}/course-icons/cartoon-blg.png`,
  DG: `${basePath}/course-icons/cartoon-dg.png`,
  DS: `${basePath}/course-icons/cartoon-ds.png`,
  "KBRP SPIKE": `${basePath}/course-icons/cartoon-kbrp.png`,
  KPRB: `${basePath}/course-icons/cartoon-kprb.png`,
  MNCN: `${basePath}/course-icons/cartoon-mncn.png`,
  SNLG: `${basePath}/course-icons/cartoon-snlg.png`,
  SNLTA: `${basePath}/course-icons/cartoon-snlta.png`,
  SNLTW: `${basePath}/course-icons/cartoon-snltw.png`,
  TGVVTM: `${basePath}/course-icons/cartoon-tgvvtm.png`,
  XCTRB: `${basePath}/course-icons/cartoon-xctrb.png`,
};

export function courseIcon(course: Course) {
  return ICONS[course.code] ?? `${basePath}/course-icons/cartoon-blg.png`;
}
