<template>
  <div class="product-info-footer-counter">
    <div @click="incrementCount" class="add-cross">
      <img src="@/assets/add-cross.svg" alt="add cross">
    </div>
    <span>{{ count }}</span>
    <div @click="decrementCount" class="sub-cross">
      <img src="@/assets/sub-cross.svg" alt="sub cross">
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
  position: relative;
  display: flex;
  justify-content: space-between;
  border-radius: 15px;
  border: 1px solid #D9D9D9;
  width: 161px;
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
  background-color: #5DC961;
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
