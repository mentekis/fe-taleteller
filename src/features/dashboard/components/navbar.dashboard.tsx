import { userAtom } from "@/atom";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import { useAtomValue } from "jotai";
import { BookIcon, LogOutIcon, Telescope } from "lucide-react";
import { NavbarRowDashboard } from "./navbar-row.dashboard";

export const NavbarDashboard = () => {
    // Atom
    const user = useAtomValue(userAtom);

    // Supporting data manipulation
    const avatarFallback = user?.name.slice(0, 2).toUpperCase();

    return (
        <aside className="hidden flex-col justify-between px-4 pb-8 pt-2 lg:sticky lg:top-2 lg:flex lg:h-screen lg:w-[240px]">
            <div className="space-y-4">
                {/* Brand */}
                <h2 className="font-medium text-[#ef4350]">Taleteller</h2>

                {/* Avatar */}
                <div className="flex cursor-pointer select-none gap-3 rounded-md border-2 border-black bg-[#fdd20d] px-2 py-4 hover:bg-[#ffe645]">
                    <div>
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>{avatarFallback}</AvatarFallback>
                        </Avatar>
                    </div>

                    <div>
                        <p>{user?.name}</p>
                        <p className="text-xs text-white">Manage Profile</p>
                    </div>
                </div>

                {/* Navbar */}
                <nav className="space-y-4">
                    <NavbarRowDashboard icon={<BookIcon />} title="Library" />

                    <NavbarRowDashboard icon={<Telescope />} title="Explore" />
                </nav>
            </div>

            <div>
                <Button variant="outline" size={"sm"} className="w-full">
                    <div className="flex items-center justify-between gap-2">
                        <p>Logout</p>
                        <LogOutIcon size={14} />
                    </div>
                </Button>
            </div>
        </aside>
    );
};
