# My-Carrot Game
---

## 목표 :rocket: 
1. 자바스크립트에 대한 이해 높이기.
1. 구조적으로 깔끔하게 순수 자바스크립트 작성하기.
1. 문제해결 능력(Problem-solving Skills)기르기.
--- 
## 개발인원
- 개인 프로젝트
---

## 개발기간
- 11/04 - 11/07

---

## 기술스팩
- Vanilla.js,
- CSS3
- HTML5

---

## 아키텍쳐
:sparkles: FRONT-END 디자인패턴: MVC, OOP :sparkles:
- Model : 데이터 상태 관리, 검증, api
- View : ui components, action event emit
- Controller: View 와 Model 에 data 혹은 action 전달

---

## 기능
* 재생
	* 재생버튼을 클릭할 수 있다.
	* 당근과 벌레들을 위치한다.
    - 재생 시 당근과 벌레는 서로 랜덤한 포지션에 위치된다.
  
* 진행
	* 당근과 벌레를 클릭할 수 있다.
    - 사용자는 당근을 클릭해야 게임을 계속 진행할 수 있다.
    - 사용자가 벌레를 클릭하면 게임은 더이상 진행할 수 없다.
  * 남은 당근의 갯수를 보여준다. 
    - 사용자가 당근을 클릭하면 당근의 숫자는 줄어든다.

* 타이머
  * 재생과 동시에 타이머가 동작한다. 
    - 지정된 시간동안 게임이 지속된다.
  * 타이머의 시간이 끝나면 게임은 더이상 진행할 수 없다.
  
* 팝업
  * 사용자의 승리
    - 지정된 시간 안에 당근을 클릭하면 승리 팝업을 띄운다.
  * 사용자의 패배
    - 지정된 시간 안에 당근을 클릭하지 못하면 패배 팝업을 띄운다.
    - 벌레를 클릭하면 패배 팝업을 띄운다.
  
* 리플레이
  * 리플레이 버튼을 누르면 게임은 다시 처음부터 시작된다. 

---

## 개발 이슈
* UI를 어떻게 만들 수 있을까?
* 당근과 벌레들을 랜덤하게 배치하려면 어떻게 해야할까?
* 타이머를 시작하고 중지하는 것은 어떻게 해야할까?
* 음악을 어떻게 실행시킬 수 있을까?
---
## 결과물
:sparkles: 영상보기 :sparkles:
[Box model](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing "Box model")

---

## 구동방법
1. `git clone`
1. `npm init`
1. `client` 폴더에서 `npm start` -> 클라이언트 서버 구동
1. `server` 폴더에서 `nodemon` -> 백엔드 서버 구동
