### 231026 Controlling Event

# 이벤트
## 개요
### [Event]
  * 무언가 일어났다는 신호, 사건
  * 모든 DOM 요소는 이러한 event를 만들어 냄
  * 웹에서의 이벤트: 클릭, 드래그, 입력 etc

### [event object]
  * DOM에서 이벤트가 발생했을 때 생성되는 객체
  * 이벤트 종류
    * mouse, input, keyboard, touch(터치 스크린이 가능한 device)
    * https://developer.mozilla.org/en-US/docs/Web/API/Event

### [DOM 요소는 event를 받고 받은 event를 '처리'할 수 있음]
  * event handler: 이벤트 처리기에서 이벤트를 조작

## event handler
### [event handler]
  * 이벤트가 발생했을 때 실행되는 함수
  * 사용자의 행동에 어떻게 반응할지를 JavaScript 코드로 표현한 것

### [.addEventListner()]
  * 대표적인 event handler 중 하나
  * 특정 이벤트를 DOM 요소가 수신할 때마다 <b style='color:orange'>콜백 함수</b>를 호출
  * 이벤트를 처리할 타겟(특정 DOM요소)이 해당 메서드 앞에 필요하다.
  * 화살표 함수랑 this를 쓸 때 같이 써도 될까를 조심스럽게 사용해야 한다.

### EventTarget.addEventListener(type, handler)
  * EventTarget: DOM 요소
  * type
    * 수신할 이벤트 이름(종류)
    * 문자열(str)로 작성한다.
    * 'click'이 많이 들어감
    * 궁금했던 것: 여기에 임의로 문자열을 집어넣어도 되려나? 안 될 것 같지만 궁금해서 문서 찾아봄
      * 

  * handler: 콜백함수
    * 발생한 이벤트 객체를 수신하는 콜백 함수
    * 콜백 함수는 발생한 Event object를 유일한 매개변수로 받음
  * 어떤 대상에 특정 Event가 발생하면 지정한 이벤트를 받아 할 일을 등록한다.

### [addEventListener 활용]
  * 버튼을 클릭하면 버튼 요소 출력하기
  * 버튼에 이벤트 처리기를 부착하여 클릭 이벤트가 발생하면 이벤트가 발생한 버튼 정보를 출력
  * 1번 파일에서 실습

### [addEventListener 콜백 함수 특징]
  * 발생한 이벤트를 나타내는 Event 객체를 유일한 매개변수로 받음
  * 아무것도 반환하지 않음
  * 재사용성 유무를 판단해서 다른 곳에 미리 함수를 만들어놓거나 만들지 안히

## 버블링
  ### [버블링(Bubbling)]
  * 2번 파일에서 실습
  * 한 요소에 이벤트가 발생하면 이 요소에 할당된 핸들러가 동작하고 이어서 부모 요소의 핸들러가 동작하는 현상(이벤트 전파)
  * 가장 최상단의 조상 요소(document)를 만날 때까지 이 과정이 반복되면서 요소 각각에 할당된 핸들러가 동작
  * 다른 이벤트로는 캡쳐링이 있다. (부모 -> 자식 요소로 영향을 미치는 것)
  * 버블링은 자식 -> 부모 요소로 전파됨
  
### [버블링 예시]
  * 가장 안쪽의 p 태그 요소를 클릭하면 p -> div -> form 순서로 3개의 이벤트 핸들러가 동작

### [event.target, event.currentTarget 속성]
  * 'target' 속성: target 요소를 더 많이 사용한다.
    * 이벤트가 발생한 가장 안쪽의 요소(target)를 참조하는 속성
    * 실제 이벤트가 시작된 target 요소
    * 버블링이 진행 되어도 변하지 않음
  * 'currentTarget' 속성
    * '현재' 요소
    * 항상 이벤트 핸들러가 연결된 요소만을 참조하는 속성
    * 'this'와 같음

### ['target' & 'currentTarget' 예시]
  * 세 요소 중 가장 최상위 요소인 outerouter 요소에만 이벤트 핸들러가 부착
  * 각 요소를 클릭했을 때 event의 target과 currentTarget의 차이 비교
  * 'target'
    * 실제 이벤트가 발생하는 요소를 가리킴
  * 'currentTarget'
    * 핸들러가 연결된 outerouter 요소만을 가리킴
  * 핸들러는 outerouter에 하나밖에 없지만 이 핸들러에서 outerouter의 내부 모든 하위 요소에서 발생하는 클릭 이벤트를 잡아내고 있음
  * 클릭 이벤트가 어디서 발생했든 상관없이 outerouter까지 이벤트가 버블링 되어 핸들러를 실행시키기 때문
  * 3번 실습 파일 참고

# event handler 활용
## event handler 활용 실습
  * 이 부분은 혼자서 연습을 세 번씩 해보기!!
  * 1번이 가장 심플한 예제! (이 예제부터 코드를 안 보고 주석으로 순서를 달아놓고 하나씩 작성을 해보는 연습해보기)
  * 이 부분은 html 작성된 파일 참고하기

  * 입력할 때 -> 입력하는 이벤트 리스너를 알아야 한다. 모르니까 mdn (z lzdjnn)

## <b style='color:red'>이벤트 기본 동작 취소</b> :star::star::star::star:
### [.preventDefault()]
  * 해당 이벤트에 대한 기본 동작을 실행하지 않도록 지정
  * submit 때문에 막히는 경우가 있는데 그걸 방지해주는 게 prevent default다!

### [이벤트 동작 취소 실습]
  * copy 이벤트 동작 취소

