console.log("Hey Script");
//Variabeln
let inputNummber = document.querySelector("#nummber");
let btn = document.querySelector("#btn");
let myNumber = document.querySelector("#numberValue");
let cpuNumber = document.querySelector("#numberCpu");
let result = document.querySelector("#result");
let mystery = document.querySelector("#numberMystery");
let win = document.querySelector("#win");
let userSelect = document.querySelector("#userSelect");

//Function beim Button Click
function inputValue() {
  btn.addEventListener("click", function () {
    if (errorCase() || doppelValue()) {
      //Prüfe ob true damit nicht gestart wird
    } else {
      //Prüfe ob FALSE damit gestart wird
      clearClassColor();
      shuffle();
      mysteryNummber();
      battel();
    }
  });
}

//Function Errors
//Wenn der User eine Ungültige zahl tippt
function errorCase() {
  let userValue = userSelectValue();
  //  Value über 1000^
  if (inputNummber.value > userValue) {
    alert(`Value ist über ${userValue}`);
    inputNummber.value = 0;
    return true;
  }
  //  Value unter 1000
  if (inputNummber.value < 0) {
    alert(`Value ist unter 0`);
    inputNummber.value = 0;
    return true;
  }
}

//Wahl des Scoores
function userSelectValue() {
  let userChange = userSelect.value;
  let userChangeValue = parseInt(userChange);
  return userChangeValue;
}
userSelect.addEventListener("change", function () {
  //Wert von function userSelectValue() => userChangeValue
  let userValue = userSelectValue();
});

//Wenn jemand 3x die gleiche Zahl hintereinander wählt.
arrayDoppelCheck = [];
function doppelValue() {
  let inputValueNumCheck = +inputNummber.value;
  arrayDoppelCheck.push(inputValueNumCheck);
  if (arrayDoppelCheck.length >= 3) {
    if (inputValueNumCheck === arrayDoppelCheck[0] && arrayDoppelCheck[1] && arrayDoppelCheck[2]) {
      alert("Nimm doch mal eine andere Zahl ;-)");
      return true;
    } else {
      console.log("else");
      arrayDoppelCheck = [];
    }
  }
}

//Function Shuffel the Array von der Cpu
//Mit Rückgabewert
function shuffle() {
  let userValue = userSelectValue();
  let cpuArray = Array.from({ length: userValue }, (_, index) => index);
  const shuffledArray = cpuArray.sort((a, b) => 0.5 - Math.random());
  cpuNumber.innerText = shuffledArray[0];
  //Rückgabe wert für function Battel()
  return shuffledArray[0];
}

//Function Shuffel the Array vom Geheimen wert
//Mit Rückgabewert
function mysteryNummber() {
  let userValue = userSelectValue();
  let mysteryArray = Array.from({ length: userValue }, (_, index) => index);
  const mysteryShuffledArray = mysteryArray.sort((a, b) => 0.5 - Math.random());
  mystery.innerText = mysteryShuffledArray[0];
  return mysteryShuffledArray[0];
}

//Function wer gewinner ist
//Rückgabewert werden Übermittelt
function battel() {
  let shuffelResult = shuffle();
  let mysteryNum = mysteryNummber();
  let myValue = inputNummber.value;
  //Winner Arrays
  const arrayNumCpu = [];
  const arrayNumUser = [];
  const arrayLetWinner = [];

  //Convert to Nummber
  let myValueNum = parseInt(myValue);
  Math.round(myValueNum);
  myNumber.innerText = myValueNum;

  //alle Zahlen in Arrays Pushen
  arrayNumCpu.push(mysteryNum, shuffelResult);
  arrayNumUser.push(mysteryNum, myValueNum);

  //Array Sortieren
  arrayNumCpu.sort(function (a, b) {
    return b - a;
  });
  arrayNumUser.sort(function (a, b) {
    return b - a;
  });

  //Ergebnis auslesen
  let finaleResultCpu = arrayNumCpu[0] - arrayNumCpu[1];
  let finaleResultUser = arrayNumUser[0] - arrayNumUser[1];
  arrayLetWinner.push(finaleResultCpu, finaleResultUser);
  arrayLetWinner.sort(function (a, b) {
    return a - b;
  });

  //Verhindern der Negativen Zahl
  const arrayPositvNum = [];
  arrayPositvNum.push(myValueNum, mysteryNum);
  arrayPositvNum.sort(function (a, b) {
    return b - a;
  });

  //Prüfen wer Gewinner ist mit dem User Value
  let checkUserWin = arrayPositvNum[0] - arrayPositvNum[1];
  //Entscheidung wer gewinnt oder verliert
  if (finaleResultCpu === finaleResultUser) {
    //condition1 is true
    result.innerText = arrayLetWinner[0];
    win.innerText = "Gleichstand";
  } else if (checkUserWin === arrayLetWinner[0]) {
    //condition1 is false and condition2 is true
    result.innerText = arrayLetWinner[0];
    win.classList.add("text-green-500");
    win.innerText = "Du hast gewonnen";
    //Scoring
    scoringUser();
  } else {
    //condition1 is false and condition2 is false
    result.innerText = arrayLetWinner[0];
    win.classList.add("text-red-500");
    win.innerText = "Leider Verloren";
    scoringCpu();
  }
}

//Text Color entfernen und Style
function clearClassColor() {
  win.classList.remove("text-red-500");
  win.classList.remove("text-green-500");
  win.classList.remove("font-bold", "text-xl");
}

//scorignArrays
const arrayScoringUser = [];
const arrayScoringCpu = [];
//Push Win oder Lose in das Array
function scoringUser() {
  arrayScoringUser.push("win");
  console.log(arrayScoringUser);
  creatItemUserWin();
}
function scoringCpu() {
  arrayScoringCpu.push("lose");
  console.log(arrayScoringCpu);
  creatItemCpuWin();
}

//Scoring Funktion für User und CPU
let userScorePoint = 0;
let userScore = document.querySelector("#scoreUser");
function creatItemUserWin() {
  userScorePoint++;
  userScore.innerText = userScorePoint;
  if (userScorePoint === 5) {
    playAudioWin();
    startNewGame();
  }
}

let cpuScorePoint = 0;
let cpuScore = document.querySelector("#scoreCpu");
function creatItemCpuWin() {
  cpuScorePoint++;
  cpuScore.innerText = cpuScorePoint;
  if (cpuScorePoint === 5) {
    playAudioLose();
    startNewGame();
  }
}
//Gewinner Sound
function playAudioWin() {
  const audioWin = new Audio("./sound/winSound.mp3");
  audioWin.play();
  win.classList.add("font-bold", "text-xl");
  win.innerText = "Glückwunsch, du bist der Sieger.";
}
//Verliere Sound
function playAudioLose() {
  const audioLose = new Audio("./sound/loseSound.mp3");
  audioLose.play();
  win.classList.add("font-bold", "text-xl");
  win.innerText = "Leider hast du verloren";
}

let round = 0;
function saveScore() {
  //Erstelle Elemens für Round
  let roundDiv = document.querySelector("#round");
  let creatRoundDiv = document.createElement("div");
  let createRoundNum = document.createElement("p");
  //Erstelle Elemens für User Score
  let userDiv = document.querySelector("#userScoreResult");
  let creatUserDiv = document.createElement("div");
  let createUserNum = document.createElement("p");
  let userFinalScore = document.querySelector("#scoreUser");
  //Erstelle Elemens für User Score
  let cpuDiv = document.querySelector("#cpuScoreResult");
  let creatCpuDiv = document.createElement("div");
  let createCpuNum = document.createElement("p");
  let cpuFinalScore = document.querySelector("#scoreCpu");
  //Füge Hinzu Win or Lose icon
  let resultIcon = document.querySelector("#iconScoreResult");
  let creatResultIconDiv = document.createElement("div");
  resultIcon.appendChild(creatResultIconDiv);
  //Füge es in Round Div hinzu
  roundDiv.appendChild(creatRoundDiv);
  creatRoundDiv.appendChild(createRoundNum);
  //Füge es in User Div hinzu
  userDiv.appendChild(creatUserDiv);
  creatUserDiv.appendChild(createUserNum);
  //Füge es in CPU Div hinzu
  cpuDiv.appendChild(creatCpuDiv);
  creatCpuDiv.appendChild(createCpuNum);
  //Füge die Runde Hinzu
  round += 1;
  createRoundNum.innerText = round;
  //Füge den Score Hinzu vom User
  createUserNum.innerText = userFinalScore.innerText;
  //Füge den Score Hinzu von der CPU
  createCpuNum.innerText = cpuFinalScore.innerText;

  //Check Win oder Lose icon
  if (userFinalScore.innerText > cpuFinalScore.innerText) {
    creatResultIconDiv.classList.add("win-icon");
    const container = document.querySelector(".fireworks");
    const fireworks = new Fireworks.default(container);
    fireworks.start();
    setInterval(() => {
      fireworks.stop();
    }, 3000);
  } else {
    creatResultIconDiv.classList.add("lose-icon");
  }
}

//Wenn das Spiel zuende ist
function startNewGame() {
  btn.disabled = true;
  saveScore();
  btn.classList.add("bg-gray-300", "cursor-not-allowed");
  setTimeout(() => {
    arrayScoringCpu.length = 0;
    arrayScoringUser.length = 0;
    scoreUser.innerText = "0";
    cpuScore.innerText = "0";
    userScorePoint = 0;
    cpuScorePoint = 0;
    btn.classList.remove("bg-gray-300", "cursor-not-allowed");
    btn.disabled = false;
  }, 3000);
}

inputValue();
