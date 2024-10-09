import { PropsWithChildren } from "react";

export const AuthLayout = ({ children }: PropsWithChildren) => {
    return (
        <main className="grid font-fredoka lg:grid-cols-2">
            <div className="h-[70vh] md:h-screen">
                <div className="flex h-full w-full overflow-hidden rounded-lg bg-black">
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
