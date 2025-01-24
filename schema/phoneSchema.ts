import { z } from "zod";

export const phoneSchema = z.object({
  name: z.string().default("Phone"),
  displayName: z.string().default("Phone"),
  value: z
    .string()
    .min(11, { message: "Phone number must be at least 11 characters long" })
    .refine((value) => value.startsWith("+"), {
      message: "Phone number must start with a '+'",
    })
    .refine((value) => /^[+\d]+$/.test(value), {
      message: "Phone number must contain only numbers and '+'",
    }),
});
