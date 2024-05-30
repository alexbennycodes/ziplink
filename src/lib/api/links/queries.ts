"use server";

import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type LinkId, linkIdSchema } from "@/lib/db/schema/links";

export const getLinks = async () => {
  const { session } = await getUserAuth();
  const l = await db.link.findMany({ where: { userId: session?.user.id! } });
  return { links: l };
};

export const getLinkById = async (id: LinkId) => {
  const { session } = await getUserAuth();
  const { id: linkId } = linkIdSchema.parse({ id });
  const l = await db.link.findFirst({
    where: { id: linkId, userId: session?.user.id! },
  });
  return { link: l };
};

export const checkIfSlugExist = async (slug: string) => {
  const result = await db.link.findUnique({
    where: {
      slug: slug,
    },
  });

  if (result) {
    return true;
  }

  return false;
};

export const getLinkbySlug = async (slug: string) => {
  const result = await db.link.findFirst({
    where: {
      slug: slug,
    },
  });

  return result;
};

export const updateLinkClickById = async (id: string) => {
  await db.link.update({
    where: {
      id,
    },
    data: {
      clicks: {
        increment: 1,
      },
      lastClicked: new Date(),
    },
  });
};
