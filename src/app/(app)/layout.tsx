import { checkAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import NextAuthProvider from "@/lib/auth/Provider";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return (
    <main>
      <NextAuthProvider>
        <div className="flex">
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </NextAuthProvider>

      <Toaster richColors />
    </main>
  );
}
