import { checkAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/sonner";
import NextAuthProvider from "@/lib/auth/Provider";
import DashboardRoutesComponent from "@/components/dashboard-routes";
import Header from "@/components/layout/header";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return (
    <>
      <Header />
      <main className="h-full flex-1 flex relative">
        <NextAuthProvider>
          <nav className="fixed z-50 flex w-full items-center bg-background shadow-sm backdrop-blur-md border-b border-opacity-50">
            <div className="container mx-auto w-full">
              <div className="flex w-full items-center justify-between">
                <div className="mt-0 flex flex-row space-x-0 text-sm font-medium rtl:space-x-reverse">
                  <DashboardRoutesComponent />
                </div>
              </div>
            </div>
          </nav>
          <main className="flex-1 my-16 py-8 overflow-y-auto container">
            {children}
          </main>
        </NextAuthProvider>

        <Toaster richColors />
      </main>
    </>
  );
}
