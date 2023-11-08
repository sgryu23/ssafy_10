<template>
  <div
  v-for="child in myChild"
  :name="child.name"
  :age="child.age"
  >
    <h3>자식 페이지입니다.</h3>
    <p>이름 : {{ child.name }}</p>
    <p>나이 : {{ child.age }}</p>
  </div>
</template>

<script setup>
const children = defineProps({ myChild: Array })
</script>

<style scoped>

</style>