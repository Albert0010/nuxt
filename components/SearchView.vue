<template>
  <div class="search-wrapper">
    <div>
      <div class="search">
        <img src='@/assets/search.svg' alt="">
        <input type="text" v-model="inputValue" @input="handleChangeSearch" placeholder="Rechercher">
      </div>
      <div @click="handleSearchClick" class="search-button">
        <img  src="~/assets/search.svg" alt="search">
      </div>
<!--      <button @click="handleSearchClick">Search</button>-->
    </div>
  </div>
</template>

<script setup>
const { searchValue,handleChangeSearch } = defineProps({
  searchValue: String,
  handleChangeSearch:Function,
  handleSearchClick:Function
});
const inputValue = ref(searchValue)

</script>

<style scoped>
.search-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.search {
  border: 3px solid #D9D9D9;
  border-radius: 15px;
  width: 730px;
  height: 50px;
  position: relative;
}
.search > input {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  border: none;
  padding-left: 30px;
  font-size: 16px;
}
.search > img {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.search-wrapper > div {
  position: relative;
}
.search-button {
  position: absolute;
  right: 0;
  top: 0;
  background-color: #005099;
  border-radius: 15px;
  border: 3px solid #005099;
  color: white;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  height: 100%;
  font-size: 28px;
  padding: 8px 16px;
  cursor: pointer;
  line-height: 1px !important;
}
</style>
