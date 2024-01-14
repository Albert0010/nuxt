<script setup lang="ts">
const clientId = useCookie('clientId');

</script>

<template>
    <HeaderView :title="'DRIVE-IN'"/>
    <div class="bg-white  p-4 absolute top-[81px] pl-[250px]  w-full">
      <span v-if="clientId === '000001'" class="text-black drive-in">DRIVE-IN</span>
      <span v-else class="text-black drive-in">Welcome</span>
    </div>
</template>

<style scoped>
.drive-in{
  color: #013980;
  font-family: Fjalla One,serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>