import { formatRelativeTime } from "@/lib/time-parser";
import { PlayIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui";
import { useState } from "react";

export interface ICardStoryProps {
    title: string;
    author: string;
    avatarUrl: string;
    image: string;
    description: string;
    stages: number;
    status: string;
    createdAt: Date;
    handleClick: () => void;
}

type TCardBodyProps = Omit<
    ICardStoryProps,
    "image" | "createdAt" | "handleClick"
> & {
    duration?: number;
};

type TCardFooterProps = Pick<ICardStoryProps, "createdAt">;

export const CardStory = (props: ICardStoryProps) => {
    // Function
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

    function handleOnImageLoad() {
        setIsImageLoaded(true);
    }

    return (
        <div
            className="group flex h-[320px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-lg lg:w-[240px]"
            onClick={props.handleClick}
        >
            {/* Image */}
            {!isImageLoaded && (
                <div className="h-[150px] w-full animate-pulse bg-slate-200"></div>
            )}

            <img
                src={props.image || "/image-placeholder.png"}
                alt={props.title}
                className="h-[150px] w-full object-cover"
                onLoad={handleOnImageLoad}
            />

            {/* Card body */}
            <CardBody {...props} />

            {/* Card footer */}
            <CardFooter createdAt={props.createdAt} />
        </div>
    );
};

const CardBody = (props: TCardBodyProps) => {
    // Other function
    // Generate avatar fallback
    const avatarFallback = props.author?.slice(0, 2).toUpperCase();

    // Calculate duration
    const duration = props.duration || Math.floor(props.stages * 1.5);

    // Cut the long name
    const name =
        props.author.length > 12
            ? props.author.slice(0, 12) + "..."
            : props.author;

    return (
        <div className="p-3">
            {/* Author and status */}
            <div className="flex items-center justify-between">
                {/* Author */}
                <div className="flex items-center gap-2">
                    <Avatar className="h-[28px] w-[28px]">
                        <AvatarImage src={props.avatarUrl} alt={props.author} />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>

                    <div className="text-[10pt]">
                        <p>
                            By{" "}
                            <b className="font-semibold text-chathams-blue-900">
                                {name}
                            </b>
                        </p>
                    </div>
                </div>

                {/* Status */}
                <div>
                    <p className="text-[8pt] text-slate-500">{props.status}</p>
                </div>
            </div>

            <h5 className="text-[12pt] font-semibold transition duration-100 group-hover:text-chathams-blue-900">
                {props.title}
            </h5>
            <p className="text-[8pt]">
                {props.stages} pages (~{duration} min)
            </p>
        </div>
    );
};

const CardFooter = ({ createdAt }: TCardFooterProps) => {
    // Other function
    // Format date
    const formattedDate = formatRelativeTime(createdAt);

    return (
        <div className="mt-auto flex items-center justify-between px-3 pb-3">
            <p className="text-[8pt] text-slate-500">{formattedDate}</p>

            <PlayIcon
                size={24}
                className="rounded bg-chathams-blue-900 fill-white stroke-none p-1 transition group-hover:bg-white group-hover:fill-chathams-blue-900 group-hover:ring-1 group-hover:ring-chathams-blue-900"
            />
        </div>
    );
};
