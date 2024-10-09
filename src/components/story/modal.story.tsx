import { IStory } from "@/types/story/story.type";
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    Skeleton,
} from "../ui";

interface IStoryModalProps {
    data?: IStory;
    isLoading: boolean;
    dialogOpen: boolean;
    setDialogOpen: (value: boolean) => void;
}

export const StoryModal = (props: IStoryModalProps) => {
    //

    return (
        <Dialog open={props.dialogOpen} onOpenChange={props.setDialogOpen}>
            <DialogContent
                className="max-w-2xl"
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
                                            {props.data?.title}
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
    );
};
