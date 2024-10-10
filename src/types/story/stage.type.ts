export interface IStageRequest {
    storyId: string;
    stageNumber: number;
    userChoice: string;
}

export interface IStageData {
    _id: string;
    storyId: string;
    stageNumber: number;
    stageStory: string;
    place: string; // URL for image or media
    bgm: string; // URL for background music
    optionA: string;
    optionB: string;
    isEnd: boolean;
}