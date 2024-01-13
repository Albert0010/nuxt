<template>
  <header class="app-header">
    <div class="logo" @click="handleHeinzLogoClick">
      <img src="@/assets/LOGO%20Boissons%20Heintz.png" alt="heintz logo" />
    </div>
    <div class="header">
      <div class="lang">
        <NuxtLink :to="switchLocalePath('de')" key="de"  class="de" :class="{ active: activeLocale === 0 }" @click="handleChangeLanguage('de')">
          <img src="@/assets/de.png" alt="de" />
          <span>DE</span>
        </NuxtLink>
        <NuxtLink :to="switchLocalePath('fr')" class="fr" :class="{ active: activeLocale === 1 }" @click="handleChangeLanguage('fr')">
          <img src="@/assets/fr.png" alt="fr" />
          <span>FR</span>
        </NuxtLink>
      </div>
      <div class="welcome">
        <span>{{props.title}}</span>
      </div>
      <div class="header-right">
        <div class="header-right-button card-button" @click="handleIsBasketOpen">
          <span>Shopping cart</span>
          <img class="header-right-button-icon" src="@/assets/Vector.svg" alt="basket icon" />
        </div>
        <div class="header-right-button account-button" @click="handleNavigateToLoginPage">
          <span>Account</span>
          <img class="header-right-button-icon" src="@/assets/Vector.svg" alt="basket icon" />
        </div>
      </div>
    </div>
    <!--    {{$t('test')}}-->
  </header>
</template>

<script setup>
// import "@/fonts/font.css";
import {useRouter} from "vue-router";
import {onMounted, ref } from "vue";
import {useDefaultStore} from "~/stores/auth";

const props = defineProps({
  title: String, // Correctly define the title prop
});
// const props = defineProps(['handleIsBasketOpen','handleIsBasketClose','title'])
const router = useRouter();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const { locale } = useI18n();
const store = useDefaultStore()
const activeLocale = ref(1);

const handleChangeLanguage = (lang)  => {
  locale.value = lang;
  activeLocale.value = +(!(lang === 'de'));
}
const handleHeinzLogoClick = () => {
  navigateTo(`/${(locale.value)}`)
};
const handleNavigateToLoginPage = () => {
  if (!localStorage.getItem('isLogin')) {
    // props.handleIsBasketClose();
    router.push(localePath({name:'login'}));
  }
};


onMounted(()=>{
  activeLocale.value = +(!(locale.value === 'de'))
})
</script>

<style scoped>
.app-header {
  background-color: #002648;
  color: #fff;
  padding: 16px 40px;
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
  justify-content: space-between;
  align-items: center;
  //background-color: #002648;
}
.header-right {
  display: flex;
  justify-content: center;
  gap: 45px;
  background-color: #002648;

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
  background-color: #FF0000;
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
  background-color: #002648;
}
.lang > a {
  border-radius: 10px;
  color: black;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  text-decoration: unset;
}

.de {
  background-color: white;
}
.fr {
  background-color: white;
}
.active{
  background-color: #005099;
}
.active > span{
  background-color: #005099;

}
.welcome {
  font-size: 96px;
  font-family: 'Inria Sans', sans-serif;
  //background-color: #002648;
}
.welcome > span{
  //background-color: #002648;
}
</style>
