import { Sidebar } from "@/components/layout/sidebar";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen md:flex" dir="rtl">
      <Sidebar />
      <main className="flex-1 p-6">
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
          className="mb-4"
        >
          <button className="text-sm text-slate-500">تسجيل الخروج</button>
        </form>
        {children}
      </main>
    </div>
  );
}
