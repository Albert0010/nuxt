export type TArticleType = {NUM_ART:string;DESA_ART:string;IMAGE:string;NUM_GRO:string;DESIFR:string;};
export type TMenu = {
    mainGroup:TArticleType;
    isActive:boolean;
}
export type TClientsArticle = {
    data:{
        value:{
            NUM_ART:string;
        }[]
    }
}
export type TArticleByGroupeId = {
    data:{
        value:TArticleType[];
    }
}
export type TArticlesGroups = {
    data:{
        value:TMenu[]
    }
}
export type TSub = {
    subGroup:{
        NUM_GRO:string;
        isActive:boolean;
        DESIFR:string;
    }[];
    mainGroup:{
        NUM_GRO:string;
    };
    isActive:boolean
}
export interface IGetArticleByGroupId  { pGrouID:string;pClieID: string; pAvecPrix: boolean}
export type TGetArticlesClient = Pick<IGetArticleByGroupId, "pClieID" | "pAvecPrix">;
export type TGetClients = { pClieID: string, pPass: string,locale:string };
export type TSearchArticle = { pDesiArt:string,pClieID: string, pAvecPrix: boolean }