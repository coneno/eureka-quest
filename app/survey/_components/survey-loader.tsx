import Container from '@/components/container';
import React from 'react';
// import SurveyClient from './survey-client';
import { Survey } from 'survey-engine/data_types';
import { getLocaleStringTextByCode } from '@/components/survey-renderer/SurveySingleItemView/utils';
//import { getLocalizedString } from '@/lib/get-localizes-string';
import { promises as fs } from 'fs';

import SurveyClient, { SurveyWithContext } from './survey-client';

interface SurveyLoaderProps {

}

const SurveyLoader: React.FC<SurveyLoaderProps> = async (props) => {
    /*const t = await getTranslations({ locale: props.locale, namespace: 'SurveyPage' });

    const resp = await getSurveyWithContextForProfile(props.studyKey, props.surveyKey, props.profileId);
    if (!resp || resp.error || !resp.surveyWithContext) {
        console.error(resp.error);
        return <Container className='flex justify-center'>
            <ErrorInfo
                title={t('surveyLoadingError')}
                description={resp?.error}
            />
        </Container>;
    }

    const survey = resp.surveyWithContext.survey as Survey;
    const title = getLocalizedString(survey.props?.name, props.locale);*/

    const file = await fs.readFile(process.cwd() + '/public/TestSurvey.json', 'utf8');
    const survey = JSON.parse(file) as Survey;

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
                        profileID={'todo-participant-id'}
                    />
                </div>
            </Container>
        </>
    );
};

export default SurveyLoader;
