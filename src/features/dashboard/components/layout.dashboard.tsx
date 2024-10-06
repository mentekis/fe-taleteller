import { userAtom } from "@/atom";
import { useSetAtom } from "jotai";
import Cookies from "js-cookie";
import { PropsWithChildren, useEffect } from "react";
import { NavbarDashboard } from "./navbar.dashboard";

export const LayoutDashboard = ({ children }: PropsWithChildren) => {
    // Atom
    const setUserAtom = useSetAtom(userAtom);

    useEffect(() => {
        Cookies.set(
            "user",
            JSON.stringify({ name: "User", email: "bomsiwor@gmail.com" })
        );
        const getUser = Cookies.get("user") as string;

        const parsedData = JSON.parse(getUser);

        setUserAtom(parsedData);
    }, [setUserAtom]);

    return (
        <main className="bg-[#fdffef] p-5 font-fredoka lg:flex">
            <NavbarDashboard />

            <main className="w-full space-y-4 pb-10 pl-6 pr-2 pt-2 lg:w-[calc(100%-240px)]">
                <div className="rounded-md border-2 border-black bg-white p-8">
                    {children}
                </div>
            </main>
        </main>
    );
};
