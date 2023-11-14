* 스켈레톤 코드가 없다.
* 처음부터 코드를 만들어서 구현해야 한다.(최종 프로젝트도 같은 형태-명세만 주어지고 아예 처음부터 구현해야 한다)

## vue_ws_8_1 순서
  1. gitignore 생성

    $ touch .gitignore

      * gitignore.io에서 소스 복사해오기
      * git이랑 관련된 코드라면 무조건 gitignore 부터 생성하자
  

  2. 가상환경 생성

    $ python -m venv venv


  3. 가상환경 실행

    $ source venv/Scripts/activate


  4. django 설치

    $ pip install django==4.2


  5. drf 설치

    $ pip install djangorestframework

      * 검색해서 공식 문서를 찾아봄
      * djangorestframework만 설치하면 됨

    
  6. project 설치

    $ django-admin startproject blog_api_service .

      * 뒤에 .을 주의하자! (현재 directory에 만든다는 의미!)


  7. App 생성(App 이름: posts)

    $ python manage.py startapp posts


  8. settings.py에 App 등록

    * settings > INSTALLED_APPS에 등록

  ```python
  INSTALLED_APPS = [
    ...,
    'posts',
    ...,
  ]
  ```


  9. urls.py 수정

  ```python
    # blog_api_service/urls.py

    from django.urls import path, include

    urlpatterns = [
      # admin으로 가는 path는 생략,
      path('api/v1/', include('posts.urls')),
    ]
  ```
    * include를 끌고 와서 뒤에 posts.urls로 보내주는 코드를 작성해준다.

  ```python
  # posts/urls.py

  from django.urls import path
  from . import views

  urlpatterns = [
      path('posts/', )  # 이 뒤에 path가 향하는 곳은 3번에서 작성
  ]
  ```

    * urls.py를 posts 내에서도 생성(코드는 blog_api_service/urls.py에서 끌고 옴)


  10. restframework 등록

  ```python
    INSTALLED_APPS = [
      ...,
      'rest_framework',
      ...,
    ]
  ```

    * INSTALLED_APPS에 'rest_framework', 등록해준다.

  11. model 등록

    * 명세에 나온대로 작성해줍니다.
    * 내가 놓친 부분: double underbar(던더바로 미리 선언해주는 부분: 추후에 개발할 때 활용하려고 => 어디에 쓰지 근데?)
    
  ```python
  from django.db import models

  # Create your models here.
  class Category(models.Model):
      name = models.CharField(max_length=250)
      # 이 내용을 미리 만들어주면 편하다.
      def __str__(self):
          return self.name
    

  class Post(models.Model):
      category = models.ForeignKey(Category, on_delete=models.CASCADE)
      title = models.CharField(max_length=100)
      content = models.CharField(max_length=250)
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)

      def __str__(self):
          return f'[Category: {self.category}] {self.title}' 


  class Comment(models.Model):
      post = models.ForeignKey(Post, on_delete=models.CASCADE)
      content = models.CharField(max_length=250)
      created_at = models.DateTimeField(auto_now_add=True)
      def __str__(self):
          return self.content
  ```

    * 자! 모델 클래스 다 만들면 뭘 해줘야 하지?
    * migrate 해줘야 한다!(makemigrations -> migrate 차례로 진행)

* 여기까지 하면 ws_8_1 완료
### rooms for improvement at here
  1. urls.py 수정하는 부분
  2. app 내에도 urls.py를 생성해준다.