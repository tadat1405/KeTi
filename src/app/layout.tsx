import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = {
  title: "KiTe — Thư viện giáo án",
  description: "Danh sách khóa học từ catalog local.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi">
      <body className={`${beVietnam.variable} flex h-dvh flex-col overflow-hidden bg-wash font-sans text-ink antialiased`}>
        <SiteHeader />
        <div className="min-h-0 flex-1">{children}</div>
      </body>
    </html>
  );
}
