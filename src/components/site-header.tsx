import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center border-b border-line bg-white px-6">
      <Link href="/" className="text-lg font-semibold text-brand">
        KiTe
      </Link>
      <span className="ml-2 text-sm text-muted">Thư viện giáo án</span>
    </header>
  );
}
