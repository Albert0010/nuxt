<template>
  <SearchView :handleSearchClick="handleSearchClick" :searchValue="searchValue" :handleChangeSearch="handleChangeSearch"/>
  <div class="main flex gap-16">
    <div class="sidebar">
      <div class="menu-title">
        <span>
          CATALOGUE
        </span>
      </div>
      <div  v-for="item in data" :key="item.NUM_GRO" @click="handleGroupeClick(item)">
        <div :class="{'li':isSubGropesVisible}" class="flex justify-between" @click="handleMainGroupeCLick">
          <span>{{ item.mainGroupe?.DESIFR }}</span>
          <img src="~/assets/eva_arrow-up-fill.svg" alt="arrow-up">
        </div>
        <div v-if="sub?.subGroupe?.length">
          <div class="pl-5 pt-2 pb-2" v-if="isSubGropesVisible" v-for="item in sub.subGroupe" :key="item.NUM_GRO" @click="handleExactGroupClick(item.NUM_GRO)">
            {{ item.DESIFR }}
          </div>
        </div>
        <!--        <img :src="item.IMAGE" alt="">-->
      </div>
    </div>
<!--    <div v-if="!sub?.subGroupe?.length" class="content">-->
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
      <div v-if="sub?.subGroupe?.length" >
        <div >
          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white">
            Résultats de la recherche
          </h1>
        </div>
<!--        <button class="accordion" @click="handleMainGroupeCLick">-->
<!--          {{sub.mainGroupe?.DESIFR}}-->
<!--        </button>-->
<!--        <div class="li" v-if="isSubGropesVisible" v-for="item in sub.subGroupe" :key="item.NUM_GRO" @click="handleExactGroupClick(item.NUM_GRO)">-->
<!--          {{ item.DESIFR }}-->
<!--        </div>-->
<!--        <div class="mt-5">-->
<!--          Pas d'articles trouvés-->
<!--        </div>-->
      </div>
      <div v-if="articles?.length" class="products mt-10">
        <div v-if="articles?.length" v-for="product in articles" :key="product.NUM_ART">
          <ProductCard :product="product"/>
        </div>
        <div v-else>
          Not Found
        </div>
      </div>
    </div>
  </div>

<!--  <h1>-->
<!--    <pre>-->
<!--      {{data}}-->
<!--    </pre>-->
<!--  </h1>-->
</template>
<script setup lang="ts">

definePageMeta({
  layout:'custom'
})
import {useDefaultStore} from "~/stores/auth";

const i18n = useI18n();
const searchValue = ref('')
const { data } = await useLazyAsyncData(() => $fetch('/api/getArticlesGroups',{
  body: { locale:i18n.locale.value ,dedupe:'defer'},
}));
console.log({data})
// onMounted(()=>{
//   data.value = data.value.map((elem)=>{
//     return {...elem,subGroupe:elem.subGroupe.filter((item)=>{
//       return item
//       })}
//   })
//
// })
const sub = ref({subGroupe:"",mainGroupe:""});
const articles = ref([]);
const isSubGropesVisible = ref(false);

const handleChangeSearch = (e) => {
  searchValue.value = e.target.value;
}
const handleSearchClick = async () => {
  const clientId = useCookie('clientId')
  const { data } = await useFetch('/api/searchArticle', {
    method:"POST",
    body:{ pDesiArt:searchValue,pClieID: clientId.value, pAvecPrix: true }
  });
  articles.value = data.value;
}
const handleMainGroupeCLick = () => {
  isSubGropesVisible.value = !isSubGropesVisible.value;
  articles.value = [];
}
const handleGroupeClick = (item) => {
  sub.value = item;
  articles.value = [];
}

const handleExactGroupClick = async (groupId) => {
  const clientId = useCookie("clientId");

  const { data, error } = await useFetch('/api/getArticleByGroupId', {
    method:"POST",
    body:{ pGrouID:groupId,pClieID: clientId, pAvecPrix: true}
  });
  const clientArticles = await useFetch('/api/getArticlesClient', {
        method:"POST",
        body:{ pClieID:clientId.value,pAvecPrix:true}
      });
  console.log({clientArticles})
  articles.value = data.value?.filter((elem)=>{
    return clientArticles.data.value?.map((item)=>item.NUM_ART).includes(elem?.NUM_ART)
  })
  isSubGropesVisible.value = false;
}

</script>

<style scoped>
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
  width: 33%;
  //background-color: rgb(232,232,232);
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.li{
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