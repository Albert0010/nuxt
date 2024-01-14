<template>
  <SearchView :handleSearchClick="handleSearchClick" :searchValue="searchValue" :handleChangeSearch="handleChangeSearch"/>
  <div class="main flex gap-16">
    <div class="sidebar">
      <div class="menu-title">
        <span>
          CATALOGUE
        </span>
      </div>
      <div  v-for="item in menu" :key="item.mainGroup.NUM_GRO" @click="handleGroupClick(item)">
        <div :class="{'li':!item.isActive,'li-active':item.isActive}" class="flex justify-between cursor-pointer" >
          <span class="text-black w-[max-content]">{{ item.mainGroup?.DESIFR }}</span>
          <ClientOnly>
            <img v-if="!item.isActive" src="~/assets/eva_arrow-up-fill.svg" alt="arrow-up">
            <img v-else src="~/assets/arrow-down.svg" alt="arrow down">
          </ClientOnly>
        </div>
        <div v-if="sub?.subGroup?.length">
          <div  class="ml-10 mt-2 mb-2 cursor-pointer rounded-[15px]" v-if="item.isActive" v-for="item in sub.subGroup" :class="{'active-sub-group':subGroupActiveId === item.NUM_GRO}" :key="item.NUM_GRO" @click="(e)=>handleExactGroupClick(e,item.NUM_GRO)">
            <div class="pl-10 pt-2 pb-2">
              <span class="subgroup-color">{{ item.DESIFR }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    <div v-if="!sub?.subGroup?.length" class="content">-->
<!--      <div class="content-inner">-->
<!--        <div class="content-inner-header">-->
<!--          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Votre liste de commande</h1>-->
<!--          <strong>-->
<!--            Votre commande doit nous parvenir impérativement la veille de votre jour de livraison avant 14h00. La commande pour le lundi doit être effectuée jusqu'au plus tard vendredi 12h00.-->
<!--          </strong>-->
<!--        </div>-->
<!--        <div class="content-inner-content">-->
<!--          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">-->
<!--            Nos promotions-->
<!--          </h1>-->
<!--          <p>-->
<!--            Nous vous invitons à consulter nos promotions en téléchargeant nos folders. Nos prix s'entendent hors TVA, sauf erreurs impression; suivant disponibilité du fournisseur et jusqu'a épuisements de stocks.-->
<!--          </p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div  class="w-full">
      <div v-if="sub?.subGroup?.length" >
<!--        <div >-->
<!--          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white">-->
<!--            Résultats de la recherche-->
<!--          </h1>-->
<!--        </div>-->
<!--        <button class="accordion" @click="handleMainGroupCLick">-->
<!--          {{sub.mainGroup?.DESIFR}}-->
<!--        </button>-->
<!--        <div class="li" v-if="isSubGropesVisible" v-for="item in sub.subGroup" :key="item.NUM_GRO" @click="handleExactGroupClick(item.NUM_GRO)">-->
<!--          {{ item.DESIFR }}-->
<!--        </div>-->
<!--        <div class="mt-5">-->
<!--          Pas d'articles trouvés-->
<!--        </div>-->
      </div>
      <div v-if="articles?.length" class="mt-10 grid grid-cols-1 2xl:grid-cols-2 gap-20">
        <div v-if="articles?.length" v-for="product in articles" :key="product.NUM_ART">
          <ProductCard :product="product"/>
        </div>
        <div v-else>
          Not Found
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import type {TArticleType} from "~/utils/types";

definePageMeta({
  layout:'custom'
})

const i18n = useI18n();
const searchValue = ref('')
const { data } = await useLazyAsyncData(() => $fetch('/api/getArticlesGroups',{
  body: { locale:i18n.locale.value ,dedupe:'defer'},
}));
const menu = ref(data);
console.log({menu})
const sub = ref({subGroup:"",mainGroup:"",isActive:false});
const articles = ref<TArticleType[]>([]);

const handleChangeSearch = (e:InputEvent) => {
  const inputElement = e.target as HTMLInputElement;
  searchValue.value = inputElement.value;
}
const handleSearchClick = async () => {
  const clientId = useCookie('clientId')
  const data:{data:{value:TArticleType[]}} = await useFetch('/api/searchArticle', {
    method:"POST",
    body:{ pDesiArt:searchValue,pClieID: clientId.value, pAvecPrix: true }
  });
  articles.value = data.data.value;
}
// const handleMainGroupCLick = () => {
//   articles.value = [];
// }
const handleGroupClick = (item:{mainGroup:{NUM_GRO:string;}}) => {
  menu.value = menu.value.map((elem)=>{
    if(elem.isActive){
      return {...elem,isActive:false}
    }
    if(elem.mainGroup.NUM_GRO === item.mainGroup.NUM_GRO){
      return {...elem,isActive:!elem.isActive};
    }
    return {...elem}
  })
  sub.value = item;
}
const subGroupActiveId = ref("");
const handleExactGroupClick = async (e:MouseEvent,groupId:string) => {
  e.stopPropagation();
  subGroupActiveId.value = groupId;
  const clientId = useCookie("clientId");

  const { data } = await useFetch('/api/getArticleByGroupId', {
    method:"POST",
    body:{ pGrouID:groupId,pClieID: clientId, pAvecPrix: true}
  });
  const clientArticles = await useFetch('/api/getArticlesClient', {
        method:"POST",
        body:{ pClieID:clientId.value,pAvecPrix:true}
      });

  articles.value = data.value?.filter((elem)=>{
    return clientArticles.data.value?.map((item)=>item.NUM_ART).includes(elem?.NUM_ART)
  })
}

</script>

<style scoped>
.active-sub-group{
  background-color: #E8E8E8;
}
.subgroup-color{
  color: #747474;
}
.menu-title{
  border-radius: 15px;
  background: #EF3E33;
  height: 45px;
  padding: 8px;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
}
.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.accordion {
  background-color: #2A4A8D;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

.content-inner-content{
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  gap: 24px;
}
.content-inner-header{
  display: flex;
  flex-direction: column;
  gap: 25px;
}
.content-inner{
  display: flex;
  flex-direction: column;
}
.content{
  width: 67%;
}
.sidebar{
  border-radius: 4px;
  //box-shadow: 0 0 10px rgba(0,0,0,.1);
  width: 40%;
  //background-color: rgb(232,232,232);
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.li{
  color: #000;
  text-align: left;
  font-family: Fjalla One,serif;
  font-size: 16px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 700;
}
.li-active{
  color: #000;
  text-align: left;
  font-family: Fjalla One,serif;
  font-size: 16px;
  padding: 8px 16px;
  border-bottom: 1px solid white;
  cursor: pointer;
  border-radius: 15px;
  background: #E8E8E8;
  font-weight: 700;
}

.main{
  padding: 25px 50px;
  background-color: #F6F6F6;
  margin-top:16px;
}
</style>