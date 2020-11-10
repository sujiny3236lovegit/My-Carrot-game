'use strict';

export default class PopUp{
  constructor(){
    this.popUp = document.querySelector('.pop-up');
    this.popUpMessage = document.querySelector('.pop-up__message');
    this.popUpRefreshBtn = document.querySelector('.pop-up__refresh');
    this.popUpRefreshBtn.addEventListener('click', () => {
      this.onClick && this.onClick(); 
      this.hide();
    })
  }

  setClickListener(onClick){
    this.onClick = onClick;
  }

  showWithText(){
    this.popUpText.innerText = text;
    this.popUp.classList.remove('pop-up--hide');
  }
  
  hide(){
    this.popUp.classList.add('pop-up--hide');
  }
}