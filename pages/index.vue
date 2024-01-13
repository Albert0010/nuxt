<template>
  <HomeView/>
</template>
<script setup lang="ts">
import {useDefaultStore} from "~/stores/auth";

const store = useDefaultStore()
// onBeforeRouteLeave((to, from, next)=>{
//   // if(to.name === "login___de"){
//   //   if (!store.isLogin) {
//   //     next();
//   //   }
//   // }
//   next()
// })
onBeforeMount(()=>{
  store.handleHeaderMessageChangeToWelcome();
})
</script>
