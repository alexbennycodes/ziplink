import DotPattern from "@/components/dot-pattern";
import Logo from "@/components/icons/logo";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-static";

export default function LandingPage() {
  return (
    <>
      <Header />

      <section className="relative mx-auto mt-32 max-w-[80rem] px-6 text-center md:px-8">
        <Logo className="h-24 w-24 mx-auto relative z-10 mb-5 duration-500 animate-in fade-in-100 slide-in-from-bottom-10" />
        <h1 className="py-6 text-5xl font-medium leading-none tracking-tighter text-foreground text-balance sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] duration-500 animate-in fade-in-100 slide-in-from-bottom-10">
          Unleash the Power of Short Links
        </h1>
        <p className="mb-5 text-lg tracking-tight text-foreground/50 md:text-xl text-balance translate-y-[-1rem] animate-fade-in duration-700 animate-in fade-in-100 slide-in-from-bottom-10">
          Your ultimate URL shortening solution. Create, customize, and track
          short links effortlessly.
        </p>

        <Button
          asChild
          className="duration-700 animate-in fade-in-100 slide-in-from-bottom-10"
        >
          <Link href="/sign-in">
            Get Started for free <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(200px_circle_at_center,black,transparent)]"
        )}
      />
    </>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
