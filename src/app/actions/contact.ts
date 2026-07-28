"use server";

import { Resend } from "resend";

import { siteConfig } from "@/lib/data";
import {
  contactSchema,
  type ContactFormData,
  type ContactFormState,
} from "@/lib/validations";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildProposalHtml = (data: ContactFormData): string => {
  const rows: Array<[string, string]> = [
    ["NAME", data.name],
    ["EMAIL", data.email],
    ["COMPANY", data.company ?? "—"],
    ["PROJECT TYPE", data.projectType ?? "—"],
    ["BUDGET", data.budget ?? "—"],
    ["DETAILS", data.details ?? "—"],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:12px 16px;border:2px solid #000;background:#FFD700;color:#000;font-family:monospace;text-transform:uppercase;vertical-align:top;white-space:nowrap;">${label}</th><td style="padding:12px 16px;border:2px solid #000;background:#FFF;color:#000;font-family:monospace;">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html><html><body style="margin:0;padding:24px;background:#FFF;"><div style="border:4px solid #000;padding:24px;font-family:monospace;color:#000;"><p style="margin:0 0 16px;font-size:18px;font-weight:bold;text-transform:uppercase;">PROPOSAL REQUEST // ${escapeHtml(data.projectType ?? "—")}</p><table style="border-collapse:collapse;width:100%;"><tbody>${rowsHtml}</tbody></table></div></body></html>`;
};

export async function sendProposal(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    projectType: formData.get("projectType"),
    budget: formData.get("budget") || undefined,
    details: formData.get("details"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "VALIDATION FAILED — CHECK HIGHLIGHTED FIELDS.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message: "MAIL SYSTEM OFFLINE — RESEND_API_KEY NOT CONFIGURED.",
    };
  }

  const resend = new Resend(apiKey);
  const data = parsed.data;

  // Retry logic for cold start / network issues
  let lastError: { message: string } | null = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    const { error } = await resend.emails.send({
      from: "DEV_ARCHITECT Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL ?? siteConfig.email],
      replyTo: data.email,
      subject: `PROPOSAL REQUEST // ${data.projectType} — ${data.name}`,
      html: buildProposalHtml(data),
    });

    if (!error) {
      return { status: "success", message: "PROPOSAL RECEIVED. RESPONSE ETA: 24H." };
    }

    lastError = error;

    // Only retry on network/connection errors, not validation errors
    if (error.message.includes("fetch") || error.message.includes("network") || error.message.includes("resolve")) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      continue;
    }

    break;
  }

  return {
    status: "error",
    message: `TRANSMISSION FAILED: ${lastError?.message}`,
  };
}
