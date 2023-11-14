import axios from 'axios'
import { defineStore } from "pinia"
import { ref, computed } from 'vue'

export const usePostStore = defineStore('posts', () => {
  // state
  const postList = ref([])

  // getters
  const postListValue = computed(() => {
    return postList.value
  })

  // actions
  const getPostList = () => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/v1/posts/'
    })
      .then( res => {
        console.log(res.data)
        postList.value = res.data
      })
      .catch( err => {
        console.log(err)
      })
  }

  return {
    postListValue,
    getPostList,
  }
})