### 231024_Basic Syntax of JavaScript

# 1. 변수
### [JavaScript 문법 학습]
  * ECMAScript 2015(ES6) 이후의 명제를 따름
  * style guide: https://standardjs.com/rules-kokr.html

### [식별자(변수명) 작성 규칙]
  * 반드시 문자, $, _로 시작
  * 대소문자를 구분
  * 예약어 사용 불가; 뭔 소리지?
    * for, if, function 등
  * camelCase: 변수, 객체, 함수에 사용(중간에 대문자, 가장 흔하게 쓰는 케이스)
  * PascalCase: 클래스, 생성자에 사용(맨 앞이 대문자)
    * django(python) 할 때도 썼던 것(ex. ArticleSerialization)
  * SNAKE_CASE: 상수(constants)에 사용(모든 알파벳이 <span style='color:orange'>**대문자**</span>)

### [변수 선언 키워드]
  1. let
  2. const
  3. var

### [let]
  * <span style='color:orange'>block scope</span>를 갖는 지역 변수를 선언
  * 재할당 가능
    * let a = 10
    * a = 20
  * 재선언 불가능
    * let a = 10
    * <span style='color:red'>let a = 20</span>  => 이건 안 됨
  * ES6에서 추가
  ```h
  let number = 10   // 1. 선언 및 초기값 할당
  number = 20       // 2. 재할당
  let number = 10   // 1. 선언 및 초기값 할당
  let number = 20   // 2. 재선언 불가능
  ```

### [const]
  * 블록 스코프를 갖는 지역 변수 선언
  * 재할당 불가능: <span style='color:red'>let과 다른 점!!</span>
  * 재선언 불가능
  * ES6에서 추가됨
  * let은 초기값이 없으면 undefined를 띄우는 반면, const는 아예 에러 메시지를 띄운다.
  ```html
  <script>
    const number = 10   // 1. 선언 및 초기값 할당
    number = 10         // 2. 재할당 불가능
    const number = 10   // 1. 선언 및 초기값 할당
    const number = 20   // 2. 재선언 불가능
    const number        // const 'declaration must be initialized.
  </script>
  ```
  <01-variable.html 파일>
  ```h
  <script>
    // let
    let number = 10
    number = 20            // 재할당
    console.log(number)    // 20
    // let number = 10     // 재선언 불가능~(빨간 줄 뜸)
    
    // const
    const num = 10
    // num = 20
    console.log(num)       // Uncaught TypeError: Assignment to constant variable.

    // const num = 20      // 재선언 불가능(빨간줄 뜸), Error message: Uncaught SyntaxError: Identifier 'num' has already been declared
  </script>
  ```

### [block scope]
  * if, for, 함수 등의 '중괄호({}) 내부'를 가리킴
  * 블록 스코프를 가지는 변수는 블록 바깥에서 접근 불가능

  ```h
  let x = 1

  if (x === 1) {
    let x = 2

    console.log(x)   // 2
  }

  console.log(x)     // 1
  ```

### [변수 선언 키워드 정리]
  * <span style='color:orange'>기본적으로 const 사용</span>을 권장
  * <span style='color:lime'>재할당이 필요한 변수는 let으로 변경</span>해서 사용

# 2. 데이터 타입
### [데이터 타입]
  1. 원시 자료형(Primitive type) => 오늘 정리하는 자료는 여기에 집중
  * Number, String, Boolean, undefined, null
  * 변수에 값이 직접 저장되는 자료형(<span style='color:orange'>불변, 값이 복사</span>)
  2. 참조 자료형(Reference type) => 내일 자세히 정리할 예정
  * Objects(Object, Array, Function)
  * 객체의 주소가 저장되는 자료형(<span style='color:red'>가변, 주소</span>가 복사)
  * 데이터타입 이름이 'Object'라는 뜻

### [원시 자료형 예시]
  * 변수에 할당될 때 값이 복사됨
  * 변수 간에 서로 영향을 미치지 않음
  ```h
  const bar = 'bar'
  console.log(bar)     // bar

  bar.toUpperCase()
  console.log(bar)     // bar -> 원본 불변

  let a = 10
  let b = a
  b = 20
  console.log(a)      // 10
  console.log(b)      // 20  -> 값이 복사
  ```

### [참조 자료형 예시]
  * 객체를 생성하면 객체의 메모리 주소를 변수에 할당
  * 변수 간에 서로 영향을 미침
  ```h
  const obj1 = {name: 'Alice', age: 30}
  const obj2 = obj1
  obj2.age = 40

  console.log(obj1.age)    // 40   -> 원본 가변
  console.log(obj2.age)    // 40   -> 주소가 복사
  ```

## 원시 자료형
### [Number]
  * 정수 또는 실수형 숫자를 표현하는 자료형

### [Number 예시]
  ```h
  const a = 13
  const b = -5
  const c = 3.14       // 소수도 Number 타입
  const d = 2.998e8    // 큰수도 Number 타입, 2.998 * (10**8) = 299,800,000
  const e = Infinity   // 무한도 Number 타입
  const f = -Infinity  // 음의 무한대
  const g = NaN        // Not a Number을 나타내는 값
  ```

### [String]
  * 텍스트 데이터를 표현하는 자료형


### [String 예시]
  * '+' 연산자를 사용해 문자열끼리 결합
  * 곱셈, 나눗셈, 뺄셈 불가능

### [Template Literal(템플릿 리터럴)]
  * 파이썬에서는 ```python(f'')``` 로 썼던 것
  * 내장된 표현식을 허용하는 문자열 작성 방식
  * Backtick(``)을 이용하며, 여러 줄에 걸쳐 문자열을 정의할 수도 있고 JavaScript의 변수를 문자열 안에 바로 연결할 수 있음
  * 표현식은 \$와 중괄호(${expression})로 표기
  * <span style='color:red'>작은 따옴표('')</span>로 바꿔서 쓰는 경우가 자주 있다. 실수 조심!
  * ES6+부터 지원
  ```h
  const age = 100
  const message = `홍길동은 ${age}세입니다.`
  console.log(message)             // 홍길동은 100세입니다.
  ```

[null과 undefined]
  1. null
  * 변수의 값이 없음을 의도적으로 표현할 때 사용
  ```h
  let a = null
  console.log(a)    // null
  ```
  2. undefined
  * 변수 선언 이후 직접 값을 할당하지 않으면 자동으로 할당됨
  ```h
  let b
  console.log(b)    // undefined
  ```

### [Boolean]
  * true / false (소문자로 되어 있음)
  * 조건문 또는 반복문에서 Boolean이 아닌 데이터 타입은 "자동 형변환 규칙"에 따라 true 또는 false로 변환됨

### [자동 형변환]
  |데이터 타입 |   false         |     true<br> |
  |-----------|-----------------|--------------|
  | undefined |    항상 false   |       X      |
  |   null    |    항상 false   |      X       |
  |  Number   |   0, -0, NaN    |나머지 모든 경우|
  |  String   |    빈 문자열    |나머지 모든 경우|


# 3. 연산자
### [할당 연산자]
  * 오른쪽에 있는 피연산자의 평가 결과를 왼쪽 피연산자에 할당하는 연산자
  * 단축 연산자 지원
  ```h
  let a = 0
  
  a += 10
  console.log(a)        // 10

  a -= 3
  console.log(a)        // 3

  a += 10
  console.log(a)        // 7

  a %= 7
  console.log(a)        // 0
  ```

### [증가 & 감소 연산자]
  * 증가 연산자(++)
    * 피연산자를 증가(1을 더함)시키고 연산자의 위치에 따라 증가하기 전이나 후의 값을 반환
  * 감소 연산자(--)
    * 피연산자를 감소(1을 뺌)시키고 연산자의 위치에 따라 감소하기 전이나 후의 값을 반환
  ```h
  // 전위 연산자
  let  a = 3
  const b = ++a
  console.log(a, b)    // 4 4 (b도 a + 1힌 연산자를 받음)

  // 후위 연산자
  let x = 3
  const y = x++
  console.log(x, y)    // 4 3 (y에 x를 먼저 할당하고 나서 x에 1을 더함)
  ```

  * <span style='color:red'>+= 또는 -=와 같이</span> 더 명시적인 표현으로 작성하는 것을 권장
  

### [비교 연산자]
  * 피연산자들(숫자, 문자, Boolean 등)을 비교하고 결과값을 boolean으로 반환하는 연산자

### [동등 연산자(==)]
  * 두 피연산자가 같은 값으로 평가되는지 비교 후 boolean 값을 반환
  * <span style='color:red'>암묵적 타입 변환</span> 통해 <span style='color:lime'>타입을 일치시킨 후</span> 값은 값인지 비교
  * 두 피연산자가 모두 객체일 경우 메모리의 같은 객체를 바라보는지 판별
  * 의도하지 않는 이상 동등 연산자는 쓰지 않도록~
  ```h
  console.log(1 == 1)              // true
  console.log('hello' == 'hello')  // true
  console.log('1' == 1)            // true
  console.log(0 == false)          // true
  ```

### [일치 연산자(===)]
  * 두 연산자의 값과 타입이 모두 같은 경우 true를 반환
  * 같은 객체를 가리키거나, 같은 타입이면서 같은 값인지를 비교
  * <span style='color:orange'>엄격한 비교</span>가 이뤄지며 암묵적 타입 변환이 발생하지 않음
  * 특수한 경우를 제외하고는 동등 연산자가 아닌 <span style='color:red'>일치 연산자를 사용 권장</span>
  ```h
  console.log(1 == 1)              // true
  console.log('hello' == 'hello')  // true
  console.log('1' == 1)            // false
  console.log(0 == false)          // false
  ```

### [논리 연산자]
  * and 연산
    * &&
  * or 연산
    * ||
  * not 연산
    * !
  * 단축 평가 지원
    * 결과가 정해져있으면 끝까지 안 가고 판단을 종료
  ```html
  <script>
    true && false              // false
    true && true               // true
    
    false || true              // true
    false || false             // false

    !true                      // false
    
    // 단축 평가
    1 && 0            // 0
    0 && 1            // 0  (끝까지 안 가고 0이면 0 반환)
    4 && 7            // 7  (4가 true니까 7까지 와서 판단하고 7을 반환)
    1 || 0            // 1
    0 || 1            // 1
    4 || 7            // 4  (or 연산자는 처음이 true면 true니까 4 반환)
  </script>
  ```

# 4. 조건문
### [if]
  * 조건 표현식의 결과값을 boolean 타입으로 변환 후 참/거짓을 판단
  * 들여쓰기는 가독성을 위해 적용해주자! (필수는 아닌데 가독성을 챙기자!!)
  * 파이썬에서 ```python
    elif```으로 썼지만 JavaScript에서는 else if 로 쓴다!

  ```html
  <!-- 02-if-statement.html -->
  <script>
    const name = 'customer'

    if (name === 'admin') {
      console.log('주인님 환영해요')
    } else if (name === 'customer') {
      console.log('고갱님 환영해요')
    } else {
      console.log(`어서온나 ${name}님`)
    }
    // output: 고갱님 환영해요
  </script>
  ```

### 조건(삼항) 연산자
  * 세 개의 피연산자를 받는 유일한 연산자
  * 앞에서부터 <span style='color:orange'>조건문, 물음표(?), 조건문이 참일 경우 실행할 표현식, 콜론(:), 조건문이 거짓일 경우 실행할 표현식</span>이 배치
  * if 문으로 표현하는 게 더 명시적이기는 하다. (그냥 이런 게 있다는 것 정도만 알아두자 일단)
  ```html
  <script>
    // 일반 조건문
    const func1 = function (person) {
      if (person > 17) {
        return 'Yes'
      } else {
        return 'No'
      }
    }

    // 조건(삼항) 연산자로 쓰면
    const func2 = function (person) {
      return person > 17 ? 'Yes' : 'No'
    }
  </script>
  ```

# 5. 반복문
### [반복문 종류]
  * while
  * for
  * for...in
  * for...of
  * [].forEach => for ~ in이랑 for ~ of랑 헷갈리면 쓰는 것(근데 일단 처음에는 for in, for of로 익히자!)

### [while 정의와 예시]
  * 조건문이 참이면 문장을 계속해서 수행
  ```html
  <script>
    let i = 0               // const로 할당하면 재할당이 불가능하다. while 문에 넣을거면 let으로 선언하자!
    while (i < 6) {
      console.log(i)
      i += 1
    }
  </script>
  ```

### [for 정의와 예시]
  * 특정한 조건이 거짓으로 판별될 때까지 반복
  * python의 for문과 다르다.
  * while과 구동 방식이 비슷하다.
  ```html
  <script>
    for (let i = 0; i < 6; i++) {
      console.log(i)
    }
  </script>
  ```

### [for 동작 원리]
  ```html
  <script>
    for (let i = 0; i < 6; i++) {    // 1. 반복문 진입 및 변수 i 선언
      console.log(i)                 // 2. 조건문 평가 후 코드 블록 실행(i < 6, console.log(i))
    }                                // 3. 코드 블록 실행 후 i 값 증가 -> 조건 true면 2로 돌아감
  </script>
  ```

### [for...in 정의와 예시]
  * 객체의 열거 가능한 속성(property)에 대해 반복
  * 객체 전용!
  * dictionary 형태를 반복할 때 쓴다.
  ```html
  <script>
  // for...in
    const fruits = {
      a: 'apple',
      b: 'banana'
    }

    for (const property in fruits) {
      console.log(property)              // a b
      console.log(fruits[property])      // apple banana  => 이건 파이썬 문법이랑 유사하네~
    }
  </script>
  ```

### [for...of 정의와 예시]
  * 반복 가능한 객체(배열, 문자열 등)에 대해 반복
  ```html
  <script>
    // for...of
    const numbers = [0, 1, 2, 3]

    for (const number of numbers) {
      console.log(number)                // 0 1 2 3(줄 바꾸면서 출력)
    }
  </script>
  ```

### [배열 반복과 for...in]
  * 배열 인덱스는 정수 이름을 가진 열거 가능한 속성
    * 이게 무슨 말? 키와 값이 있다. (어라? 배열은 키가 없는데요? 배열의 키는 인덱스(순서가 있는 정수로 되어있을 뿐))
    ```html
    <script>
      const number2 = ['a', 'b', 'c', 'd']
      for (const number in number2) {
        console.log(number)                // 0 1 2 3 -> 숫자가 나옴!
      }
    </script>
    ```
  * for...in은 정수가 아닌 이름과 속성을 포함하여 열거 가능한 모든 속성을 반환
    * for...in은 object에서만 쓴다.
    * for...in이 불가능하면 for...of를 쓴다고 생각하면 된다!
  * 내부적으로 for...in은 배열의 반복자 대신 속성 열거를 사용하기 때문에 <span style='color:skyblue'>특정 순서에 따라 인덱스를 반환하는 것을 보장할 수 없음</span>
  * 인덱스의 순서가 중요한 배열에서는 사용하지 않음
  * 배열에서는 for 반복, for...of 반복을 사용

  ```html
  <script>
    const arr = ['a', 'b', 'c']
    for (const i in arr) {      // 여기서 const i를 쓰는 이유: 재할당, 재선언 되는 형태가 아님(const 선언한 건 for 문 한 번 돌면 삭제됨, 헷갈리면 let 쓰자!)
      console.log(i)            // 0, 1, 2
    }

    for (const i of arr) {
      console.log(i)            // a, b, c
    }
  </script>
  ```

### [반복문 사용 시 const 사용 여부]
  * for 문
    * for (let i = 0; i < arr.length; i++) {...}의 경우에는<br>최초 정의한 i를 "재할당"하면서 사용하기 때문에 <span style='color:red'>const를 사용하면 에러 발생</span>

<br>

  * for...in, for...of
    * 재할당이 아니라 매 반복마다 다른 속성 이름이 변수에 지정되는 것이므로 <span style='color:red'>const를 사용해도 에러가 발생하지 않음</span>
    * 단, const 특징에 따라 블록 내부에서 변수를 수정할 수 없음

### [반복문 종합]
  |  키워드  |   연관 키워드   |   스코프   |
  |----------|----------------|-------------|
  |  while   | break, continue | 블록 스코프 |
  |   for    | break, continue | 블록 스코프 |
  | for...in |   object 순회   | 블록 스코프 |
  | for...of |   iterable 순회  | 블록 스코프 |

## 참고(오늘 부분은 진짜 그냥 알쓸신잡..)
### [세미콜론(semicolon)]
  * 자바스크립트는 세미콜론을 선택적으로 사용 가능
  * 세미콜론이 없으면 ASI에 의해 자동으로 세미콜론이 삽입됨
    * ASI(Automatic Semicolon Insertion, 자동 세미콜론 삽입 규칙)
  * 자버지가 세미콜론 작성을 반대 -> 스타일 가이드에서도 ; 넣지 말라고 권장

### [변수 선언 키워드 'var']
  * ES6 이전에 변수 선언에 사용했던 키워드
  * 재할당 가능 & 재선언 가능
  * 변수 선언 시 var, const, let 키워드 중 하나를 사용하지 않으면 자동으로 var로 선언됨

### [함수 스코프(function scope)]
  * 함수의 중괄호 내부를 가리킴
  * 함수 스코프를 가지는 변수는 함수 바깥에서 접근 불가능
  ```html
  <script>
    function foo() {
      var x = 1
      console.log(x)   // 1
    }

    console.log(x)     // ReferenceError: x is not defined
  </script>
  ```

### [호이스팅(hoisting)]
  * 변수를 선언 이전에 참조할 수 잇는 현상
  * 변수 선언 이전의 위치에서 접근 시 undefined를 반환
  ```html
    <script>
      console.log(name)       // undefined -> 선언 이전에 참조

      var name = '홍길동'     // 선언
      
      var name               // undefined로 초기화
      console.log(name)      // undefined
    </script>
  ```

  * JavaScript에서 변수들은 실제 실행시에 코드의 최상단으로 끌어올려지게 되며(hoisted) 이러한 이유 때문에 var로 선언된 변수는 선언 시에 undefined로 값이 초기화되는 과정이 동시에 발생

  ```html
    <script>
      console.log(name)    // undefined
      var name = '홍길동'

      console.log(age)     // ReferenceError: Cannot access 'age' before initialization
      let age = 30

      console.log(height)  // ReferenceError: Cannot access 'height' before initialization
      const height = 170
    </script>
  ```

### [NaN을 반환하는 경우 예시]
  1. 숫자로서 읽을 수 없음(Number(undefined))
  2. 결과가 허수인 수학 계산식(Math.sqrt(-1))
  3. 피연산자가 NaN (7 ** NaN)
  4. 정의할 수 없는 계산식 (0 * Infinity)
  5. 문자열을 포함하면서 덧셈이 아닌 계산식('가'/3)

### 구글에 js is weird 치면 js 게임이 있는데 재미삼아 해보는 것도 좋다~