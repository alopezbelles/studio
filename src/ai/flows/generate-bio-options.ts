'use server';

/**
 * @fileOverview Bio generation AI agent.
 *
 * - generateBioOptions - A function that handles the bio generation process.
 * - GenerateBioOptionsInput - The input type for the generateBioOptions function.
 * - GenerateBioOptionsOutput - The return type for the generateBioOptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBioOptionsInputSchema = z.object({
  keywords: z
    .string()
    .describe('Keywords or phrases to base the bio generation on.'),
});
export type GenerateBioOptionsInput = z.infer<typeof GenerateBioOptionsInputSchema>;

const GenerateBioOptionsOutputSchema = z.object({
  bioOptions: z
    .array(z.string())
    .describe('An array of suggested bio text alternatives.'),
});
export type GenerateBioOptionsOutput = z.infer<typeof GenerateBioOptionsOutputSchema>;

export async function generateBioOptions(input: GenerateBioOptionsInput): Promise<GenerateBioOptionsOutput> {
  return generateBioOptionsFlow(input);
}

const generateBioOptionsPrompt = ai.definePrompt({
  name: 'generateBioOptionsPrompt',
  input: {schema: GenerateBioOptionsInputSchema},
  output: {schema: GenerateBioOptionsOutputSchema},
  prompt: `You are a professional bio writer. Based on the keywords and phrases provided, generate three different bio options for a portfolio website.  Make them unique, professional, and compelling.

Keywords/Phrases: {{{keywords}}}`,
});

const generateBioOptionsFlow = ai.defineFlow(
  {
    name: 'generateBioOptionsFlow',
    inputSchema: GenerateBioOptionsInputSchema,
    outputSchema: GenerateBioOptionsOutputSchema,
  },
  async input => {
    const {output} = await generateBioOptionsPrompt(input);
    return output!;
  }
);
