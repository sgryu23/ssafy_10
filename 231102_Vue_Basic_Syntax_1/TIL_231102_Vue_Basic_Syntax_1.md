### Vue Basic Syntax 1

# 1. Template Syntax
## 개요
### [Template Syntax]
  * DOM을 기본 구성 요소 인스턴스의 데이터에 선언적으로 바인딩할 수 있는 HTML 기반 템플릿 구문을 사용

### [Template Syntax 종류]
  1. Text Interpolation
  2. Raw HTML
  3. Attribute Bindings
  4. JavaScript Expressions

### [1. Text Interpolation]
  ```html
  <script>
    <p>Message: {{ msg }}</p>
  </script>
  ```
  * 데이터 바인딩의 가장 기본적인 형태
  * 이중 중괄호 구문(콧수염 구문)을 사용
  * 콧수염 구문은 해당 구성 요소 인스턴스의 msg 속성 값으로 대체
  * msg 속성이 변경될 때마다 업데이트 됨

### [Directive]
  * 'v-' 접두사가 있는 특수 속성

### [Directive 특징]
  * Directive의 속성 값은 단일 JavaScript 표현식이어야 함(v-for, v-on 제외)
  * 표현식 값이 변경될 때 DOM에 반응적으로 업데이트를 적용
  * 예시
    - v-if는 seen 표현식 값의 T/F를 기반으로 `<p>`요소를 제거/삽입

실 사용에서는 attribute binding이 가장 자주 사용되니까 기억하세요~!


# 2. Dynamically data binding



# 3. Event Handling



# 4. Form Input Bindings



