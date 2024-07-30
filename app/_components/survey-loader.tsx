import Container from '@/components/container';
import React from 'react';
import { Survey } from 'survey-engine/data_types';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

import SurveyClient, { SurveyWithContext } from './survey-client';

interface SurveyLoaderProps {
    externalPID?: string;
}

const SurveyLoader: React.FC<SurveyLoaderProps> = async (props) => {
    const file = await fs.readFile(process.cwd() + '/public/talk2aiod.json', 'utf8');
    const survey = JSON.parse(file) as Survey;

    // Generate a new UUID for the profileID
    const participantID = props.externalPID ? props.externalPID : uuidv4();


    const surveyWithContext: SurveyWithContext = {
        survey: survey,
        context: {
            participantFlags: {
                group: Math.random() > 0.5 ? 'A' : 'B',
            },
        },
    }

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
                            invalidResponseText: 'Check your responses',
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
