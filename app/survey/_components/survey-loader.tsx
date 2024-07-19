import Container from '@/components/container';
import React from 'react';
import { Survey } from 'survey-engine/data_types';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

import SurveyClient, { SurveyWithContext } from './survey-client';

interface SurveyLoaderProps {

}

const SurveyLoader: React.FC<SurveyLoaderProps> = async (props) => {
    const file = await fs.readFile(process.cwd() + '/public/TestSurvey.json', 'utf8');
    const survey = JSON.parse(file) as Survey;

    // Generate a new UUID for the profileID
    const participantID = uuidv4();


    const surveyWithContext: SurveyWithContext = {
        survey: survey,
        context: {
            participantFlags: {
                group: Math.random() > 0.5 ? 'A' : 'B',
            },
        },
    }

    console.log('surveyWithContext', surveyWithContext.survey);

    return (
        <>

            <Container className='flex justify-center pt-6 pb-10'>
                <div className="max-w-[800px] w-full">
                    <SurveyClient
                        locale={'en'}
                        surveyWithContext={surveyWithContext}
                        messages={{
                            previousPageBtn: 'Previous page',
                            nextPageBtn: 'Next page',
                            submitBtn: 'Submit',
                            invalidResponseText: 'Invalid response',
                            submitError: 'Failed to submit response',
                        }}
                        openAt={Math.floor(Date.now() / 1000)}
                        studyKey={'TestStudy'}
                        surveyKey={survey.surveyDefinition.key}
                        profileID={participantID}
                    />
                </div>
            </Container>
        </>
    );
};

export default SurveyLoader;
