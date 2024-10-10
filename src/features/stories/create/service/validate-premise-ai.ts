import jsonFetcher from "@/lib/fetch";
import { IStoryPremise, IStoryPremiseEnhanced } from "@/types/story/story.type";

export async function validatePremise(data: IStoryPremise) {
    const result = await jsonFetcher("/stories/premise", data, {
        method: "POST",
    });

    return result as IStoryPremiseEnhanced;
}