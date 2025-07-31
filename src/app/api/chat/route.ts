import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages, tool, stepCountIs } from 'ai';
import { z } from 'zod';
import { searchPatients } from '@/actions/patients';
import { PatientsFilterDTO } from '@/types';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const result = streamText({
    model: openai('gpt-4o'),
    messages: convertToModelMessages(messages),
    system: `Your name is Finni, and you are a helpful assistant that can search for patients in the database.
            You can search for patients by name, location, age, medical conditions, allergies, or status.
            You can also search for patients by a combination of these criteria.
            Your search results will be limited to 10 patients to prevent context overloading.
            The output of the search function is visible to the user in a presentiable UI, so you need not repeat the same information in the response.
            Just say "Here are the results" and ask the user if they want to see more patients, or offer different questions the user might want to ask.
            `,
    stopWhen: stepCountIs(5),
    tools: {
      searchPatients: tool({
        description: 'Search patients in the database by various criteria like name, location, age, medical conditions, allergies, or status',
        inputSchema: z.object({
          name: z.string().optional().describe('Patient name (first, middle, or last name)'),
          state: z.string().optional().describe('Abbreviation of state where patient lives (e.g. NY, CA, etc.)'),
          status: z.enum(['Inquiry', 'Onboarding', 'Active', 'Churned']).optional().describe('Patient status'),
          condition: z.string().optional().describe('Medical condition to search for'),
          allergy: z.string().optional().describe('Allergy to search for'),
          ageMin: z.number().optional().describe('Minimum age'),
          ageMax: z.number().optional().describe('Maximum age'),
        }),
        execute: async (searchCriteria: PatientsFilterDTO) => {
          console.log(searchCriteria);
          const patients = await searchPatients(searchCriteria);
          return {
            count: patients.length,
            patients: patients,
          };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}