import {useDefaultStore} from '~/stores/auth'; // Import your store
export default defineNuxtRouteMiddleware((to, from) => {
    const localePath = useLocalePath();
    const token = useCookie('token');
    const isTokenExist = !!token?.value
    if(isTokenExist){
        if(to.name === from.name && to.name?.includes('index') ){
            return navigateTo(localePath({name:"articles"}));
        }
        if(to.name === from.name && to.name?.includes('login')){
            return navigateTo(localePath({name:"articles"}));
        }
        if(to.name?.includes('login') || to.name?.includes('index') ){
            return navigateTo(localePath({name:"articles"}));
        }

        if(!(to.name === from.name)){
            return ;
        }
    }else {
        if(to.name === from.name && to.name?.includes('index') ){
            return;
        }
        if(to.name === from.name && to.name?.includes('login')){
            return;
        }
        const clientId = useCookie("clientId");
        if(clientId.value === "000001" && to.name.includes('articles')){
            return;
        }
        if(to.name === from.name){
            return navigateTo(localePath({name:"index"}));
        }
    }
    // if(!!token?.value && to.name === from.name){
    //     return navigateTo(localePath({name:"articles"}));
    // }
    // if((to.name?.includes('login') || to.name?.includes('index')) && !!token?.value){
    //     return navigateTo(localePath({name:"articles"}));
    // }
    //
    // // if (token?.value && to.name?.includes('login')) {
    // //     return navigateTo(localePath({name:"index"}))
    // // }
    // if(to.name === from.name && !token?.value){
    //     return navigateTo(localePath({name:'index'}))
    // }
})
