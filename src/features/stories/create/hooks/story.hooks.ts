import { useMutation, useQuery } from "@tanstack/react-query";
import { getSingleStory, getStories, IGetStories } from "../service/get-stories";
import { userAtom } from "@/atom";
import { useAtomValue } from "jotai";


export const useStory = (cacheKey: string, params?: IGetStories) => {
    // User
    const user = useAtomValue(userAtom);

    // Prepare condition
    // Add filter user story condition
    if (params?.filterUserStory) {
        params.userId = user?._id as string;
    }

    // Fetch stories
    const { data: storyData, isLoading: storyLoading } = useQuery({
        queryKey: [cacheKey],
        queryFn: async () => getStories(params),
        refetchOnWindowFocus: false,
    });

    // Get single story
    const {
        data: singleStory,
        isPending: singleStoryLoading,
        mutate: fetchSingleStory,
    } = useMutation({
        mutationKey: ["card"],
        mutationFn: async (id: string) => getSingleStory(id),
    });


    return {
        storyData,
        storyLoading,
        singleStory,
        singleStoryLoading,
        fetchSingleStory
    }
}
