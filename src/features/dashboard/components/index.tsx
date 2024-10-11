import { userAtom } from "@/atom";
import { OpenAIIcon } from "@/components/icon/openai";
import { CardStory, StoryModal } from "@/components/story";
import { Button } from "@/components/ui";
import jsonFetcher from "@/lib/fetch";
import { IStoryData } from "@/types/story/story.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { LayoutDashboard } from "./layout.dashboard";

export const Dashboard = () => {
    // State
    // Atom
    const _user = useAtomValue(userAtom);

    // RegularState
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedID, setSelectedID] = useState<string>("");

    // Hooks
    const { data: otherStoriesData } = useQuery({
        queryKey: ["otherStories"],
        queryFn: async () => {
            const res = await jsonFetcher(
                "/stories?start=0&limit=8&search=&userId=&orderBy=asc"
            );

            return res.data as IStoryData[];
        },
    });

    const { data: _userStories } = useQuery({
        queryKey: ["userStories"],
        queryFn: async () => {
            // const res = await jsonFetcher(
            //     `/stories?start=0&limit=8&search=&userId=${user?._id}&orderBy=asc`
            // );

            // return res.data as IStoryData[];
            return [];
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

    useEffect(() => {
        fetchData(selectedID);
    }, [selectedID, fetchData]);

    function handleOpenModal(id: string) {
        setDialogOpen(true);
        setSelectedID(id);
    }

    return (
        <LayoutDashboard>
            <Helmet>
                <title>Shipdeck - Taleteller</title>
            </Helmet>

            <div className="my-4 flex w-full justify-between rounded-2xl bg-chathams-blue-700 px-4 py-2 text-white">
                <div>
                    <h2 className="text-[16pt] font-semibold">
                        Ready to start your journey?
                    </h2>
                    <p className="text-[9pt]">
                        Always start with new experience
                    </p>

                    <Button
                        className="mt-2 flex justify-between gap-4 rounded-xl text-chathams-blue-900"
                        size={"sm"}
                        variant={"outline"}
                        asChild
                    >
                        <Link to="/create-story">
                            <p>Let's Go!</p> <ArrowRight size={16} />
                        </Link>
                    </Button>
                </div>

                <div className="flex items-center gap-4">
                    <OpenAIIcon
                        fontSize={48}
                        className="transition duration-200 hover:rotate-90"
                    />

                    <p>AI Powered Storyteller</p>
                </div>
            </div>

            <div className="my-8">
                <div className="flex items-center justify-between">
                    <p className="text-[16pt] font-medium">
                        Your Newest Stories
                    </p>

                    <Link
                        to={"/"}
                        className="group flex items-center gap-2 font-light hover:text-chathams-blue-900"
                    >
                        <p className="transition group-hover:-translate-x-2">
                            View all
                        </p>
                        <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {/* Card */}
                    {/* {userStories?.map((userStory) => {
                        return (
                            <CardStory
                                title={userStory.title}
                                image={userStory.thumbnail}
                                description={userStory.description}
                                stages={userStory.maxStage}
                                status={
                                    userStory.isFinish ? "Completed" : "Draft"
                                }
                                author={"-"}
                                avatarUrl="https://github.com/shadcn.png"
                                createdAt={
                                    new Date(Date.now() - 1000 * 60 * 60 * 24)
                                }
                                handleClick={() => {
                                    handleOpenModal(userStory._id);
                                }}
                            />
                        );
                    })} */}
                </div>
            </div>

            <div className="my-8 space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-[16pt] font-medium">
                        Other adventurer also write
                    </p>

                    <Link
                        to={"/"}
                        className="group flex items-center gap-2 font-light hover:text-chathams-blue-900"
                    >
                        <p className="transition group-hover:-translate-x-2">
                            View all
                        </p>
                        <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {/* Card */}
                    {otherStoriesData?.map((otherStory) => {
                        return (
                            <CardStory
                                title={otherStory.title}
                                image={otherStory.thumbnail}
                                description={otherStory.description}
                                stages={otherStory.maxStage}
                                status={
                                    otherStory.isFinish ? "Completed" : "Draft"
                                }
                                author={"-"}
                                avatarUrl="https://github.com/shadcn.png"
                                createdAt={
                                    new Date(Date.now() - 1000 * 60 * 60 * 24)
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
        </LayoutDashboard>
    );
};
