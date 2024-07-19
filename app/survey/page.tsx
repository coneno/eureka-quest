import SimpleLoader from "@/components/simple-loader";
import { Suspense } from "react";
import SurveyLoader from "./_components/survey-loader";

export default function Page() {

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
                <SurveyLoader />
            </Suspense>
        </main>
    );
}
