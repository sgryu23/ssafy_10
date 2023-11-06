# 231017(Tue)_Many M_relationships 2

## Many to many relationships 2
### Following, Follower 설정하기
<hr>

#### 팔로우

##### <프로필 페이지>

* 각 회원의 개인 프로필 페이지에 팔로우 기능을 구현하기 위해 프로필 페이지를 먼저 구현

<br>

##### <프로필 구현>
1. url 작성
* accounts > urls.py 에서 진행
```python
  app_name = 'accounts'
urlpatterns = [
    ...
    path('profile/<username>/', views.profile, name='profile'),
    # 만약 path에 profile/이 없다면 
    # 위에 걸리지 않으면 다 username으로 걸려버린다.
]
```
* profile 없이 아래와 같이 작성하면 뭐가 문제일까?
```python
path('<username>/', views.profile, name='profile'),
```
* 위에서 username으로 걸릴 수 있는 곳에 다 걸려버린다. 그래서 profile/을 앞에 작성해줌

<br>
2. view 함수 작성

* accounts/views.py 에서 작성
```python
def profile(request, username):
    person = get_user_model().objects.get(username=username)
    context = {
        'person': person,
    }
    return render(request, 'accounts/profile.html', context)
```
* User의 Detail 페이지
* User를 조회
* person 뒤에 처음 오는 건 클래스 명인데 get_user_model이 없기 때문에 위에 불러오는 명령어 선언해준다. (아래 코드를 제일 위에 써주라는 말임)
  ```python
  from django.contrib.auth import get_user_model
  ```

<br>

3. profile templates 작성
  * accounts/profile.html 에서 작성
  * 처음에 html 파일이 없고, 큰 틀은 기본 틀을 따라가기 때문에 templates 폴더에 'profile.html'을 생성해줌
  * 큰 틀만 짜주기(유저 이름 + 님의 프로필, 작성한 게시글, 작성한 댓글, 좋아요를 누른 게시글)

```html
<body>
  <h1>{{ person.username }}님의 프로필</h1>
    
  <hr>

  <h2>{{ person.username }} 작성한 게시글</h2>
    {% for article in person.article_set.all %}
      <p>{{ article.title }}</p>
    {% endfor %}
  <!-- article_set: 역참조하겠다는 의미이다. 아래 댓글도 똑같이 역참조한다는 의미로 _set을 써줌 -->
  <hr>

  <h2>{{ person.username }} 작성한 댓글</h2>
    {% for comment in person.comment_set.all %}
      <p>{{ comment.content }}</p>
    {% endfor %}

  <hr>

  <h2>{{ person.username }} 좋아요를 누른 게시글</h2>
    {% for article in person.like_articles.all %}
      <p>{{ article.title }}</p>
    {% endfor %}
</body>
```

4. 프로필 페이지로 이동할 수 있는 링크 작성
  * 누르면 자신의 프로필 페이지 링크로 갈 수 있는 참조 링크 생성
  * a 태그로 'accounts:profile' user.username 생성
  ```python
  <a href="{% url "accounts:profile" request.user.username %}">내 프로필</a>
  ```
  



## Django Fixtures
### Fixtures

## Improve Query
### 쿼리 개선

## 좋아요 누르기(어제 내용 복습)
근데 이거 필기까지 하면서 따라가는 건 불가능한데?


## 