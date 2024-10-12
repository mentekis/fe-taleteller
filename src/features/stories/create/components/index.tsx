import { OpenAIIcon } from "@/components/icon/openai";
import {
    Alert,
    AlertDescription,
    AlertTitle,
    Button,
    Popover,
    PopoverContent,
    Textarea,
} from "@/components/ui";
import { IStoryPremise } from "@/types/story/story.type";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Loader2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePremiseStory } from "../hooks/premise.hooks";
import { StoryLayout } from "./layout.story";
import { useNewStages } from "../hooks/stage.hooks";
import { userAtom } from "@/atom/user.atom";
import { useAtomValue } from "jotai";

export const StoryCreateForm = () => {
    // Atom
    const user = useAtomValue(userAtom);

    // State
    const [openPopOver, setOpenPopOver] = useState<boolean>(false);
    const [buttonState, setButtonState] = useState<string | null>(null);
    const [premise, setPremise] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    // Hooks
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const {
        errorPremiseAI,
        premiseAI,
        isLoadingValidate,
        errorValidatePremise,
        isValidateSuccess,
        handleValidatePremise,
        dataValidatePremise,
        handleSendPremise,
        isLoadingSendPremise,
        errorSendPremise,
        isSendPremiseSuccess,
        dataSendPremise,
    } = usePremiseStory();

    const newStageMutation = useNewStages();

    // Handle if premiseAI already settled
    useEffect(() => {
        if (premiseAI) {
            setPremise(premiseAI.premise as string);

            setOpenPopOver(true);
        }
    }, [premiseAI]);

    // Story create
    // Handle validation success and send premise to create story
    useEffect(() => {
        if (isValidateSuccess && dataValidatePremise) {
            // Ensure that the validation data is available before sending premise
            handleSendPremise({
                premise: dataValidatePremise.suggestedPremise as string,
                userId: user?._id as string,
            });
        }
    }, [isValidateSuccess, dataValidatePremise, handleSendPremise, user]);

    // Handle the final send premise success
    useEffect(() => {
        if (isSendPremiseSuccess && dataSendPremise) {
            // Create first stages
            newStageMutation.mutate({
                storyId: dataSendPremise._id as string,
                stageNumber: 1,
                userChoice: "",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSendPremiseSuccess, dataSendPremise]);

    // Handle success for new stage
    useEffect(() => {
        if (newStageMutation.isSuccess) {
            queryClient.invalidateQueries({ queryKey: ["storyInitializers"] });

            navigate("/story/" + dataSendPremise?._id + "/stages");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newStageMutation.isSuccess]);

    // Handle errors for validation
    useEffect(() => {
        if (errorValidatePremise) {
            setError(errorValidatePremise.message as string);
        }
    }, [errorValidatePremise]);

    // Handle errors for sending premise
    useEffect(() => {
        if (errorSendPremise) {
            setError(errorSendPremise.message as string);
        }
    }, [errorSendPremise]);

    // Handle error for new stage
    useEffect(() => {
        if (newStageMutation.error) {
            setError(newStageMutation.error.message as string);
        }
    }, [newStageMutation.error]);

    // Handle loading states (you can adjust UI loading messages here)
    useEffect(() => {
        if (isLoadingValidate) {
            setButtonState("Validating premise...");
        } else if (isLoadingSendPremise) {
            setButtonState("Creating your story...");
        } else if (newStageMutation.isPending) {
            setButtonState("Creating new stage...");
        } else {
            setButtonState(null);
        }
    }, [isLoadingValidate, isLoadingSendPremise, newStageMutation.isPending]);

    useEffect(() => {
        setError(errorPremiseAI?.message as string);
    }, [errorPremiseAI]);

    // Form Data
    function handleSubmitPremise() {
        // Construct data
        const payload: IStoryPremise = {
            premise: premise,
            userId: user?._id as string,
        };

        // Call mutation
        handleValidatePremise(payload);
    }

    function handleChangePremise(e: ChangeEvent<HTMLTextAreaElement>) {
        setPremise(e.target.value);
    }

    return (
        <StoryLayout>
            <div className="m-auto w-[60%] space-y-2 rounded-xl bg-white p-4 shadow-xl">
                <h2 className="text-[20pt] font-semibold">
                    Start Your Adventure
                </h2>

                {error && <p className="text-sm text-rose-500">{error}</p>}

                <p className="text-[10pt]">
                    Use the magic of AI to spark your story, or create your own
                    from scratch!
                </p>

                {(errorSendPremise || errorValidatePremise) && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {errorSendPremise?.message ||
                                errorValidatePremise?.message}
                        </AlertDescription>
                    </Alert>
                )}

                <Popover open={openPopOver} onOpenChange={setOpenPopOver}>
                    <PopoverAnchor>
                        <Textarea
                            placeholder="Write your story's first idea here..."
                            value={premise}
                            onChange={handleChangePremise}
                        />
                    </PopoverAnchor>
                    <PopoverContent className="" side="left">
                        <div className="relative space-y-2 text-xs">
                            <OpenAIIcon
                                fontSize={18}
                                className="absolute right-0 top-0 animate-pulse"
                            />

                            <p>An AI-generated story idea just for you!</p>

                            <p>
                                Tap 'Let’s Go' to start your adventure with this
                                premise.
                            </p>
                        </div>
                    </PopoverContent>
                </Popover>

                <div className="grid grid-cols-2 gap-4">
                    <Button variant={"outlinePrimary"} asChild>
                        <Link to="/dashboard">Cancel</Link>
                    </Button>

                    <Button
                        variant={"primary"}
                        onClick={handleSubmitPremise}
                        disabled={
                            isLoadingValidate ||
                            isLoadingSendPremise ||
                            newStageMutation.isPending
                        }
                        className="flex items-center justify-center gap-2"
                    >
                        {(isLoadingValidate ||
                            isLoadingSendPremise ||
                            newStageMutation.isPending) && (
                            <Loader2 className="mx-4 h-4 w-4 animate-spin" />
                        )}
                        <p>{buttonState || "Let's Go"}</p>
                    </Button>
                </div>
            </div>
        </StoryLayout>
    );
};
