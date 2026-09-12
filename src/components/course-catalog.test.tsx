import { fireEvent, render, screen } from "@testing-library/react";
import { CourseCatalog } from "./course-catalog";
import type { Course } from "@/lib/courses";

const courses: Course[] = [
  {
    id: 1,
    code: "BLG",
    name: "Python cơ bản",
    color: "#2563eb",
    description: "Khóa học nhập môn lập trình Python",
    lessonCount: 4,
  },
  {
    id: 2,
    code: "MNCN",
    name: "Toán nâng cao",
    color: "#7c3aed",
    description: "Khóa học toán chuyên sâu",
    lessonCount: 2,
  },
];

describe("CourseCatalog", () => {
  it("hiển thị danh sách khóa học ban đầu", () => {
    render(<CourseCatalog courses={courses} totalLessons={6} />);

    expect(screen.getByText("Giáo án công nghệ")).toBeInTheDocument();
    expect(screen.getByText("Python cơ bản")).toBeInTheDocument();
    expect(screen.getByText("Toán nâng cao")).toBeInTheDocument();
  });

  it("lọc khóa học theo từ khóa tìm kiếm", () => {
    render(<CourseCatalog courses={courses} totalLessons={6} />);

    fireEvent.change(screen.getByPlaceholderText("Tìm khóa học"), {
      target: { value: "toán" },
    });

    expect(screen.getByText("Toán nâng cao")).toBeInTheDocument();
    expect(screen.queryByText("Python cơ bản")).not.toBeInTheDocument();
  });

  it("hiển thị thông báo khi không có khóa học phù hợp", () => {
    render(<CourseCatalog courses={courses} totalLessons={6} />);

    fireEvent.change(screen.getByPlaceholderText("Tìm khóa học"), {
      target: { value: "không-tồn-tại" },
    });

    expect(screen.getByText("Không tìm thấy khóa học.")).toBeInTheDocument();
  });
});
