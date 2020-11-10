'use strict';

import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const CARROT_SIZE = 80;
const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const bgSound = new Audio('./sound/bg.mp3');
const alertSound = new Audio('./sound/alert.wav');
const winSound = new Audio('./sound/game_win.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(()=>{
  startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item){
  if(!started){
    return;
  }
  if(item == 'carrot'){
    //target이 carrot일때
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if(score === CARROT_COUNT){
      finishGame(true); //boolean으로 하는 것은 사실 가독성이 낮아지므로 좋지않다.
    }
  }else if(item === 'bug'){
    // target이 bug일때
    finishGame(false);
  }
}

// field.addEventListener('click', (event) => { onFieldClick(event) }); 
field.addEventListener('click', onFieldClick);

gameBtn.addEventListener('click', () => {
  if(started){
    stopGame();
  }else{
    startGame();
  }
});

function startGame(){
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  sound.playBackground();
}

function stopGame(){
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText('REPLAY?');
  sound.playAlert();
  sound.playBackground();
}

function finishGame(win){
  started = false;
  hideGameButton();
  if(win){
    sound.playWin();
  }else{
    sound.playBug();
  }
  stopGameTimer();
  stopSound(bgSound);
  gameFinishBanner.showWithText(win ? 'YOU WON!' : 'YOU LOST!');
}

function showStopButton(){
  const icon = gameBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
}

function hideGameButton(){
  gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore(){
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer(){
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterver(() => {
    if(remainingTimeSec <= 0){
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer(){
  clearInterval(timer);
}

function updateTimerText(time){
  const minutes = Math.floor(time/60);
  const seconds = time % 60;
  getTimer.innerText = `${minutes}:${seconds}`; 
}

function initGame(){
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  gameField.init();
}

function updateScoreBoard(){
  gameScore.innerText = CARROT_COUNT - score;
}

initGame();