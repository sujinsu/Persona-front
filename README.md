# Persona-front

## 1. 팀원 역할, PJT 주제 및 개요



#### - 이수진 (Guild, Profile, game 탭)

#### - 정인하  (Movie, Collection, Home 탭)



### - 서비스 개요

- 영화 사용자 기반 추천 서비스
- 영화 취향 주고받는 공간
- 영화 관련 관심사 소통 커뮤니티



#### A. 언어

- Python 3.9.7
- Django
- Node.js 16.13.0
- Vue.js 
  - vue/cli 4.5.15



#### B. 도구

- Vscode

- Chrome Browser

- notion

- draw.io

  

#### C. 아키텍처

- Django REAT API서버 & Vue.js

---

## 2. 기능 및 구현 내용



![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/bcc81e52b4240a91437b4f213dc91fbb/image.png)

### - Home

- 현재 인기 영화 TOP 10 (TMDB API)
  TMDB API로 요청을 보내서 현재 인기 영화를 불러옴

- 영화추천 기능
  랜덤으로 10개의 영화를 보여주고 현재 마음에 드는 영화를 개수 제한 없이(1개 이상) 입력받음 그 입력을 바탕으로 랜덤으로 그 영화와 비슷한 영화를 추천해줌

  추천은 TMDB API의 recommendation을 활용

  

- ### Balance Game

  - Home 탭에 갈 때마다 새로운 영화 관련 주제 밸런스 게임

  - 세가지의 옵션 

  - 투표 즉시 결과 반영

  - 인증된 사용자만 투표 가능



### - Movie 

- 영화 검색 결과 해당 사이트에 등록된 영화일 경우 영화 상세페이지로 이동
- 영화 검색을 통해 영화 관련 상세 내용 확인
  - DB에 없는 영화일 경우, 등록 요청 가능
  - Admin 계정을 통해 요청받은 영화 DB 등록 또는 반려 가능
  - 등록된 영화 정보 수정(별점, 조회수는 수정 불가능)/ 등록된 영화 삭제 가능
- 등록된 영화를 등록일 순 / 조회순/ 인기순(좋아요가 많은 수)로 정렬해서 보여줄 수 있도록 함
- 가입을 통해 타 이용자 영화 리뷰 조회 가능
  - 별점 및 리뷰 남기기
  - 리뷰 및 영화에 좋아요 남기기



### - collection

- 해당 사이트 이용자가 추천하는 영화 모음 작성 가능(해당 사이트에 등록된 영화만 컬렉션에 담을 수 있음)
- 타 이용자의 collection 조회 및 좋아요 기능 
- 사용자는 컬렉션을 업데이트하고 삭제할 수 있음(본인이 만든 것에 한해)
- 컬렉션 상세 페이지로 이동시 컬렉션의 타이틀, 컬렉션 소개, 컬렉션에 담긴 영화들을 한 눈에 볼 수 있음 
- 컬렉션 검색의 경우 컬렉션의 태그와 타이틀로 검색가능하도록 구현



### - Guild



- 영화 관련 주제 중에서도 특정 관심사에 대해 Guild 생성 기능

- 태그를 통해 guild 관심사 표현 및 검색 기능

- 길드 생성 시 길드 공개 범위 설정

  - 공개 : 길드 비회원 포함 글 조회 가능
  - 비공개 : 길드 회원만 글 조회 가능

- 해당 길드 회원 : 글 작성, 해당 길드 타 이용자의 글에 코멘트 남기기, 좋아요 기능

  ​							Profile> My Guild탭에서 탈퇴  가능

- 해당 길드 비회원 : 좋아요 기능 (공개길드의 경우)

  - 가입신청 후 매니저 수락 이후 회원

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/005016d826d939d0fdcc654ab8dd3990/image.png)

- 길드 내 나뉘어진 탭을 통해 다른 내용 조회 가능
  - All Articles : 해당 길드 내 모든 글 조회
  - Recomments : 해당 길드 내 해당 이용자가 타 이용자의 글에 코멘트 남긴 글 조회
  - My Article : 해당 길드 내 해당 이용자의 모든 글 조회 및 삭제 기능
  - Favorites : 해당 길드 내 좋아요 한 글 조회 기능
- 길드 매니저 권한
  - 해당 길드 이름, 소개글, 사진 등록 및 수정, 삭제 
  - 해당 길드 검색을 위한 태그 등록 및 추가, 삭제
  - Profile > My Alram 탭에서  가입 신청 수락 및 거절
  - 탈퇴 시 해당 길드 관련 모든 내용 삭제



### - Profile

- 해당 이용자의 사이트 내 정보 모아보기 기능

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/2a9525450908a76b5253b125932a94d2/image.png)

- 프로필 탭 별 다른 내용 조회 기능
  - Profile 
    - 해당 이용자의 프로필 사진 등록 및 기본이미지 설정 기능
    - 닉네임 및 소개글 수정 기능
    - 해당 사이트 탈퇴 기능
  - My Feed
    - 해당 사이트 내 Guild에서 작성한 글 조회 기능
    - 해당 사이트 내 Movie에서 작성한 리뷰 조회 기능
  - My Alram
    - 길드 매니저의 경우, 가입신청시 알림 > 수락 및 거절 기능
    - 해당 사용자 길드 작성 글 좋아요 받았을 시 알림
    - - 
  - My Likes
    - 해당 사이트 Movie탭 좋아요한 영화 및 collection 모아보기 기능
  - My Guilds
    - 해당 사이트 내 해당 이용자가 가입한 길드 조회 
    - 길드 탈퇴 기능

---

## 3.시스템 구조 및 상세 사용 기술

### Front(Vue.js) 구조

```
component
    common
    │      Footer.vue
    │      Header.vue
    │
    ├─guilds
    │  │  CreateGuild.vue
    │  │  GuildItem.vue
    │  │  GuildList.vue
    │  │  UserGuildItem.vue
    │  │  UserGuildList.vue
    │  │
    │  ├─GuildDetail
    │  │      GuildArticle.vue
    │  │      GuildArticleItem.vue
    │  │      GuildArticleList.vue
    │  │      GuildLikeArticle.vue
    │  │      GuildLikeArticleItem.vue
    │  │      GuildLikeArticleList.vue
    │  │      GuildRecomment.vue
    │  │      GuildRecommentItem.vue
    │  │      GuildRecommentList.vue
    │  │      GuildTagItem.vue
    │  │      MyGuildArticle.vue
    │  │      MyGuildArticleItem.vue
    │  │      MyGuildArticleList.vue
    │  │
    │  └─SearchGuild
    │          SearchGuild.vue
    │          SearchGuildItem.vue
    │          SearchGuildList.vue
    │
    ├─home
    │      BalanceGame.vue
    │      PopularMovieItem.vue
    │      PopularMovies.vue
    │      UpcomingMovieItem.vue
    │      UpcomingMovies.vue
    │
    ├─movies
    │  ├─collections
    │  │      addCollection.vue
    │  │      collectionDetail.vue
    │  │      collectionList.vue
    │  │      collectionListItem.vue
    │  │      searchCollection.vue
    │  │      searchCollectionItem.vue
    │  │      updateCollection.vue
    │  │
    │  ├─movieDetail
    │  │      MovieDetail.vue
    │  │
    │  ├─movieReview
    │  │      Review.vue
    │  │      ReviewItem.vue
    │  │
    │  ├─register
    │  │      MovieForm.vue
    │  │      SearchMovieInput.vue
    │  │      SearchMovieList.vue
    │  │      SearchMovieListItem.vue
    │  │
    │  ├─searchMovie
    │  │      MovieList.vue
    │  │      MovieListItem.vue
    │  │      SearchMovies.vue
    │  │
    │  └─sortedMovies
    │          sortedMovieItem.vue
    │
    └─profile
            MyAlarmList.vue
            MyAlram.vue
            MyAlramLikeItem.vue
            MyAlramSignupItem.vue
            MyFeed.vue
            MyFeedItem.vue
            MyFeedPlace.vue
            MyGuildDetail.vue
            MyGuilds.vue
            MyLikes.vue
            MyLikesList.vue
            ProfileDetail.vue


views
│  Community.vue 
│  GuildDetail.vue
│  GuildDetailUpdate.vue
│  Guilds.vue
│  Home.vue
│  Profile.vue
│
├─accounts
│      Login.vue
│      Signup.vue
│
└─movies
        AddMovie.vue
        Movies.vue
```







---

## 4. 웹사이트 시연 및 동작성(상세화면)

### Home 화면

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/684349c678f87d9510ff214bb2b7083a/image.png)

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/6705e23af81389db8ae0ee6b08ab9c2e/image.png)



#### 추천 영화 클릭시 : 사용자가 클릭한 영화를 바탕으로 추천

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/b764110de3ede32c4c586ea9a52d5005/image.png)



---

### Movie 화면

컬렉션을 업데이트 순/ 인기순으로 정렬 가능

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/f8cf031a002feaba07b3fe63e4b04f2c/image.png)



영화를 등록일 순/ 조회순/ 인기순으로 정렬 가능

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/728e1addb1a81ce5c562e212ef0f57e3/image.png)



### Nav Bar에서 영화/컬렉션 검색 가능

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/e1fe9d19af127c2c13744a04e07791c3/image.png)



컬렉션의 경우 태그와 제목으로 검색 가능

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/2cb113b96f8d085b90b15cdf8e938ff9/image.png)

영화의 경우 제목으로 검색

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/f6e0af23c0d4cefdf46b08e3923a523f/image.png)





---

### 영화 등록 및 수정/ 삭제 가능한 ADMIN  페이지 (관리자권한)

다른 사용자들로 부터 등록 요청이 온 영화들(admin은 요청을 수락하거나 반려 가능)

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/12a5c2788cfb4b4e0787a0389f7341e4/image.png)

admin 페이지에서 영화를 검색한 결과 -> 등록된 영화면 수정과 삭제 버튼이 나타남

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/411bca78abed8482ddd2cdf4d74d4b49/image.png)

---

### 프로필 페이지

이미지 선택, 삭제 가능/ 닉네임 변경과 자기소개 입력 가능/ 회원 탈퇴 가능



- PROFILE 
  - 해당 유저의 프로필 사진 선택 후 등록시 프로필 사진 DB저장
  - 기본이미지 버튼 클릭시 아래의 사진으로 프로필 사진 변경

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/0ed097be66c42c8044ff6bbe9303b582/image.png)



​		- 닉네임 변경 및 자기소개 변경 클릭시 modal에서 변경 


![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/ec9cfc9b2d993c56db1b3c6b99fb7ae8/image.png)



- MY FEED
  - 해당 유저가 여러 길드에서 작성한 글 모아보기 기능
  - 클릭시 해당 길드로 연결

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/571f4c094643e070f4629a52027053be/image.png)



- MY ALRAM
  - 길드 매니저의 경우 - 관리 길드의 가입신청 알림 
    - 수락 : 해당 회원 길드 회원 상태로 변경
    - 거절 : 해당 회원 길드 Detail에서 가입신청 버튼 다시 생김, 여전히 비회원 상태
  - 작성글에 타 유저가 좋아요 버튼 눌렀을 시 알림 
    - 타 유저 좋아요 취소시 알림 사라짐
    - 확인의 표시로 x버튼을 눌렀을 시 다시 생기지 않음

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/32264d77a9237326eb43f170e4a8669e/image.png)

- MY GUILDS
  - 해당 유저의 가입길드 관리
  - 매니저의 경우 탈퇴 >> 해당 길드 사라짐
  - 회원의 경우 탈퇴 >>  해당 길드 비회원 상태로 변경

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/ba821a6100453711fb6361d3527d85b8/image.png)

---

### 길드 탭 페이지

내 프로필과 내가 속한 길드 확인 가능/ 길드 선택시 길드의 피드로 이동

- 최상단에 길드 태그로 검색 기능

- 상단에 해당유저의 길드 모아보기 

- 하단에 전체 길드 확인 가능

  ![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/37a0a4601ec71d0aafa9355b50486ab3/image.png)

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/3127d32a6fbf1b09de4db4ce021e5d4c/image.png)



### 특정 길드의 피드

길드를 표현할 태그 추가 가능/길드 프로필을 업데이트 또는 삭제 가능(길드의 매니저의 고유 권한)

이 외에도 글 작성/ 작성된 글을 리코멘트/ 내가 작성한 글/내가 좋아요한 글 보기 가능



- GUILD DETAIL(길드페이지에서 특정 길드 클릭시 연결)
  - 비회원 상태일 때 가입 버튼 
    - 클릭시 버튼 사라짐 >  매니저가 수락 시 회원, 거절 시 다시 가입신청 버튼 생성



![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/f10ebf743c99ff4d54097ee3a7a21f4c/image.png)

- 매니저의 경우
  - 대표 이미지 삭제 가능
  - 태그 추가 및 삭제 가능
  - update > 대표이미지 변경, 소개글 변경, 길드 이름 변경 가능
  - delete > 길드 삭제 가능

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/c79c42df80ed27494eaeafea581a8180/image.png)





- All Articles

  - 해당 길드 내 모든 글 확인 가능(공개 길드의 경우)
  - 회원의 경우
    - CREATE ARTICLE 버튼 클릭시 글 작성 가능 > 이미지 첨부 가능
    - RECOMMENT 버튼 클릭하여 글 작성 가능 > 글 하단에 몇번째 글을 리트윗했는지 보임

  ![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/b84945675f976e44898845fddb201863/image.png)



​		- 비회원의 경우 글 열람과 좋아요만 가능

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/05e8cb1ec657c133c60510d088f86be8/image.png)



​		- 비공개 길드의 경우

​			- 비회원은 글 열람 자체 불가능

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/2c8ac8c56bc2c2216f1dc8393fb1888e/image.png)

- Recomments 탭

  - 해당 유저가 리코멘트 한 내역을 모아볼 수 있음

  ![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/15c3809e6a0282d37aaf46fa72fbf777/image.png)

- My Articles

  - 해당길드 해당 유저 본인의 글만 모아 조회 및 삭제 가능

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/904c276391e25deaa155a46101cfaa1a/image.png)

- Favorites

  - 해당길드 해당유저가 좋아요한 글 전체 조회 가능

  ![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/c00adfcfde315d3088f358f2827d090b/image.png)





### 다른 길드에 가입 신청 

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/98013e4c8b3d10a07070491ec83b37f6/image.png)



---

## 5. 문제 해결 과정 

### 21-11-15

- __아이디어 회의__ 

- 영화 덕질 공간

- 영화 커뮤니티의 아이덴티티 결정 (페르소나, 보라색)

  - 페르소나 

    - 그리스 어원의 ‘가면’을 나타내는 말로 ‘외적 인격’ 또는 ‘가면을 쓴 인격’

    - 영화에서 페르소나는 종종 **영화감독 자신의 분신이자 특정한 상징을 표현하는 배우**를 지칭
    - UX 디자인에서 페르소나란 제품(웹/앱 등의 디지털 프로덕트)의 **가상 고객 프로파일**을 일컫는 말

- NAV BAR 구성

- 희망 구현 기능

- 교수님께 여쭤볼 것 정리 (장고 ,vue, 음성기반 구현 가능성)

---

### 21-11-16

- __목업 & 아이덴티티 구체화__
- 레이아웃 구체화
- 상세 기능 회의
- 필요 데이터 구체화

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/5cc89020173bd066e339c814644b24c3/image.png)

---

### 21-11-17

- __리드미작성__

- 요구사항 정리

- 데이터 정리(인풋 아웃풋) 

- 데이터 모델링

- 인터페이스 정의(함수)

- 역할분담(프론트, 백엔드)




####  데이터 정리 및 계획 at Notion

> https://www.notion.so/bb08dc6140df4dd4955e185bc9562ad8?v=cf5571cb869545d29fafbb5e7090f535

---

## 21-11-18

- __데이터 모델링(ERD)__
- 역할분담
- 기본설정
- 프로젝트 생성 및 브랜치 

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/d5ea21e50f11e7d07a18a1936b8fb799/image.png)

#### __초기 모델링__

![image](https://lab.ssafy.com/whdlsj98/final-pjt-front/uploads/3071d5358bc3f778e0cc4376fc3f71d2/image.png)

---

## 21-11-19 ~ 25

- 기능구현
- CSS