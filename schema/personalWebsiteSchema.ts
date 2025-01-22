import { z } from "zod";

export const personalWebsiteSchema = z.object({
  name: z.string().default("PersonalWebsite"),
  value: z.string().url("Please enter a valid url"),
});
