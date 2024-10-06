interface IFrontPageLayoutProps {
    children: React.ReactNode;
    image: string;
    imageAlt?: string;
}

export const FrontPageLayout = (props: IFrontPageLayoutProps) => {
    return (
        <main className="bg-chathams-blue-500 font-suse flex h-screen flex-col items-center justify-center p-14">
            <section className="grid w-full flex-grow grid-cols-2 overflow-hidden rounded-xl bg-white shadow-xl">
                <div className="relative h-full">
                    <img
                        src={props.image}
                        alt={props.imageAlt || "Landing page image"}
                        className="absolute inset-0 object-cover"
                    />
                </div>

                <div className="flex h-full w-full items-center justify-center p-8">
                    <div className="relative h-[75%] w-full cursor-default">
                        {props.children}
                    </div>
                </div>
            </section>
        </main>
    );
};
