import { userAtom } from "@/atom";
import { ICardStoryProps } from "@/components/story";
import { Button } from "@/components/ui";
import { useAtomValue } from "jotai";
import { LogOut, PlaneIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
    const _user = useAtomValue(userAtom);

    // Dummy card data
    const _dummyCardData: ICardStoryProps = {
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
        <main className="font-suse h-screen w-screen bg-[url('/dashboard-background.webp')] bg-cover p-10">
            <div className="from-chathams-blue-100/50 flex h-full overflow-hidden rounded-2xl bg-gradient-to-tl to-white shadow-xl backdrop-blur">
                <aside className="border-r-chathams-blue-950/50 relative w-[240px] space-y-4 border-r-2 p-4 transition-all duration-500 hover:bg-black/5">
                    <div className="flex gap-4">
                        <img
                            src="/favicon-32x32.png"
                            alt="Icon"
                            className="rounded-xl"
                        />

                        <h2 className="hover:text-chathams-blue-700 cursor-default select-none font-semibold transition duration-100">
                            Taleteller!
                        </h2>
                    </div>

                    <div>
                        <p className="my-2 text-sm text-slate-500">MAIN MENU</p>

                        <menu className="space-y-2">
                            <div className="hover:bg-chathams-blue-600/25 hover:text-chathams-blue-800 flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-slate-500 shadow-inner transition duration-100">
                                <PlaneIcon size={16} />
                                <Link to={"/my-stories"}>Home</Link>
                            </div>
                            <div className="hover:bg-chathams-blue-600 flex cursor-pointer items-center gap-2 rounded-xl bg-black px-4 py-2 text-white transition duration-100">
                                <PlaneIcon size={16} />
                                <Link to={"/my-stories"}>Your Stories</Link>
                            </div>
                            <div className="hover:bg-chathams-blue-600/25 hover:text-chathams-blue-800 flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-slate-500 shadow-inner transition duration-100">
                                <PlaneIcon size={16} />
                                <Link to={"/my-stories"}>Explore</Link>
                            </div>
                        </menu>
                    </div>

                    <div className="absolute bottom-4">
                        <Button
                            variant={"outline"}
                            className="hover:text-chathams-blue-600 flex w-full items-center gap-4 rounded-xl text-slate-500"
                        >
                            <LogOut size={16} />
                            <p>Logout</p>
                        </Button>
                    </div>
                </aside>

                <section className="w-[calc(100%-240px)]"></section>
            </div>
        </main>
    );
};
