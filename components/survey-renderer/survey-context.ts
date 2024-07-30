import { createContext } from "react";
import { Survey, SurveyContext as EngineContext } from "survey-engine/data_types";

export const SurveyContext = createContext<{
    participantID: string,
    context: EngineContext,
}>({
    participantID: '',
    context: {
        participantFlags: undefined,
    },
});
