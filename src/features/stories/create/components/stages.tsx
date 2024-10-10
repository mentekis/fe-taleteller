import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui";
import jsonFetcher, { simulateFetch } from "@/lib/fetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, XIcon } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { StoryLayout } from "./layout.story";
import { IStageData } from "@/types/story/stage.type";
import { useNewStages } from "../hooks/stage.hooks";

export const Stages = () => {
    // URL Data / Routing
    const navigate = useNavigate();

    const { storyId } = useParams();

    // State
    const [stageNumber, setStageNumber] = useState<number>(0);
    const [selectedStage, setSelectedStage] = useState<IStageData | null>(null);

    // Potrait detector
    const [isPotrait, setIsPotrait] = useState<boolean>(
        window.matchMedia("(orientation: portrait)").matches
    );

    // Hooks
    const queryClient = useQueryClient();
    const newStageMutation = useNewStages();

    const {
        data: stages,
        refetch: refetchStages,
        isLoading: isLoadingStages,
    } = useQuery({
        queryKey: [storyId + "/stages"],
        queryFn: async () => {
            const result = await jsonFetcher(`/stages/${storyId}`, null, {
                method: "GET",
                credentials: "include",
            });

            return result.data as IStageData[];
        },
        refetchOnWindowFocus: false,
    });

    // Side Effect
    // Set stage if there is available stage
    useEffect(() => {
        if (stages?.length) {
            setSelectedStage(stages[stageNumber]);
        }
    }, [stages, stageNumber]);

    // Handle new stage success
    useEffect(() => {
        async function handleSuccess() {
            if (newStageMutation.isSuccess) {
                // await queryClient.invalidateQueries({
                //     queryKey: [storyId + "/stages"],
                // });
                await refetchStages();

                handleNextPage();
            }
        }

        handleSuccess();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newStageMutation.isSuccess, newStageMutation.data]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(orientation: portrait)");

        function handleChangeOrientation(e: MediaQueryListEvent) {
            setIsPotrait(e.matches);
        }

        mediaQuery.addEventListener("change", handleChangeOrientation);

        return () =>
            mediaQuery.removeEventListener("change", handleChangeOrientation);
    }, [isPotrait]);

    // Function
    async function handleChooseOption(e: MouseEvent<HTMLButtonElement>) {
        const choosen = e.currentTarget.value;

        newStageMutation.mutate({
            stageNumber: stageNumber + 2,
            storyId: storyId as string,
            userChoice: choosen,
        });
    }

    function hasNextPage(currentPage: number) {
        return currentPage < (stages?.length || 0) - 1;
    }

    function handleNextPage() {
        if (!isLoadingStages && stageNumber < (stages?.length || 0) - 1) {
            setStageNumber(stageNumber + 1);
        }
    }

    function handlePreviousPage() {
        if (stageNumber > 0) {
            setStageNumber(stageNumber - 1);
        }
    }

    // Component return
    if (isPotrait) {
        return (
            <StoryLayout>
                {isPotrait && (
                    <div className="flex h-full w-full items-center justify-center">
                        <div className="text-center">
                            <h1>Rotate your devices</h1>
                            <p>
                                Use landscape orientation for better experiences
                            </p>
                        </div>
                    </div>
                )}
            </StoryLayout>
        );
    }

    return (
        <StoryLayout>
            <div className="relative aspect-video h-full">
                <img
                    src={selectedStage?.place}
                    alt="Castle"
                    className="stage-image"
                />

                <div className="story-navigator-wrapper absolute">
                    <Button
                        size={"icon"}
                        className={`bg-black bg-opacity-20`}
                        onClick={handlePreviousPage}
                    >
                        <ArrowLeft />
                    </Button>
                    <Button
                        size={"icon"}
                        className="bg-black bg-opacity-20"
                        onClick={handleNextPage}
                    >
                        <ArrowRight />
                    </Button>
                </div>

                <Button
                    size={"icon"}
                    className="absolute right-2 top-2 bg-black bg-opacity-20"
                >
                    <XIcon />
                </Button>

                {selectedStage && (
                    <div className="absolute bottom-0 w-full p-4">
                        <div className="story-popup">
                            <p>{selectedStage.stageStory}</p>
                        </div>

                        {!hasNextPage(stageNumber) && !selectedStage.isEnd && (
                            <div className="mt-2 grid grid-cols-2 gap-2">
                                <Button
                                    className="story-popup option"
                                    value={"A"}
                                    onClick={handleChooseOption}
                                >
                                    <p>{selectedStage.optionA}</p>
                                </Button>

                                <Button
                                    className="story-popup option"
                                    value={"B"}
                                    onClick={handleChooseOption}
                                >
                                    <p>{selectedStage.optionB}</p>
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </StoryLayout>
    );
};

export const ModalContinueStory = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button className="w-full">Continue Story</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Continue your journey</DialogTitle>
                    <DialogDescription>
                        We are so happy to see you continue your journey.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
