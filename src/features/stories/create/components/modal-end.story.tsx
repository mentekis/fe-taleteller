import {
    Button,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui";
import copyURL from "@/lib/copy-url";
import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ModalEndStory = (props: {
    open: boolean;
    setOpen: (value: boolean) => void;
}) => {
    //State
    const [isSharedClicked, setIsSharedClicked] = useState<boolean>(false);

    // Function copy link
    function handleCopyLink() {
        copyURL();

        setIsSharedClicked(true);
    }

    return (
        <Dialog open={props.open} onOpenChange={props.setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>End of story</DialogTitle>
                    <DialogDescription>
                        <div className="space-y-2">
                            <p>We're gonna back to the dashboard</p>

                            <div className="grid grid-cols-2 gap-4">
                                <Button variant={"primary"}>
                                    <Link to="/dashboard">Back to deck</Link>
                                </Button>
                                <TooltipProvider disableHoverableContent>
                                    <Tooltip
                                        open={isSharedClicked}
                                        onOpenChange={setIsSharedClicked}
                                    >
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant={"outlinePrimary"}
                                                onClick={handleCopyLink}
                                            >
                                                Share
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <p>Link Copied</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
