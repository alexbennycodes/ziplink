import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const linkSchema = z.object({
  id: z.string(),
  url: z.string(),
  slug: z.string(),
  clicks: z.number().int(),
  lastClicked: z.date().nullish(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteLink extends z.infer<typeof linkSchema> {
  user: CompleteUser
}

/**
 * relatedLinkSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedLinkSchema: z.ZodSchema<CompleteLink> = z.lazy(() => linkSchema.extend({
  user: relatedUserSchema,
}))
