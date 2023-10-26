### TIL_231023_Intro_to_JavaScript

# History of JavaScript
## 웹 브라우저와 JavaScript
  * 자바스크립트의 역사

## ECMAScript
### [ECMAScript]
  * ECMA International이 정의하고 있는 표준화된 스크립트 프로그래밍 언어 명세
  * 스크립트 언어가 준수해야 하는 규칙, 세부사항 등을 제공

### [ECMAScript와 JavaScript]
  * JavaScript는 ECMAScript 표준을 구현한 구체적인 프로그래밍 언어
  * ECMAScript의 명세를 기반으로 하여 웹 브라우저나 Node.js와 같은 환경에서 실행됨
<br><br>
  * ECMAScript는 JavaScript의 표준이며, JavaScript는 ECMAScript 표준을 따르는 구체적인 프로그래밍 언어
  * ECMAScript는 언어의 핵심을 정의하고, JavaScript는 ECMAScript 표준을 따라 구현된 언어로 사용됨

<br>

# JavaScript and DOM
## DOM 개요
### [웹 브라우저에서의 JavaScript]
  * 웹 페이지의 동적인 기능을 구현

### JavaScript 실행 환경 종류

1. HTML script 태그
  * HTML 안에 **script** 태그를 넣으면 그 안은 js 문법이 적용된다 
  ```html
  <body>
    <script>
      console.log('hello')
    </script>
  </body>
  ```
  * html 파일 만들고 body 태그 안에 위와 같은 코드를 넣는다.
  * alt + B 눌러서 웹 페이지를 띄우면!
    * 웹 페이지 화면에는 내용이 안 나타남
    * 개발자 도구(F12) -> console 가면 콘솔 창에 나타난다.

<br>

2. js 확장자 파일

  ```js
  console.log('hello')

  <body>
    <script src='hello.js'></script>
  </body>
  ```

<br>

3. 브라우저 Console
    * 브라우저의 콘솔에 입력
  ```js
  console.log('hello')
  ```
  출력: hello
  * 개발자도구 브라우저 콘솔에 직접 입력하는 경우도 있다.

### [DOM(The Document Object Model)] ⭐
  * <span style='color:red'>중요</span> ⭐⭐⭐
  * 웹페이지(Document)를 구조화된 객체로 제공하여 프로그래밍 언어가 페이지 구조에 접근할 수 있는 방법을 제공
  * 문서, 구조, 스타일, 내용 등을 변경할 수 있도록 함

### [DOM 특징]
  * DOM에서 모든 요소, 속성, 텍스트는 하나의 객체
  * 모두 document 객체의 자식으로 구성됨

### [DOM tree]
  * 브라우저는 HTML_문서를 해석하여 DOM tree 라는 객체 트리로 구조화
    * 객체 간 상속 구조가 존재

### [브라우저가 웹 페이지를 불러오는 과정]
  * 웹 페이지는 웹 브라우저를 통해 해석되어 웹 브라우저 화면에 나타남

### [DOM 핵심]
  * 문서의 요소들을 객체로 제공하여 다른 프로그래밍 언어에서 <span style='color:orange'>접근하고 조작</span>할 수 있는 방법을 제공하는 API

## document 객체
### ['document' 객체]
  * 웹 페이지 객체
  * DOM Tree의 진입점
  * 페이지를 구성하는 모든 객체 요소를 포함

### ['document' 객체 예시]
  * HTML의 title 변경하기
  * Google 홈페이지에서 console 환경 들어가서
  ```html
  document.title   <!-- 출력 결과: Google -->
  document.title = 'Hello :)'  <!-- 출력 결과: Hello :) -->
  ```

## DOM 선택
### [DOM 조작 시 기억해야 할 것]
  웹 페이지를 동적으로 만들기 == 웹 페이지를 조작하기
  조작 순서
  1. 조작하고자 하는 요소를 <span style='color:red'>선택</span>(또는 탐색)
  2. 선택된 요소의 콘텐츠 또는 속성을 조작

## 선택 메서드
### [선택 메서드]
  * 이건 문법 시간에 다룰 거임(메서드는 이렇게 쓰는구나 정도만 알면 됨)

  ```document.querySelector()``` <br>
  * 요소 한 개 선택 <br>

  ```document.querySelectorAll()``` <br>
  * 요소 여러 개 선택 <br>
  

### [document.querySelector(selector)]
  * 제공한 선택자와 일치하는 element 한 개 선택
  * 제공한 CSS Selector를 만족하는 <span style='color:orange'>첫 번째 element</span> 반환(없다면 null 반환)

### [document.querySelectorAll(selector)]
  * 제공한 선택자와 일치하는 여러 element를 선택
  * 제공한 CSS Selector를 만족하는 NodeList를 반환

### [DOM 선택 실습]
  * lab.ssafy.com에서 깃 풀 받은 수업 자료(javascript 1일차)

####  01-select.html
  * /body 닫히는 태그 바로 위에 script 입력해서 js 요소를 넣어볼 예정<br>

  ```document.querySelector('.heading')```
  
  * 이것만 입력하면 결과값이 안 나옴
  * 출력하는 걸 해줘야지~ (console.log() 안에 DOM object를 넣어줘야 함)
  
  ```console.log(document.querySelector('.heading'))```

  -> 이걸 쓰면 첫 번째 인자가 선택됨(querySelector 특징: 여러 개면 첫 번째를 선택한다.)
  * 여러 개 선택하려면 ```querySelectorAll```을 써야 한다.

  ```console.log(document.querySelectorAll('.content'))```
  * 출력 값은 NodeList라는 것에 담겨서 나온다.

  ```console.log(document.querySelectorAll('ul > li'))```
  * 이런 식으로 쓰는 것도 가능하다. (부모 태그 아래 자식 태그)

<br>

# DOM 조작
## 속성 조작
### [속성(attribute) 조작]
  1. 클래스 속성 조작
  2. 일반 속성 조작

### [클래스 속성 조작]
  * 'classList' property
  * 요소의 클래스 목록을 DOMTokenList(유사 배열) 형태로 반환

### [classList 메서드]
  ```element.classList.add()```
  * 지정한 클래스 값을 추가
  <br>

  ```element.classList.remove()```
  * 지정한 클래스 값을 제거
  <br>
  
  ```element.classList.toggle()```
  * 클래스가 존재한다면 제거하고 false를 반환
  * 존재하지 않으면 클래스를 추가하고 true 반환

### [클래스 속성 조작 실습]
  * add()와 remove() 메서드를 사용해 지정한 클래스 값을 추가 혹은 제거
  * 수업시간 2번 실습 파일(02-element-manipulation.html)에서 실습
  * body 끝나기 전에 script 만들고 js 실습
  * const 선언: 블록 범위의 상수를 선언(js 문법)
  
  ```html
  <script>
    const h1Tag = document.querySelector('.heading')
    console.log(h1Tag)

    console.log(h1Tag.classList)  // DOMTokenList를 보여준다. 안에 요소는 하나밖에 없음
    // 만약 <h1 class='heading'></h1> 에서 class 속성을 늘리면 클래스 안의 요소가 여러 개가 된다.
    // output: DOMTokenList ['heading', value: 'heading']

    h1Tag.classList.add('red')  // 이렇게 하면 h1Tag가 빨간 글씨 속성을 갖고 바뀐다. (위쪽에 style 선언을 .red -> crimson으로 미리 해줬음)

    console.log(h1Tag.classList)
    // output: DOMTokenList(2) ['heading', 'red', value: 'heading red']
    h1Tag.classList.remove('red')
    // 이 부분은 글자의 빨간색을 삭제해서 다시 원래 색으로 돌린다!

    h1Tag.classList.toggle('red')
    // 바로 위에서 'red'를 삭제했으니까 add 해줌(만약에 red 속성이 있었으면 클래스 제거 후 False 반환)
  </script>
  ```

### [속성 조작 메서드]
  
  ```Element.getAttribute()```

  * 해당 요소에 지정된 값을 반환

<br>

  ```Element.setAttribute(name, value)```
  
  * 지정된 요소의 속성 값을 설정
  * 속성이 이미 있으면 기존 값을 갱신(그렇지 않으면 지정된 이름과 값으로 새 속성이 추가)

<br>

  ```Element.removeAttribute()```

  * 요소에서 지정된 이름을 가진 속성 제거

### [속성 조작 실습]
  ```h
  // 2. 일반 속성 조작
  const aTag = document.querySelector('a')
  console.log(aTag)  // aTag에 저장된 a 태그가 출력됨

  aTag.setAttribute('href', 'https://www.naver.com/')  // href에 저장된 값이 google에서 naver 도메인으로 바뀜
  // 태그를 바꾸고 'google' 이라고 되어있는 href 태그를 누르면 네이버 페이지로 연결됨

  console.log(aTag.getAttribute('href'))  // href 태그 바뀐 값을 출력

  aTag.removeAttribute('href')  // href 태그의 속성을 삭제
  console.log(aTag.getAttribute('href'))  // output: Null
  ```

## HTML 콘텐츠 조작
### [HTML 콘텐츠 조작]
  * 'textContent' property
  * 요소의 텍스트 콘텐츠를 표현
  * ```<p>lorem</p>```

  ```html
  // 03-contents-manipulation.html 파일 수정
  <script>
    // h1 요소 선택
    const h1Tag = document.querySelector('.heading')
    console.log(h1Tag)  // 이건 잘 선택됐는지 확인용으로 출력 찍어주는 거라고 보면 됨
    console.log(h1Tag.textContent) // .textContent로 하면 태그 안에 있는 텍스트 콘텐츠만 생성해준다.

    // h1 요소의 텍스트 콘텐츠를 수정
    h1Tag.textContent = '싸피'  // 바뀐 건 콘솔태그에서 확인 가능
    console.log(h1Tag.textContent)  // 출력
  </script>
  ```

## DOM 요소 조작
### [DOM 요소 조작 메서드]
  * 태그 자체를 만들고 삭제할 수도 있다.
  <br>

  ```document.createElement(tagName)```
  <br>

  * 작성한 tagName의 HTML 요소를 생성하여 반환

  ```Node.appendChild()```
  <br>

  * 한 node를 특정 부모 Node의 자식 NodeList 중 마지막 자식으로 삽입
  * 추가된 Node 객체를 반환

  ```Node.removeChilde()```
  <br>
  * DOM에서 자식 Node 제거
  * 제거된 Node를 반환

### [DOM요소 조작 실습]
  * 실습 파일: 04-dom-manipulation.html
  ```html
  <script>
    // 부모 요소 선택(요소 생성을 가장 먼저 해도 됨)
    const divTag = document.querySelector('div')

    // 첫 번째로 할 것: 요소 생성(요소를 생성해야 거기에 추가하고 수정하고 삭제할 수 있으니까)
    const h1Tag = document.createElement('h1')  // createElement 자체가 값을 반환함 -> 변수에 저장해서 반환
    console.log(h1Tag)

    // 두 번째로 할 것: 값 추가(속성, 클래스 속성, 콘텐츠 etc)
    h1Tag.textContent = '제목입니다.'  // h1 태그를 생성했고 거기에 텍스트로 보여줄 것을 넣어줌
    console.log(h1Tag)  // 이렇게만 해서는 웹 페이지에서 보이지는 않는다.

    // 세 번째로 할 것: 완성한 요소를 문서에 추가, 이걸 띄우기 위해서 위에 부모 태그 요소를 선택해주는 divTag 변수를 미리 설정해놓음
    divTag.appendChild(h1Tag)

    // 4. 요소 삭제
    divTag.removeChild(h1Tag)  // h1Tag 자식 요소가 삭제됨
  </script>
  ```

## Style 조작
### [style 조작]
  * 'style' property
  * 해당 요소의 모든 style 속성 목록을 포함하는 속성

### [style 조작 실습]
  * 05-style-property.html 조작
  * js에서의 주의사항: css는 -(하이픈), _(언더바)를 썼는데 js는 중간에 대문자로 바꿔서 쓴다. (font-size; <- 이건 css, fontSize <- 이건 js에서 쓰이는 문법)
  * head에 style 태그 작성 없이 스타일을 적용시켜 볼거야
  ```html
  보통은 style 시트에 css 요소를 넣어주는데 js 요소로도 조작 가능하다는 것을 보여줌
  <script>
    const pTag = document.querySelector('p')  // 조작하기 위해서는 태그 선택이 먼저
    console.log(pTag)  // 잘 선택되었는지 확인용
    console.log(pTag.style)  // CSSStyleDeclartion 이라는 것으로 콘솔 창에 출력 값이 뜸(이것 저것 많다)
    // .style 을 찍어서 출력시켜보는 이유: js 자체 정의된 이름이 있는데 그걸 확인하기 위한 용도
    pTag.style.color = 'crimson'  // 글자 색이 crimson으로 바뀜
    pTag.style.fontSize = '2rem'  // fontSize가 바뀐다.
    pTag.style.border = '1px solid black'  // border 속성이 적용됨
  </script>
  ```

## 참고
### [Node]
  * DOM의 기본 구성 단위
  * DOM 트리의 각 부분은 Node라는 객체로 표현됨
    * Document Node -> HTML 문서 전체를 나타내는 노드
    * Element Node -> HTML 요소를 나타내는 노드 ex) <p>
    * Text Node -> HTML 텍스트, Element Node 내의 텍스트 콘텐츠를 나타냄
    * Attribute Node -> HTML 요소의 속성을 나타내는 노드

### [NodeList]
  * DOM 메서드를 사용해 선택한 Node의 목록
  * 배열과 유사한 구조를 가짐
  * Index로만 각 항목에 접근 가능
  * 다양한 배열 메서드에 사용 가능: 반복문 돌릴 수 있다!
  * querySeletorAll()에 의해 반환되는 NodeList는 DOM의 변경사항을 <span style='color:orange'>실시간으로 반영하지 않음</span>

### [Element]
  * Node의 하위 유형
  * Element는 DOM 트리에서 HTML 요소를 나타내는 특별한 유형의 Node
  * 예를 들어 p, div, span, body 등의 HTML 태그들이 Element 노드를 생성
  * Node의 속성과 메서드를 모두 가지고 있으며 추가적으로 요소 특화된 기능(예: className, innerHTML, id 등)을 가지고 있음
  * 모든 Element는 Node이지만, 모든 Node가 element인 것은 아님

### [DOM 속성 확인 Tip]
  * 개발자 도구 > Element > Properties
  * 해당 요소의 모든 DOM 속성 확인 가능
  * JavaScript 공부할 때도 <span style='color:red'>MDN 문서</span>를 많이 봐주세요~

### [parsing]
  * 구문 분석, 해석
  * 브라우저가 html 문자열을 해석하여 DOM Tree로 만드는 과정
  * DOM 구조를 정리하고, style을 입히고 layout을 마무리해서 우리가 보는 브라우저 화면을 띄워준다. (이 과정이 굉장히 빠르게 처리된다)


## 콘솔 로그 스니펫 설정
  1. File > Preference > Configure User Snippet 클릭
  2. Custom_snippet.json 파일 클릭
  3. 구글에서 snippet generator 검색
    * Description: js print
    * Tab trigger: csl
    * Your snippet: consolelog()
    copy snippet 클릭해서 json 파일에 옮겨주기
  4. 처음 마우스 입력 장소를 찍어주기 위해서 ```console.log($0)``` $0 표시

### 과제 1-2 막힌 부분
  1. b 태그 안에 id="name", id="job" 이런 식으로 나뉘는데 어떻게 해서 설정해줄까?