"use server";

import { smartDeductionAdvisor, SmartDAdvisorInput } from "@/ai/flows/smart-deduction-advisor";
import { Resend } from "resend";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function getSmartAdvice(input: SmartDAdvisorInput) {
  try {
    const result = await smartDeductionAdvisor(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("AI Error:", error);
    return { success: false, error: "Failed to get advice. Please try again." };
  }
}

export async function sendContactMessage(values: z.infer<typeof formSchema>) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const validatedData = formSchema.safeParse(values);

  if (!validatedData.success) {
    return { success: false, error: "Invalid form data." };
  }

  const { name, email, message } = validatedData.data;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Use Resend's default verified 'from' address
      to: ['kumail.zaidi708@gmail.com'],
      subject: `New message from ${name} on your website`,
      reply_to: email,
      html: `
        <p>You have received a new message from your website contact form.</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: "Failed to send message. Please try again later." };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
