import { Button } from "@/components/ui";
import { Helmet } from "react-helmet";
import { FrontPageLayout } from "./layout.front-page";
import { Link } from "react-router-dom";

export const LandingPage = () => {
    return (
        <FrontPageLayout image="./landing-page-taleteller.jpeg">
            <Helmet>
                <title>Taleteller</title>
            </Helmet>

            <div className="relative h-[75%] w-full cursor-default">
                <div className="hover:text-chathams-blue-700 my-2 flex items-center">
                    <h1 className="text-5xl font-bold">Taleteller</h1>
                    <span className="rotate-[15deg] text-6xl font-bold transition duration-100 hover:rotate-0">
                        !
                    </span>
                </div>

                <div className="cursor-default select-none space-y-4 font-bold">
                    <h1>Pick your path</h1>
                    <h1>
                        and let your{" "}
                        <span className="hover:bg-chathams-blue-600 rounded-lg bg-black px-2 py-1 text-white transition duration-100">
                            choices
                        </span>{" "}
                        guide the way!
                    </h1>

                    <p className="hover:bg-chathams-blue-600 w-fit rounded-lg bg-black px-2 py-1 text-white transition duration-100">
                        "Every story is a new adventure—what will you discover
                        next?" ✨
                    </p>
                </div>

                <div className="absolute bottom-0 flex w-full justify-center">
                    <div className="flex w-[80%] gap-4">
                        <Button
                            asChild
                            size={"lg"}
                            className="flex-grow rounded-xl"
                            variant={"primary"}
                        >
                            <Link to={"/login"}>Begin your Adventure</Link>
                        </Button>
                        <Button size={"icon"} variant={"outline"}>
                            {/* <PlaneIcon /> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 326667 333333"
                                shape-rendering="geometricPrecision"
                                text-rendering="geometricPrecision"
                                image-rendering="optimizeQuality"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                width={14}
                            >
                                <path
                                    d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
                                    fill="#4285f4"
                                />
                                <path
                                    d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
                                    fill="#34a853"
                                />
                                <path
                                    d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
                                    fill="#fbbc04"
                                />
                                <path
                                    d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
                                    fill="#ea4335"
                                />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </FrontPageLayout>
    );
};
