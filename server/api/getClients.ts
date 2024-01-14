import { defineEventHandler } from 'h3';
import { testClient} from "~/utils/_helpers";
import type {TGetClients} from "~/utils/types";
export default defineEventHandler(async (event) => {
    const body:TGetClients = await readBody(event);
    try {
        return await testClient(body);
    }catch (e) {
        return {e};
    }
})
