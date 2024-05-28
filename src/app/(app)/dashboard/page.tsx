import LinkList from "@/components/links/link-list";
import { getLinks } from "@/lib/api/links/queries";

import CreateLink from "@/components/links/create-link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export const revalidate = 0;

export default async function LinksPage() {
  const { links } = await getLinks();

  return (
    <main className="flex w-full flex-col space-y-4 duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <div className="relative">
        <div className="flex justify-between mb-8">
          <div>
            <CreateLink>
              <Button size="sm">
                <PlusIcon size={14} />
                <span className="hidden md:block">Create Link</span>
              </Button>
            </CreateLink>
          </div>
        </div>
        <LinkList links={links} />
      </div>
    </main>
  );
}
