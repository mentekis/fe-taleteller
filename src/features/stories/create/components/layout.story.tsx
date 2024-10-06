import { PropsWithChildren } from "react";

export const StoryLayout = ({ children }: PropsWithChildren) => {
    return (
        <main className="h-screen p-5 font-fredoka">
            <div className="h-full rounded-md border-2 border-black bg-white p-5">
                {children}
            </div>
        </main>
    );
};
