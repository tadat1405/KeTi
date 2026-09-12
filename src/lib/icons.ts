import type { Course } from "@/lib/courses";

const ICONS: Record<string, string> = {
  BLG: "/course-icons/cartoon-blg.png",
  DG: "/course-icons/cartoon-dg.png",
  DS: "/course-icons/cartoon-ds.png",
  "KBRP SPIKE": "/course-icons/cartoon-kbrp.png",
  KPRB: "/course-icons/cartoon-kprb.png",
  MNCN: "/course-icons/cartoon-mncn.png",
  SNLG: "/course-icons/cartoon-snlg.png",
  SNLTA: "/course-icons/cartoon-snlta.png",
  SNLTW: "/course-icons/cartoon-snltw.png",
  TGVVTM: "/course-icons/cartoon-tgvvtm.png",
  XCTRB: "/course-icons/cartoon-xctrb.png",
};

export function courseIcon(course: Course) {
  return ICONS[course.code] ?? "/course-icons/cartoon-blg.png";
}
