import SimpleLoader from "@/components/simple-loader";
import { Suspense } from "react";
import SurveyLoader from "./_components/survey-loader";

export const dynamic = 'force-dynamic';

interface SurveyPageProps {
    searchParams: {
        PROLIFIC_PID?: string;
        group?: string;
    };
}

export default function Page(props: SurveyPageProps) {
    const pid = props.searchParams.PROLIFIC_PID;
    const group = props.searchParams.group;

    return (
        <main
            className="flex-1"
            role="main"
            id="main"
            tabIndex={-1}
        >
            <Suspense
                fallback={<SimpleLoader />}
            >
                <SurveyLoader
                    externalPID={pid}
                    externalGroupAssignment={group}
                />
            </Suspense>
        </main>
    );
}
