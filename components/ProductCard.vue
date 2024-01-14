<template>
  <div class="product flex gap-4 flex-col">
    <div class="product-icon">
      <div>
        <img v-if="product.IMAGE.length" :src="`${imageBaseUrl}${product.IMAGE}`" alt="product icon">
        <img class="is-not-exist" v-else src="~/assets/is-not-exist.svg" alt="is not exist image">
      </div>
    </div>
    <div class="product-info relative">
      <span class="product-info-id">{{product?.NUM_ART}}</span>
      <div class="product-info-header">
        <span>{{product?.DESA_ART}}</span>

      </div>
      <div class="product-info-subheader">
        <span>Unité {{product.UNITE}} {{product.PACKAGING}}</span>
      </div>
      <div class="flex justify-between flex-col mt-12 mb-10">
        <div class="flex w-full justify-between items-center">
          <CounterCalc @update:count="updateCount" :count="count" />
          <div>
            <span class="text-[28px] font-bold">{{product?.PRIX?.PRIXTVAC}} €</span>
            <div class="flex gap-1.5">
              <span class="drive-in">Prix</span>
              <span class="drive-in">drive-in</span>
            </div>
          </div>
        </div>

      </div>
      <div class="add-to-basket absolute bottom-[-50px]" @click="addToBasket">
        <img src="@/assets/basket.svg" alt="add to basket">
        <span>
            AJOUTER AU PANIER
          </span>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import CounterCalc from "@/components/CounterCalc.vue";
import {imageBaseUrl} from "~/utils/_helpers.ts";

const count = ref(1);

const updateCount = (newCount) => {
  count.value = newCount;
};

const addToBasket = () => {
  // Implement your logic to add to the basket here
};

const {product} = defineProps({
  product: Object,
});

</script>

<style scoped>
.product {
  border-radius: 20px;
  border: 2px solid #D9D9D9;
  padding: 20px;
  max-width: 420px;
  background-color: white;
  color:black;
}
.product-icon > div {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dotted black;
  border-radius: 10px;
  width: 100%;
  height: 300px;
}
.is-not-exist {
  max-width: 48px;
  max-height: 48px;
}
.product-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
}
.product-info-id {
  font-family: Inter, serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
}
.product-info-header {
  font-family: Inter, serif;
  font-size: 23px;
  font-weight: 700;
  line-height: 28px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.product-info-subheader {
  font-family: Inter, serif;
  font-size: 17px;
  font-weight: 400;
  line-height: 21px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product-info-subheader > div {
  display: flex;
  gap: 10px;
}
.drive-in {
  font-family: Inter, serif;
  font-size: 17px;
  font-weight: 700;
  line-height: 21px;
  text-align: left;
}

.add-to-basket {
  cursor: pointer;
  width: 100%;
  padding: 10px 16px;
  border-radius: 15px;
  background: #013980;
  color: white;
  font-family: Inter, serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
</style>
