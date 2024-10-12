import { IStoryData } from "@/types/story/story.type";
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    Skeleton,
} from "../ui";
import { Link } from "react-router-dom";
import { urlGenerator } from "@/lib/fetch";
import { useEffect, useState } from "react";

interface IStoryModalProps {
    data?: IStoryData;
    isLoading: boolean;
    dialogOpen: boolean;
    setDialogOpen: (value: boolean) => void;
}

export const StoryModal = (props: IStoryModalProps) => {
    // State
    const [isShared, setIsShared] = useState<boolean>(false);

    // FUnction
    function handleCopyLink() {
        const url = urlGenerator(`/story/${props.data?._id}/stages`);

        navigator.clipboard.writeText(url);

        setIsShared(true);
    }

    useEffect(() => {
        if (isShared) {
            setTimeout(() => {
                setIsShared(false);
            }, 3000);
        }
    }, [isShared]);

    return (
        <Dialog open={props.dialogOpen} onOpenChange={props.setDialogOpen}>
            <DialogContent
                className="w-[280px] rounded-lg md:h-[360px] md:w-[400px] md:overflow-y-scroll lg:w-full lg:max-w-2xl"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-[16pt] font-semibold">
                        Story Detail
                    </DialogTitle>
                    <DialogDescription>
                        {props.isLoading && (
                            <div className="flex gap-4">
                                <div className="w-1/3">
                                    <Skeleton className="aspect-square w-full rounded-md object-cover shadow-md" />
                                </div>

                                <div className="flex w-2/3 flex-col gap-6">
                                    <div>
                                        <Skeleton className="h-5 text-slate-500" />
                                    </div>

                                    <div>
                                        <Skeleton className="h-5 text-slate-500" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {!props.isLoading && (
                            <div className="flex flex-col gap-4 lg:flex-row">
                                <div className="lg:w-1/3">
                                    <img
                                        src={
                                            props.data?.thumbnail ||
                                            "/image-placeholder.png"
                                        }
                                        alt="Thumbnail"
                                        className="w-full rounded-md object-cover shadow-md md:h-[200px] lg:aspect-square"
                                    />
                                </div>

                                <div className="flex flex-col lg:w-2/3">
                                    <div>
                                        <p className="text-[9pt] text-slate-500">
                                            Author
                                        </p>
                                        <h4 className="text-[14pt] font-semibold text-black">
                                            {props.data?.userId?.name}
                                        </h4>
                                    </div>

                                    <div>
                                        <p className="text-[9pt] text-slate-500">
                                            Title
                                        </p>
                                        <h3 className="text-[14pt] font-semibold text-black">
                                            {props.data?.title}
                                        </h3>
                                    </div>

                                    <div>
                                        <p className="text-[9pt] text-slate-500">
                                            Stage
                                        </p>
                                        <h3 className="text-sm font-semibold text-black lg:text-[14pt]">
                                            {props.data?.maxStage} Stages
                                        </h3>
                                    </div>

                                    {props.data?._id && (
                                        <div className="mt-2 grid grid-cols-2 gap-2 lg:mt-auto">
                                            <Link
                                                to={`/story/${props.data?._id}/stages`}
                                            >
                                                <Button
                                                    variant={"primary"}
                                                    className="w-full"
                                                >
                                                    Read Now
                                                </Button>
                                            </Link>
                                            <Button
                                                variant={"outlinePrimary"}
                                                onClick={handleCopyLink}
                                            >
                                                {isShared
                                                    ? "Link copied!"
                                                    : "Share"}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
