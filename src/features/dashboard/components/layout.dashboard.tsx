import { userAtom } from "@/atom";
import { useAtomValue } from "jotai";
import { PlaneIcon } from "lucide-react";
import { PropsWithChildren, useEffect } from "react";
import { DashboardHeader } from "./header.dashboard";
import { NavbarRowDashboard } from "./navbar-row.dashboard";
import { NavbarDashboard } from "./navbar.dashboard";

export const LayoutDashboard = ({ children }: PropsWithChildren) => {
    // Atom
    const user = useAtomValue(userAtom);

    useEffect(() => {
        console.info(user);
    }, [user]);

    return (
        <main className="h-screen w-screen bg-[url('/dashboard-background.webp')] bg-cover p-10 font-suse">
            <div className="flex h-full overflow-hidden rounded-2xl bg-gradient-to-tl from-chathams-blue-100/50 to-white shadow-xl backdrop-blur">
                <NavbarDashboard>
                    <NavbarRowDashboard
                        title="Home"
                        icon={<PlaneIcon size={16} />}
                        to="/dashboard"
                    />
                    <NavbarRowDashboard
                        title="Your Stories"
                        icon={<PlaneIcon size={16} />}
                        to="#"
                    />
                    <NavbarRowDashboard
                        title="Explore"
                        icon={<PlaneIcon size={16} />}
                        to="/explore"
                    />
                </NavbarDashboard>

                <section className="relative w-[calc(100%-240px)] overflow-y-scroll bg-white p-6 shadow-2xl">
                    <DashboardHeader />

                    {children}
                </section>
            </div>
        </main>
    );
};
