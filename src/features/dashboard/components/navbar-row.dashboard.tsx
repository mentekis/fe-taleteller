import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface INavbarRowDashboardProps {
    icon: ReactNode;
    title: string;
}

export const NavbarRowDashboard = (props: INavbarRowDashboardProps) => {
    return (
        <div>
            <Link to={"/"}>
                <div className="flex gap-2 rounded-md px-4 py-2 hover:bg-[#ffe645]">
                    {props.icon}
                    <p>{props.title}</p>
                </div>
            </Link>
        </div>
    );
};
