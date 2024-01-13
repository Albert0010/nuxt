<template>
  <div>
    <NuxtLayout>
    </NuxtLayout>
    <main>
        <NuxtPage />
    </main>
  </div>
</template>
<script setup>
</script>

<style scoped>
main {
  height: calc(100vh - 156px);
  position: absolute;
  top: 156px;
  width: 100%;
}
</style>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>