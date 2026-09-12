import type { Course } from "@/lib/courses";

const ICONS: Record<string, string> = {
  BLG: "/course-icons/icon-blg.png",
  DG: "/course-icons/icon-dg.png",
  DS: "/course-icons/icon-ds.png",
  "KBRP SPIKE": "/course-icons/icon-kbrp.png",
  KPRB: "/course-icons/icon-kprb.png",
  MNCN: "/course-icons/icon-mncn.png",
  SNLG: "/course-icons/icon-snlg.png",
  SNLTA: "/course-icons/icon-snlta.png",
  SNLTW: "/course-icons/icon-snltw.png",
  TGVVTM: "/course-icons/icon-tgvvtm.png",
  XCTRB: "/course-icons/icon-xctrb.png",
};

export function courseIcon(course: Course) {
  return ICONS[course.code] ?? "/course-icons/icon-blg.png";
}
