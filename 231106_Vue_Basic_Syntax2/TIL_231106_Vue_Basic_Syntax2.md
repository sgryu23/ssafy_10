### 231106(Mon) Basic Syntax 2
# 1. Computed Property
## Computed란
### [computed()]
  * 계산된 속성을 정의하는 함수
  * 미리 계산된 속성을 사용하여 템플릿에서 표현식을 단순하게 하고 불필요한 반복 연산을 줄임

### [computed 기본 예시]
  * 할 일이 남았는지 여부에 따라 다른 메시지를 출력하기
  ```html
  <div id="app">
    <h2>남은 할 일</h2>
    <p>{{ todos.length > 0 ? '아직 남았다' : '퇴근!' }}</p>
  </div>

  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const { createApp, ref } = Vue

    const app = createApp({
      setup() {
        const todos = ref([
          { text: 'Vue 실습' },
          { text: '자격증 공부' },
          { text: 'TIL 작성' }
        ])
      }
    })
  ```
  * 위와 같이 코드를 쓰면 템플릿이 복잡해지며 todos에 따라 계산을 수행하게 됨
  * 만약 이 계산을 템플릿에 여러 번 사용하면 반복 발생 -> 코드가 지저분해진다.

### [computed 적용]
  * 반응성 데이터를 포함하는 복잡한 로직의 경우 computed를 활용하여 미리 값을 계산
  ```html
  <div id="app">
    <h2>남은 할 일</h2>
    <p>{{ restOfTodos }}</p>
  </div>

  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const { createApp, ref, computed } = Vue   // computed 추가됨!

    const app = createApp({
      setup() {
        const todos = ref([
          { text: 'Vue 실습' },
          { text: '자격증 공부' },
          { text: 'TIL 작성' }
        ])
      }
    })

    const restOfTodos = computed(() => {
      return todos.value.length > 0 ? '아직 남았다' : '퇴근!'
    })
    
    return {
      restOfTodos
    }
  ```

### [computed 특징]
  * 반환되는 값은 computed ref이며 일반 refs와 유사하게 계산된 결과를 .value로 참조할 수 있음 (템플릿에서는 .value 생략 가능)
  * computed 속성은 의존된 반응형 데이터를 <span style='color:orange'><strong>자동으로 추적</strong></span>
  * 의존하는 데이터가 변경될 때만 재평가
    * restOfTodos의 계산은 todos 에 의존하고 있음
    * 따라서 <span style='color:orange'><strong></storng>todos가 변경될 떄만 restOfTodos가 업데이트</strong></span> 됨
  ```html
  <script>
    const restOfTodos = computed(() => {
      return todos.value.length > 0 ? '아직 남았다' : '퇴근!'
    })
  </script>
  ```

## Computed vs. Methods
### [computed와 동일한 로직을 처리할 수 있는 method]
  * computed 속성 대신 <span style='color:orange'>method로도 동일한 기능</span>을 정의할 수 있음
  * 두 가지 접근 방식은 실제로 완전히 동일
  ```html
  <div id="app">
    <h2>남은 할 일</h2>
    <p>{{ getRestOfTodos() }}</p>   <!-- 메서드라서 ()가 필요함!! -->
  </div>

  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const { createApp, ref, computed } = Vue

    const app = createApp({
      setup() {
        const todos = ref([
          { text: 'Vue 실습' },
          { text: '자격증 공부' },
          { text: 'TIL 작성' }
        ])

    const getRestOfTodos = function () {
      return todos.value.length > 0 ? '아직 남았다' : '퇴근!'
    }

        return {
          getRestOfTodos
        }
      }
    })

    app.mount('#app')
  </script>
  ```

### [computed와 method의 차이]
  <span style='color:red'><strong>이 부분은 중요합니다!</strong></span>
  * computed 속성은 <span style='color:orange'>의존된 반응형 데이터를 기반으로 캐시(cached) 된다.</span>
  * 의존하는 데이터가 변경된 경우에만 재평가됨
  * 즉 의존된 반응형 데이터가 변경되지 않는 한 이미 계산한 결과에 대해 여러 참조는 다시 참조할 필요 없이 이전에 계산된 결과를 즉시 반환
  * 반면 method 호출은 다시 렌더링이 발생할 때마다 항상 함수를 실행

### [cached (캐시)]
  * 데이터나 결과를 일시적으로 저장해두는 장소
  * 이후에 같은 데이터나 결과를 다시 계산하지 않고 빠르게 접근할 수 있도록 함

### [computed와 method의 적절한 사용처]
  * <span style='color:skyblue'><strong>computed</strong></span>
    * 의존하는 데이터에 따라 결과가 바뀌는 계산된 속성을 만들 때 유용
    * 동일한 의존성을 가진 여러 곳에서 사용할 때 계산 결과를 캐싱하여 중복 계산 방지

  * <span style='color:skyblue'><strong>method</strong></span>
    * 단순히 특정 동작을 수행하는 함수를 정의할 때 사용
    * 데이터에 의존하는지 여부에 관계없이 항상 동일한 결과를 반환하는 함수

### [method와 computed 정리]
  * <span style='color:skyblue'><strong>computed</strong></span>
    * 의존된 데이터가 변경되면 자동으로 업데이트

  * <span style='color:skyblue'><strong>method</strong></span>
    * 호출해야만 실행됨

  * 무조건 computed만 사용하는 것이 아니라 사용 목적과 상황에 맞게 computed와 method를 적절히 조합하여 사용

# 2. Conditional Rendering
## v-if
### [v-if]
  * 표현식 값의 T/F를 기반으로 요소를 조건부로 렌더링

### [v-if 예시]
  * 'v-else' directive를 사용하여 v-if에 대한 else 블록을 나타낼 수 있음
  ```html
  <div id="app">
    <!-- if else -->
    <p v-if="isSeen">true일때 보여요</p>    <!-- 이 부분에 v-if를 써서 블록을 나타내기-->
    <p v-else>false일때 보여요</p> <!-- 이 부분에 v-else를 써서 블록을 나타내기-->
    <button @click="isSeen= !isSeen">토글</button>  <!--버튼을 누르면 isSeen의 값이 true <-> false로 바뀜-->
  </div>

  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const { createApp, ref } = Vue
    
    const isSeen = ref(true)   // 이걸 만들어 주고

    const app = createApp({
      setup() {
        return {
          isSeen
        }
      }
    })

    app.mount('#app')
  </script>
  ```

### [v-if 예시]
  * 'v-else-if' directive를 사용하여 v-if에 대한 else if 블록을 나타낼 수 있음
  ```html
  <!--아래 부분 script 부분에 name 선언-->
  <script>
    const name = ref('Cathy')
  </script>

  <!--위로 와서 div 태그에 출력-->
  <!-- else if -->
    <div v-if="name === 'Alice'">Alice입니다</div>
    <div v-if="name === 'Bella'">Bella입니다</div>
    <div v-if="name === 'Cathy'">Cathy입니다</div>
    <div v-else>아무도 아닙니다.</div>
  <!-- 출력은 'Cathy입니다'만 보인다-->
  ```

### [여러 요소에 대한 v-if 적용: template 활용하기]
  * v-if는 directive이기 때문에 <span style='color:orange'><strong>단일 요소</strong></span>에만 연결 가능
  * 이 경우 template 요소에 v-if를 사용하여 하나 이상의 요소에 대해 적용할 수 있음(v-else, v-else-if 모두 적용 가능)
  ```html
  <!-- v-if on <template> -->
    <template v-if="name==='Cathy'">
      <div>Cathy입니다</div>
      <div>나이는 30살입니다</div>
    </template>
  <!-- 실제 출력 -->
  <!--<div>Cathy입니다</div>-->
  <!--<div>나이는 30살입니다</div>-->
  ```

### [HTML `<template>` element]
  * 페이지가 로드될 때 렌더링 되지 않지만 JavaScrip를 사용하여 나중에 문서에서 사용할 수 있도록 하는 HTML을 보유하기 위한 메커니즘
  * <span style='color:orange'>보이지 않는 wrapper 역할</span>

## v-if vs. v-show
### [v-show]
  * 표현식 값의 T/F를 기반으로 요소의 가시성(visibility)을 전환
  * 쉽게 말하면 보였다 안 보였다를 조정할 수 있는 메서드
  * html로는 그려주는데 css 속성(display)을 조작해서 보여줬다 감췄다 함

### [v-show 예시]
  * v-show 요소는 항상 렌더링 되어 DOM에 남아있음
  * CSS display 속성만 전환하기 때문
  ```html
  <div v-show="isShow">v-show</div>
  <script>
    const isShow = ref(false)

    const app = createApp({
      setup() {
        return {
          isShow
        }
      }
    })
  </script>
  ```
  * isShow의 값이 false 인 경우 안 보이고, isShow의 속성값이 true면 보인다.

### [v-if vs. v-show (차이점)]
  * v-if (Cheap initial load, expensive toggle)
    * 초기 조건이 false인 경우 아무 작업도 수행하지 않음
    * 토글 비용이 높음: 작성 / 삭제에 드는 시간과 자원이 있다보니 토글 비용이 높다고 함
    * html 상에서 출력 여부를 조작한다. (추가했다가 삭제했다가 하는 형태로)
  * v-show (Expensive initial load, cheap toggle)
    * 초기 조건에 관계 없이 항상 렌더링
    * css를 이용해서 보여줬다가 안 보여줬다가 할 수 있음(display 속성으로 렌더링 여부를 조정)
    * 초기 렌더링 비용이 더 높음: 처음에 무조건 그려야 함(토글은 선택해서 그릴 수 있는 것에 비해서)
  * 무언가를 매우 자주 전환해야 하는 경우에는 v-show를, 실행 중에 조건이 변경되지 않는 경우에는 v-if 를 권장

# 3. List Rendering
## v-for
### [v-for]
  * 소스 데이터를 기반으로 요소 또는 템플릿 블록을 여러 번 렌더링

### [v-for 구조]
  * v-for는 alias in expression 형식의 특수 구문을 사용하여 반복되는 현재 요소에 대한 별칭(alias)을 제공
  ```html
  <div v-for="item in items">
    {{ item.text }}
  </div>
  ```
  * 인덱스(객체에서는 키)에 대한 별칭을 지정할 수 있음
  ```html
  <div v-for="(item, index) in items"></div>

  <div v-for="value in object"></div>
  <div v-for="(value, key) in object"></div>
  <div v-for="(value, key, index) in object"></div>
  <!-- 이런 식으로 여러 요소가 오면 ()로 묶어준다.-->
  ```

### [v-for 예시 1: 배열 반복]
  ```html
  <div v-for="(item, index) in myArr">
    {{ index }} / {{ item }}
  </div>
  <!-- 결과: 인덱스 값이 먼저 나오고 /(슬래시) 뒤에 객체가 나옴 -->
  <!-- 0 / { "name": "Alice", "age": 20 } -->
  <!-- 1 / { "name": "Bella", "age": 21 } -->
  <script>
    const myArr = ref([
          { name: 'Alice', age: 20 },
          { name: 'Bella', age: 21 }
        ])
  </script>
  ```

### [v-for 예시 2: 객체 반복]
  ```html
  <div v-for="(value, key, index) in myObj">
    {{ index }} / {{ key }} / {{ value }}
  </div>
  <!-- 결과: value, key, index에 해당하는 값이 알아서 찾아 들어가는 구조네 -->
  <!-- 0 / name / Cathy -->
  <!-- 1 / age / 30 -->
  <script>
    const myObj = ref({
          name: 'Cathy',
          age: 30
        })
  </script>
  ```

### 여러 요소에 대한 v-for 적용
  * template 요소에 v-for를 사용하여 하나 이상의 요소에 대해 반복 렌더링 할 수 있음
  ```html
  <ul>
    <template v-for="item in myArr">
      <li>{{ item.name }}</li>
      <li>{{ item.age }}</li>
      <hr>
    </template>
  </ul>
  ```

### [중첩된 v-for]
  * 각 v-for 범위는 상위 범위에 접근할 수 있음
  ```html
  <script>
    const myInfo = ref([
      { name: 'Alice', age: 20, friends: ['Bella', 'Cathy', 'Dan'] },
      { name: 'Bella', age: 21, friends: ['Alice', 'Cathy'] }
    ])
  </script>
  <!-- 아래에서 script 조정하고 위로 가서 html 요소 수정-->
  <ul v-for="item in myInfo">
    <li v-for="friend in item.friends">
      {{ item.name }} - {{ friend }}
    </li>
  </ul>
  ```

## v-for with key
### [반드시 v-for와 key를 함께 사용한다]
  * 내부 컴포넌트의 상태를 일관되게 유지
  * 데이터의 예측 가능한 행동을 유지(Vue 내부 동작 관련)

### [v-for와 key]
  * key는 반드시 각 요소에 대한 고유한 값을 나타낼 수 있는 식별자여야 함
  ```html
  <script>
    let id = 0

    const items = ref([
      { id: id++, name: 'Alice' },
      { id: id++, name: 'Bella' },
    ])
  </script>
  <!-- 아래에서 script 요소 만들고 -->
  <!-- html 요소를 수정하러 위로 간다.-->
  <!-- v-for와 key를 항상 함께 쓴다는 것을 기억하자! -->
  <div v-for="item in items" :key="item.id">
    <!-- content -->
  </div>
  ```

## v=for with v-if
### [동일 요소에 v-for와 v-if를 함께 사용하지 않는다]
  * 동일한 요소에서 v-if가 v-for보다 우선순위가 더 높기 때문
  * v-if 조건은 v-for 범위의 변수에 접근할 수 없음

### [v-for와 v-if 문제 상황 1]
  * todo 데이터 중 이미 처리한(isComplete === true) todo만 출력하기
  ```html
  <script>
    let id = 0

    const todos = ref([
      { id: id++, name: '복습', isComplete: true },
      { id: id++, name: '예습', isComplete: false },
      { id: id++, name: '저녁식사', isComplete: true },
      { id: id++, name: '노래방', isComplete: false }
    ])
  </script>
  <!-- 아래에서 script 정리하고 위로 올라가서 html 부분 수정-->
  <ul>
    <li v-for="todo in todos" v-if="!todo.isComplete" :key=""todo.id>
      {{ todo.name }}
    </li>
  </ul>
  ```

### [v-for와 v-if 해결법 1]
  * <span style='color:red'><strong>computed를 활용해 필터링 된 목록을 반환하여 반복</strong></span>하도록 설정
  ```html
  <script>
    const completeTodos = computed(() => {
      return todos.value.filter((todo) => !todo.isComplete)
    })
  </script>
  <!-- computed 활용해서 v-for, v-if 중복 활용 해결법 첫 번째 방법 -->
  <!-- 미리 필터링 해둔 배열의 값을 받아 오겠다.-->
  <ul>
    <li v-for="todo in completeTodos" :key="todo.id">
      {{ todo.name }}
    </li>
  </ul>
  ```

### [v-for와 v-if 문제 상황 2]
  * v-if가 더 높은 우선순위를 가지므로 v-for의 todo 요소를 v-if에서 사용할 수 없음
  ```html
  <ul>
    <li v-for="todo in todos" v-if="!todo.isComplete" :key="todo.id">
      {{ todo.name }}
    </li>
  </ul>
  ```
  * 이 코드를 실행하면 <span style='color:red'>Uncaught TypeError</span> 발생!

### [v-for와 v-if 해결법]
  * v-for와 template 요소를 사용하여 v-if를 이동
  ```html
  <ul>
    <template v-for="todo in todos" :key="todo.id">
      <li v-if="!todo.isComplete">
        {{ todo.name }}
      </li>
    </template>
  </ul>
  ```

# 4. Watchers (감시자)
### watch()
  * 반응형 데이터를 감시하고
  * 감시하는 데이터가 변경되면 콜백 함수를 호출
  * 앞에서 배운 computed랑 구조가 유사하다

### watch 구조
  ```html
  <script>
    watch(variable,(newValue, oldValue) => {
      // do something
    })
  </script>
  ```
  * variable
    * 감시하는 변수
  * newValue
    * 감시하는 변수가 변화된 값
    * 콜백 함수의 첫 번째 인자
  * oldValue
    * 콜백 함수의 두 번째 인자

### [watch 예시 1]
  1. 감시하는 변수에 변화가 생겼을 때 기본 동작 확인하기
  ```html
  <!-- 1 watch 붙여보기 -->
  <button @click="count++">Add 1</button>
  <p>Count: {{ count }}</p>
  <script>
    const count = ref(0)

    const countWatch = watch(count, (newValue, oldValue) => {
        console.log(`newValue: ${newValue}, old Value: ${oldValue}`)
      })
      // watch는 return에 담지도 않았는데 값을 콘솔에 반환해준다.
      // watch는 tmplate에서 쓰이지 않으므로 반환해주지 않는다.
      // console 출력
      // newValue: 1, oldValue: 0
      // newValue: 2, oldValue: 1
      // newValue: 3, oldValue: 2
  </script>
  ```

### [watch 예시 2]
  2. 감시하는 변수에 변화가 생겼을 때 연관 데이터 업데이트하기
  * 이 부분은 실습 파일 6번 가서 직접 쳐봐야지 이해가 됨(입력된 값의 길이에 따라 시시각각 값이 변화됨)
  ```html
  <input v-model="message">
  <p>Message length: {{ messageLength }}</p>
  <script>
    const message = ref('')
    const messageLength = ref(0)

    const messageWatch = watch(message, (newValue, oldValue) => {
      messageLength.value = newValue.length
    })
  </script>
  ```

### Computed 와 Watchers
  <span style='color:red'>비교하는 것 중요!!(잘 정리해두자~)</span>
  |          |     Computed             |          Watchers     |
  |----------|--------------------------|-----------------------|
  |  공통점  |  데이터의 변화를 감지하고 처리 | 데이터의 변화를 감지하고 처리 |
  |   동작   | 의존하는 데이터 속성의 계산된 값을 반환 |특정 데이터 속성의 변화를 감시하고 작업을 수행 |
  | 사용 목적 | 템플릿 내에서 사용되는 데이터 연산용 | 데이터 변경에 따른 특정 작업 처리용 |
  | 사용 예시 | 연산 된 길이, 필터링 된 목록 계산 등 | 비동기 API 요청, 연관 데이터 업데이트 등 |

<span style='color:red'><strong>computed, watch 모두 원본을 read만 한다. (원본 데이터를 변경하지 않는다!)</strong></span>


# 5. Lifecycle Hooks
### [Lifecycle Hooks]
  * Vue 인스턴스의 생애주기 동안 특정 시점에 실행되는 함수
  * 개발자가 특정 단계에서 의도하는 로직이 실행될 수 있도록 함

### [Lifecycle Hooks 예시 1]
  1. Vue 컴포넌트 인스턴스가 초기 렌더링 및 DOM 요소 생성이 완료된 후 특정 로직을 수행하기
  * 초기값 설정하기 적절한 시점이 onMounted임!
  * onMounted 내부의 콜백함수를 자동으로 호출된다.

  ```html
  <script>
    const { createApp, ref, onMounted } = Vue  // onMounted는 Vue에서 불러와야 함
    setup() {
      const count = ref(0)
      const message = ref(null)

      onMounted(() => {
        console.log('mounted')  // 이 친구는 안 불러도 mounted 되면 console에 불러와진다!
      })
    }
  </script>
  ```

### [Lifecycle Hooks 예시 2]
  2. 반응형 데이터의 변경으로 인해 컴포넌트의 DOM이 업데이트 된 후 특정 로직을 수행하기
  * DOM tree가 변경되면 onUpdated가 자동으로 호출된다.

  ```html
  <script>
    const { createApp, ref, onMounted, onUpdated } = Vue  // onUpdated도 불러와야 한다.
    const count = ref(0)
    const message = ref(null)  // 처음 값은 null이라서 Web에서는 안 보임 -> updated 되는 순간 onUpdated 가 실행되며 message에 값이 담긴다.

    onUpdated(() => {
      message.value = 'updated~!'  // 원래 있던 DOM에 이벤트가 발생해서 값이 변경할 때 출력됨
    })
  </script>
  <!-- 위로 가서 html div 요소를 건드리자! -->
  <div id="app">
    <button @click="count++">Add 1</button>
    <p>Count: {{ count }}</p>
    <p>{{ message }}</p>  <!-- 초기에는 message에 null이라서 안 보인다. 버튼을 누르는 순간 updated~!라는 게 보임-->
  </div>
  ```

### [Lifecycle Hooks 특징]
  * Vue는 Lifecycle Hooks에 등록된 콜백 함수를 인스턴스와 자동으로 연결함
  * 이렇게 동작하려면 hooks 함수들은 반드시 동기적으로 작성되어야 함
  * 인스턴스 생애 주기의 여러 단계에서 호출되는 다른 hooks도 있으며
  가장 일번적으로 사용되는 것은 onMounted, onUpdated, onUnmounted
  * https://vuejs.org/api/composition-api-lifecycle.html

### [Lifecycle Hooks Diagram]
  * https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram

# 6. Vue Style Guide
### [Vue Style Guide]
  * Vue의 스타일 가이드 규칙은 우선순위에 따라 4가지 범주로 나눔
  * 규칙 범주
    * 우선순위 A: Essential(필수)
    * 우선순위 B: Strongly Recommended(적극 권장)
    * 우선순위 C: Recommended(권장)
    * 우선순위 D: Use with Caution(주의 필요)
  * 처음에는 A, B 정도는 챙기면서 코드를 짜자
  * https://vuejs.org/style-guide/

### [우선순위 별 특징]
  * A: Essential (필수)
    * 오류를 방지하는 데 도움이 되므로 어떤 경우에도 규칙을 학습하고 준수
  * B: Strongly Recommended(적극 권장)
    * 가독성 및 개발자 경험을 향상 시킴
    * 규칙을 어겨도 코드는 여전히 실행되겠지만, 정당한 사유가 있어야 규칙을 위반할 수 있음
  * C: Recommended (권장)
    * 일관성을 보장하도록 임의의 선택을 할 수 있음
  * D: Use with Caution
    * 잠재적 위험 특성을 고려함

### 오늘 다룬 내용 중 A였던 것
  1. v-for에 key 작성하기
  2. 동일 요소에 v-if와 v-for 함께 사용하지 않기

## 참고
### [주의] computed의 반환 값은 변경하지 말 것
  * computed의 반환 값은 의존하는 데이터의 파생된 값
  * 일종의 snapshot이며 의존하는 데이터가 변경될 때마다 새 snapshot이 생성됨
  * snapshot을 변경하는 것은 의미가 없으므로 계산된 반환 값은 읽기 전용으로 취급되어야 하며 변경되어서는 안 됨
  * 대신 새 값을 얻기 위해서는 의존하는 데이터를 업데이트 해야 함

### [주의] computed 사용 시 원본 배열 변경하지 말 것
  * computed에서 reverse() 및 sort() 사용 시 원본 배열을 변경하기 때문에 복사본을 만들어서 진행해야 함
  <br>
  ```html
  <script>
    // not to do
    return numbers.reverse()
    // recommended
    return [...numbers].reverse()
  </script>
  ```

### [주의] 배열의 인덱스를 v-for의 key로 사용하지 말 것
  ```html
  <!-- not to do so (이렇게 하지 마시오) -->
  <div v-for='(item, index) in items' :key="index">
    <!-- content -->
  </div>
  ```
  * 인덱스는 식별자가 아닌 배열의 항목 위치만 나타내기 때문에 Vue 가 DOM을 변경할 때 (끝이 아닌 새 항목이 배열에 삽입되면) 여러 컴포넌트 간 데이터 공유 시 문제가 발생
  * 직접 고유한 값을 만들어내는 method를 만들거나 외부 라이브러리 등을 활용하는 등 식별자 역할을 할 수 있는 값을 만들어 사용

### [v-for와 배열 - "배열 변경 감지"]
  * 수정 메서드(원본 배열 수정)
    * Vue는 반응형 배열의 변경 method가 호출 되는 것을 감지하여 필요한 업데이트를 발생시킴
    * push(), pop(), shift(), unshift(), splice(), sort(), reverse() (참고로 splice는 오타가 아니네; 문서에도 나와있음)
<br>

  * 배열 교체
    * 원본 배열을 수정하지 않고 항상 새 배열을 변환
    * filter(), concat(), slice()

### [v-for와 배열-"필터링/정렬 결과 표시"]
  * 원본 데이터를 수정하거나 교체하지 않고 필터링 되거나 정렬된 결과를 표시
    1. computed 활용
    ```html
    <script>
      const numbers = ref([1, 2, 3, 4, 5])

      const evenNumbers = computed(() => {
        return numbers.value.filter((number) => number % 2 === 0)
      })
    </script>
    ```
    2. method 활용(computed가 불가능한 중첩된 v-for의 경우)
    ```html
    <script>
      const numberSets = ref([
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10]
      ])

      const evenNumbers = function (numbers){
        return numbers.filter((number) => number % 2 === 0)
      }
    </script>
    <!--아래에서 Vue 코드 부분 수정한 뒤에 위로 가서 수정할 것-->
    <ul v-for="numbers in numberSets">
      <li v-for="num in evenNumbers(numbers)">{{ num }}</li>
    </ul>
    ```

