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
    <div  class="w-full">
      <div v-if="sub?.subGroup?.length" >
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

import type {TArticleByGroupeId, TArticlesGroups, TArticleType, TClientsArticle, TMenu, TSub} from "~/utils/types";
import {subInitialValue} from "~/utils/_helpers";

definePageMeta({
  layout:'custom'
})

const i18n = useI18n();
const searchValue = ref('');
const sub = ref<TSub>(subInitialValue);
const articles = ref<TArticleType[]>([]);
const clientId = useCookie("clientId");
const subGroupActiveId = ref("");

const clientArticles:TClientsArticle = await useFetch('/api/getArticlesClient', {
  method:"POST",
  body:{ pClieID:clientId.value,pAvecPrix:true}
});
const data:TArticlesGroups  = await useLazyAsyncData(() => $fetch('/api/getArticlesGroups',{
  body: { locale:i18n.locale.value ,dedupe:'defer'},
}));
const menu = ref<TMenu[]>(data.data.value);
const handleChangeSearch = (e:InputEvent) => {
  const inputElement = e.target as HTMLInputElement;
  searchValue.value = inputElement.value;
}
const handleSearchClick = async () => {
  const data:{data:{value:TArticleType[]}} = await useFetch('/api/searchArticle', {
    method:"POST",
    body:{ pDesiArt:searchValue,pClieID: clientId.value, pAvecPrix: true }
  });
  articles.value = data.data.value.filter((elem)=>{
    return clientArticles.data.value?.map((item)=>item.NUM_ART).includes(elem?.NUM_ART)
  });
}
const handleGroupClick = (item:TSub) => {
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

const handleExactGroupClick = async (e:MouseEvent,groupId:string) => {
  e.stopPropagation();
  subGroupActiveId.value = groupId;
  const data:TArticleByGroupeId = await useFetch('/api/getArticleByGroupId', {
    method:"POST",
    body:{ pGrouID:groupId,pClieID: clientId, pAvecPrix: true}
  });
  articles.value = data.data.value?.filter((elem)=>{
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