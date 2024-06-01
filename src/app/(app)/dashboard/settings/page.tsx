import SignIn from "@/components/auth/SignIn";
import SignOutBtn from "@/components/auth/SignOutBtn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserAuth } from "@/lib/auth/utils";

export default async function Home() {
  const { session } = await getUserAuth();

  return (
    <main className="flex w-full flex-col space-y-4 duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      {session ? (
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                placeholder="Store Name"
                value={session.user.name}
                disabled
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input placeholder="Email" value={session.user.email} disabled />
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <SignOutBtn />
          </CardFooter>
        </Card>
      ) : (
        <SignIn />
      )}
    </main>
  );
}
