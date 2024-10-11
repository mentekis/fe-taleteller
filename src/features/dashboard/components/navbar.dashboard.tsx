import { Button } from "@/components/ui";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { LogOut } from "lucide-react";
import { PropsWithChildren } from "react";

export const NavbarDashboard = ({ children }: PropsWithChildren) => {
    const { handleLogout } = useLogout();

    return (
        <aside className="flex w-[240px] flex-col justify-center p-4 transition-all duration-500 hover:bg-black/5">
            <div className="flex gap-4">
                <img
                    src="/favicon-32x32.png"
                    alt="Icon"
                    className="rounded-xl"
                />

                <h2 className="cursor-default select-none font-semibold transition duration-100 hover:text-chathams-blue-700">
                    Taleteller!
                </h2>
            </div>

            <div>
                <p className="my-2 text-sm text-slate-500">MAIN MENU</p>

                <menu className="space-y-2">{children}</menu>
            </div>

            <div className="mt-auto">
                <Button
                    variant={"outline"}
                    className="flex w-full items-center gap-4 rounded-xl text-slate-500 hover:text-chathams-blue-600"
                    onClick={handleLogout}
                >
                    <LogOut size={16} />
                    <p>Logout</p>
                </Button>
            </div>
        </aside>
    );
};
