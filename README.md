# 친사회적 행동 프로젝트 BE

개요
---

- 한양대학교 교양 수업 ‘건강과 사회 그리고 심리학’의 12주차 조별 발표 '친사회적 행동 프로젝트’를 위한 서버입니다.
- [FE Repository](https://github.com/heegh000/prosocial-project-web)

Server 구성
---

- 익명 사이트를 상정하고 만들었습니다.
- DB 관리 및 좋아요 중복 방지를 위해 쿠키 발급으로 user_id를 식별하려고 했습니다.
- PC에서는 정상 작동하였으나, 모바일 브라우저에서 문제가 생겨, (Same DNS) 임시로 쿠키 발급을 정지했고, 웹에서 중복 클릭을 막았습니다.

#### board router (board.ts)

- GET, board/
    - Query String으로 받은 페이지 번호에 해당하는 게시물을 반환합니다. 게시물은 페이지당 5개입니다.
    - 게시물 제목, 내용 댓글, 좋아요를 모두 함께 반환합니다..
- POST, board/
    - 사용자가 작성한 글을 board 테이블에 삽입합니다.

#### comment router(comment.ts)

- GET, comment/
    - Query String으로 받은 게시물 id에 해당하는 댓글을 전부 반환합니다.
- POST, comment/
    - 사용자가 작성한 댓글을 comment 테이블에 삽입합니다.

#### like router(like.ts)

- POST, like/
    - 사용자가 누른 좋아요를 like 테이블에 삽입합니다.

DB 구성
---

#### board 테이블

![board 테이블](https://github.com/heegh000/prosocial-project-server/assets/108382134/97a280c8-354b-4fa9-bc7a-ec33c22c3264)

- 사용자가 작성한 게시물을 저장하는 테이블입니다.

#### comment 테이블

![comment 테이블](https://github.com/heegh000/prosocial-project-server/assets/108382134/5cda89b0-d8e5-46a8-9fd9-4d59d4b5f600)

- 사용자가 작성한 댓글을 저장하는 테이블입니다.
- board 테이블과 1:N 관계를 형성합니다.

#### like 테이블

![like 테이블](https://github.com/heegh000/prosocial-project-server/assets/108382134/471d2620-c992-425a-8771-01e231cbff15)

- 사용자가 누른 좋아요를 저장하는 테이블입니다.
- board 테이블과 1:N 관계를 형성합니다.
