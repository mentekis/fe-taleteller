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
import jsonFetcher, { simulateFetch } from "@/lib/fetch";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { StoryLayout } from "./layout.story";
import { AlertCircle, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { IStoryData, IStoryPremiseEnhanced } from "@/types/story/story.type";

interface IStoryPremise {
    premise: string;
}

export const StoryCreateForm = () => {
    // Hooks
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    async function getPremiseFromAI() {
        return (
            await jsonFetcher("/stories/premise", null, {
                method: "GET",
                credentials: "include",
            })
        ).premise as IStoryPremise;
    }

    const {
        data: premiseAI,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["storyInitializers"],
        queryFn: getPremiseFromAI,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (isLoading) {
            console.info("loading...");
            return;
        }

        setPremise(premiseAI?.premise as string);
    }, [premiseAI, isLoading]);

    const {
        mutate: handleSendPremise,
        isPending: isLoadingStory,
        error: errorSendPremise,
    } = useMutation({
        mutationKey: ["create story"],
        mutationFn: async (data: IStoryPremise) => {
            setButtonState("Creating your story...");

            const res = await jsonFetcher("/stories", data, {
                method: "POST",
            });

            const result = res.data as IStoryData;

            return result;
        },
        onSuccess: (data) => {
            // Invalidate query
            queryClient.invalidateQueries({
                queryKey: ["storyInitializer"],
            });

            navigate("/story/" + data._id + "/stages/1");
            // // Move to story stages
            // navigate("/dashboard");
        },
    });

    const {
        mutate: handleValidatePremise,
        isPending: isLoadingValidate,
        error: errorValidatePremise,
    } = useMutation({
        mutationKey: ["validatePremise"],
        mutationFn: async (data: IStoryPremise) => {
            setButtonState("Validating...");

            const result = await jsonFetcher("/stories/premise", data, {
                method: "POST",
            });

            return result as IStoryPremiseEnhanced;
        },
        onSuccess: (data) => {
            handleSendPremise({
                premise: data.suggestedPremise,
            });
        },
        onError: () => {
            setButtonState(null);
        },
    });

    // State
    const [openPopOver, setOpenPopOver] = useState<boolean>(false);
    const [buttonState, setButtonState] = useState<string | null>(null);
    const [premise, setPremise] = useState<string>("");

    // Side effect

    // FUnction

    // Form Data
    function handleSubmitPremise() {
        // Construct data
        const payload: IStoryPremise = {
            premise: premise,
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

                {error && <p>{error.message}</p>}

                {premiseAI && <p>{premiseAI.premise}</p>}

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
                        disabled={isLoadingValidate || isLoadingStory}
                        className="flex items-center justify-center gap-2"
                    >
                        {(isLoadingValidate || isLoadingStory) && (
                            <Loader2 className="mx-4 h-4 w-4 animate-spin" />
                        )}
                        <p>{buttonState || "Let's Go"}</p>
                    </Button>
                </div>
            </div>
        </StoryLayout>
    );
};
