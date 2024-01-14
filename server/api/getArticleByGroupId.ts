import {fetchArticleByGroupId} from "~/utils/_helpers";
import type {IGetArticleByGroupId} from "~/utils/types";
export default defineEventHandler(async (event) => {
    const body:IGetArticleByGroupId = await readBody(event);

    try {
        return await fetchArticleByGroupId(body);
    }catch (e) {
        return {e};
    }
})
