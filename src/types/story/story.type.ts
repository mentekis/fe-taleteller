export interface IStory {
    title: string;
    author: string;
    avatarUrl: string;
    image: string;
    description: string;
    stages: number;
    status: string;
    createdAt: Date;
}

export interface IStoryPremise {
    premise: string;
}

export interface IStoryPremiseEnhanced {
    isValid: boolean;
    suggestedPremise: string;
}

export interface IStoryData {
    _id: string;
    userId: string;
    title: string;
    description: string;
    premise: string;
    thumbnail: string;
    isFinish: boolean; // Change this to boolean if it's intended to be a true/false value
    maxStage: number;  // Change this to number if it's intended to be a numeric value
    context: string;
    createdAt: string; // You may want to consider using Date type if you're parsing it to a Date object
    updatedAt: string; // Same as above
}