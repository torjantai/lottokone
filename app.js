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
let scoreCount = [0, 0, 0, 0, 0, 0, 0, 0]; // will store count of matches on this array. Index = rowScore.


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
function random40() {
  randomNumber =  Math.floor(Math.random()*40) + 1;
  return randomNumber;
};

//this funtion creates a row of 7 numbers
function createRow() {
row = [];
  do {
    let ball = random40();
    if ( row.indexOf(ball) === -1 ) {
      row.push(ball);
    }

  } while ( row.length < 7 );
  //console.log(winningRow);
  return row;
};

//this function tells how many numbers the player got right
function checkRow() {
rowScore = 0
  for ( let i = 0; i < 7; i++ ) {
    if ( winningRow.indexOf(playerRow[i]) > -1 ) {
      rowScore += 1;
    }
  }

  if (rowScore < drawUntilScore) {
    scoreCount[rowScore] += 1;
  }

};


//this function creates winningRow and playerRow and then checks how many numbers match
function drawOneWeek() {
  // createWinningRow();
  // createPlayerRow();
winningRow = createRow();
playerRow = createRow();

  // if ( drawUntilScore === 7 ) {
  //   checkRowFast();
  //   }
  // else {
    checkRow();
    // }
  weeksDrawn += 1;
  //console.log(weeksDrawn);
};

//get user input
function getUserSettings() {
  drawUntilScore = parseInt(document.querySelector('input[name="draw-until-score"]:checked').value);
  howManyWeeks = parseInt(document.getElementById('weeks').value)
}


function runSimulation() {

  button.textContent = "Simulating..."
  printHTML =" ";
  print(printHTML);

  //use timeout in order to refresh dom before long loop
  window.setTimeout(function() {
    getUserSettings();
    weeksDrawn = 0;
    scoreCount = [0, 0, 0, 0, 0, 0, 0, 0];

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
        printHTML += '<br><br>'
        printHTML += 'Along the way, you got:<br><br>'
        // loop for adding lower score counts
        for (let i = drawUntilScore - 1; i > -1; i--) {
          printHTML += scoreCount[i] + ' times match-' + i +'<br>';
        }



    print(printHTML);
    button.textContent = "Simulate"

  }, 100);//end timeout
};//end runSimulation




/*
runSimulation();
*/
