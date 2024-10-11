import Cookies from "js-cookie";
import { PropsWithChildren, useEffect } from "react";

export const StoryLayout = ({ children }: PropsWithChildren) => {
    useEffect(() => {
        if (!Cookies.get("accessToken")) {
            window.location.href = "/auth/login";
        }
    }, []);

    return (
        <main className="story-layout-wrapper">
            <div className="story-layout">{children}</div>
        </main>
    );
};
