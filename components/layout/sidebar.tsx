import Link from "next/link";

const links = [
  { href: "/dashboard", label: "لوحة التحكم" },
  { href: "/stores", label: "متاجري" },
  { href: "/studio", label: "استوديو المحتوى" },
  { href: "/content", label: "المحتوى المحفوظ" },
  { href: "/website-builder", label: "منشئ الصفحة" },
  { href: "/settings", label: "الإعدادات" }
];

export function Sidebar() {
  return (
    <aside className="w-full border-b bg-white p-4 md:w-64 md:border-b-0 md:border-l" dir="rtl">
      <h2 className="mb-4 text-lg font-bold">AI Store Builder</h2>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block rounded-lg p-2 hover:bg-slate-100">
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
