import { defineEventHandler } from 'h3';
import { testClient} from "~/utils/_helpers";
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    try {
        return await testClient(body);
    }catch (e) {
        return {e};
    }
})
