import { getArticlesClient} from "~/utils/_helpers";
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    try {
        return await getArticlesClient(body);
    }catch (e) {

        return {e};
    }
})
