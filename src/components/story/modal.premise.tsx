import { IStoryPremiseEnhanced } from "@/types/story/story.type";
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui";

interface IPremiseValidationModalProps {
    data?: IStoryPremiseEnhanced;
    dialogOpen: boolean;
    setNewPremise: (value: string) => void;
    setDialogOpen: (value: boolean) => void;
}

export const PremiseValidationModal = (props: IPremiseValidationModalProps) => {
    // Function
    function handleUseNewPremise() {
        props.setDialogOpen(false);

        props.setNewPremise(props.data?.suggestedPremise as string);
    }

    return (
        <Dialog open={props.dialogOpen} onOpenChange={props.setDialogOpen}>
            <DialogContent
                className=""
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-[16pt] font-semibold text-rose-500">
                        Oops! Something’s Not Quite Right
                    </DialogTitle>
                    <DialogDescription>
                        <div className="space-y-2">
                            <div>
                                <p>
                                    It looks like your story idea is missing
                                    something or your story idea doesn’t follow
                                    our guidelines.
                                </p>
                                <p>
                                    For a safe and fun adventure, we suggest
                                    using this new premise instead!
                                </p>
                            </div>

                            <div>
                                <p>
                                    <b>Here’s a Fun New Idea!</b>
                                </p>
                                <p>{props.data?.suggestedPremise}</p>
                            </div>

                            <Button onClick={handleUseNewPremise}>
                                Use this premise instead
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
