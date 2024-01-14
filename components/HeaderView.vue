<template>
  <header class="app-header relative">
    <div class="logo" @click="handleHeinzLogoClick">
      <img src="@/assets/LOGO%20Boissons%20Heintz.png" alt="heintz logo" />
    </div>
    <div class="header">
      <div class="header-right">
        <div class="header-right-button cursor-pointer" @click="handleIsBasketOpen">
          <span>Panier</span>
          <img class="header-right-button-icon" src="@/assets/Vector.svg" alt="basket icon" />
        </div>
        <div v-if="props.title === 'DRIVE-IN'" class="header-right-button account-button" @click="handleNavigateToLoginPage">
          <span v-if="props.title === 'DRIVE-IN'">Quitter drive-in</span>
          <span v-else>Quitter log-in</span>
          <img class="header-right-button-icon" src="@/assets/log-out.svg" alt="basket icon" />
        </div>
      </div>
    </div>
    <div class="lang absolute right-0">
      <NuxtLink :to="switchLocalePath('fr')" class="fr" :class="{ active: activeLocale === 1 }" @click="handleChangeLanguage('fr')">
        <span>FR</span>
      </NuxtLink>
      <NuxtLink :to="switchLocalePath('de')" key="de"  class="de" :class="{ active: activeLocale === 0 }" @click="handleChangeLanguage('de')">
        <span>DE</span>
      </NuxtLink>
    </div>
  </header>
</template>

<script setup>
// import "@/fonts/font.css";
import {useRouter} from "vue-router";
import {onMounted, ref } from "vue";
import {useDefaultStore} from "~/stores/auth";

const props = defineProps({
  title: String,
});
const router = useRouter();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const { locale } = useI18n();
const activeLocale = ref(1);

const handleChangeLanguage = (lang)  => {
  locale.value = lang;
  activeLocale.value = +(!(lang === 'de'));
}
const handleHeinzLogoClick = () => {
  navigateTo(`/${(locale.value)}`)
};
const handleNavigateToLoginPage = () => {
    router.push(localePath({name:'index'}));
};


onMounted(()=>{
  activeLocale.value = +(!(locale.value === 'de'))
})
</script>

<style scoped>
.app-header {
  background-color: #013980;
  color: #fff;
  padding: 16px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 4px solid #FF0000;
  position: fixed;
  width: 100%;
  z-index: 1000;
  font-family: Inter, serif;
  max-height: 136px;
}
.header {
  margin-left: 250px;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
}
.header-right {
  display: flex;
  justify-content: center;
  gap: 45px;
  background-color: #013980;

}
.header-right-button {
  border-radius: 15px;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
}
.account-button > span{
  background-color: #FF0000;
}
.card-button > span{
  background-color: #5D9CC9;
}
.card-button {
  background-color: #5D9CC9;
  color: white;
  cursor: pointer;
}
.account-button {
  background-color: #FF0000;
  color: white;
  cursor: pointer;
}
.card-button > img{
  background-color: #5D9CC9 !important;
}
.header-right-button-icon {
  max-width: 20px;
  max-height: 28px;
}
.logo {
  position: absolute;
  max-width: 217px;
  top: 16px;
  left: 40px;
  cursor: pointer;
  background-color: unset;
}
.logo > img{
  background-color: unset;
}
.lang {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #013980;
}
.lang > a {
  color: rgba(255, 255, 255, 0.33);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  width: 50px;
  text-decoration: unset;
  border-radius: 4px 0 0 4px;
}
.active{
  background-color: #002047;
  color: white !important;
}
.welcome {
  font-size: 96px;
  font-family: 'Inria Sans', sans-serif;
  //background-color: #013980;
}
.welcome > span{
  //background-color: #013980;
}
</style>
