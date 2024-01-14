<template>
  <div class="flex gap-2">
    <div class="flex justify-center items-center cursor-pointer" @click="incrementCount" >
      <img src="@/assets/add.svg" alt="add cross">
    </div>
    <div class="product-info-footer-counter">
      <span>{{ count }}</span>
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="decrementCount" >
      <img src="@/assets/sub.svg" alt="sub cross">
    </div>
  </div>
</template>

<script setup>
import {  defineProps, defineEmits } from 'vue';

const props = defineProps(['count']);
const emit = defineEmits(['update:count']);

const incrementCount = () => {
  const newCount = props.count + 1;
  emit('update:count', newCount);
};

const decrementCount = () => {
  if (props.count >= 2) {
    const newCount = props.count - 1;
    emit('update:count', newCount);
  }
};
</script>

<style scoped>
.product-info-footer-counter {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 161px;
  border-radius: 500px;
  border: 1px solid #D9D9D9;
}

.product-info-footer-counter > span {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Inter, serif;
  font-size: 30px;
  font-weight: 400;
  line-height: 36px;
  text-align: left;
}

.add-cross {
  border-radius: 15px;
  border: 1px solid #D9D9D9;
  padding: 16px 10px;
  cursor: pointer;
}

.sub-cross {
  border-radius: 15px;
  border: 1px solid #D9D9D9;
  padding: 16px 10px;
  cursor: pointer;
}
</style>
