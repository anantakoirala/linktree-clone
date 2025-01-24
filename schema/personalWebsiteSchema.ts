import { z } from "zod";

export const personalWebsiteSchema = z.object({
  name: z.string().default("PersonalWebsite"),
  displayName: z.string().default("Personal Website"),
  value: z.string().url("Please enter a valid url"),
});
