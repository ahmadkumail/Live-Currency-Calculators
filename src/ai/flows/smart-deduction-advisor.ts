'use server';

/**
 * @fileOverview An AI tool that advises users on the best bank for international transfers.
 *
 * - smartDeductionAdvisor - A function that provides bank recommendations for international transfers.
 * - SmartDeductionAdvisorInput - The input type for the smartDeductionAdvisor function.
 * - SmartDeductionAdvisorOutput - The return type for the smartDeductionAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartDeductionAdvisorInputSchema = z.object({
  amountToSend: z.number().describe('The amount of money to send internationally.'),
  recipientLocation: z.string().describe('The location of the recipient.'),
});
export type SmartDeductionAdvisorInput = z.infer<typeof SmartDeductionAdvisorInputSchema>;

const SmartDeductionAdvisorOutputSchema = z.object({
  bankRecommendation: z.string().describe('The recommended bank for the international transfer.'),
  deductionDetails: z.string().describe('Details about the deductions and fees associated with the recommended bank.'),
});
export type SmartDeductionAdvisorOutput = z.infer<typeof SmartDeductionAdvisorOutputSchema>;

export async function smartDeductionAdvisor(input: SmartDeductionAdvisorInput): Promise<SmartDeductionAdvisorOutput> {
  return smartDeductionAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartDeductionAdvisorPrompt',
  input: {schema: SmartDeductionAdvisorInputSchema},
  output: {schema: SmartDeductionAdvisorOutputSchema},
  prompt: `You are an expert financial advisor specializing in international money transfers. Your task is to recommend the best bank for a user wanting to send money internationally, with the goal of minimizing deductions and fees.

Analyze the user's request based on the amount they want to send and the recipient's location.

User's Request:
- Amount to send: {{{amountToSend}}} USD
- Recipient Location: {{{recipientLocation}}}

Based on this, provide a clear recommendation for the single best bank. Also, explain the fee structure and any deductions for the recommended bank. Be specific and helpful.
`,
});

const smartDeductionAdvisorFlow = ai.defineFlow(
  {
    name: 'smartDeductionAdvisorFlow',
    inputSchema: SmartDeductionAdvisorInputSchema,
    outputSchema: SmartDeductionAdvisorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
