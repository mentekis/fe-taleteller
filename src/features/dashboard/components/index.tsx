import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";

type TUser = {
    name: string;
    email: string;
};

const userAtom = atom<TUser | null>(null);

export const Dashboard = () => {
    // Atom
    const setUserAtom = useSetAtom(userAtom);

    // State
    // const [_user, setUser] = useState<TUser | null>(null);

    useEffect(() => {
        // const getUser = Cookies.get("user") as string;
        const getUser: string = JSON.stringify({
            name: "John Doe",
            email: "johndoe@me.com",
        });

        const parsedData = JSON.parse(getUser);

        // setUser(parsedData);

        setUserAtom(parsedData);
    }, [setUserAtom]);

    return (
        <main className="p-10">
            {/* Greeting & Initial action card */}
            <section>
                <div className="h-[150px] rounded border border-black"></div>
            </section>
        </main>
    );
};
