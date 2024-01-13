import { searchArticle} from "~/utils/_helpers";

export default defineEventHandler(async (event) => {

    const body = await readBody(event);
    try {
        return await searchArticle(body);
    }catch (e) {
        return {e};
    }
})
