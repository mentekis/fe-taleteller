import { OpenAIIcon } from "@/components/icon/openai";
import { CardStory } from "@/components/story";
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui";
import { simulateFetch } from "@/lib/fetch";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard } from "./layout.dashboard";

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
            return await simulateFetch("Judul", 2000);
        },
    });

    useEffect(() => {
        fetchData();
        console.info("fasdf");
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
                    >
                        <p>Let's Go!</p> <ArrowRight size={16} />
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

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent
                    className="max-w-2xl"
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle className="text-[16pt] font-semibold">
                            Story Detail
                        </DialogTitle>
                        <DialogDescription>
                            {isLoading && <p>Loding...</p>}

                            {!isLoading && (
                                <div className="flex gap-4">
                                    <div className="w-1/3">
                                        <img
                                            src="/visualnovel-example.webp"
                                            alt="Thumbnail"
                                            className="aspect-square w-full rounded-md object-cover shadow-md"
                                        />
                                    </div>

                                    <div className="flex w-2/3 flex-col">
                                        <div>
                                            <p className="text-[9pt] text-slate-500">
                                                Author
                                            </p>
                                            <h4 className="text-[14pt] font-semibold text-black">
                                                John Doe
                                            </h4>
                                        </div>

                                        <div>
                                            <p className="text-[9pt] text-slate-500">
                                                Title
                                            </p>
                                            <h3 className="text-[14pt] font-semibold text-black">
                                                {data}
                                            </h3>
                                        </div>

                                        <div>
                                            <p className="text-[9pt] text-slate-500">
                                                Stage
                                            </p>
                                            <h3 className="text-[14pt] font-semibold text-black">
                                                8 Stages
                                            </h3>
                                        </div>

                                        <div className="mt-auto grid grid-cols-2 gap-2">
                                            <Button variant={"primary"}>
                                                Read Now
                                            </Button>
                                            <Button variant={"outlinePrimary"}>
                                                Share
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

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

                <div>
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
        </LayoutDashboard>
    );
};
