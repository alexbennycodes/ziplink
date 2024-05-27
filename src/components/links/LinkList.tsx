import { getLinks } from "@/lib/api/links/queries";
import { CompleteLink } from "@/lib/db/schema/links";
import CardLinks from "./card-links";

export default async function LinkList({ links }: { links: CompleteLink[] }) {
  const data = await getLinks();

  if (data.links.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.links.map((link) => (
        <Link link={link} key={link.id} />
      ))}
    </ul>
  );
}

const Link = ({ link }: { link: CompleteLink }) => {
  return (
    <li className="flex justify-between my-2">
      <CardLinks
        url={link.url}
        slug={link.slug}
        clicks={link.clicks}
        lastClicked={link.lastClicked}
      />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No links
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new link.
      </p>
      {/* <div className="mt-6">
        <LinkModal emptyState={true} />
      </div> */}
    </div>
  );
};
