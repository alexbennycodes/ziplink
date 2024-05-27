import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type LinkId, linkIdSchema } from "@/lib/db/schema/links";

export const getLinks = async () => {
  const { session } = await getUserAuth();
  if (!session) {
    console.error("Not authenticated.");
    return null;
  }
  try {
    const l = await db.link.findMany({ where: { userId: session?.user.id! } });
    return { links: l };
  } catch (err) {
    console.error("🚧 Error while fetching links and tags:", error);
    throw error;
  }
};

export const getLinkById = async (id: LinkId) => {
  const { session } = await getUserAuth();
  const { id: linkId } = linkIdSchema.parse({ id });
  const l = await db.link.findFirst({
    where: { id: linkId, userId: session?.user.id! },
  });
  return { link: l };
};
