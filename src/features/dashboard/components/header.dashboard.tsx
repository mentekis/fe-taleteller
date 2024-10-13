import { userAtom } from "@/atom";
import { SearchStoryInput } from "@/components/story/search.story";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { useAtomValue } from "jotai";
import { KeyboardEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const DashboardHeader = () => {
    const user = useAtomValue(userAtom);

    // URL & location
    const location = useLocation();
    const navigate = useNavigate();

    // FUnction
    function handleSearchStory(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key == "Enter") {
            navigate("/explore", {
                state: {
                    search: e.currentTarget.value,
                },
            });
        }
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <h2 className="order-last mt-2 lg:order-first lg:mt-0">
                Bon Voyage,{" "}
                <span className="font-semibold text-chathams-blue-900">
                    {" "}
                    {user?.name}
                </span>
            </h2>

            <div className="flex items-center justify-end gap-4 lg:w-[350px]">
                {location?.pathname !== "/explore" && (
                    <SearchStoryInput keyUpFn={handleSearchStory} />
                )}

                <Avatar>
                    <AvatarImage
                        src="/default-img.png"
                        alt="User"
                        className="h-10 w-10 rounded-xl"
                    />
                    <AvatarFallback>
                        {user?.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};
