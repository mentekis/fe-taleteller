import { userAtom } from "@/atom";
import { CardStory, StoryModal } from "@/components/story";
import { useStory } from "@/features/stories/create/hooks/story.hooks";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { LayoutDashboard } from "./layout.dashboard";

export const UserStories = () => {
    // Atom
    const user = useAtomValue(userAtom);

    // RegularState
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedID, setSelectedID] = useState<string>("");

    // Ref

    // Hooks
    const { storyData: userStory } = useStory("userStories", {
        limit: 50,
        userId: user?._id as string,
    });

    const {
        singleStory: data,
        singleStoryLoading: isLoading,
        fetchSingleStory,
    } = useStory("singleStory");

    // Side effect
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
                <title>Your adventure - Taleteller</title>
            </Helmet>

            <main>
                <div className="my-8 space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-[16pt] font-medium">
                            All of your stories
                        </p>
                    </div>

                    {userStory?.length === 0 && (
                        <div className="flex h-[150px] items-center justify-center">
                            <p className="text-center">
                                Start your first journey! 🏰
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {/* Card */}
                        {userStory?.map((otherStory) => {
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
