import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
// npm으로 설치하면 불러오는 곳에서 쓸 수 있다.

export const useCounterStore = defineStore('counter', () => {
  // const articles = ref([
    // 이건 출력 확인용 더미 데이터였다. -> 출력 확인 후에 axios로 django에서 불러옴
    // { id: 1, title: 'Article 1', content: 'Content of article 1' },
    // { id: 2, title: 'Article 2', content: 'Content of article 2' }
  // ])
  // return { articles }
  const articles = ref([])
  const API_URL = 'http://127.0.0.1:8000'
  
  // DRF에 article 조회 요청 보내는 코드
  const getArticles = function () {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/articles/`
    })
    .then(res => {
      // console.log(res) // 잘 뜨는지 확인용
      articles.value = res.data
    })
    .catch(err => console.log(err))
  }
  return { articles, API_URL, getArticles }
}, { persist: true })
