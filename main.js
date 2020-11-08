'use strict';

const GAME_DURATION_SEC = 5;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const CARROT_SIZE = 80;
const FIELD_TOP_PADDING = 50;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const timerIndicator = document.querySelector('.game__timer');
const scoreText = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message');
const popUpRefreshBtn = document.querySelector('.pop-up__refresh');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const failSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const bgSound = new Audio('./sound/bg.mp3');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function startGame() {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  stopGameTimer();
  hideStartButton();
  showPopUpWithText('REPLAY?');
  stopSound(bgSound);
}

function initGame() {
  field.innerHTML = '';
  addItem(field, CARROT_COUNT, 'img/carrot.png', 'carrot');
  addItem(field, BUG_COUNT, 'img/bug.png', 'bug');
  field.addEventListener('click', onFieldClickListener);
}

function resetWorld() {
  hideTimerAndScore();
  hidePopUp();
  showStartButton();
  resetScoreText();
  score = 0;
  field.innerHTML = '';
}

function addItem(field, count, imgPath, className) {
  const x1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y1 = field.offsetTop + FIELD_TOP_PADDING;
  const y2 = field.offsetTop + fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.userDrag = 'none';
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function onFieldClickListener(event) {
  const target = event.target;
  if (!started) {
    return;
  }
  if (target.matches('.carrot')) {
    playSound(carrotSound);
    target.remove();
    score++;
    updateScoreBoard(score);

    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.bug')) {
    playSound(failSound);
    stopGameTimer();
    finishGame(false);
  }
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);

  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);

      if (started) {
        finishGame(score === CARROT_COUNT);
      }

      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function finishGame(win) {
  started = false;
  hideStartButton();
  stopSound(bgSound);

  if (win) {
    playSound(winSound);
  } else {
    playSound(failSound);
  }
  showPopUpWithText(win ? 'YOU WON 🎉' : 'YOU LOST 💩');
}

function updateScoreBoard(newScore) {
  scoreText.innerText = CARROT_COUNT - newScore;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function showStartButton() {
  const icon = gameBtn.querySelector('.fas');
  icon.classList.remove('fa-stop');
  gameBtn.style.visibility = 'visible';
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  gameBtn.style.visibility = 'visible';
}

function hideStartButton() {
  gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
  timerIndicator.style.visibility = 'visible';
  scoreText.style.visibility = 'visible';
}

function hideTimerAndScore() {
  timerIndicator.style.visibility = 'hidden';
  scoreText.style.visibility = 'hidden';
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerIndicator.innerHTML = `${minutes}:${seconds}`;
}

function resetScoreText() {
  scoreText.innerText = CARROT_COUNT;
}

function showPopUpWithText(text) {
  popUpMessage.innerText = text;
  popUp.classList.remove('hide');
}

function hidePopUp() {
  popUp.classList.add('hide');
}

function init() {
  popUpRefreshBtn.addEventListener('click', () => {
    resetWorld();
    initGame();
  });
  resetWorld();
}

init();


// const CARROT_SIZE = 80;
// const CARROT_COUNT = 5;
// const BUG_COUNT = 5;
// const GAME_DURATION_SEC = 5;

// const field = document.querySelector('.game__field');
// const fieldRect = field.getBoundingClientRect();
// const gameBtn = document.querySelector('.game__button');
// const gameTimer = document.querySelector('.game__timer');
// const gameScore = document.querySelector('.game__score');

// const popUp = document.querySelector('.pop-up');
// const popUpText = document.querySelector('.pop-up__message');
// const popUpRefresh = document.querySelector('.pop-up__refresh');

// const bgSound = new Audio('./sound/bg.mp3');
// const alertSound = new Audio('./sound/alert.wav');
// const winSound = new Audio('./sound/game_win.mp3');
// const carrotSound = new Audio('./sound/carrot_pull.mp3');
// const bugSound = new Audio('./sound/bug_pull.mp3');

// let started = false;
// let score = 0;
// let timer = undefined;

// // field.addEventListener('click', (event) => { onFieldClick(event) }); 
// field.addEventListener('click', onFieldClick);

// gameBtn.addEventListener('click', () => {
//   if(started){
//     stopGame();
//   }else{
//     startGame();
//   }
// });

// popUpRefresh.addEventListener('click', ()=> {
//   startGame();
//   hidePopUp();
// });

// function startGame(){
//   started = true;
//   initGame();
//   showStopButton();
//   showTimerAndScore();
//   startGameTimer();
//   playSound(bgSound);
// }

// function stopGame(){
//   started = false;
//   stopGameTimer();
//   hideGameButton();
//   showPopUpWithText('REPLAY?');
//   stopSound(bgSound);
//   playSound(alertSound);
// }

// function finishGame(win){
//   started = false;
//   hideGameButton();
//   if(win){
//     playSound(winSound);
//   }else(lost){
//     playSound(bugSound);
//   }
//   stopGameTimer();
//   stopSound(bgSound);
//   showPopUpWithText(win ? 'YOU WON!' : 'YOU LOST!');
// }

// function showStopButton(){
//   const icon = gameBtn.querySelector('.fas');
//   icon.classList.add('fa-stop');
//   icon.classList.remove('fa-play');
//   gameBtn.style.visibility = 'visible';
// }

// function hideGameButton(){
//   gameBtn.style.visibility = 'hidden';
// }

// function showTimerAndScore(){
//   gameTimer.style.visibility = 'visible';
//   gameScore.style.visibility = 'visible';
// }

// function startGameTimer(){
//   let remainingTimeSec = GAME_DURATION_SEC;
//   updateTimerText(remainingTimeSec);
//   timer = setInterver(() => {
//     if(remainingTimeSec <= 0){
//       clearInterval(timer);
//       finishGame(CARROT_COUNT === score);
//       return;
//     }
//     updateTimerText(--remainingTimeSec);
//   }, 1000);
// }

// function stopGameTimer(){
//   clearInterval(timer);
// }

// function updateTimerText(time){
//   const minutes = Math.floor(time/60);
//   const seconds = time % 60;
//   getTimer.innerText = `${minutes}:${seconds}`; 
// }

// function showPopUpWithText(){
//   popUpText.innerText = text;
//   popUp.classList.remove('pop-up--hide');
// }

// function hidePopUp(){
//   popUp.classList.add('pop-up--hide');
// }

// function initGame(){
//   score = 0;
//   field.innerHTML = '';
//   gameScore.innerText = CARROT_COUNT;
//   //벌레와 당근을 생성한 뒤 field에 추가해줌
//   addItem('carrot', CARROT_COUNT, 'img/carrot.png');
//   addItem('bug', BUG_COUNT, 'img/bug.png');
// }

// function onFieldClick(event){
//   if(!started){
//     return;
//   }
//   const target = event.target;
//   if(target.matches('.carrot')){
//     //target이 carrot일때
//     target.remove();
//     score++;
//     playSound(carrotSound);
//     updateScoreBoard();
//     if(score === CARROT_COUNT){
//       finishGame(true); //boolean으로 하는 것은 사실 가독성이 낮아지므로 좋지않다.
//     }
//   }else if(target.matches('.bug')){
//     // target이 bug일때
//     finishGame(false);
//   }
// }

// function playSound(sound){
//   sound.currentTime = 0;
//   sound.play();
// }

// function stopSound(){
//   sound.pause();
// }

// function updateScoreBoard(){
//   gameScore.innerText = CARROT_COUNT - score;
// }

// function addItem(className, count, imgPath){
//   const x1 = 0;
//   const y1 = 0;
//   const x2 = fieldRect.width - CARROT_SIZE;
//   const y2 = fieldRect.height - CARROT_SIZE;
//   for(let i = 0; i < count; i++){
//     const item = document.createElement('img');
//     item.setAttribute('class', className);
//     item.setAttribute('src', imgPath);
//     item.style.position = 'absolute';
//     const x = randomNumber(x1, x2);
//     const y = randomNumber(y1, y2);
//     item.style.left = `${x}px`;
//     item.style.top = `${y}px`;
//     field.appendChild(item);
//   }
// }

// function randomNumber(min, max){
//   return Math.random() * (max - min) + min;
// }


// initGame();