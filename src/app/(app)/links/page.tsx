import { Suspense } from "react";

import Loading from "@/app/loading";
import LinkList from "@/components/links/LinkList";
import { getLinks } from "@/lib/api/links/queries";

import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function LinksPage() {
  return (
    <main className="flex w-full duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Links</h1>
        </div>
        <Links />
      </div>
    </main>
  );
}

const Links = async () => {
  await checkAuth();

  const { links } = await getLinks();

  return (
    <Suspense fallback={<Loading />}>
      <LinkList links={links || []} />
    </Suspense>
  );
};
