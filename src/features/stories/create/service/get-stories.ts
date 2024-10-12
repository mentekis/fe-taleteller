import jsonFetcher from "@/lib/fetch";
import { IStoryData } from "@/types/story/story.type";

export interface IGetStories {
    start?: number;
    limit?: number;
    search?: string;
    userId?: string;
    orderBy?: string;
    filterUserStory?: boolean;
}

export async function getStories(params?: IGetStories) {
    // Prepare condition for filter User
    const userForFilter = params?.filterUserStory ? params.userId : "";

    // Default value
    const queryParam: IGetStories = {
        start: 0,
        limit: 8,
        search: "",
        userId: "",
        orderBy: "asc",
        filterUserStory: false,
        ...params
    }

    const res = await jsonFetcher(
        `/stories?start=${queryParam.start}&limit=${queryParam.limit}&search=${queryParam.search}&userId=${!params?.filterUserStory ? queryParam.userId : ""}&orderBy=${queryParam.orderBy}`
    );

    const originalResult = res.data as IStoryData[];

    if (queryParam.filterUserStory) {
        return originalResult.filter((story) => story.userId._id !== userForFilter);
    }

    return originalResult;
}

export async function getSingleStory(id: string) {
    const res = await jsonFetcher(`/stories/${id}`);

    return res.data as IStoryData;
}