import { CommonResponseComponentProps } from '@/components/survey-renderer/SurveySingleItemView/utils';
import { SurveyContext } from '@/components/survey-renderer/survey-context';
import { Button } from '@/components/ui/button';
import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface TaskInfoSurveyCompProps extends CommonResponseComponentProps {
}

const TaskInfoSurveyComp: React.FC<TaskInfoSurveyCompProps> = (props) => {
    const surveyContext = React.useContext(SurveyContext);


    let content = <>
        <p className='mb-1 text-sm font-bold'>
            Hint
        </p>
        <p className='mb-1.5'>
            You can use this link to get to the chatbot:
        </p>
        <Button asChild

            variant={'outline'}>
            <Link
                href={`https://survey.dfki.de/chatbot?id=${surveyContext.participantID}`}
                target='_blank'
            >
                Open Chatbot
                <span>
                    <ArrowUpRightIcon className='size-4 mx-1' />
                </span>
            </Link>
        </Button>
    </>

    if (surveyContext.context.participantFlags?.group === 'W') {
        content = <>
            <p className='mb-1 text-sm font-bold'>
                Hint
            </p>
            <p className='mb-1.5'>
                You can use this link to get to the website:
            </p>
            <Button asChild

                variant={'outline'}>
                <Link
                    href={`https://aiod.eu/`}
                    target='_blank'
                >
                    Open Website
                    <span>
                        <ArrowUpRightIcon className='size-4 mx-1' />
                    </span>
                </Link>
            </Button>
        </>
    }

    return (
        <div className='px-[--survey-card-px-sm] sm:px-[--survey-card-px]'>
            {content}
        </div>
    );
};

export default TaskInfoSurveyComp;
