/*
todo
-mahdollisuus pelata vakiorivillä
-tulokset taulukkona, montako kertaa simulaation aikana tuli esim 4 oikein
-tuloksiin voisi laskea lottoriveihin käytetyn rahasumman, mutta miten huomioida pikkuvoittojen palautukset


*/

let winningRow = [];
let randomNumber;
let playerRow = [];
let rowScore  = 0;
let weeksDrawn = 0;
let printHTML = ''
let howManyWeeks = 1000000;
let drawUntilScore = 7;


let button = document.getElementById('run-simulation');
button.addEventListener("click", runSimulation);

/**************************************
**********DEFINING FUNCTIONS***********
***************************************/


//this function prints results on the page
function print(message) {
  let output = document.getElementById('results');
  output.innerHTML = message;
};

//this function creates a random integer 1-40
const random40 = () => {
  randomNumber =  Math.floor(Math.random()*40) + 1;
  return randomNumber;
};


//this function creates a winning row
const createWinningRow = () => {
winningRow = [];
  do {
    let ball = random40();
    if ( winningRow.indexOf(ball) === -1 ) {
      winningRow.push(ball);
    }

  } while ( winningRow.length < 7 );
  //console.log(winningRow);
};


//this function creates a player's row similarly
const createPlayerRow = () => {
playerRow = [];
  do {
    let ball = random40();
    if ( playerRow.indexOf(ball) === -1 ) {
      playerRow.push(ball);
    }

  } while ( playerRow.length < 7 );
  //console.log(playerRow);
};

//this function tells how many numbers the player got right
const checkRow = () => {
rowScore = 0
  for ( let i = 0; i < 7; i++ ) {
    if ( winningRow.indexOf(playerRow[i]) > -1 ) {
      rowScore += 1;
    }
  }
//console.log(rowScore);
};

function checkRowFast() {
  rowScore = 0;
  let failed = false;
  do {
    for ( let i = 0; i < 7; i++ ) {
      if ( winningRow.indexOf(playerRow[i]) === -1 ) {
        failed = true;
        // console.log(i);
        break;
        }
        else { rowScore += 1; }
        }

  } while ( failed === false && rowScore < 7 );
}

//this function creates winningRow and playerRow and then checks how many numers match
const drawOneWeek = () => {
  createWinningRow();
  createPlayerRow();

  if ( drawUntilScore === 7 ) {
    checkRowFast();
    }
  else {
    checkRow();
    }
  weeksDrawn += 1;
  //console.log(weeksDrawn);
};

//get users input
function getUserSettings() {
  drawUntilScore = parseInt(document.querySelector('input[name="draw-until-score"]:checked').value);
  howManyWeeks = parseInt(document.getElementById('weeks').value)
}

// function simulationLoadBar {
//
// };



function runSimulation() {


  button.textContent = "Simulating..."
  printHTML =" ";
  print(printHTML);

  //use timeout in order to refresh dom before long loop
  window.setTimeout(function() {
    getUserSettings();
    weeksDrawn = 0;
    do {
      drawOneWeek();

    } while ( rowScore < drawUntilScore && weeksDrawn < howManyWeeks);

        if (rowScore >= drawUntilScore) {
        printHTML += 'You got match-' + rowScore + ' on week ' + weeksDrawn;
        printHTML += " (" + Math.floor(weeksDrawn/52) +" years)"
        }
        if (rowScore < drawUntilScore) {
          printHTML += 'Oops, You did not get match-' + drawUntilScore + ' during ' + weeksDrawn + ' weeks. Try again!';
        }

    print(printHTML);
    button.textContent = "Simulate"

  }, 100);//end timeout
};//end runSimulation




/*
runSimulation();
*/
