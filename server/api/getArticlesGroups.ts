import {fetchArticlesAndGropes} from "~/utils/_helpers";

export default defineEventHandler(async (event) => {
    // const response = await axios.get(
    //     "https://petstore.swagger.io/v2/pet/findByStatus?status=pending"
    // );
    // return response.data;
    // return {
    //     hello: 'world'
    // }


    const body = event.node.req.body
    try {
        return await fetchArticlesAndGropes(`https://ws.bheintz.lu/HeinWeb/api/GetGroupesArticle/${body.locale.toUpperCase()}`,{
            pClieID: "000001",
            pAvecPrix: true,
        });
    }catch (e) {
        return {e};
    }
})
