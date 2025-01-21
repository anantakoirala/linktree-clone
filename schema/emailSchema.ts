import { z } from "zod";

export const emailSchema = z.object({
  value: z.string().email("Please enter a valid email"),
});
