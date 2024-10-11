import jsonFetcher from "@/lib/fetch";
import { IStoryData, IStoryPremise } from "@/types/story/story.type";

export async function sendPremise(data: IStoryPremise) {

    const res = await jsonFetcher("/stories", data, {
        method: "POST",
    });

    const result = res.data as IStoryData;

    return result;
};