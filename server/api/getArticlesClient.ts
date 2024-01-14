import { getArticlesClient} from "~/utils/_helpers";
import type {TGetArticlesClient} from "~/utils/types";
export default defineEventHandler(async (event) => {
    const body:TGetArticlesClient = await readBody(event);
    try {
        return await getArticlesClient(body);
    }catch (e) {

        return {e};
    }
})
