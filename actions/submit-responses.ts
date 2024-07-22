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
    await fs.writeFile(responsesDir + '/' + filename, JSON.stringify(response));
    /*const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    const url = `/v1/study-service/events/${studyKey}/submit`;
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'POST',
            body: JSON.stringify({
                studyKey,
                profileID: profileID,
                response,
            }),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to submit response: ${resp.status} - ${resp.body.error}` };
    }
    revalidatePath('/')
    return resp.body;*/
}