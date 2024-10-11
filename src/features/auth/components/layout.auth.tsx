import Cookies from "node_modules/@types/js-cookie";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthLayout = ({ children }: PropsWithChildren) => {
    // Navigation
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get("accessToken")) {
            navigate("/dashboard");
        }
    }, [navigate]);

    return (
        <main className="grid font-fredoka lg:grid-cols-2">
            <div className="h-screen p-6">
                <div className="h-full w-full overflow-hidden rounded-lg bg-white">
                    <img
                        src="/Front Cover.jpg"
                        alt="FrontCover"
                        className="object-cover"
                    />
                </div>
            </div>

            <section className="p-6">
                <div className="flex h-full items-center justify-center">
                    {children}
                </div>
            </section>
        </main>
    );
};
