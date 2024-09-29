import { PropsWithChildren } from "react";

export const AuthLayout = ({ children }: PropsWithChildren) => {
    return (
        <main className="font-fredoka grid lg:grid-cols-2">
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
