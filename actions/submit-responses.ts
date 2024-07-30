'use server';

import { format } from 'date-fns';
import { promises as fs } from 'fs';
import { revalidatePath } from "next/cache";
import { SurveyResponse } from "survey-engine/data_types";

export const submitResponses = async (studyKey: string, participantID: string, response: SurveyResponse) => {

    const cwd = process.cwd();
    const responsesDir = cwd + '/responses';
    const timestamp = format(new Date(), 'yyyy-MM-dd-HH-mm-ss');
    const filename = timestamp + '_' + participantID + '.json';

    response.submittedAt = Math.floor(Date.now() / 1000);
    response.participantId = participantID;

    try {
        await fs.access(responsesDir);
    } catch (error) {
        await fs.mkdir(responsesDir);
    }

    try {
        await fs.writeFile(responsesDir + '/' + filename, JSON.stringify(response));
    } catch (error) {
        console.error(error);
        return { error: 'Failed to submit response' };
    }
    return { success: true };
}