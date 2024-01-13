import { getArticlesClient} from "~/utils/_helpers";
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    console.log({body})
    try {
        return await getArticlesClient(body);
    }catch (e) {

        return {e};
    }
})
