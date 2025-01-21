import { z } from "zod";

export const personalWebsiteSchema = z.object({
  value: z.string().url("Please enter a valid url"),
});
