import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Skeleton,
} from "@/components/ui";
import { simulateFetch } from "@/lib/fetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { HomeIcon } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { StoryLayout } from "./layout.story";

const dummyStageData = [
    {
        _id: "adsfafd",
        number: 1,
        imgUrl: "/visualnovel-example.webp",
        bgmUrl: "",
        narration: "lorem ipsum",
        option: [
            {
                value: "A",
                text: "lorem 1",
            },
            {
                value: "B",
                text: "lorem 2",
            },
        ],
        hasNext: true,
        hasPrevious: false,
        isLast: false,
    },
    {
        _id: "adsfafd",
        number: 2,
        imgUrl: "/visualnovel-example.webp",
        bgmUrl: "",
        narration: null,
        option: [
            {
                value: "A",
                text: "lorem 1",
            },
            {
                value: "B",
                text: "lorem 2",
            },
        ],
        hasNext: true,
        hasPrevious: true,
        isLast: false,
    },
    {
        _id: "adsfafd",
        number: 3,
        imgUrl: "/visualnovel-example.webp",
        bgmUrl: "",
        narration: null,
        option: [
            {
                value: "A",
                text: "lorem 1",
            },
            {
                value: "B",
                text: "lorem 2",
            },
        ],
        hasNext: false,
        hasPrevious: true,
        isLast: false,
    },
];

export const Stages = () => {
    // Hooks
    const navigate = useNavigate();

    const location = useLocation();

    const { storyId, stage } = useParams();

    const { data: stageData, isLoading } = useQuery({
        queryKey: [`${storyId}-${stage}`],
        queryFn: async () => {
            return await simulateFetch(dummyStageData[Number(stage) - 1], 2000);
        },
    });

    const {
        isPending: isLoadingNextStage,
        isError,
        mutate: handleNextStage,
    } = useMutation({
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

    useEffect(() => {
        console.info(storyId);
    }, [storyId]);

    // Function
    async function handleChooseOption(e: MouseEvent<HTMLButtonElement>) {
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
            {isLoading && <Skeleton className="h-full w-full" />}

            {!isLoading && (
                <main className="flex h-full w-full flex-col">
                    {/* Image section */}
                    <section className="flex aspect-video h-[80%] justify-center">
                        <div className="relative w-full overflow-hidden rounded-md border-2 border-black">
                            <img
                                src={stageData?.imgUrl}
                                alt={`Page ${stage}`}
                                className="h-full w-full object-cover"
                            />

                            <Button
                                size={"icon"}
                                variant={"outline"}
                                className="absolute right-2 top-2 z-10 rounded-lg shadow-md"
                            >
                                <Link to={`/`}>
                                    <HomeIcon />
                                </Link>
                            </Button>

                            <div className="absolute bottom-2 left-2 z-10 flex gap-2">
                                {stageData?.hasPrevious &&
                                    stageData?.number > 0 && (
                                        <Button
                                            onClick={() => {
                                                navigate(
                                                    `/story/${storyId}/stages/${
                                                        Number(stage) - 1
                                                    }`
                                                );
                                            }}
                                        >
                                            Previous page
                                        </Button>
                                    )}
                                {stageData?.hasNext && (
                                    <Button
                                        onClick={() => {
                                            navigate(
                                                `/story/${storyId}/stages/${
                                                    Number(stage) + 1
                                                }`,
                                                {
                                                    state: {
                                                        previousStage: stage,
                                                    },
                                                }
                                            );
                                        }}
                                    >
                                        Next page
                                    </Button>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Story section */}
                    <section className="flex flex-grow flex-col">
                        <h3>Stage {stage}</h3>

                        <div className="flex flex-grow flex-col justify-between">
                            <p>{stageData?.narration}</p>

                            {location.state?.previousStage &&
                                !stageData?.isLast &&
                                !stageData?.narration && (
                                    <div className="grid grid-cols-2 gap-2">
                                        {stageData?.option.map((option) => (
                                            <Button
                                                key={option.value}
                                                value={option.value}
                                                onClick={handleChooseOption}
                                                disabled={isLoadingNextStage}
                                            >
                                                {option.text}
                                            </Button>
                                        ))}
                                    </div>
                                )}

                            {!location.state?.previousStage &&
                                !stageData?.isLast &&
                                !stageData?.narration && <ModalContinueStory />}
                        </div>
                    </section>
                </main>
            )}
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
