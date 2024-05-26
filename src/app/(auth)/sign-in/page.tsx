import SocialLogin from "@/components/auth/social-login";
import Logo from "@/components/icons/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = () => {
  return (
    <main className="bg-popover max-w-lg mx-auto my-4 rounded-lg p-10">
      <Card className="w-full max-w-md duration-300 animate-in fade-in-15 slide-in-from-bottom-3 py-5 px-3">
        <CardHeader className="flex items-center justify-center text-center">
          <Logo className="mb-2 h-8 w-8" />
          <CardTitle className="text-2xl font-medium duration-500 animate-in fade-in-20">
            Log in to Ziplink
          </CardTitle>
          <CardDescription className="duration-500 animate-in fade-in-30">
            Log in with your favorite social provider to get started:
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 duration-500 animate-in fade-in-30 mt-4">
          <SocialLogin />
        </CardContent>
      </Card>
    </main>
  );
};

export default Page;
