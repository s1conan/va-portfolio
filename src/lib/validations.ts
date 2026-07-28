import { z } from "zod";

import { projectTypes } from "@/lib/data";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "NAME REQUIRED"),
  email: z.email("INVALID EMAIL FORMAT"),
  company: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  details: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof ContactFormData, string[]>>;
}

export const initialContactFormState: ContactFormState = { status: "idle" };
