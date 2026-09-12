import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-center border-b border-line bg-white px-6">
      <Link href="/" className="flex items-baseline gap-2.5">
        <span className="text-[26px] font-bold tracking-tight text-brand">KiTe</span>
        <span className="text-lg font-light text-blue-300">-</span>
        <span className="text-[17px] font-medium tracking-[0.02em] text-slate-500">
          Thư viện giáo án
        </span>
      </Link>
    </header>
  );
}
