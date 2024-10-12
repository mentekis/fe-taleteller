interface IFrontPageLayoutProps {
    children: React.ReactNode;
    image: string;
    imageAlt?: string;
}

export const FrontPageLayout = (props: IFrontPageLayoutProps) => {
    return (
        <main className="flex h-screen flex-col items-center justify-center bg-chathams-blue-500 p-14 font-suse">
            <section className="grid flex-grow grid-cols-1 overflow-y-scroll rounded-xl bg-white shadow-xl lg:w-full lg:grid-cols-2 lg:overflow-hidden">
                <div className="relative h-full">
                    <img
                        src={props.image}
                        alt={props.imageAlt || "Landing page image"}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>

                <div className="flex h-full items-center justify-center p-8 lg:w-full">
                    {props.children}
                </div>
            </section>
        </main>
    );
};
