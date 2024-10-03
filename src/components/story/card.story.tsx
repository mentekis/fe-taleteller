import { Clock } from "lucide-react";
import { Avatar, AvatarImage, Badge } from "../ui";
import { AvatarFallback } from "@radix-ui/react-avatar";

export interface ICardStoryProps {
    title: string;
    image: string;
    description: string;
    stages: number;
    status: string;
    duration?: number;
    withAvatar?: boolean;
    avatarUrl?: string;
    author?: string;
}

export const CardStory = (props: ICardStoryProps) => {
    // Calculate duration
    const duration = props.duration || Math.floor(props.stages * 1.5);

    // Generate avatar fallback
    const avatarFallback = props.author?.slice(0, 2).toUpperCase();

    return (
        <div>
            <div className="relative h-[450px] overflow-hidden rounded-xl bg-white shadow-sm">
                {/* Card thumbnail */}
                <div className="h-[50%] w-full">
                    <img
                        className="h-full w-full object-cover"
                        src={props.image}
                        alt={`${props.title} thumbnail`}
                    />
                </div>
                <div className="p-6">
                    {/* Card Avatar */}
                    {props.withAvatar && (
                        <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    {avatarFallback}
                                </AvatarFallback>
                            </Avatar>

                            <p className="text-sm text-slate-500">User</p>
                        </div>
                    )}

                    {/* Card Title */}
                    <div className="mt-2">
                        <h3>{props.title}</h3>
                        <p className="text-sm text-slate-400">
                            {props.description}
                        </p>
                    </div>

                    {/* Card footer */}
                    <div className="absolute bottom-0 left-0 w-full p-6">
                        <div className="flex w-full items-end justify-between">
                            <div>
                                <p className="text-xs">{props.stages} stages</p>
                                <Badge>{props.status}</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={14} />
                                <p className="text-xs">~{duration} min</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
