import { searchArticle} from "~/utils/_helpers";
import type {TSearchArticle} from "~/utils/types";

export default defineEventHandler(async (event) => {
    const body:TSearchArticle = await readBody(event);
    try {
        return await searchArticle(body);
    }catch (e) {
        return {e};
    }
})
