import type {IGetArticleByGroupId, TArticleType, TGetArticlesClient, TGetClients, TSearchArticle} from "~/utils/types";

export  const fetchArticlesAndGropes = async (url:string,body?:{pClieID:string;pAvecPrix?:boolean}) => {
    try {
        const rawGroups:TArticleType[] =  await $fetch(url, {
            method: 'GET',
            headers: {
                AuthorizationToken: 'c268d50e14fbcebcb8edc3998aaf6181f396d0b54d881c083782c2c1dd98bf7825c7977ab6015bdae685413236e15156f2369b799f7eaace55e3517681be7073',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(body),
        });
        let groups = [];
        for (let i = 0; i < rawGroups.length; i++) {

            if(rawGroups[i].NUM_GRO.endsWith("00")){

                const groupCode = rawGroups[i].NUM_GRO.slice(0,3);

                const group:{
                    subGroup:TArticleType[];
                    mainGroup:TArticleType;
                    isActive:boolean;
                } = {
                    mainGroup:rawGroups[i],
                    subGroup:[],
                    isActive:false,
                }

                for (let j = i + 1; j < rawGroups.length; j++) {
                    const subGroupCode = rawGroups[j].NUM_GRO.slice(0,3);
                    if(groupCode !== subGroupCode){
                        break
                    }
                    group.subGroup = [...group.subGroup,rawGroups[j]];
                }
                groups.push(group)
            }
        }
        return groups
    }catch (e) {
        if (e instanceof Error) {
            // Handle Error object (e.g., log the error message)
            return new Error(e.message);
        } else {
            // Handle any other types
            console.error('An unexpected error occurred', e);
        }
    }
};

export const fetchArticleByGroupId = async (body:IGetArticleByGroupId) => {

    try {
        return await $fetch(`https://ws.bheintz.lu/HeinWeb/api/ChercheArticles/FR`, {
            method: 'POST',
            headers: {
                AuthorizationToken: 'c268d50e14fbcebcb8edc3998aaf6181f396d0b54d881c083782c2c1dd98bf7825c7977ab6015bdae685413236e15156f2369b799f7eaace55e3517681be7073',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }catch (e) {
        if (e instanceof Error) {
            return new Error(e.message);
        } else {
            console.error('An unexpected error occurred', e);
        }
    }
}
export const testClient = async (body:TGetClients) => {
    try {
        return await $fetch(`https://ws.bheintz.lu/HeinWeb/api/TestClient/${body.locale.toUpperCase()}`, {
            method: 'POST',
            headers: {
                AuthorizationToken: 'c268d50e14fbcebcb8edc3998aaf6181f396d0b54d881c083782c2c1dd98bf7825c7977ab6015bdae685413236e15156f2369b799f7eaace55e3517681be7073',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }catch (e) {
        if (e instanceof Error) {
            // Handle Error object (e.g., log the error message)
            return new Error(e.message);
        } else {
            // Handle any other types
            console.error('An unexpected error occurred', e);
        }
    }
}
export const searchArticle = async (body:TSearchArticle) => {
    try {
        return await $fetch(`https://ws.bheintz.lu/HeinWeb/api/ChercheArticles/FR`, {
            method: 'POST',
            headers: {
                AuthorizationToken: 'c268d50e14fbcebcb8edc3998aaf6181f396d0b54d881c083782c2c1dd98bf7825c7977ab6015bdae685413236e15156f2369b799f7eaace55e3517681be7073',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }catch (e) {
        if (e instanceof Error) {
            // Handle Error object (e.g., log the error message)
            return new Error(e.message);
        } else {
            // Handle any other types
            console.error('An unexpected error occurred', e);
        }
    }
}
export const getArticlesClient = async (body:TGetArticlesClient) => {
    try {
        return await $fetch(`https://ws.bheintz.lu/HeinWeb/api/GetArticlesClient/FR`, {
            method: 'POST',
            headers: {
                AuthorizationToken: 'c268d50e14fbcebcb8edc3998aaf6181f396d0b54d881c083782c2c1dd98bf7825c7977ab6015bdae685413236e15156f2369b799f7eaace55e3517681be7073',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }catch (e) {
        if (e instanceof Error) {
            // Handle Error object (e.g., log the error message)
            return new Error(e.message);
        } else {
            // Handle any other types
            console.error('An unexpected error occurred', e);
        }
    }
}
export const imageBaseUrl = "http://ws.bheintz.lu:6015/images/WEB/";
export const subInitialValue = {
    subGroup:[],
    mainGroup:{
        NUM_GRO:"",
    },
    isActive:false
};