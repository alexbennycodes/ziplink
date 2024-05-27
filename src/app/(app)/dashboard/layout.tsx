import type { ReactNode } from "react";

import DashboardRoutesComponent from "@/components/dashboard-routes";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  return (
    <>
      <nav className="fixed z-50 flex w-full items-center bg-background shadow-sm backdrop-blur-md ">
        <div className="container mx-auto w-full">
          <div className="flex w-full items-center justify-between">
            <div className="mt-0 flex flex-row space-x-0 text-sm font-medium rtl:space-x-reverse">
              <DashboardRoutesComponent />
            </div>
          </div>
        </div>
      </nav>
      <main className={cn("container my-[68px] flex w-full items-center")}>
        {props.children}
      </main>
    </>
  );
};

export default DashboardLayout;
