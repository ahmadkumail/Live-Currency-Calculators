"use server";

import { smartDeductionAdvisor, SmartDeductionAdvisorInput } from "@/ai/flows/smart-deduction-advisor";

export async function getSmartAdvice(input: SmartDeductionAdvisorInput) {
  try {
    const result = await smartDeductionAdvisor(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("AI Error:", error);
    return { success: false, error: "Failed to get advice. Please try again." };
  }
}
