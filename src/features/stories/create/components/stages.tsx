import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui";
import { simulateFetch } from "@/lib/fetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, XIcon } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { StoryLayout } from "./layout.story";

export const Stages = () => {
    // Hooks
    const navigate = useNavigate();

    const _location = useLocation();

    const { storyId, stage } = useParams();

    const { data: _stageData, _isLoading } = useQuery({
        queryKey: [`${storyId}-${stage}`],
        queryFn: async () => {
            // return await simulateFetch(dummyStageData[Number(stage) - 1], 2000);
        },
    });

    const { isPending: _isLoadingNextStage, mutate: handleNextStage } =
        useMutation({
            mutationKey: ["nextStage"],
            mutationFn: async (choosedOption: string) => {
                return await simulateFetch(choosedOption, 2000);
            },
        });

    // State
    const [isPotrait, setIsPotrait] = useState<boolean>(
        window.matchMedia("(orientation: portrait)").matches
    );

    // Side Effect
    useEffect(() => {}, []);

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
    async function _handleChooseOption(e: MouseEvent<HTMLButtonElement>) {
        console.info(e.currentTarget.value);

        handleNextStage(e.currentTarget.value);

        navigate(`/story/${storyId}/stages/${Number(stage) + 1}`, {
            state: {
                previousStage: stage,
            },
        });
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
                <img src="/castle.png" alt="Castle" className="stage-image" />

                <div className="story-navigator-wrapper absolute">
                    <Button size={"icon"} className="bg-black bg-opacity-20">
                        <ArrowLeft />
                    </Button>
                    <Button size={"icon"} className="bg-black bg-opacity-20">
                        <ArrowRight />
                    </Button>
                </div>

                <Button
                    size={"icon"}
                    className="absolute right-2 top-2 bg-black bg-opacity-20"
                >
                    <XIcon />
                </Button>

                <div className="absolute bottom-0 w-full p-4">
                    <div className="story-popup">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Commodi nostrum tempora harum sequi magnam
                            veritatis aperiam repellendus! Similique, harum rem.
                            Lorem ipsum dolor sit amet.
                        </p>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-2">
                        <Button className="story-popup option" value={"A"}>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Natus, aliquid!
                            </p>
                        </Button>

                        <Button className="story-popup option" value={"B"}>
                            <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Enim, quisquam.
                            </p>
                        </Button>
                    </div>
                </div>
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
