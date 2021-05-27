//if we click on the start/reset
  //if we are playing
    //reload page
  //if we are not playing
    //set score to 0
    //show countdown box
    //reduce time by 1 sec in loops
      //time left?
        //yes -> continue
        //no -> game game over
    //change button to reset
    //generate new Q&A

//if we click on answer box
  //if we are playing
    //correct?
      //yes
        //increase score
        //show correct box for 1 second
        //generate new Q&A
      //no
        //show try again box for 1 sec

var playing = false;
var num1;
var num2;
var timerInterval;
var currentScore = parseInt(document.getElementById("scoreValue").innerHTML);
var currentTime = parseInt(document.getElementById("timeRemainingValue").innerHTML);


function initGame(){
  if(playing == false){
    document.getElementById("startReset").innerHTML = "Reset";
    resetTimer();
    generateQuestion(document.getElementById("question"));
    generateAnswers();
    playing = true;
  }
  else if(playing == true){
    //Syntax for reloading a page;
    location.reload();
    document.getElementById("startReset").innerHTML = "Start";
    currentScore = 0;
    setScore(currentScore);
    clearFields();
    resetTimer();
    playing = false;
  }
}

function resetTimer(){
  document.getElementById("timeRemaining").style.display = "block";
  document.getElementById("timeRemainingValue").innerHTML = 60;
  clearInterval(timerInterval);
  currentTime = 60;
}

function countdownTimer(){
  timerInterval = setInterval(function(){timer()},1000);
}

function timer(){
  --currentTime;
  document.getElementById("timeRemainingValue").innerHTML = currentTime;
  if(currentTime == 0){
    clearInterval(timerInterval);
    gameOver();
  }

}

function gameOver(){
  document.getElementById("gameOver").innerHTML = "<br /> GAME OVER <br /> YOUR SCORE IS " + currentScore + ".";
  document.getElementById("gameOver").style.display = "block";
}

function generateQuestion(box){
  num1 = Math.floor(Math.random() * 10);
  num2 = Math.floor(Math.random() * 10);
  box.innerHTML = (num1 +"X"+ num2);
  countdownTimer();
}

function generateAnswers(){
  //determine the random postion of the right answer
  var randomPostion = Math.floor(Math.random() * 3) + 1;

  // populate wrong answer cards with wrong answers and populate the random right
  // card with the right answer.
  for(i = 1; i < 5; i++){
    document.getElementById("box"+i).innerHTML = Math.floor(Math.random() * 82);
    if(i == randomPostion){
    document.getElementById("box" + i).innerHTML = num1*num2;
    }
  }
}

function clickAnswer(element){
  if(document.getElementById(element).innerHTML == num1*num2){
    setScore(++currentScore);
    showCorrect();
    resetTimer();
    generateQuestion(document.getElementById("question"));
    generateAnswers();
  }
  else{
    showWrong();
  }
}

function setScore(x){
  document.getElementById("scoreValue").innerHTML = x;
}

function showCorrect(){
  document.getElementById("correct").style.display = "block";
  setTimeout(function(){removeCorrect()},1000);
}

function removeCorrect(){
  document.getElementById("correct").style.display = "none";
}

function showWrong(){
  document.getElementById("wrong").style.display = "block";
  setTimeout(function(){removeWrong()},1000);
}

function removeWrong(){
  document.getElementById("wrong").style.display = "none";
}

function clearFields(){
  for(i = 1; i < 5; i++){
    document.getElementById("box"+i).innerHTML = "";
  }
  document.getElementById("question").innerHTML = "";
  document.getElementById("gameOver").style.display = "none";
}
