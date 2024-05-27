import { linkSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getLinks } from "@/lib/api/links/queries";

// Schema for links - used to validate API requests
const baseSchema = linkSchema.omit(timestamps);

export const insertLinkSchema = baseSchema.omit({ id: true });
export const insertLinkParams = baseSchema.omit({
  id: true,
  userId: true,
  lastClicked: true,
  clicks: true,
});

export const updateLinkSchema = baseSchema;
export const updateLinkParams = updateLinkSchema
  .extend({
    clicks: z.coerce.number(),
    lastClicked: z.coerce.date(),
  })
  .omit({
    userId: true,
  });
export const linkIdSchema = baseSchema.pick({ id: true });

// Types for links - used to type API request params and within Components
export type Link = z.infer<typeof linkSchema>;
export type NewLink = z.infer<typeof insertLinkSchema>;
export type NewLinkParams = z.infer<typeof insertLinkParams>;
export type UpdateLinkParams = z.infer<typeof updateLinkParams>;
export type LinkId = z.infer<typeof linkIdSchema>["id"];

// this type infers the return from getLinks() - meaning it will include any joins
export type CompleteLink = Awaited<
  ReturnType<typeof getLinks>
>["links"][number];
