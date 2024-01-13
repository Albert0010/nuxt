<template>
  <div class="product">
    <div class="product-icon">
      <div>
        <img v-if="product.IMAGE.length" :src="`${imageBaseUrl}${product.IMAGE}`" alt="product icon">
        <img class="is-not-exist" v-else src="~/assets/is-not-exist.svg" alt="is not exist image">
      </div>
    </div>
    <div class="product-info">
      <span class="product-info-id">{{product?.NUM_ART}}</span>
      <div class="product-info-header">
        <span>{{product?.DESA_ART}}</span>
        <span>{{product?.PRIX?.PRIXTVAC}} €</span>
      </div>
      <div class="product-info-subheader">
        <span>Unité {{product.UNITE}} {{product.PACKAGING}}</span>
        <div>
          <span>Prix</span>
          <span class="drive-in">drive-in</span>
        </div>
      </div>
      <div class="product-info-footer">
        <CounterCalc @update:count="updateCount" :count="count" />
        <div class="add-to-basket" @click="addToBasket">
          <span>
            Add to Basket
          </span>
          <img src="@/assets/basket.svg" alt="add to basket">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import CounterCalc from "@/components/CounterCalc.vue";
import {imageBaseUrl} from "~/utils/_helpers.ts";

const count = ref(1);
const price = ref(600);

const updateCount = (newCount) => {
  count.value = newCount;
};

const addToBasket = () => {
  // Implement your logic to add to the basket here
};

const props = defineProps(['product']);

onMounted(() => {
  console.log('Product Icon:', props.product);
});
</script>

<style scoped>
.product {
  border-radius: 20px;
  border: 2px solid #D9D9D9;
  padding: 20px;
  display: flex;
  gap: 18px;
  max-width: 671px;
}
.product-icon > div {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dotted;
  border-radius: 10px;
  width: 153px;
  height: 153px;
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
.product-info-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-to-basket {
  cursor: pointer;
  width: 220px;
  border-radius: 15px;
  padding: 10px 16px;
  background-color: #5D9CC9;
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
