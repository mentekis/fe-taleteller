import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface INavbarRowDashboardProps {
    icon: ReactNode;
    title: string;
    to: string;
}

export const NavbarRowDashboard = (props: INavbarRowDashboardProps) => {
    return (
        <div className="flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-slate-500 shadow-inner transition duration-100 hover:bg-chathams-blue-600/25 hover:text-chathams-blue-800">
            {props.icon}
            <Link to={props.to}>{props.title}</Link>
        </div>
    );
};
