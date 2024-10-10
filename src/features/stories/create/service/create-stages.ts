import jsonFetcher from "@/lib/fetch";
import { IStageRequest } from "@/types/story/stage.type";

export async function handleCreateStage(data: IStageRequest) {

    const res = await jsonFetcher("/stages", data, {
        method: "POST",
    });

    const result = res.data;
    console.info(result)

    return result;
};