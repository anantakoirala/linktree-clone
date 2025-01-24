import { z } from "zod";

export const emailSchema = z.object({
  name: z.string().default("Email"),
  displayName: z.string().default("Email"),
  value: z.string().email("Please enter a valid email"),
});
