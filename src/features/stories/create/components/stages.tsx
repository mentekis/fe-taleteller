import AudioStory from "@/components/story/audio.story";
import { Button } from "@/components/ui";
import jsonFetcher from "@/lib/fetch";
import { IStageData } from "@/types/story/stage.type";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Loader2, XIcon } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNewStages } from "../hooks/stage.hooks";
import { StoryLayout } from "./layout.story";
import { ModalEndStory } from "./modal-end.story";

export const Stages = () => {
    // URL Data / Routing
    const navigate = useNavigate();

    // const queryClient = useQueryClient();

    const { storyId } = useParams();

    // State
    const [stageNumber, setStageNumber] = useState<number>(0);
    const [selectedStage, setSelectedStage] = useState<IStageData | null>(null);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const [openEndStoryDialog, setEndStoryDialog] = useState<boolean>(false);

    // Potrait detector
    const [isPotrait, setIsPotrait] = useState<boolean>(
        window.matchMedia("(orientation: portrait)").matches
    );

    // Hooks
    const newStageMutation = useNewStages();

    const {
        data: stages,
        refetch: refetchStages,
        isLoading: isLoadingStages,
        isSuccess: isSuccessStages,
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

    useEffect(() => {
        if (isSuccessStages && stages.length > 0) {
            return;
        } else if (isSuccessStages && stages.length === 0) {
            newStageMutation.mutate(
                {
                    stageNumber: 1,
                    storyId: storyId as string,
                    userChoice: "",
                },
                {
                    onSuccess: () => {
                        refetchStages();
                    },
                }
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessStages]);

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

        newStageMutation.mutate(
            {
                stageNumber: stageNumber + 2,
                storyId: storyId as string,
                userChoice: choosen,
            },
            {
                onSuccess: async () => {
                    await refetchStages();

                    setStageNumber(stageNumber + 1);
                },
            }
        );
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

    function handleImageLoading() {
        setIsImageLoaded(true);
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
            <div className="relative aspect-video h-full max-w-full">
                {!isImageLoaded && (
                    <div className="h-full animate-pulse bg-black/50"></div>
                )}

                <img
                    src={selectedStage?.place}
                    alt={`Stage - ${selectedStage?.stageNumber}`}
                    className="stage-image"
                    onLoad={handleImageLoading}
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
                    onClick={() => navigate("/dashboard")}
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
                                    disabled={newStageMutation.isPending}
                                >
                                    {newStageMutation.isPending && (
                                        <Loader2
                                            className="mr-2 h-4 w-4 animate-spin"
                                            size={16}
                                        />
                                    )}

                                    {!newStageMutation.isPending && (
                                        <p>{selectedStage.optionA}</p>
                                    )}
                                </Button>

                                <Button
                                    className="story-popup option"
                                    value={"B"}
                                    onClick={handleChooseOption}
                                    disabled={newStageMutation.isPending}
                                >
                                    {newStageMutation.isPending && (
                                        <Loader2
                                            className="mr-2 h-4 w-4 animate-spin"
                                            size={16}
                                        />
                                    )}

                                    {!newStageMutation.isPending && (
                                        <p>{selectedStage.optionB}</p>
                                    )}
                                </Button>
                            </div>
                        )}

                        {selectedStage.isEnd && (
                            <Button
                                onClick={() => setEndStoryDialog(true)}
                                className="w-full"
                            >
                                End Story
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <ModalEndStory
                open={openEndStoryDialog}
                setOpen={setEndStoryDialog}
            />

            {selectedStage?.bgm && (
                <AudioStory src={selectedStage.bgm} key={selectedStage?.bgm} />
            )}
        </StoryLayout>
    );
};
