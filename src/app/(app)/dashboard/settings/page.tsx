import SignIn from "@/components/auth/SignIn";
import { getUserAuth } from "@/lib/auth/utils";
import UserSettings from "./UserSettings";

export default async function Home() {
  const { session } = await getUserAuth();

  return (
    <main className="flex w-full flex-col space-y-4 duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <h1 className="text-2xl font-semibold my-4">Account</h1>
      {session ? (
        <pre className="bg-secondary p-4 rounded-sm shadow-sm text-secondary-foreground break-all whitespace-break-spaces">
          {JSON.stringify(session, null, 2)}
        </pre>
      ) : null}
      <SignIn />
    </main>
  );
}
