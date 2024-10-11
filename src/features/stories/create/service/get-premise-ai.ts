import jsonFetcher from "@/lib/fetch";
import { IStoryPremise } from "@/types/story/story.type";

export async function getPremiseFromAI() {
    return (
        await jsonFetcher("/stories/premise", null, {
            method: "GET",
            credentials: "include",
        })
    ).premise as IStoryPremise;
}