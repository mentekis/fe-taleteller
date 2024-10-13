import { CardStory, StoryModal } from "@/components/story";
import { SearchStoryInput } from "@/components/story/search.story";
import { useStory } from "@/features/stories/create/hooks/story.hooks";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { LayoutDashboard } from "./layout.dashboard";

export const Explore = () => {
    // URL and location
    const { state } = useLocation();

    // RegularState
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedID, setSelectedID] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    // Ref
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Hooks
    const { storyData: otherStoriesData, storyRefetch } = useStory(
        "otherStories",
        {
            limit: 50,
            search: search,
        }
    );

    const {
        singleStory: data,
        singleStoryLoading: isLoading,
        fetchSingleStory,
    } = useStory("singleStory");

    // Side effect
    // Set search by data on url query param
    useEffect(() => {
        if (state?.search) {
            if (searchInputRef.current) {
                searchInputRef.current.value = state.search as string;
            }

            setSearch(state.search);
        }
    }, [state?.search]);

    // Refetch if search is changed
    useEffect(() => {
        if (search !== "") {
            storyRefetch();
        }
    }, [search, storyRefetch]);

    // Open modal
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

    function handleSearchStory(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key == "Enter") {
            setSearch(e.currentTarget.value);

            return;
        }
    }

    return (
        <LayoutDashboard>
            <Helmet>
                <title>Explore Story</title>
            </Helmet>

            <main>
                <div className="my-8 space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-[16pt] font-medium">
                            Explore all stories
                        </p>
                    </div>

                    <SearchStoryInput
                        ref={searchInputRef}
                        keyUpFn={handleSearchStory}
                    />

                    {otherStoriesData?.length === 0 && (
                        <div className="flex h-[150px] items-center justify-center">
                            <p className="text-center">
                                Other adventurer have not created any story.{" "}
                                <br /> Be the first voyager! 🏰
                            </p>
                        </div>
                    )}

                    <div className="story-card-grid">
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
