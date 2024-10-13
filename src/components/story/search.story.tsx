import { SearchIcon } from "lucide-react";
import { Input } from "../ui";
import { forwardRef, KeyboardEventHandler } from "react";

interface IStorySearchInputProps {
    keyUpFn: KeyboardEventHandler<HTMLInputElement>;
}

export const SearchStoryInput = forwardRef<
    HTMLInputElement,
    IStorySearchInputProps
>((props, ref) => {
    return (
        <div className="relative flex-grow">
            <SearchIcon
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={16}
            />

            <Input
                ref={ref} // Forward the ref to the Input component
                placeholder="explore stories"
                className="rounded-xl pl-9"
                onKeyUp={props.keyUpFn}
            />
        </div>
    );
});
