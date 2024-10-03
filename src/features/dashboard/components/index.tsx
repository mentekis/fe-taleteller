import { userAtom } from "@/atom";
import { CardStory, ICardStoryProps } from "@/components/story";
import {
    Button,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    Input,
} from "@/components/ui";
import { useAtomValue } from "jotai";
import { PlaneIcon } from "lucide-react";
import { LayoutDashboard } from "./layout.dashboard";

export const Dashboard = () => {
    const user = useAtomValue(userAtom);

    // Dummy card data
    const dummyCardData: ICardStoryProps = {
        description:
            "This is the story about something you would not ever expect",
        title: "Story Title",
        image: "https://images.unsplash.com/photo-1565006111656-06a8a9c8f53b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stages: 8,
        status: "Completed",
        withAvatar: true,
        avatarUrl: "https://github.com/shadcn.png",
        author: "User",
    };

    return (
        <LayoutDashboard>
            <main>
                {/* Greeting & Initial action card */}
                <section className="sticky top-0 z-10 mb-2 flex items-center justify-between bg-white py-4">
                    <div className="space-y-1">
                        <h4>Bon Voyage</h4>
                        <h1 className="font-bold">{user?.name}</h1>
                    </div>

                    <div className="relative w-[50%]">
                        <Input placeholder="search someone adventure" />

                        <PlaneIcon className="absolute right-0 top-0 -translate-x-1/2 translate-y-1/3" />
                    </div>
                </section>

                {/* Create own story */}
                <section>
                    <div className="space-y-4 rounded-lg bg-[#d1f9ff] p-5">
                        <h2 className="text-center">Create your own story!</h2>

                        <div className="flex justify-center gap-4">
                            <Button>Start new Story</Button>

                            <Button variant={"outline"}>
                                Explore somebody premise
                            </Button>
                        </div>
                    </div>
                </section>

                {/* User story */}
                <section>
                    <div className="space-y-4 rounded-md p-5">
                        <h2 className="text-center font-bold">
                            your awesome stories!
                        </h2>

                        <div className="space-y-4">
                            <Carousel className="w-full">
                                <CarouselContent className="-ml-1">
                                    {Array.from({ length: 5 }).map(
                                        (_, index) => (
                                            <CarouselItem
                                                key={index}
                                                className="flex justify-center pl-1 md:basis-1/2 lg:basis-1/3"
                                            >
                                                <div className="p-1">
                                                    <CardStory
                                                        {...dummyCardData}
                                                    />
                                                </div>
                                            </CarouselItem>
                                        )
                                    )}
                                    {/* More Stories */}
                                    <CarouselItem className="flex justify-center pl-1 md:basis-1/2 lg:basis-1/3">
                                        <div className="p-1">
                                            <div className="h-[350px] w-[350px] rounded border border-black">
                                                See more...
                                            </div>
                                        </div>
                                    </CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>

                            <Button variant={"outline"} className="w-full">
                                View all
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Explore story */}
                <section className="bg-violet-50">
                    <div className="space-y-4 rounded-md p-5">
                        <h2 className="text-center font-bold">
                            Explore other adventurer story
                        </h2>

                        <Carousel className="w-full">
                            <CarouselContent className="-ml-1">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="flex justify-center pl-1 md:basis-1/2 lg:basis-1/3"
                                    >
                                        <div>
                                            {/* Card */}
                                            <CardStory {...dummyCardData} />
                                        </div>
                                    </CarouselItem>
                                ))}
                                {/* More Stories */}
                                <CarouselItem className="flex justify-center pl-1 md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                        <div className="h-[350px] w-[350px] rounded border border-black">
                                            See more...
                                        </div>
                                    </div>
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </section>
            </main>
        </LayoutDashboard>
    );
};
