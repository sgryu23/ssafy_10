<template>
  <div>
    <h1>게시글 리스트</h1>
    <div>
      {{ postListValue }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { usePostStore } from '@/stores/posts'

const store = usePostStore()

onMounted(() => {
  store.getPostList()  
})

const postListValue = computed(() => {
  return store.postListValue
})
</script>

<style scoped>

</style>