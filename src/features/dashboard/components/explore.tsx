import { Helmet } from "react-helmet";
import { LayoutDashboard } from "./layout.dashboard";
import { CardStory, StoryModal } from "@/components/story";
import { useEffect, useRef, useState } from "react";
import jsonFetcher from "@/lib/fetch";
import { IStoryData } from "@/types/story/story.type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const Explore = () => {
    // RegularState
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedID, setSelectedID] = useState<string>("");

    // Ref
    const scrollRef = useRef<HTMLDivElement>(null);

    // Hooks
    const { data: otherStoriesData } = useQuery({
        queryKey: ["otherStories"],
        queryFn: async () => {
            const res = await jsonFetcher(
                `/stories?start=0&limit=50&search=&userId=&orderBy=desc`
            );

            return res.data as IStoryData[];
        },
    });

    const {
        data,
        isPending: isLoading,
        mutate: fetchData,
    } = useMutation({
        mutationKey: ["card"],
        mutationFn: async (id: string) => {
            const res = await jsonFetcher("/stories/" + id);

            return res.data as IStoryData;
        },
        onSuccess: () => {
            setDialogOpen(true);
        },
    });

    // Side effect
    useEffect(() => {
        const scrollContainer = scrollRef.current;

        const handleScroll = () => {
            if (scrollContainer) {
                console.info({
                    scrollTop: scrollContainer.scrollTop,
                    scrollHeight: scrollContainer.scrollHeight,
                    clientHeight: scrollContainer.clientHeight,
                });
            }
        };

        // Add event listener to the specific scrollable element
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll);
        }

        // Cleanup listener on unmount
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", handleScroll);
            }
        };
    }, []); // Empty dependency array to attach the listener only once

    useEffect(() => {
        if (selectedID) {
            fetchData(selectedID);
        }
    }, [selectedID, fetchData]);

    // Function
    function handleOpenModal(id: string) {
        setDialogOpen(true);
        setSelectedID(id);
    }

    return (
        <LayoutDashboard>
            <Helmet>
                <title>Explore Story</title>
            </Helmet>

            <main ref={scrollRef}>
                <div className="my-8 space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-[16pt] font-medium">
                            Explore all stories
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {/* Card */}
                        {otherStoriesData?.map((otherStory) => {
                            return (
                                <CardStory
                                    key={otherStory._id}
                                    title={otherStory.title}
                                    image={otherStory.thumbnail}
                                    description={otherStory.description}
                                    stages={otherStory.maxStage}
                                    status={
                                        otherStory.isFinish
                                            ? "Completed"
                                            : "Draft"
                                    }
                                    author={"-"}
                                    avatarUrl="https://github.com/shadcn.png"
                                    createdAt={
                                        new Date(
                                            Date.now() - 1000 * 60 * 60 * 24
                                        )
                                    }
                                    handleClick={() => {
                                        handleOpenModal(otherStory._id);
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Modal */}
                <StoryModal
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                    data={data}
                    isLoading={isLoading}
                />
            </main>
        </LayoutDashboard>
    );
};
