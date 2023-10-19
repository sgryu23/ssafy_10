### TIL 231019 Django REST Framework 2: DRF N:1 관계, 역참조 데이터 수정
# DRF with N:1 Relation
## 사전 준비
### <span style='color: skyblue'>[Comment 모델 정의]
  * Comment 클래스 정의 및 데이터베이스 초기화
  ```python
  class Comment(models.model):
      article = models.ForeignKey(Article, on_delete=models.CASCADE)  # N:1 관계에서 N인 곳에다가 foreignkey를 가져온다.
      content = models.TextField()
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)
  ```
  * Migration 및 fixture 데이터 로드
    * $ python manage.py makemigrations
    * $ python manage.py migrate
    * $ python manage.py loaddata articles.json comments.json

* 여기서 migrate를 제대로 안 시켰더니 뒤에 GET, POST 단계에서 계속 500_INTERNAL_ERROR 리턴됨..;;

### <span style='color: skyblue'>[URL 및 HTTP request method 구성]
  * comments/ : GET(댓글 목록 조회)
  * comments/1/ : GET(단일 댓글 조회), PUT(단일 댓글 수정), DELETE(단일 댓글 삭제)
  * articles/1/comments/ : POST(댓글 생성)

## <span style='color: #007777'>GET
### <span style='color: skyblue'>[GET-List 1]
  * 댓글 목록 조회를 위한 CommentSerializer 정의
  ```python
  # articles/serializers.py

  from .models import Article, Comment   # Comment import 하기


  class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
  ```

### <span style='color: skyblue'>[GET-List 2]
  * url 작성
  ```python
  articles/urls.py

  urlpatterns = [
      # 원래 있던 내용은 안 가져옴
      path('comments/', views.comment_list),  # comments 로 갈 경로 추가
  ]
  ```
  * views.py 에 comment_list 함수가 없으니까 만들러 가자

### <span style='color: skyblue'>[GET-List 3]
  * view 함수 작성
  ```python
  # articles/views.py
  from .models import Article, Comment   # Comment 추가
  from .serializers import ArticleListSerializer, ArticleSerializer, CommentSerializer  # CommentSerializer 추가


  @api_view(['GET'])
  def comment_list(request):
      comments = Comment.objects.all()
      serializer = CommentSerializer(comments, many=True)  # many: 앞에 오는 데이터(comments)가 다중 데이터면 True로 쓴다 정도만 알면 된다. (원리를 세세하게 알 필요까지는 x)
      return Response(serializer.data)
  ```

### <span style='color: skyblue'>[GET-List 4]
  * GET http://127.0.0.1:8000/api/v1/comments/ 응답 확인(postman에서 확인)
  ```python
  {
    "id": 1,
    "content": "Tonight free why name break. 어쩌고 저쩌고",
    "created_at": "1974-12-07T13:38:25Z",
    "updated_at": "1991-01-16T06:45:10Z",
    "article": 20
  },
  ```
  * 댓글의 내용은 보이는데 그 게시물의 외래키 pk 값만 보인다. -> 원 게시글의 제목도 보고 싶다! (그건 아래에서 계속 진행)

### <span style='color: skyblue'>[GET-Detail 1]
  * 단일 댓글 조회를 위한 url 및 view 함수 수정
  1. comments/comment_pk를 전달할 path를 url에서 설정
  ```python
  # articles/urls.py

  urlpatterns = [
    path('comments/<int:comment_pk>/', views.comment_detail),
  ]
  ```
  2. 댓글을 보기 위한 함수 만들기
  ```python
  @api_view(['GET'])
  def comment_detail(request, comment_pk):
      comment = Comment.objects.get(pk=comment_pk)
      serializer = CommentSerializer(comment)
      return Response(serializer.data)
  ```
  3. GET http://127.0.0.1:8000/api/v1/comments/1/ 응답 확인<br>
    * 데이터 하나만 받음
  ```python
  {
    "id": 1,
    "content": "Tonight free why name break. 어쩌고 저쩌고",
    "created_at": "1974-12-07T13:38:25Z",
    "updated_at": "1991-01-16T06:45:10Z",
    "article": 20
  }
  ```

## POST
### <span style='color: skyblue'>[POST 1]
  * 단일 댓글 생성을 위한 url 및 view 함수 작성
  ```python
  # articles/urls.py

  urlpatterns = [
      # 위에 겹치는 내용은 생략
      path('articles/<int:article_pk>/comments/', views.comment_create),
  ]
  ```
  ```python
  # articles/views.py

  @api_view(['POST'])
  def comment_create(request, article_pk):
      article = Article.objects.get(pk=article_pk)
      serializer = CommentSerializer(data=request.data)
      if serializer.is_valid(raise_exception=True):
          serializer.save(article=article)
          return Response(serializer.data, status=status.HTTP_201_CREATED)
  # line 129: serializer.save()
  # 이 상태에서 실행시키면 article 이 없어서 400_BAD_REQUEST 뜬다.
  # 그래서 serializer.save()로 되어 있는 괄호 안에 article=article을 추가해줬다!
  # 그럼에도 불구하고 400 응답이 나오는데, 댓글은 조회는 가능하고 유효성 검사에서는 제외해줘야 한다.
  # 읽기 전용 필드: serializers.py의 CommentSerializer에 가서 read_only_fields 에 가서 article을 제외해준다!

  # articles/serializers.py

  class CommentSerializer(serializers.ModelSerializer):
      class Meta:
          model = Comment
          fields = '__all__'
          read_only_fields = ('article',)  # 데이터를 전송하는 시점에 articles 필드는 유효성 검사에서 제외하고 데이터 조회시에는 출력하도록 만드는 부분 추가!
  ```
  * POST http://127.0.0.1:8000.api/v1/articles/1/comments/ 재요청
  * postman으로 보면 201 Created 잘 뜨는 걸 볼 수 있다.

## DELETE & PUT
### [DELETE & PUT 1]
  * 단일 댓글 삭제 및 수정을 위한 view 함수 작성
  ```python
  # articles/views.py

  @api_view(['GET', 'DELETE', 'PUT'])
  def comment_detail(request, comment_pk):
      comment = Comment.objects.get(pk=comment_pk)
      if request.method == 'GET':                # 원래 GET 만 있을 때는 if 문으로 나눌 필요가 없었는데, DELETE, PUT이 생기면서 추가됨
          serializer = CommentSerializer(comment)
          return Response(serializer.data)

      # DELETE 새로 맹글기
      elif request.method == 'DELETE':
          comment.delete()
          return Response(status=status.HTTP_204_NO_CONTENT)

      # PUT 새로 맹글기
      elif request.method == 'PUT':
          serializer = CommentSerializer(comment, data=request.data)  # 댓글은 수정하더라도 partial이 들어가지 않는다. (부분만 수정하는 게 아니니까)
          if serializer.is_valid(raise_exception=True):
              serializer.save()
              return Response(serializer.data)
  ```

### [DELETE & PUT 2]
  * DELETE http://127.0.0.1:8000/api/v1/comments/21/ 응답 확인
  * postman으로 확인하면 204_NO_CONTENT 메시지 뜨는지 확인 (데이터는 삭제했으니까 출력 부분은 내용이 안 뜸)

### [DELETE & PUT 3]
  * PUT http://127.0.0.1:8000/api/v1/comments/1/ 응답 확인
  * Key: content, Values: '댓글 수정!' 입력 후 PUT으로 Send
  * 댓글 내용 중 content 부분이 '댓글 수정!'으로 바뀌었는지 확인


## 응답 데이터 재구성
### [댓글 조회 시 게시글 출력 내역 변경 1]
  * 댓글 조회 시 게시글 번호만 제공해주는 것이 아닌 '게시글의 제목'까지 제공하기
    * GET으로 받으면 "article": 20 이런 식으로 댓글의 내용을 보여주고 게시글의 pk 값만 보여줬는데 게시글의 제목을 알고 싶다면 어디를 손봐야 할까?

### [댓글 조회 시 게시글 출력 내역 변경 2]
  * 필요한 데이터를 만들기 위한 Serializer는 내부에서 추가 선언 가능!
  ```python
  # articles/serializers.py

  class CommentSerializer(serializers.ModelSerializer):
      # class 안에 class를 또 쓴다.
      class ArticleTitleSerializer(serializers.ModelSerializer):
          class Meta:
              model = Article
              fields = ('title',)
              # 만약 id도 전송하고 싶으면 아래와 같이(교재 내용은 title만 가져와서 위 처럼 코드 설정)
              # fields = ('id', 'title',)

      # override: article 이라는 변수에 ArticleTitleSerializer를 선언한 값(유효성 검사하지 않고 데이터를 불러오기만 하도록 하는 설정값(read_only=True) 설정)
      article = ArticleTitleSerializer(read_only=True)

      class Meta:
          model = Comment
          fields = '__all__'
  ```

### [댓글 조회 시 게시글 출력 내역 변경 3]
  * GET http://127.0.0.1:8000/api/v1/comments/1/ 응답 확인
  * 댓글의 원 글 제목이 article = {title: '내용'}에 담겨서 나온다.


# 역참조 데이터 구성
### <span style='color: skyblue'>[Article -> Comment 간 역참조 관계를 활용한 JSON 데이터 재구성]
  * 아래 2가지 사항에 대한 데이터 재구성하기
    1. 단일 게시글 조회 시 <span style="color: red">해당 게시글에 작성된 댓글 목록 데이터</span>도 함께 붙여서 응답
    2. 단일 게시글 조회 시 <span style="color: red" >**해당 게시글에 작성된 댓글 개수 데이터**</span>도 함께 붙여서 응답

### <span style='color: skyblue'>[1. 단일 게시글 + 댓글 목록 1]
  * Nested relationships
    * 모델 관계 상으로 참조하는 대상은 참조되는 대상의 표현에 포함되거나 중첩될 수 있음
    * 이러한 중첩된 관계는 serializers를 필드로 사용하여 표현 가능<br>
    <span style='color: red'>여기 내용이 시험에 나올 수 있다.</span> (drf 내용에서 헷갈릴 만한 부분이므로)
  ```python
  # articles/serializers.py

  class ArticleSerializer(serializers.ModelSerializer):
      comment_set = CommentSerializer(many=True, read_only=True)  # 읽기 전용으로 만들어줘야 함(사용자로부터 입력받는 필드가 아니므로 유효성 검사 하면 에러가 난다!)

      class Meta:
          model = Article
          fields = '__all__'
  ```

### <span style='color: skyblue'>[1. 단일 게시글 + 댓글 목록 2]
  * GET http://127.0.0.1:8000/api/v1/articles/2/ 응답 확인
  * "comment_set"에 담겨서 댓글이 담겨져 나온다.

### [2. 단일 게시글 + 댓글 개수]
  * 댓글 개수에 해당하는 새로운 필드 생성
  ```python
  # articles/serializers.py

  class ArticleSerializer(serializers.ModelSerializer):
      comment_set = CommentSerializer(many=True, read_only=True)  # 이 부분은 위에서 만들어 줘서 중복된 내용~

      # 댓글 개수에 해당하는 새로운 필드 생성
      # 필드 이름은 직관적으로 짓자-'comment_count'라고 지음
      # 앞에서는 article.comment_set.count() 이런 식으로 썼는데 댓글을 세주는 걸 어떻게 쓸까?
      # 문법: 앞쪽에 쓴 article. 을 없애주고 source='(내용)' 이런 식으로 써준다!
      # source 는 필드를 채우는 데 사용할 속성의 이름
          # source
          # 필드를 채우는 데 사용할 속성의 이름
          # 점 표기법(dotted notation)을 사용하여 속성을 탐색할 수 있음
      # http://127.0.0.1:8000/api/v1/articles/3 을 postman에 GET으로 넣어서 send 후 출력 값을 본다.
      comment_count = serializers.IntegerField(source='comment_set.count', read_only=True)

      class Meta:
          model = Article
          fields = '__all__'
  ```

### [주의] 읽기 전용 필드 지정 이슈
  * 특정 필드를 override 혹은 추가한 경우 read_only_fields 는 동작하지 않음
  * 해당 필드의 read_only 키워드 인자로 작성해야 함
  <옳게 된 표기법>
  ```python
  class ArticleSerializer(serializers.ModelSerializer):
      comment_set = CommentSerializer(many=True, read_only=True)    # 필드 안에다가 read_only=True 키워드를 넣어줘야 함
      comment_count = serializers.IntegerField(source='comment_set.count', read_only=True)

      class Meta:
          model = Article
          fields = '__all__'
  ```
  <옳지 못한 표기법>
  ```python
  class ArticleSerializer(serializers.ModelSerializer):
      comment_set = CommentSerializer(many=True)    # 필드 안에다가 read_only=True 키워드를 넣어줘야 함
      comment_count = serializers.IntegerField(source='comment_set.count')

      class Meta:
          model = Article
          fields = '__all__'
          read_only_fields = ('comment_set', 'comment_count',)      # 이렇게 하면 작동 X
  ```
<br>

# API 문서화
이 부분은 읽어보고 따라해보기만 하자! (문서 읽고 내가 원하는 문서 형태로 customizing)
### <span style='color: skyblue'>[OpenAPI Specification(OAS)]
  * RESTful API를 설명하고 시각화하는 표준화된 방법
  * API에 대한 세부사항을 기술할 수 있는 공식 표준

### <span style='color: skyblue'>[Swagger, Redoc]
  * OAS 기반 API에 대한 문서를 생성하는데 도움을 주는 오픈소스 프레임워크

### <span style='color: skyblue'>[drf-spectacular 라이브러리 1]
  * DRF 위한 OpenAPI 3.0 구조 생성을 도와주는 라이브러리
  * 설치 및 등록(bash에서 진행)<br>
  $ pip install drf-spectacular
  * settings.py 에 가서 INSTALLED_APPS 안에 'drf_spectacular' 추가(아래 코드 참고)
  ```python
  # settings.py

  INSTALLED_APPS = [
    ...,
    'drf_spectacular',
    ...,
  ]
  ```

### <span style='color: skyblue'>[drf-spectacular 라이블러리 2]
  * 관련 설정 코드 입력(OpenAPI 스키마 자동 생성 코드)
  * 구글에 drf spectacular 가서 문서를 찾아 봄
  * settings.py 제일 아래 가서 docs에서 긁어온 코드를 복붙
  ```python
  REST_FRAMEWORK = {
      # YOUR SETTINGS
      'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
  }
  ```

### [drf-spectacular 라이브러리 3]
  * Swagger, redoc 페이지 제공을 위한 url 작성(drf spectacular 문서에서 가져온 것: 내가 짜지 않는다 -> docs 를 읽고 필요한 내용을 가져오기)
  ```python
  # drf/urls.py
  from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

  urlpatterns = [
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
  ]
  ```
  * 이걸 urls.py 에 넣고 난 뒤에 서버 실행시킨 후에 http://127.0.0.1:8000/api/schema 실행시키면 뭔가 다운로드 받아진다.

  * 주소: http://127.0.0.1:8000/api/schema/swagger-ui/ 로 들어가면 알로록달로록한 사이트가 뜬다.

  * 주소: http://127.0.0.1:8000/api/schema/redoc/ 로 들어가면 어떤 사이트가 뜬다.

  * 내용을 수정하려면 문서를 직접 보면서 조작 방법을 알면 된다.

  * Take it for a spin 에서 코드 하나 복사해서 urls.py에 복사 붙여넣기 실습함

### <span style='color: skyblue'>[OAS의 핵심 이점 - "설계 우선" 접근법]
  * API를 먼저 설계하고 명세를 작성한 후 이를 기반으로 코드를 구현하는 방식
  * API의 일관성을 유지하고, API 사용자는 더 쉽게 API를 이해하고 사용할 수 있음
  * 또한 OAS를 사용하면 API가 어떻게 작동하는지를 시각적으로 보여주는 문서를 생성할 수 있으며 이는 API를 이해하고 테스트하는 데 매우 유용
  * 이런 목적으로 사용되는 도구가 Swagger-UI 또는 Redoc

## 참고
### <span style='color: skyblue'>[Django shortcuts functions]
  * render()
  * redirect()
  * <span style='color:red'>get_object_or_404()</span>
  * <span style='color:red'>get_list_or_404()</span>

### <span style='color: skyblue'>[get_object_or_404()]
  * 모델 manager objects에서 get()을 호출하지만 해당 객체가 없을 때는 기존 DoesNotExist 예외 대신 Http404를 raise 함

### <span style='color: skyblue'>[get_object_or_404() 적용]
  ```python
  # articles/views.py

  from django.shortcuts import get_object_or_404, get_list_or_404

  article = Article.objects.get(pk=article_pk)
  comment = Article.objects.get(pk=comment_pk)

  # 위 코드를 모두 다음과 같이 변경
  article = get_object_or_404(Article, pk=article_pk)
  comment = get_object_or_404(Comment, pk=comment_pk)
  ```

### <span style='color: skyblue'>[get_list_or_404()]
  * 모델 manager objects에서 filter()의 결과를 반환하고 해당 객체 목록이 없을 때는 Http404를 raise 함

### <span style='color: skyblue'>[get_list_or_404() 적용]
```python
  # articles/views.py

  from django.shortcuts import get_object_or_404, get_list_or_404

  article = Article.objects.get(pk=article_pk)
  comment = Article.objects.get(pk=comment_pk)

  # 위 코드를 모두 다음과 같이 변경
  article = get_list_or_404(Article, pk=article_pk)
  comment = get_list_or_404(Comment, pk=comment_pk)
  ```

### get_object_or_404 vs get_list_or_404 비교
  * object: object() 객체에서 <span style='color: red'>get()</span>을 호출, 없으면 http404를 raise 함
  * list: object에서 <span style='color: red'>filter()</span>의 결과를 반환하고 없으면 http404를 raise 한다.

### get_object_or_404 & get_list_or_404는 왜 사용해야 할까?
  * 클라이언트에게 "서버에 오류가 발생하여 요청을 수행할 수 없다(500)"라는 원인이 정확하지 않은 에러를 제공하기 보다는<br>
  <span style='color: red'>적절한 예외 처리</span>를 통해 클라이언트에게 보다 정확한 에러 현황을 전달하는 것도 중요한 개발 요소 중 하나이기 때문이다.


### 실습 7-5, 8-5는 yasg는 지원이 종료된 서비스 -> 오늘 배운 drf-spectacular 활용해서 문제를 푸세요~