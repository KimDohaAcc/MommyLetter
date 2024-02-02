export interface ConsultProps{
    name:string;
    intro:string;
    history:string[];
}

export interface DiaryReadResponseProps{
    category:string;
    content:string;
    diaryId:number;
    emoji:number;
    photoList:string[];
    createdDate:string;
    emoticon: {
        emotionList: string[];
        familyList: string[];
        healthList: string[];
        peopleList: string[];
        weatherList: string[];
    } | null
}