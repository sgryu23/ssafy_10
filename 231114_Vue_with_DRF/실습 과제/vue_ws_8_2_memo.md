## vue_ws_8_2 순서

  ### 0. 개요 
    * 1번 코드 작업한 것을 가져오되 1번 과제에서는 drf를 조작했다면, 2번 실습에서는 프론트 작업
    * 각각 코드를 다른 visual studio code로 조작해주면 안 헷갈린다.
    * 왼쪽 explorer bar에서 파일이 많으면 복잡하다는 뜻

  ### 1. vue 설치(기본 세팅)

    $ npm create vue@latest
    
    * project 이름: blog-api-front-project
    * router, pinia 사용만 Yes 체크
    
    $ cd blog-api-front-project
    $ npm i
    $ npm i axios
    
    * axios도 바로 사용할 거니까 미리 설치해놓음
    * 사용하지 않을 파일과 폴더 삭제
      * components 폴더의 모든 컴포넌트
      * assets/ 폴더의 모든 파일
      * views/ 폴더의 모든 view 컴포넌트
      * stores/ 폴더의 모든 파일: 이건 직접 만들어 봐야 한다.
  
    * 코드 지워야 하는 것
      * App.vue에 작성된 components 관련 코드
      * main.js에 작성된 main.css import 부분
      * router/index.js에 작성된 경로 및 import 문


  ### 2. MainView 컴포넌트 작성
    
    * 위치: views/MainView.vue
    * v-base-3 setup 으로 기본 세팅 코드 설정해놓기
    * 일단은 h1 태그로 하나 작성해놓고 페이지 랜딩 잘 되는지만 확인
    * p 태그 안에 글씨도 써주자.


  ### 3. Navbar 작성

  ```html
  <template>
  <div>
    <nav class="text-bg-dark p-3 text-center">
      <RouterLink class="text-white text-decoration-none" :to="{ name: 'home' }"> Home </RouterLink>
    </nav>
  </div>

  <RouterView />
  </template>
  ```

    * nav 태그 안에 RouterLink 태그를 넣어준다.
    * bootstrap 을 불러와서 css를 꾸며줍시다!
  

  ### 4. bootstrap 불러오기
    
    * bootstrap 공식 페이지: https://getbootstrap.com/
    * include via CDN 부분에 가서 위 코드, 아래 코드를 각각
    * index.html 에서 head(link로 시작), body(src로 시작) 가장 아래에 넣어준다.
    * class로 스타일을 적용해주자(p-3는 위아래 패딩을 주는 것)
    * RouterLink에 적용한 코드 중 text-decoration-none은 라우터 링크에 기본적으로 적용된 파란색 글씨를 없애버리는 요소임
  
  ### 5. RouterLink를 연결하려면 router/index.js에서 주소를 세팅해줘야 한다!
    ```javascript
    // (1) view에서 라우트 할 페이지를 가져오고,
    import MainView from '@/views/MainView.vue'

    const router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes: [
        // (2) route 링크를 넣어 준다. (path와 name을 설정해주자)
        {
          path: '/',
          name: 'home',
          component: MainView
        }
      ]
    })

    export default router
    ```
  
  ### 6. 다시 MainView 컴포넌트로 가서 v-bind로 라우터 링크를 연결시켜줌

    * 이렇게 해야지 인식한다. (name: 'home' 부분을 말하는 것!)
  
  ```html
  <template>
  <div>
    <nav class="text-bg-dark p-3 text-center">
      <RouterLink class="text-white text-decoration-none" :to="{ name: 'home' }"> Home </RouterLink>
    </nav>
  </div>

  <RouterView />
  </template>
  ```


  ### 7. bootstrap으로 조작해주기(선택 사항)
    * bootstrap 문서를 많이 보세요!

    (1) navbar 조작해주기
      * text-bg-dark: 텍스트가 들어가는 부분의 배경을 검은색(은 아니고 부트스트랩의 어두운 계열 색깔)으로 설정
      * padding: p-3
      * 텍스트 가운데 정렬: text-center
    
    (2) RouterLink로 표현해주는 글자 조작
      * text-decoration-none: 기본적으로 routerlink가 연동된 글자는 파란색 계열의 색깔이 입혀져 있는데 이 기능을 쓰면 색깔 들어간 걸 없앨 수 있다.


### rooms for improvement at here
  1. 기본 설치 과정에서 axios 설치를 빼먹음(뒤에 가서 설치해줘도 상관 없음)
  2. 처음에 MainView.vue "컴포넌트"라고 해서 components 폴더 아래에 만들어주고 있었는데 그게 아니라 views/ 아래에 만들어줘야 했음(App.vue에서 router로 보낼 때 views/ 폴더의 링크로 보내니까)
  3. bootstrap을 안 써봐서 안 익숙한 게 많았다. 문서 많이 보고 적용해보려고 해야 할 듯