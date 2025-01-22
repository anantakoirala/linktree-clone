import { z } from "zod";

export const threadSchema = z.object({
  name: z.string().default("Threads"),
  value: z
    .string()
    .refine((value) => value.startsWith("@") && value.length > "@".length, {
      message: "Please enter a valid Threads username",
    }),
});
