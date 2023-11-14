## vue_ws_8_3 순서
### [참고] 교차할 때 브라우저의 정책
  * CORS 정보를 쉽게 세팅해주는 package를 설치하고 세팅
  * 그러면 브라우저가 알아서 요청서버에 목록이 있으면 데이터를 전달해준다.

## 1번 요구 사항
  * DRF 프로젝트에서 post 전체 정보를 확인할 수 있는 경로와 view를 정의한다.
  * 의도: serializer가 필요하다. (url 설정과 return 설정)


  ### 1. posts > urls.py 설정
  * posts > urls.py에서 path가 향하는 views 부분의 함수를 설정해준다.
  ```python
  from django.urls import path
  from . import views

  urlpatterns = [
      path('posts/', views.posts)  # <- 이 부분!
  ]
  ```


  ### 2. views.py에서 함수를 만들러 가자!
  ```python
  # posts > urls.py

  def posts(request):
    pass
  ```

    * 여기서 posts 함수를 만들기 위해서는 serializers.py가 필요하다!
    * serializers.py 만들러 가자!
  

  ### 3. posts/ 에서 serializers.py 파일 만들어주기
    * 일일이 코드를 직접 쳐주면서 만들었다.

  ```python
  # posts/serializers.py

  from rest_framework import serializers
  from .models import Category, Post, Comment


  class PostListSerializer(serializers.ModelSerializer):
      class Meta:
          model = Post                          # 모든 Post의
          fields = ['pk', 'title', 'category']  # 'pk', 'title', 'category' 정보를 넘겨줘야 한다. (문제 조건에서)
  ```
    * serializers.py에서 넘겨줄 정보를 다 작성했으니 다시 views.py로 가서 posts() 함수를 만들어주자!

  ### 4. posts 함수 만들어주기(serializers 사용해서)
  ```python
  from django.shortcuts import render
  from rest_framework.decorators import api_view
  from rest_framework.response import Response  # serializer 전달해주려고 가져옴
  from .serializers import PostListSerializer   # posts 함수 만들기 전에 만든 serializer
  from .models import Post  # Post의 데이터를 serializer로 담아서 전달해주려고 가져옴


  @api_view(['GET'])    # 4. 그냥 하면 decorators가 없어서 인식을 못 한다. rest_framework decorator를 위에 들고와서 추가해주자(형식은 GET)
  def posts(request):
      if request.method == 'GET':   # 실습 3번 할 때는 굳이 필요 없는데 아래에 POST, UPDATE, DELETE 하기 위해서 구분용으로 작성해줌
          post_list = Post.objects.all()   # 1. Post 모델에 들어간 데이터를 전부 담아서 변수 post_list에 저장
          serializer = PostListSerializer(post_list, many=True)  # 2. 변수 post_list를 Serializer에 담아주기
          return Response(serializer.data)  # 3. serializer에 담은 걸 전달하기 위해서 Response에 담아줘야 한다. (위에서 from import 셋째줄)
  ```
  * 여기까지 하면 back은 세팅 완료

### 2번 요구 사항
  * 2번 요구 사항: PostListView 컴포넌트를 작성한다.
    * a. App.vue에서 router-link를 통해 이동할 수 있어야 한다.
    * b. Vue 프로젝트의 PostListView 컴포넌트가 mount 될 때 post 전체 정보를 axios 요청하도록 한다.

  * 의도: front를 작업해주세요
  * 순서: pinia에서 요청 작업을 수행 -> 요청은 actions가 수행
  * 주의할 것: MainView에서 axios가 잘 작동하는지 확인하고 pinia로 넘어 갈 것(MainView에서 axios 확인한 부분은 지우기)

  ### 5. MainView.vue
  ```javascript
  // script setup 부분에서 작업

  import axios from 'axios'

  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/v1/posts/'
  })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.log(err))
  ```
  
  * XHR에 문제가 있어요~ -> CORS 설정해줘야 하겠군!


  ### 6. CORS 설정하기(Django/settings.py)
    #### (1) django에 cors 설치하기
      * 다시 django로 돌아가서,
      * django cors 라고 쳐서 공식 문서 확인
      * $ pip install django-cors-headers

    #### (2) settings.py에 등록하기
  ```python
  # blog_api_service > settings.py

  INSTALLED_APPS = [
      ...,
      'corsheaders',
      ...,
  ]

  MIDDLEWARE = [
    # MIDDLEWARE 안에서 corsheaders는 위치 주의하기!
    # django.middleware.common.CommonMiddleware 위에 놔둬야 정상적으로 작동한다
      ...,
      'corsheaders.middleware.CorsMiddleware',
      'django.middleware.common.CommonMiddleware',
      ...,
  ]

  # settings.py 가장 아래에 CORS_ALLOWED_ORIGINS를 리스트 형태로 등록
  # 여기는 연결할 서버 링크를 넣는다.
  # 주의: 여기 서버 끝에 '/'가 있으면 서버 path 오류가 난다.
  CORS_ALLOWED_ORIGINS = [
      'http://localhost:5173'
  ]
  ```
      
  ### 7. Vue/src/stores/에서 응답 관리
    * 응답오는 걸 stores/에 넣어서 관리하자
    * 아까 만든 axios를 pinia에 넣어서 action으로 조작하자
    * stores/ 안에 posts.js를 만들어 주자

  ```javascript
  import { defineStore } from 'pinia'
  import { ref, computed } from 'vue'
  // axios 쓸 거니까 import(설치가 안 되어 있다면 $ npm i axios 하기)
  import axios from 'axios'

  export const usePostStore = defineStore('posts', () => {
    // 구역을 나눠서 관리하자: state, getters, actions
    // state 부분: postList라는 빈 배열을 만들어서 관리한다.
    const postList = ref([])

    // getters 부분: postList 안의 값을 계산하는 부분
    const postListVlaue = computed(() => {
      return postList.value
    })
    
    // actions 부분: axios 부분을 관리하는 것
    const getPostList = () => {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/v1/posts/'
      })
        .then(res => {
          // console.log(res.data)
          // 동적 변수는 리스트 안의 값을 수정해줘야 한다.(list.value로 접근)
          postList.value = res.data
        })
        .catch(err => console.log(err))
    }

    return {
      postListValue,
      getPostList,
    }
  })
  ```
    

  ### 8. PostList.vue 파일 생성(view 안에)
    * 기본 v-base-3-setup 설정
    * h2 태그 안에 '게시글 리스트' 써주기


  ### 9. src/router/index.js 파일 수정
  ```javascript
  // 위쪽에 링크 설정
  import PostListView from '@/views/PostListView.vue'

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      ...,
      // 이 부분 추가해주기 (왜 추가해주지?)
      {
        path: '/post',
        name: 'postList',
        component: PostListView
      }
    ]
  })

  export default router
  ```


  ### 10. App.vue로 가서 RouterLink 추가하기
  ```html
  <template>
    <div>
      <nav class="text-bg-dark p-3 text-center">
        <!-- Home으로 가는 routerlink는 생략 -->
        <RouterLink class="text-white text-decoration-none" :to="{ name: 'postList' }"> PostList </RouterLink>
      </nav>
    </div>

    <RouterView />
  </template>
  ```


  ### 11. views/PostListView.vue
    * script에 아래 코드 넣기( postList value를 보기 위함 )

  ```javascript
  import { onMounted, computed } from 'vue'
  import { usePostStore } from '@/stores/posts'

  const store = usePostStore()

  onMounted(() => {
    store.getPostList()    // 이 부분이 요구사항 2-b. 부분이다.
  })

  const postListValue = computed(() => {
    return store.postListValue
  })
  ```

  ### 데이터가 잘 들어가는지 확인
    * django-seed 형태로 데이터를 넣는다. (docs를 보면 나온다)
    * 여기 부분은 필기를 안 함

### rooms for improvement at here
  1. 5에서 CORS를 테스트 하기 위해서 axios 테스트 해주는 부분부터 이동하는 부분이 전부 이해가 안 됨 -> 어디서부터 손을 대야 할지 감조차 안 오네..