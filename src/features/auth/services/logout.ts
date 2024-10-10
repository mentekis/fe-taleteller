import jsonFetcher from "@/lib/fetch"

export const handleLogOut = async () => {
    return await jsonFetcher("/auth/logout", {}, {
        method: "POST",
        credentials: 'include',
    });
}