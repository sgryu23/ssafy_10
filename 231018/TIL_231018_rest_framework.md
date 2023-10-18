# Django REST Framework 1

# 1. REST API
### <span style="color: skyblue">**[API]**</span>

  * Application Programming Interface 의 약자로 애플리케이션과 프로그래밍으로 소통하는 방법
  * 클라이언트-서버처럼 서로 다른 프로그램에서 <span style="color: #ffd33d">요청과 응답</span>을 받을 수 있도록 만든 체계

### <span style="color: skyblue">**[API란?]**</span>

  * 예를 들어 우리 집 냉장고에 전기를 공급해야 한다고 가정해보자
  * 우리는 그냥 냉장고의 플러그를 소켓에 꽂으면 제품이 작동한다.
  * 중요한 것은 우리가 가전 제품에 전기를 공급하기 위해 직접 배선을 하지 않는다는 것
  -> 복잡한 코드를 추상화하여 대신 사용할 수 있는 몇 가지 더 쉬운 구문을 제공

### <span style="color: skyblue">**[Web API]**</span>

  * 웹 서버 또는 웹 브라우저를 위한 API
  * 현대 웹 개발은 하나부터 열까지 직접 개발하기보다 여러 Open API를 활용하는 추세
  * 대표적인 Third Party Open API 서비스 목록
    * Youtube API
    * Google Map API
    * Naver Papago API
    * Kakao Map API

### <span style="color: skyblue">**[REST]**</span>

  * Representational State Transfer
  * API Server를 개발하기 위한 일종의 소프트웨어 설계 방법론(약속, 규칙은 아님)

### <span style="color: skyblue">**[RESTful API]**</span>

  * REST 원리를 따르는 시스템을 RESTful 하다고 부름
  * <span style="color: red">자원을 정의</span>하고 <span style="color: red">자원에 대한 주소를 지정</span>하는 전반적인 방법을 서술
  * 각각 API 구조를 작성하는 모습이 너무 다르니 약속을 만들어서 다같이 통일해서 쓰자

### <span style="color: skyblue">**[REST API]**</span>

  * REST라는 설계 디자인 약속을 지켜 구현한 API

### <span style="color: skyblue">**[REST에서 자원을 정의하고 주소를 지정하는 방법]**</span>

  1) 자원의 식별
    * URI
  2) 자원의 행위
    * HTTP Methods: GET, POST
  3) 자원의 표현
    * JSON 데이터
    * 궁극적으로 표현되는 데이터 결과물

## <span style="color: #007777">**[자원의 식별]**</span>

### <span style="color: skyblue">**[URI(Uniform Resource Identifier, 통합 자원 식별자)]**</span>
  * 인터넷에서 리소스(자원)를 식별하는 문자열
  * 가장 일반적인 URI는 웹 주소로 알려진 URL

### <span style="color: skyblue">**[URL(Uniform Resource Locator, 통합 자원 위치)]**</span>

  * 웹에서 주어진 리소스의 주소
  * 네트워크 상에 리소스가 어디 있는지를 알려주기 위한 약속

### <span style="color: skyblue">**[Schema(or Protocol)]**</span>

  * 브라우저가 리소스를 요청하는 데 사용해야 하는 규약
  * URL의 첫 부분은 브라우저가 어떤 규약을 사용하는지를 나타냄
  * 기본적으로 웹은 HTTP(S)를 요구하며 메일을 열기 위한 mailto:, 파일을 전송하기 위한 ftp: 등 다른 프로토콜도 존재
  * 여담: HTTP + Security(HTTPS)를 쓰는 추세, http로 주소가 시작하면 보안의 위험성이 있어서 경고 메시지가 뜬다고 함

### <span style="color: skyblue">**[Domain Name]**</span>

  * 요청 중인 웹 서버를 나타냄
  * 어떤 웹 서버가 요구된는 지를 가리키며 직접 IP 주소를 사용하는 것도 가능하지만, 사람이 외우기 어렵기 때문에 주로 Domain Name으로 사용
  * 예를 들어 도메인 google.com의 IP 주소는 142.251.42.142

### <span style="color: skyblue">**[Port]**</span>

  * 웹 서버의 리소스에 접근하는데 사용되는 기술적인 문(Gate)
  * HTTP 프로토콜의 표준 포트
    * HTTP - 90
    * HTTP - 443
  * 표준 포트만 생략 가능

### <span style="color: skyblue">**[Path]**</span>

  * 웹 서버의 리소스 경로
  * 초기에는 실제 파일이 위치한 물리적 위치를 나타냈지만 현재는 실제 위치가 아닌 추상화 된 형태의 구조를 표현
  * 예를 들어 /articles/create/가 실제 articles 폴더 안에 create 폴더 안을 나타내는 것은 아님

### <span style="color: skyblue">**[Parameters]**</span>

  * 웹 서버에 제공하는 추가적인 데이터
  * '&' 기호로 구분(여러 개의 파라미터를 보낼 때)되는 key-value 쌍 목록
  * 서버는 리소스를 응답하기 전에 이러한 파라미터를 사용하여 추가 작업을 수행할 수 있음

### <span style="color: skyblue">**[Anchor]**</span>
  * 일종의 '북마크'를 나타내며 브라우저에 해당 지점에 있는 콘텐츠를 표시
  * fragment identifier(부분 식별자)라고 부르는 '#' 이후 부분은 서버에 전송되지 않음
  * https://docs.djangoproject.com/en/4.2/intro/install/#quick-install-guide 요청에서 #quick-install-guide는 서버에 전달되지 않고 브라우저에게 해당 지점으로 이동할 수 있도록 함

## <span style="color: #007777">**자원의 행위**</span>
### <span style="color: skyblue">**[HTTP Request Methods]**</span>
  * 리소스에 대한 행위(수행하고자 하는 동작)를 정의
  * HTTP verbs 라고도 함

### <span style="color: skyblue">**[대표 HTTP Request Methods]**</span>
  1. GET
    * 서버에 리소스를 표현을 요청
    * GET을 사용하는 요청은 데이터만 검색해야 함
  2. POST
    * 데이터를 저장된 리소스에 제출
    * 서버의 상태를 변경
  3. PUT
    * 요청한 주소의 리소스를 수정
  4. DELETE
    * 지정된 리소스를 삭제

### <span style="color: skyblue">**[HTTP response status codes]**</span>
  * 특정 요청이 성공적으로 완료되었는지 여부를 나타냄
  * 이 부분을 소홀히 할 수 있는데 잘 이해하기!
  * 5개의 응답 그룹
    * Informational Responses(100-199)
    * Successful Responses(200-299)
    * Redirection Messages(300-399)
    * Client Error Responses(400-499)
    * Server Error Responses(500-599)

## <span style="color: #007777">**[자원의 표현]**</span>
### <span style="color: skyblue">**[그동안 서버가 응답(자원을 표현)했던 것]**</span>
  * 지금까지 Django 서버는 사용자에게 페이지(html)만 응답하고 있었음
  * 하지만 서버가 응답할 수 있는 것은 페이지 뿐만 아니라 다양한 데이터 타입을 응답할 수 있음
  * REST API는 이 중에서도 JSON 타입으로 응답하는 것을 권장

### <span style="color: skyblue">**[응답 데이터 타입의 변화(그림으로 정리)]**</span>
  1. 페이지(html)만을 응답하는 서버
  2. 이제는 JSON 데이터를 응답하는 REST API 서버로의 전환
  3. Django는 더 이상 Templates 부분에 대한 역할을 담당하지 않게 되며, Front-end와 Back-end가 분리되어 구성됨
  4. 이제부터 Django를 사용해 RESTful API 서버를 구축할 것

## <span style="color: #007777">**사전 준비**</span>
### <span style="color: skyblue">**[사전 준비]**</span>
  * 사전 제공된 99-json-response-practice 기반 시작
  * 가상 환경 생성, 활성화 및 패키지 설치
  * migrate 진행
    * $ python manage.py migrate
  * 준비된 fixtures 파일을 load 하여 실습용 초기 데이터 입력
    * $ python manage.py loaddata articles.json
  * http://127.0.0.1:8000/api/v1/articles/ 요청 테스트

### <span style="color: skyblue">**[python으로 json 응답 받기]**</span>
  * 준비된 python-request-sample.py 확인
  * 가상환경 세팅 > django 설치, django-extensions, djangorestframework 설치(djangorestframework 설치를 안 했더니 migrate가 안 됨)
  * migrate 하기
  * 서버 실행하기
  * http://127.0.0.1:8000/api/v1/articles/ 으로 들어가기 -> 처음 보는 형태의 페이지
  * pip install requests 하고 나서
  * python python-request-sample.py 입력 -> <class 'list'>라고 뜬다.

  ```python
  # dir: 99-json-response-practice > python-request-sample.py
  import requests
  from pprint import pprint


  response = requests.get('http://127.0.0.1:8000/api/v1/articles/')

  # json을 python 타입으로 변환
  result = response.json()

  print(type(result))
  # pprint(result)
  # pprint(result[0])
  # pprint(result[0].get('title'))

  ```

# 2. DRF
## <span style="color: #007777">**DRF 개요**</span>
### <span style="color: skyblue">**[Django REST Framework(DRF)]**</span>
  * Django에서 Restful API 서버를 쉽게 구축할 수 있도록 도와주는 오픈 소스 라이브러리

## <span style="color: #007777">**Serialization**</span>
### <span style="color: skyblue">**[Serialization(직렬화)]**</span>
  * 여러 시스템에서 활용하기 위해 데이터 구조나 객체 상태를 나중에 재구성 할 수 있는 포맷으로 <span style="background: #f1f8ff">변환</span>하는 과정
  * 어떠한 언어나 환경에서도 나중에 다시 쉽게 사용할 수 있는 포맷으로 변환하는 과정

### <span style="color: skyblue">**[Serialization 예시]**</span>
  * 데이터 구조나 객체 상태를 나중에 재구성할 수 있는 포맷으로 변환하는 과정



# 3. DRF with Single Model
## <span style="color: #007777">**DRF with Single Model**</span>
### <span style="color: skyblue">**[프로젝트 준비]**</span>
  * 사전 제공된 drf 프로젝트 기반 시작
    * 여기서부터는 "10-01-django-rest-framework"에서 진행
  * 가상 환경 생성, 활성화 및 패키지 설치
  * migrate 진행
    * $ python manage.py migrate
  * 준비된 fixtures 파일을 load 하여 실습용 초기 데이터 입력
    * $ python manage.py loaddata articles.py

### <span style="color: skyblue">**[Postman 설치 및 안내]**</span>
  * Postman 설치: 구글에 Postman download 검색 -> 다운로드 받기
  * Postman
    * API를 구축하고 사용하기 위한 플랫폼
    * API를 빠르게 만들 수 있는 여러 도구 및 기능을 제공
  * Postman 들어가서..
    * Workspaces > My workspace
    * 위에 + 눌러서 Untitled Request 하나 생성
  * Postman 화면 구성: 이건 그림이라서 교재 보기(p.52)

### <span style="color: skyblue">**[URL과 HTTP requests methods 설계]**</span>
  * 여기도 표 그림
  * 교재 보기(p.53)

## <span style="color: #007777">**GET**</span>
### <span style="color: skyblue">**[GET: List 1]**</span>
  * 게시글 데이터 목록 조회하기
  * 게시글 데이터 목록을 제공하는 ArticleListSerializer 정의
    1. articles 폴더(교재에서는 위치 자유롭게 작성하라고 하네?)에 serializers.py 생성(파일 이름 오타 주의!)
    2. 들고 올 거 위에 선언해주기(아래 코드에 작성)
    [serializers 코드]
    ```python
    from rest_framework import serializers
    from .models import Article


    class ArticleListSerializer(serializers.ModelSerializer):
        class Meta:
            model = Article
            fields = ('id', 'title', 'content',)
    ```

### <span style="color: skyblue">**[ModelSerializer]**</span>
  * Django 모델과 연결된 Serializer 클래스

### <span style="color: skyblue">**[GET: List 2]**</span>
  * url 및 view 함수 작성
  * 오늘은 templates 작성을 하지 않는다. (json 형태로 넘겨줄 거라고 함? 뭔 말인지는 모르겠지만 일단 따라가자)
  1. url 작성(urlpatterns 안에 있는 것 작성)
  위치: articles > urls.py
  ```python
  from django.urls import path
  from articles import views


  urlpatterns = [
      path('articles/', views.article_list),
  ]
  ```

  2. view 함수 작성
  위치: article > views.py
  ```python
  from rest_framework.response import Response
  from rest_framework.decorators import api_view   # 데코레이터 불러오기
  from .models import Article
  from .serializers import ArticleListSerializer


  @api_view(['GET'])   # 데코레이터가 있어야 함!, 괄호 안은 허용하는 HTTP method만 넣어주기
  def article_list(request):
      articles = Article.objects.all()
      serializer = ArticleListSerializer(articles, many=True)
      return Response(serializer.data)
  ```

### <span style="color: skyblue">**[GET: List 3]**</span>
  * http://127.0.0.1:8000/api/v1/articles/ 응답 확인

### <span style="color: skyblue">**[이전 view 함수와의 비교]**</span>
  * 똑같은 데이터를 HTML에 출력되도록 페이지와 함께 응답했던 과거의 view 함수, JSON 데이터로 serialization 하여 페이지 없이 응답하는 현재의 view 함수

### <span style="color: skyblue">**['api_view' 데코레이터]**</span>
  * *DRF view 함수에서는 필수로 작성*되며 view 함수를 실행하기 전 HTTP 메서드를 확인
  * 기본적으로 GET 메서드만 허용되며 다른 메서드 요청에 대해서는 405 Method Not Allowed로 응답
  * DRF view 함수가 응답해야 하는 HTTP 메서드 목록을 작성

### <span style="color: skyblue">**[GET: Detail 1]**</span>
  * **단일** 게시글 데이터 조회하기
  * 각 게시글의 상세 정보를 제공하는 ArticleSerializer 정의
  경로: articles/serializers.py
  ```python
  class ArticleSerializer(serializers.ModelSerializer):
      class Meta:
          model = Article
          fields = '__all__'
  ```

### <span style="color: skyblue">**[GET: Detail 2]**</span>
  * url 및 view 함수 작성
  1. url 생성
  경로: articles > urls.py
  articles/<int:article_pk> 추가
  ```python
  urlpatterns = [
      path('articles/', views.article_list),
      path('articles/<int:article_pk>', views.article_detail),
  ]
  ```
  2. views.py에서 함수 생성
  ```python
  from .serializers import ArticleListSerializer, ArticleSerializer


  @api_view(['GET'])
  def article_detail(request, article_pk):
      article = Article.objects.get(pk=article_pk)
      serializer = ArticleSerializer(article)
      return Response(serializer.data)
  ```

### <span style="color: skyblue">**[GET: Detail 3]**</span>
  * http://127.0.0.1:8000/api/v1/articles/1/ 응답 확인
  * 페이지 내용 잘 뜬다는 것만 확인(문제가 없군)

## <span style="color: #007777">**POST**</span>
### <span style="color: skyblue">**[POST 1]**</span>
  * 게시글 데이터 생성하기
  * 데이터 생성이 성공했을 경우: 201 Created 를 응답
  * 데이터 생성이 실패했을 경우: 400 Bad request를 응답

### <span style="color: skyblue">**[POST 2]**</span>
  * article_list view 함수 구조 변경(method에 따른 분기 처리)
  * 코드는 아래에 한 번에 작성
  1. library import 창에 rest_framework에서 status 불러오는 것 추가
  2. 데코레이터 @api_view(여기에) 'POST' 추가
  3. if, elif로 method에 따른 분기 처리

### <span style="color: skyblue">**[POST 3]**</span>
  * http://127.0.0.1:8000/api/v1/articles/ 응답 확인
  * 또는 Postman으로 POST 선택하고 서버에 던져보고 출력값 확인
    * Postman으로 확인하는 방법
    1. Postman 사이트 들어간다.
    2. URL 입력 칸에 http://127.0.0.1:8000/api/v1/articles/ 입력 후 아래 post 할 값(Body: title, content를 채움)을 채워서 Send 버튼 클릭
    3. 아래에서 결과값 및 status 확인(201 Created 인지)

### <span style="color: skyblue">**[POST 4]**</span>
  * 새로 생성된 게시글 데이터 확인
  * http://127.0.0.1:8000/api/v1/articles/21 을 postman에서 get으로 받아보기(원하는 결과가 출력이 되는지)

### <span style="color: skyblue">**[POST 관련 작성 코드 & 주석]**</span>
  ```python
  @api_view(['GET', 'POST'])
  def article_list(request):
      if request.method == 'GET':
          articles = Article.objects.all()
          serializer = ArticleListSerializer(articles, many=True)
          return Response(serializer.data)
      
      elif request.method == 'POST':  # code 작성 가이드에 else라고 쓰지 말고 명시 해줄 것을 지시함(헷갈리지 않게 하기 위해서)
          serializer = ArticleSerializer(data=request.data)
          if serializer.is_valid():
              serializer.save()
              return Response(serializer.data, status=status.HTTP_201_CREATED)    # 요청이 성공하면 데이터 생성 메시지 반환
          return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    # 이건 요청이 실패했을 때 응답 코드 반환
  ```

## <span style="color: #007777">**DELETE**</span>
### <span style="color: skyblue">**[DELETE 1]**</span>
  * 게시글 데이터 삭제하기
  * 요청에 대한 데이터 삭제가 성공했을 때: 204 No Content 응답
  articles > views.py 에서 코드 수정
    1. api_view 데코레이터에 DELETE 추가
    2. 위에 article_list 함수에서 했던 것처럼 method에 따른 분기 구분
    3. 역시 elif로 DELETE 해준다.


  ```python
  @api_view(['GET', 'DELETE'])
  def article_detail(request, article_pk):
      article = Article.objects.get(pk=article_pk)
      if request.method == 'GET':
          serializer = ArticleSerializer(article)
          return Response(serializer.data)
      elif request.method == 'DELETE':
          article.delete()                                    # 삭제는 코드 이게 끝
          return Response(status=status.HTTP_204_NO_CONTENT)  # 204라는 메시지를 담아줘야 한다.
  ```

### <span style="color: skyblue">**[DELETE 2]**</span>
  * DELETE http://127.0.0.1:8000/api/v1/articles/21 응답 확인
  * postman 사이트에서 진행하면 토글 열어서 DELETE 클릭
  * 도메인 주소 치고 Send (이건 데이터를 삭제만 하는 거니까 데이터를 입력하거나 하는 과정을 거치지 않아도 된다.)


## <span style="color: #007777">**PUT**</span>
### <span style="color: skyblue">**[PUT 1]**</span>
  * 게시글 데이터 수정하기
  * 요청에 대한 데이터 수정이 성공했을 때는 200 OK 응답
  ```python
  @api_view(['GET', 'DELETE', 'PUT'])
  def article_detail(request, article_pk):
      # 위에 GET, DELETE는 생략
      elif request.method == 'PUT':
          serializer = ArticleSerializer(article, data=request.data)
          if serializer.is_valid():   # 유효한 값이면 저장하고 Response return
              serializer.save()
              return Response(serializer.data)
          return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # 실패했을 때 리턴하는 값은 article_list에서 요청 실패했을 때 반환하는 코드와 똑같다(400_BAD_REQUEST)
  ```

### <span style="color: skyblue">**[PUT 2]**</span>
  * Postman에 PUT, body 에 title, content 키 값에 넣고 해당 값에 수정할 값 넣고 Send해서 http://127.0.0.1:8000/api/v1/articles/1/ 응답 확인
  * GET으로 수정된 데이터 http://127.0.0.1:8000/api/v1/articles/1/ 확인


# 참고(지만 DRF에서 국룰처럼 쓰는 것!)
### <span style="color: skyblue">**[raise_exception]**</span>
  * is_valid()는 유효성 검사 오류가 있는 경우 ValidationError 예외를 발생시키는 선택적 *raise_exception* 인자를 사용할 수 있음
  * DRF에서 제공하는 기본 예외 처리기에 의해 자동으로 처리되며 기본적으로 HTTP 400 응답을 반환
  * 경로: articles/views.py 에서 수정
  ```python
  @api_view(['GET', 'POST'])
  def article_list(request):
      # GET 부분은 생략
      elif request.method == 'POST':
          serializer = ArticleSerializer(data=request.data)
          if serializer.is_valid(raise_exception=True):  # 위에서는 is_valid() 괄호 안에 뭐 안 넣었는데 괄호 안에 raise_exception=True 넣으면 아래에 에러 메시지 리턴하라는 구문을 안 넣어도 된다. (더 간단한 방법)
              serializer.save()
              return Response(serializer.data, status=status.HTTP_201_CREATED)    # 요청이 성공하면 데이터 생성 메시지 반환
          # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
          # raise_exception=True라고 넣어주면 여기에 해당하지 않으면 자동으로 해당 400_BAD_REQUEST를 반환해줌
  ```

## <span style="color: #007777">**그 외**</span>
django REST framework 공식 문서를 보는 버릇을 들이기!
여기: https://www.django-rest-framework.org/