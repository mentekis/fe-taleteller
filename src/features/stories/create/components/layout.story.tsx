import { PropsWithChildren } from "react";

export const StoryLayout = ({ children }: PropsWithChildren) => {
    return (
        <main className="story-layout-wrapper">
            <div className="story-layout">{children}</div>
        </main>
    );
};
