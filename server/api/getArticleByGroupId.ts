import {fetchArticleByGroupId} from "~/utils/_helpers";
export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        return await fetchArticleByGroupId(body);
    }catch (e) {
        return {e};
    }
})
