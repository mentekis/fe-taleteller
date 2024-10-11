import { IStoryPremise } from "@/types/story/story.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPremiseFromAI } from "../service/get-premise-ai";
import { sendPremise } from "../service/send-premise-ai";
import { validatePremise } from "../service/validate-premise-ai";

export const usePremiseStory = () => {
    // Hooks


    // Get premise from AI
    const {
        data: premiseAI,
        error: errorPremiseAI,
    } = useQuery({
        queryKey: ["storyInitializers"],
        queryFn: getPremiseFromAI,
        refetchOnWindowFocus: false,
    });

    // Validate premise from AI
    const {
        mutate: handleValidatePremise,
        isPending: isLoadingValidate,
        error: errorValidatePremise,
        isSuccess: isValidateSuccess,
        data: dataValidatePremise
    } = useMutation({
        mutationKey: ["validatePremise"],
        mutationFn: (data: IStoryPremise) => validatePremise(data),
    });

    const {
        mutate: handleSendPremise,
        isPending: isLoadingSendPremise,
        error: errorSendPremise,
        isSuccess: isSendPremiseSuccess,
        data: dataSendPremise
    } = useMutation({
        mutationKey: ["sending-premise"],
        mutationFn: sendPremise,
    });

    return { premiseAI, errorPremiseAI, handleValidatePremise, isLoadingValidate, errorValidatePremise, isValidateSuccess, dataValidatePremise, handleSendPremise, isLoadingSendPremise, errorSendPremise, isSendPremiseSuccess, dataSendPremise };
}