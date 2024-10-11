import { userAtom } from "@/atom";
import { Avatar, AvatarFallback, AvatarImage, Input } from "@/components/ui";
import { useAtomValue } from "jotai";
import { SearchIcon } from "lucide-react";

export const DashboardHeader = () => {
    const user = useAtomValue(userAtom);

    return (
        <div className="flex items-center justify-between">
            <h2>
                Bon Voyage,{" "}
                <span className="font-semibold text-chathams-blue-900">
                    {" "}
                    {user?.name}
                </span>
            </h2>

            <div className="flex w-[350px] items-center gap-4">
                <div className="relative flex-grow">
                    <SearchIcon
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        size={16}
                    />

                    <Input
                        placeholder="explore stories"
                        className="rounded-xl pl-9"
                    />
                </div>

                <Avatar>
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
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
