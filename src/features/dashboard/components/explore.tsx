import { CardStory, StoryModal } from "@/components/story";
import { useStory } from "@/features/stories/create/hooks/story.hooks";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { LayoutDashboard } from "./layout.dashboard";

export const Explore = () => {
    // RegularState
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedID, setSelectedID] = useState<string>("");

    // Ref
    const scrollRef = useRef<HTMLDivElement>(null);

    // Hooks
    const { storyData: otherStoriesData } = useStory("otherStories", {
        limit: 8,
    });

    const {
        singleStory: data,
        singleStoryLoading: isLoading,
        fetchSingleStory,
    } = useStory("singleStory");

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
            fetchSingleStory(selectedID);
        }
    }, [selectedID, fetchSingleStory]);

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

                    {otherStoriesData?.length === 0 && (
                        <div className="flex h-[150px] items-center justify-center">
                            <p className="text-center">
                                Other adventurer have not created any story.{" "}
                                <br /> Be the first voyager! 🏰
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 justify-items-center gap-4 lg:grid-cols-4 lg:justify-items-start">
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
                                    author={otherStory.userId.name}
                                    avatarUrl="/default-img.png"
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
