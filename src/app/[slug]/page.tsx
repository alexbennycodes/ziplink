import {
  checkIfSlugExist,
  getLinkbySlug,
  updateLinkClickById,
} from "@/lib/api/links/queries";
import { notFound, permanentRedirect } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

const Page = async ({ params }: Props) => {
  const slugRoute = params.slug;
  const isSlug = await checkIfSlugExist(slugRoute);

  if (!isSlug) {
    notFound();
    return;
  }
  try {
    const link = await getLinkbySlug(slugRoute);

    if (link) {
      await updateLinkClickById(link.id);
      permanentRedirect(link.url);
    }
  } catch (error) {
    throw new Error("Error while updating link clicks");
  }

  return;
};

export default Page;
