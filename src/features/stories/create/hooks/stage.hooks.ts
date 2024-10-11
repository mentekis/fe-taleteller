import { useMutation } from '@tanstack/react-query'
import { handleCreateStage } from '../service/create-stages'
import { IStageRequest } from '@/types/story/stage.type'

export const useNewStages = () => {
    const newStageMutation = useMutation({
        mutationKey: ["newStage"],
        mutationFn: (data: IStageRequest) => handleCreateStage(data)
    })

    return newStageMutation;
}
