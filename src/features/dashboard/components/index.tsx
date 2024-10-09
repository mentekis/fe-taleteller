import { OpenAIIcon } from "@/components/icon/openai";
import { CardStory, StoryModal } from "@/components/story";
import { Button } from "@/components/ui";
import { simulateFetch } from "@/lib/fetch";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard } from "./layout.dashboard";
import { IStory } from "@/types/story/story.type";

export const Dashboard = () => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedID, setSelectedID] = useState<string>("");

    const {
        data,
        isPending: isLoading,
        mutate: fetchData,
    } = useMutation({
        mutationKey: ["card"],
        mutationFn: async () => {
            console.info("fetching");
            return await simulateFetch<IStory>(
                {
                    author: "John Doe",
                    avatarUrl: "",
                    createdAt: new Date(),
                    description: "Lorem",
                    image: "",
                    stages: 1,
                    status: "Draft",
                    title: "The great storues if David and Goliath",
                },
                3000
            );
        },
    });

    useEffect(() => {
        fetchData();
    }, [selectedID, fetchData]);

    function handleOpenModal(id: string) {
        setDialogOpen(true);
        setSelectedID(id);
    }

    return (
        <LayoutDashboard>
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
                    <CardStory
                        title="Greate David vs Goliath at Mountain"
                        image="/visualnovel-example.webp"
                        description="Lorem"
                        stages={8}
                        status="Completed"
                        author="John Doe Waluyo III asdfafd"
                        avatarUrl="https://github.com/shadcn.png"
                        createdAt={new Date(Date.now() - 1000 * 60 * 60 * 24)}
                        handleClick={() => {
                            handleOpenModal("1");
                        }}
                    />

                    <CardStory
                        title="Greate David vs Goliath at Mountain"
                        image="/visualnovel-example.webp"
                        description="Lorem"
                        stages={8}
                        status="Completed"
                        author="John Doe Waluyo III asdfafd"
                        avatarUrl="https://github.com/shadcn.png"
                        createdAt={new Date(Date.now() - 1000 * 60 * 60 * 24)}
                        handleClick={() => {
                            handleOpenModal("2");
                        }}
                    />

                    <CardStory
                        title="Greate David vs Goliath at Mountain"
                        image="/visualnovel-example.webp"
                        description="Lorem"
                        stages={8}
                        status="Completed"
                        author="John Doe Waluyo III asdfafd"
                        avatarUrl="https://github.com/shadcn.png"
                        createdAt={new Date(Date.now() - 1000 * 60 * 60 * 24)}
                        handleClick={() => {
                            handleOpenModal("3");
                        }}
                    />

                    <CardStory
                        title="Greate David vs Goliath at Mountain"
                        image="/visualnovel-example.webp"
                        description="Lorem"
                        stages={8}
                        status="Completed"
                        author="John Doe Waluyo III asdfafd"
                        avatarUrl="https://github.com/shadcn.png"
                        createdAt={new Date(Date.now() - 1000 * 60 * 60 * 24)}
                        handleClick={() => {
                            handleOpenModal("4");
                        }}
                    />
                </div>
            </div>

            <div className="my-8">
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

                <div className="">
                    {/* Card */}
                    <CardStory
                        title="Greate David vs Goliath at Mountain"
                        image="/visualnovel-example.webp"
                        description="Lorem"
                        stages={8}
                        status="Completed"
                        author="John Doe Waluyo III asdfafd"
                        avatarUrl="https://github.com/shadcn.png"
                        createdAt={new Date(Date.now() - 1000 * 60 * 60 * 24)}
                        handleClick={() => {
                            console.info("click");
                        }}
                    />
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
