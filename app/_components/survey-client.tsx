'use client';

import SurveyView from '@/components/survey-renderer/SurveyView/SurveyView';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Survey, SurveyResponse } from 'survey-engine/data_types';
import { toast } from 'sonner';
import { submitResponses } from '@/actions/submit-responses';
import { enUS } from 'date-fns/locale';

const surveyDateLocales: Array<{ code: string, locale: any, format: string }> = [
    { code: 'en', locale: enUS, format: 'dd/MM/yyyy' },
];

export interface SurveyWithContext {
    survey: Survey;
    context?: {
        participantFlags?: {
            [key: string]: string;
        }
    },
    prefill?: SurveyResponse;
}

interface SurveyClientProps {
    studyKey: string;
    surveyKey: string;
    profileID: string;
    openAt: number;
    locale: string;
    surveyWithContext: SurveyWithContext;
    messages: {
        previousPageBtn: string;
        nextPageBtn: string;
        submitBtn: string;
        submitError: string;
        invalidResponseText: string;
    }
}

const SurveyClient: React.FC<SurveyClientProps> = (props) => {
    const [isMounted, setIsMounted] = React.useState(false);
    const [isPending, startTransition] = React.useTransition();
    const router = useRouter();

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div>Loading...</div>;
    }
    const onSubmit = (response: SurveyResponse) => {
        startTransition(async () => {
            const resp = await submitResponses(props.studyKey, props.profileID, response);
            /*if (!resp || resp.error) {
                console.error(resp.error);
                toast.error(props.messages.submitError, {
                    description: resp.error ? resp.error : 'Unknown error'
                });
                return;
            }

            const assignedSurveys = resp.assignedSurveys;
            if (!assignedSurveys || !assignedSurveys.length) {
                console.log('no assigned surveys');
                router.push('/dashboard');
                return;
            }

            const immediateSurveys = assignedSurveys.filter((s: AssignedSurvey) => {
                if (s.validFrom && s.validFrom > new Date().getTime() / 1000) {
                    return false;
                }
                if (s.validUntil && s.validUntil < new Date().getTime() / 1000) {
                    return false;
                }
                if (s.category !== 'immediate') {
                    return false;
                }
                if (s.surveyKey === props.surveyKey) {
                    return false;
                }
                return true;
            });

            if (!immediateSurveys.length) {
                console.log('no immediate surveys');
                router.push('/dashboard');
                return;
            }

            const nextSurvey = immediateSurveys[0];
            router.replace(`/survey/${props.studyKey}/${nextSurvey.surveyKey}?pid=${props.profileID}`);
            */
        });
    }

    return (
        <SurveyView
            loading={isPending}
            survey={props.surveyWithContext.survey}
            context={props.surveyWithContext.context}
            prefills={props.surveyWithContext.prefill?.responses}
            languageCode={props.locale}
            backBtnText={props.messages.previousPageBtn}
            nextBtnText={props.messages.nextPageBtn}
            submitBtnText={props.messages.submitBtn}
            invalidResponseText={props.messages.invalidResponseText}
            customResponseComponents={[]}
            dateLocales={surveyDateLocales}
            hideBackButton={true}

            onSubmit={(responses, version) => {
                const now = Math.round(new Date().getTime() / 1000);
                const response: SurveyResponse = {
                    key: props.surveyKey,
                    responses: [...responses],
                    versionId: version,
                    submittedAt: now,
                    openedAt: props.openAt,
                    context: {
                        language: props.locale,
                        engineVersion: process.env.NEXT_PUBLIC_SURVEY_ENGINE_VERSION,
                        group: props.surveyWithContext.context?.participantFlags?.group,
                    }
                }
                onSubmit(response);
            }}
        />
    );
};

export default SurveyClient;
