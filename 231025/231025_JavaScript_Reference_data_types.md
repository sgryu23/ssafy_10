### 231025 JavaScript Reference data types

# 1. 함수
## 함수 개요
### [Function]
  * 참조 자료형에 속하며 모든 함수는 Function object
  * 참조 자료형: 객체의 주소가 저장되는 자료형(가변, 주소가 복사)

## 함수 정의
### 함수 구조
  * 함수의 이름
  * 함수의 매개변수
  * 함수의 body를 구성하는 statement
  * return 값이 없다면 undefined를 반환
  ```html
    <script>
      function name ([param[, param,[..., param]]]) {
        statements
        return value
      }
    </script>
  ```

### 함수 정의 2가지 방법
  1. 선언식(function declaration)
  ```html
    <script>
      function funcName () {
        statements
      }
    </script>
  ```

  선언식 예시
  ```html
    <script>
      function add(num1, num2) {
        return num1 + num2
      }
    </script>
  ```
  2. 표현식(function expression)
  ```html
    <script>
      const funcName = function () {
        statements
      }
    </script>
    
    add(1, 2)   // 3
  ```

  표현식 예시
  ```html
    <script>
      const sub = function (num1, num2) {
        return num1 - num2
      }
    </script>

    sub(2, 1)   // 1
  ```

### [함수 표현식 특징]
  * 함수 이름이 없는 '익명 함수'를 사용할 수 있음
  * 선언식과 달리 <span style='color:orange'>**표현식으로 정의한 함수는 호이스팅 되지 않으므로**</span> 함수를 정의하기 전에 먼저 사용할 수 없음
  ```html
    add(1, 2)   // 3

    <script>
      function add(num1, num2) {
        return num1 + num 2
      }
    </script>
  ```

  ```html
  <script>
    // (표현식은) 호이스팅이 안 된다.
    sub(2, 1)      // ReferenceError: Cannot access 'sub' before initialization

    const sub = function (num1, num2) {
      return num1 - num2
    }
  </script>
  ```

### 함수 선언식과 표현식 종합
  |     | 선언식 | 표현식 |
  |-----|-------|--------|
  | 특징 | 익명 함수 사용 불가능 | 익명 함수 사용 가능 |
  |      | 호이스팅 있음 | 호이스팅 없음 |
  | 기타|               | <b style='color:red'>사용 권장</b>    |

## 매개 변수
### [매개변수 정의 방법]
  1. 기본 함수 매개 변수
  2. 나머지 매개 변수

### [1. 기본 함수 매개변수(Default function parameter)]
  * 값이 없거나 undefined가 전달될 경우 이름 붙은 매개변수를 기본값으로 초기화
    ```html
    <script>
      const greeting = function (name = 'Anonymous') {
        return `Hi ${name}`
      }

      greeting()   // Hi Anonymous  -> 아무 것도 없을 때는 기본 매개변수를 넣어서 출력시킴
      greeting(승광)  // Hi 승광
    </script>
    ```

### [2. 나머지 매개변수(Rest parameters)]
  * 임의의 수의 인자를 '배열'로 허용하여 가변 인자를 나타내는 방법
  <br>
  <작성 규칙><br>
    - 함수 정의 시 나머지 매개변수 하나만 작성할 수 있음
    - 나머지 매개변수는 함수 정의에서 매개변수 마지막에 위치해야 함
    - 나머지 매개변수를 담을 때는 '...'이 쓰인다. (파이썬의 * 같은 것)
  ```html
    <script>
      const myFunc = function (param1, param2, ...restParams) {
        return [param1, param2, restPrams]
      }

    myFunc(1, 2, 3, 4, 5) // [1, 2, [3, 4, 5]]
    myFunc(1, 2)  // [1, 2, []]
    </script>
    
  ```

### 매개변수와 인자의 개수 불일치
  * 매개변수 개수 > 인자 개수
  * 누락된 인자는 undefined로 할당(에러를 내지 않고 undefined로 채워서 출력해줌)
  ```html
  <script>
    const threeArgs = function (param1, param2, param3) {
      return [param1, param2, param3]
    }

    threeArgs()      // [undefined, undefined, undefined]
    threeArgs(1)     // [1, undefined, undefined]
    threeArgs(2, 3)  // [2, 3, undefined]
  </script>
  ```

  * 매개변수 개수 < 인자 개수
  * 초과 입력한 인자는 사용하지 않음
  ```html
  <script>
    const noArgs = function () {
      return 0
    }

    console.log(noArgs(1, 2, 3))    // 0       -> 매개변수를 하나도 받지 않으므로 0 출력

    const twoArgs = function (num1, num2) {
      return [num1, num2]
    }

    console.log(twoArgs(1, 2, 3))   // [1, 2]  -> 2개만 나옴
  </script>
  ```

## Spread Syntax
### ['...' (Spread Syntax)]
  * 전개 구문(MDN에서 한국어 검색할 때 전개 구문이라고 치면 된다.)

### [전개 구문]
  * 배열이나 문자열 같이 반복 가능한 항목을 펼치는 것(확장, 전개)
  * 전개 대상에 따라 역할이 다름
  1. 함수와의 사용<br>
    1. 함수 호출 시 인자 확장<br>
    2. 나머지 매개변수(압축)
  2. 객체와의 사용(객체 파트에서 진행)
  3. 배열과의 활용(배열 파트에서 진행)

### [전개 구문 활용]
  * 함수와의 사용<br>
    1. 함수 호출 시 인자 확장
    ```html
    <script>
      function myFunc(x, y, z) {
        return x + y + z
      }

      let numbers = [1, 2, 3]

      console.log(myFunc(...numbers))           // 6  -> 매개된 변수보다 초과되어서 뒤에 들어온 값은 버린다.
    </script>
    ```

    2. 나머지 매개변수(압축)
    ```html
    <script>
      function myFunc2(x, y, ...restArgs) {
        return [x, y, restArgs]
      }

      console.log(myFunc2(1, 2, 3, 4, 5))      // [1, 2, [3, 4, 5]]
      console.log(myFunc2(1, 2))               // [1, 2, []]
    ```

## 화살표 함수
### 화살표 함수 표현식(Arrow function expressions)
  * 함수 표현식의 간결한 표현법

### [화살표 함수 작성 결과]
  ```html
  <script>
    const arrow1 = function (name) {
      return `hello, ${name}`
    }
  </script>
  ```

  ```html
  <script>
    const arrow = name => `hello, ${name}`
  </script>
  ```

### [화살표 함수 작성 과정]
  #### 1. function 키워드 삭제 후 화살표 작성
  ```html
  <script>
    const arrow1 = function (name) {
      return `hello, ${name}`
    }

    // 1. function 키워드 삭제 후 화살표 작성
    const arrow2 = (name) => { return `hello, ${name}` }
  </script>
  ```

  #### 2. 인자가 1개일 경우에만 () 생략 가능<br>
    1. function 키워드 제거 후 매개변수와 중괄호 사이에 화살표(=>) 작성<br>
    2. 함수의 매개변수가 하나뿐이라면, 매개변수의 '()' 제거 가능(단, 생략하지 않는 것을 권장)
    ```html
    <script>
      const arrow1 = function (name) {
        return `hello, ${name}`
      }

      // 1. function 키워드 삭제 후 화살표 작성
      const arrow2 = (name) => { return `hello, ${name}` }

      // 2. 인자가 1개일 경우에만 () 생략 가능
      const arrow3 = name => { return `hello, ${name}` }
    </script>
    ```
  
#### 3. 함수 본문이 return을 포함한 표현식 1개일 경우에 {} & return 삭제 가능
  * function 키워드 제거 후 매개변수와 중괄호 사이에 화살표(=>) 작성
  (필기 보충, p.31)
    // 2. 인자가 1개일 경우에만 () 생략 가능
    const arrow3 = name => { return `hello, ${name}` }

    // 3. 함수 본문이 return을 포함한 표현식 1개일 경우에 {} & return 삭제 가능
    const arrow4 = name => `hello, ${name}`









# 2. 객체
## 객체 개요
### [Object]
  * 키로 구분된 데이터 집합을 저장하는 자료형(data collection)
  * python에서 dictionary와 같다고 생각하면 된다.

## 구조 및 속성
### [객체 구조]
  * 중괄호를 이용해 작성
  * 중괄호 안에는 key: value 쌍으로 구성된 속성(property)를 여러 개 작성 가능
  * key는 문자형만 허용, Django와 달리 key는 ''(따옴표) 안에 안 넣음
  * value는 모든 자료형 허용
  ```html
  <script>
    const user = {
      name: 'Alice',
      'key with space': true,
      greeting: function () {
        return 'hello'
      }
    }
  </script>
  ```

### 속성 참조
  * 점('.', chaining operator) 또는 대괄호([])로 객체 요소 접근
    * user.address = 'korea' (점으로 접근)
    * user[address] = 'korea' (대괄호로 접근)
  * key 이름에 띄어쓰기 같은 구분자가 있으면 대괄호 접근만 가능
  ```html
  <script>
    // 조회
    console.log(user.name) // Alice
    console.log(user['key with space']) // true

    // 추가
    user.address = 'korea'  // user[address] = 'korea' -> 이것도 가능하다.
    console.log(user) // {name: 'Alice', key with space: true, address: 'korea', greeting: ƒ}

    // 수정
    user.name = 'Bella'
    console.log(user.name) // Bella

    // 삭제
    delete user.name
    console.log(user) // {key with space: true, address: 'korea', greeting: ƒ}
  </script>
  ```

### ['in' 연산자]
  * 속성이 객체에 존재하는지 여부를 확인
  * 결과는 boolean 타입으로 나온다.
  ```html
  <script>
    console.log('greeting' in user) // true
    console.log('country' in user) // false
  </script>
  ```

## 객체와 함수
### [Method]
  * 객체 속성에 정의된 함수

### [Method 사용 예시]
  * object.method() 방식으로 호출
  * 메서드는 객체를 '행동'할 수 있게 함
  ```html
  <script>
    console.log(user.greeting())       // hello
  ```

## this
### [Method]
  * 'this' 키워드를 사용해 객체에 대한 특정한 작업을 수행할 수 있음

### ['this' keyword]
  * 함수나 메서드를 <b style='color:orange'>호출한 객체</b>를 가리키는 키워드
  * 함수 내에서 객체의 속성 및 메서드에 접근하기 위해 사용
  * this를 window라고 생각하자
  * this를 쓸 때는 console.log()를 찍어보자
  ```html
  <script>
    const myFunc = function () {
      return this
    }
    console.log(myFunc()) // window
  ```

### JavaScript 에서 this는 함수를 "호출하는 방법"에 따라 가리키는 대상이 다르다.
| 호출 방법 | 대상 |
|----------|------|
| 단순 호출 | 전역 객체|
|메서드 호출|메서드를 호출한 객체|

### [1. 단순 호출 시 this]
  * 가리키는 대상 => 전역 객체
  ```html
  <script>
    const myFunc = function () {
      return this
    }
    console.log(myFunc())     // window
  ```

### [2. 메서드 호출 시 this]
  * 가리키는 대상 => 메서드를 호출한 객체
  ```html
  <script>
    const myObj = {
      data: 1,
      myFunc: function () {
        return this
      }
    }
    console.log(myObj.myFunc()) // myObj
  ```

### [3. 중첩된 함수에서의 this 문제점과 해결책]
  * 이해가 안 되네 ㅜㅜ
  ```html
  <script>
    const myObj2 = {
      numbers: [1, 2, 3],
      myFunc: function () {
        this.numbers.forEach(function (number) {
          console.log(this) // window
        })
      }
    }
    console.log(myObj2.myFunc())
  ```
  * 단순 호출 시에는 전역 객체가 참조된 것일뿐이다
  * forEach의 인자로 작성된 콜백 함수는 일반적인 함수 호출이기 때문에 this가 전역 객체를 가리킴

  ```html
  <script>
    const myObj3 = {
      numbers: [1, 2, 3],
      myFunc: function () {
        this.numbers.forEach((number) => {
          console.log(this) // myObj3
        })
      }
    }
    console.log(myObj3.myFunc())
  ```
  * 화살표 함수는 자신만의 this를 가지지 않기 때문에 외부 함수에서의 this 값을 가져옴

### [JavaScript 'this' 정리]
  * JavaScript에서 this는 함수가 '호출되는 방식'에 따라 결정되는 현재 객체를 나타냄
  * JavaScript의 함수는 호출될 때 this를 암묵적으로 전달 받음
  * Python의 self와 Java의 this가 선언 시 값이 이미 정해지는 것에 비해 JavaScript의 this는 함수가 호출되기 전까지 값이 할당되지 않고 호출 시에 결정됨(동적 할당)

## 추가 객체 문법
### [1. 단축 속성]
  * 키 이름과 값으로 쓰이는 변수의 이름이 같은 경우 단축 구문을 사용할 수 있음 :smile:
  ```html
  <script>
    // 단축 속성 사용 전
    const name = 'Alice'
    const age = 30

    const user = {
      name: name,
      age: age,
    }
    
    // 단축 속성을 사용하면(한 줄로 쓰면 헷갈림)
    const name = 'Alice'
    const age = 30

    const user = {
      name,
      age,
    }
  </script>
  ```

### [2. 단축 메서드]
  * method 선언 시 function 키워드 생략 가능
  필기 보충
  ```html
  <script>
    const myObj1 = {
      myFunc: function () {
        return 'Hello'
      }
    }
  ```

### [3. 계산된 속성(computed property name)]
  * 동적으로 키를 생성할 때 쓰임
  * 예시: [pjt + num]
### [4. 구조 분해 할당(destructing assignment)]

### <b style='color:red'>[4. 구조 분해 할당 활용] :star::star::star::star:</b>
  * 함수의 매개변수로 객체 구조 분해 할당 활용 가능
  * JavaScript에서 유용하게 쓰이는 것
  * Vue에서 많이 쓴다.

### [5. Object with '전개 구문']
  * 객체 복사
    - 객체 내부에서 객체 전개
  * <b style='color:orange'>**얕은 복사**</b>에 활용 가능

### [6. 유용한 객체 메서드]
  * Object.keys()   ====> key를 리스트에 담아서 출력
  * Object.values() ===> values를 리스트에 담아서 출력
  * 결과가 배열로 나옴(리스트에 담겨서 나온다는 뜻)

### [7. Optional Chaining('?.')]
  * 이건 그렇게 중요한 건 아님(이런 게 있다 정도만 알면 된다)
  * 속성이 없는 중첩 객체를 에러 없이 접근할 수 있음
  * 만약 참조 대상이 null 또는 undefined라면 에러가 발생하는 것 대신 평가를 멈추고 undefined를 반환
  * ?. 앞에 대상을 보고 해당 속성이 없으면 뒤에 평가를 진행하지 않고 undefined를 반환해준다.

### [7. Optional Chaining('?.') 2]
  * Optional Chaining이 없다면 다음과 같이 '&&' 연산자를 사용해야 함
  * ?.을 안 쓰면 && 연산자를 써서 할 수 있기도 한데 그러면 복잡해지고 코드가 길어지니까 ?.을 쓴다는 것 정도를 알아두자

### [7. Optional Chaining 장점]
  * 참조가 누락될 가능성이 있는 경우 연결된 속성으로 접근할 때 더 짧고 간단한 표현식을 작성할 수 있음
  * 어떤 속성이 필요한지에 대한 보증이 확실하지 않는 경우에 객체의 내용을 보다 편리하게 탐색할 수 있음

### [7. Optional Chaining 주의사항]
  1. Optional chaining은 존재하지 않아도 괜찮은 대상에만 사용해야 함(남용하지 말라는 뜻)
  2. Optional chaining 앞의 변수는 반드시 선언되어 있어야 함

## JSON
### [JSON이란]
  * JavaScript Object Notation
  * Key-Value 형태로 이루어진 자료 표기법
  * JavaScript의 Object와 유사한 구조를 가지고 있지만 JSON은 형식이 있는 :star:<b style='color:red'>"문자열"</b>:star:
  * JavaScript에서 Json을 사용하기 위해서는 Object 자료형으로 변경해야 함

### [Object <-> JSON 변환하기] :star::star::star:
  여기는 코드 복붙해야 함
  * JSON.stringify(object): object를 변환
  * JSON.parse(object): object 분석

### [new 연산자]
  * JS에서 객체를 하나 생성한다고 한다면?
    * 하나의 객체를 선언하여 생성
  
  * 동일한 형태의 객체를 또 만드려면?
    * 복붙해서 값을 변경해야 하는걸까? -> ㄴㄴ
  
  * 사용자 정의 객체 타입을 생성
  * 매개 변수
    1. constructor: 객체 인스턴스의 타입을 기술(명세)하는 함수
    2. arguments: constructor와 함께 호출될 값 목록
    ### new constructor[([arguments])]

### [new 연산자 활용]
코드 복붙

### [JavaScript 'this' 장단점]
  * this가 미리 정해지지 않고 호출 방식에 의해 결정되는 것의 장단점
  1. 장점<br>
    * 함수(메서드)를 하나만 만들어 여러 객체에서 재사용할 수 있다는 것
  2. 단점<br>
    * 이런 유연함이 실수로 이어질 수 있다는 것

  => 개발자는 this의 동작 방식을 충분히 이해하고 장점을 취하면서 실수를 피하는데 집중

# 3. 배열
## 배열의 개요
### [Object]
  * 키로 구분된 데이터 집합(data collection)을 저장하는 자료형
  * object 는 순서가 없다. -> 순서를 넣어주는 collection은 array(배열)
  * 이제는 순서가 있는 collection이 필요

### [Array]
  * **순서가 있는** 데이터 집합을 저장하는 자료구조
  * 인덱스를 끌고 와서 순서를 메겨준다.

### [배열 구조]
  * 대괄호([])를 이용해 작성
  * 배열 요소 자료형: 제약 없음
  * length 속성을 사용해 배열에 담긴 요소가 몇 개인지 알 수 있음
  코드 복붙
  * javascript에는 음수 인덱스가 없다. -> 마지막 인덱스에 접근하려면 length 속성을 사용해서 length - 1해서 접근해야 한다.

## 배열과 메서드
### [pop()]
  * 배열 끝 요소를 제거하고, 제거한 요소를 반환
  * 파이썬 .pop() 과 같음
  코드 복붙

### [push()]
  * 배열 끝에 요소를 추가

### [shift()]
  * 배열 앞 요소를 제거하고 제거한 요소를 반환(leftpop이라고 생각하면 됨)

### [unshift()]
  * 배열 앞에 요소를 추가(leftpush라고 생각하면 됨)

## <b style='color:red'>Array helper method</b>
갱장히 중요!
### [Arry Helper Methods]
  * 배열을 <a style='color:red'>순회</a>하며 <a style='color:red'>특정 로직을 수행</a>하는 메서드
  * 메서드 호출 시 인자로 함수를 받는 것이 특징(콜백 함수)

### [주요 Array Helper Methods]
  | 메서드 | 역할 |
  |-------|------|
  | forEach | 인자로 주어진 함수(콜백함수)를 배열 요소 각각에 대해 실행 |
  | map | 배열 내의 모든 요소 각각에 대해 함수(콜백함수)를 호출하고<br> 함수 호출 겨로가를 모아 새로운 배열을 반환 |

### [forEach()]
  인자로 주어진 함수를 배열 요소 각각에 대해 실행

### [forEach 구조]
  #### arr.forEach(callback(item[, index[, array]]))
  * callback: 이 자리에는 함수가 들어가면 됨(반복할 함수)
  * 함수가 없다면 함수 표현식으로 선언을 해주면 된다.
  * 콜백 함수는 3가지 매개변수로 구성
    1. item: 처리할 배열의 요소
    2. index: 처리할 배열 요소의 인덱스(선택 인자)
    3. array: forEach를 호출한 배열(선택 인자)
  * 반환 값: undefined

  ```html
  <script>
    array.forEach(function (item, index, array) {
      // do something 
    })
  ```
  05-array. 03-foreach.html 실행

### [콜백 함수(Callback function)]
  * 다른 함수에 인자로 전달되는 함수
  * 다음주에 본격적으로 나올 예정
  * 외부 함수 내에서 호출되어 일종의 루틴이나 특정 작업을 진행

### [콜백 함수 예시]
  * p.99의 오른쪽처럼 함수를 변수?로 저장하면 반복 사용이 용이해진다.

### [map()]
  * 배열 내의 모든 요소 각각에 대해 함수(콜백 함수)를 호출하고<br>
  함수 호출 결과를 모아 새로운 배열을 반환
  * 콜백 함수를 리턴해준다.

### [map 구조]
  ```code
  arr.map(callback(item[, index[, array]]))
  ```
  1. item: 처리할 배열의 요소
  2. index: 처리할 배열 요소의 인덱스(선택 인자)
  3. array: map을 호출할 배열(선택 인자)
  * 반환 값: 배열의 각 요소에 대해 실행한 "callback의 결과를 모은 새로운 배열"
    * 기본적으로 forEach 동작 원리와 같지만 forEach와 달리 새로운 배열을 반환함

### [map 활용]
  코드 복붙
  * map과 forEach의 차이: map은 값을 배열에 담아서 출력해준다는 것밖에 없음

### [python에서의 map 함수와 비교]
  * python의 map에 square 함수를 인자로 넘겨 numbers 배열의 각 요소를 square 함수의 인자로 사용하였음
  * map 메서드에 callBackFunc 함수를 인자로 넘겨 numbers 배열의 각 요소를 callBackFunc 함수의 인자로 사용하였음

### [배열 순회 종합]
코드 복붙
  * <b style='color:red'>forEach는 for loop, for...of 의 장점을 모두 갖고 있고 훨씬 직관적</b>이다.
  * callback 함수를 이용하여 각 요소를 조작하기 용이하다.
  * 그러나 break, continue 사용 불가능하다.

## 추가 배열 문법
### [1. Array with '전개 구문]
  * 배열 복사
  let parts = ['어깨', '무릎']
  let lyrics = ['머리', ...parts, '발']

### [2. 기타 Array Helper Methods]
  * MDN 문서를 참고해 사용해보기
  필터 함수가 자주 쓰인다. -> MDN 문서를 찾아보고 활용 방법을 기록해두자.
  필터를 쓰면 콜백 함수를 return 해준다.
  * map 같은 경우 


## 과제 하면서 알게 된 것
### hw_3_2
  * 내장 메서드 .join()를 기준으로 array랑 separator를 묶을 수 있다.
  * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
  * 함수 makeOrder 작성
    * `` <-이걸 넣어줘야 {}랑 값을 넣어서 출력할 수 있다.
    * string 처럼 '' 안에 출력은 어떻게 해야 함?

### hw_3_4
  1. null 이 아닌 값만 new_homework에 삽입하기
  * null이 아닌 걸 담아주는 것(filter 함수가 핵심이었다. filter로 return 하면 리스트(array)에 담아줌)
  * 과제 제출 화면이랑 똑같이 만들려고 했는데 핵심은 맞았으면 넘어가자.
  2. array랑 seperator랑 연결하는 거 hw_3_2에서 했는데 왜 생각이 안나지
  * .join(seperator) 써서 하는데 각 값을 const로 저장해주고 그 객체를 받아서 묶어줘야 했다.
  3. 값을 인덱스로 가야 한다.

### ws_3_1
  1. 
