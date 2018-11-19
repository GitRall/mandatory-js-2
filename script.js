/* --- Eventlisteners and variables --- */
$('.square').on('click', clickSquare);
$('.newgame-btn').on('click', createVsPlayer);
$('.vs-ai-btn').on('click', createVsAi);
let playerOneCount = 0;
let playerTwoCount = 0;
let aiCount = 0;
let vsPlayer = false;
let vsAi = false;
let aiInterval;

/*=============================================================================*/

/* --- function for when player clicks on any square, (player vs player) && (player vs AI) --- */
function clickSquare(e){
  /* --- player 1 clicks square (player vs player) --- */
  if(playerOneCount === playerTwoCount && $(e.target).attr('data-check') === '0' && vsPlayer === true){
    $(e.target).append('<i class="fas fa-times cross-icon"></i>');
    playerOneCount++;
    $(e.target).attr('data-check', '1');
    $('h2')[0].style = 'background-color: none;';
    $('h2')[1].style = 'background-color: #f7d2f0;';
    checkIfWinner();
    return;
  }
  /* --- player 2 clicks square (player vs player) --- */
  if(playerOneCount > playerTwoCount && $(e.target).attr('data-check') === '0' && vsPlayer === true){
    $(e.target).append('<i class="far fa-circle circle-icon"></i>');
    playerTwoCount++;
    $(e.target).attr('data-check', '2');
    $('h2')[1].style = 'background-color: none;';
    $('h2')[0].style = 'background-color: #f7d2f0;';
    checkIfWinner();
    return;
  }
  /* --- player 1 clicks square (player vs AI)*/
  if(playerOneCount === aiCount && $(e.target).attr('data-check') === '0' && vsAi === true){
    $(e.target).append('<i class="fas fa-times cross-icon"></i>');
    playerOneCount++;
    $(e.target).attr('data-check', '1');
    $('h2')[0].style = 'background-color: none;';
    $('h2')[1].style = 'background-color: #f7d2f0;';
    checkIfWinner();
    return;
  }
}

/*===========================================================================*/

/* --- creating game, player vs player*/
function createVsPlayer(){
  vsAi = false;
  vsPlayer = true;
  playerOneCount = 0;
  playerTwoCount = 0;
  clearBoard();
  $('.player-container').append('<h2><i class="fas fa-times cross-icon-small"></i>Player 1</h2>');
  $('h2').attr('style', 'background-color: #f7d2f0;');
  $('.player-container').append('<h2><i class="far fa-circle circle-icon-small"></i>Player 2</h2>');
}

/*===========================================================================*/

/* --- Creating game, player vs AI and starts interval --- */
function createVsAi(){
  clearInterval(aiInterval);
  vsPlayer = false;
  vsAi = true;
  playerOneCount = 0;
  aiCount = 0;
  clearBoard();
  $('.player-container').append('<h2><i class="fas fa-times cross-icon-small"></i>Player 1</h2>');
  $('h2').attr('style', 'background-color: #f7d2f0;');
  $('.player-container').append('<h2><i class="far fa-circle circle-icon-small"></i>AI</h2>');
  aiInterval = setInterval(function(){
    if(playerOneCount > aiCount && vsAi === true){
      aiCount++;
      aiFunction();
      $('h2')[1].style = 'background-color: none;';
      $('h2')[0].style = 'background-color: #f7d2f0;';
      checkIfWinner();
    }
    if(vsAi === false){
      clearInterval(aiInterval);
    }
  }, 3000);
}

/* --- function that decides what moves the AI will do --- */
function aiFunction(){
  let indexCount1 = 0;
  let indexCount2 = 1;
  let indexCount3 = 2;
  let returnCheck;
  let circleIcon = $('<i class="far fa-circle circle-icon"></i>');
  let drawCheckArray = [];
  /* --- Checks if there is a draw, if draw --> return with vsAi = false
  and clear interval --- */
  for (let x of $('.square')){
    drawCheckArray.push(x.dataset.check);
  }
  drawCheckArray.sort();
  if (drawCheckArray[0] !== '0'){
    vsAi = false;
    return;
  }

  if ($('.square')[4].dataset.check === '0'){
    $('.square')[4].dataset.check = 2;
    circleIcon.appendTo($('.square')[4]);
    return;
  }

  /* --- AI offensive function --- */
  function aiOffensiveMoves(){
    let circleIcon = $('<i class="far fa-circle circle-icon"></i>');
    let returnCheck = false;
    if ($('.square')[indexCount1].dataset.check === '2' && $('.square')[indexCount2].dataset.check === '2' && $('.square')[indexCount3].dataset.check === '0'){
      $('.square')[indexCount3].dataset.check = 2;
      circleIcon.appendTo($('.square')[indexCount3]);
      returnCheck = true;
      return returnCheck;
    }
    else if ($('.square')[indexCount2].dataset.check === '2' && $('.square')[indexCount3].dataset.check === '2' && $('.square')[indexCount1].dataset.check === '0'){
      $('.square')[indexCount1].dataset.check = 2;
      circleIcon.appendTo($('.square')[indexCount1]);
      returnCheck = true;
      return returnCheck;
    }
    else if ($('.square')[indexCount1].dataset.check === '2' && $('.square')[indexCount3].dataset.check === '2' && $('.square')[indexCount2].dataset.check === '0'){
      $('.square')[indexCount2].dataset.check = 2;
      circleIcon.appendTo($('.square')[indexCount2]);
      returnCheck = true;
      return returnCheck;
    }
    return returnCheck;
  }

  for (let i = 0; i < 3; i++){
    returnCheck = aiOffensiveMoves();
    if(returnCheck === true){
      return;
    }
    indexCount1 += 3;
    indexCount2 += 3;
    indexCount3 += 3;
  }
  indexCount1 = 0;
  indexCount2 = 3;
  indexCount3 = 6;

  for (let i = 0; i < 3; i++){
    returnCheck = aiOffensiveMoves();
    if (returnCheck === true){
      return;
    }
    indexCount1++;
    indexCount2++;
    indexCount3++;
  }
  indexCount1 = 0;
  indexCount2 = 4;
  indexCount3 = 8;
  for (let i = 0; i < 2; i++){
    if ($('.square')[indexCount1].dataset.check === '2' && $('.square')[indexCount2].dataset.check === '2' && $('.square')[indexCount3].dataset.check === '0'){
      $('.square')[indexCount3].dataset.check = 2;
      circleIcon.appendTo($('.square')[indexCount3]);
      return;
    }
    else if ($('.square')[indexCount2].dataset.check === '2' && $('.square')[indexCount3].dataset.check === '2' && $('.square')[indexCount1].dataset.check === '0'){
      $('.square')[indexCount1].dataset.check = 2;
      circleIcon.appendTo($('.square')[indexCount1]);
      return;
    }
    indexCount1 = 2;
    indexCount3 = 6;
  }

  /* --- AI defensive function --- */
  function aiDefensiveMoves(){
    let circleIcon = $('<i class="far fa-circle circle-icon"></i>');
    let returnCheck = false;
    if ($('.square')[indexCount1].dataset.check === '1' && $('.square')[indexCount2].dataset.check === '1' && $('.square')[indexCount3].dataset.check === '0'){
      $('.square')[indexCount3].dataset.check = 2;
      circleIcon.appendTo($('.square')[indexCount3]);
      returnCheck = true;
      return returnCheck;
    }
    else if ($('.square')[indexCount2].dataset.check === '1' && $('.square')[indexCount3].dataset.check === '1' && $('.square')[indexCount1].dataset.check === '0'){
      $('.square')[indexCount1].dataset.check = 2;
      circleIcon.appendTo($('.square')[indexCount1]);
      returnCheck = true;
      return returnCheck;
    }
    else if ($('.square')[indexCount1].dataset.check === '1' && $('.square')[indexCount3].dataset.check === '1' && $('.square')[indexCount2].dataset.check === '0'){
      $('.square')[indexCount2].dataset.check = 2;
      circleIcon.appendTo($('.square')[indexCount2]);
      returnCheck = true;
      return returnCheck;
    }
    return returnCheck;
  }

  indexCount1 = 0;
  indexCount2 = 1;
  indexCount3 = 2;
  for (let i = 0; i < 3; i++){
    returnCheck = aiDefensiveMoves();
    if (returnCheck === true){
      return;
    }
    indexCount1 += 3;
    indexCount2 += 3;
    indexCount3 += 3;
  }
  indexCount1 = 0;
  indexCount2 = 3;
  indexCount3 = 6;
  for (let i = 0; i < 3; i++){
    returnCheck = aiDefensiveMoves();
    if (returnCheck === true){
      return;
    }
    indexCount1++;
    indexCount2++;
    indexCount3++;
  }
  indexCount1 = 0;
  indexCount2 = 4;
  indexCount3 = 8;
  for (let i = 0; i < 2; i++){
    if ($('.square')[indexCount1].dataset.check === '1' && $('.square')[indexCount2].dataset.check === '1' && $('.square')[indexCount3].dataset.check === '0'){
      $('.square')[indexCount3].dataset.check = 2;
      circleIcon.appendTo($('.square')[indexCount3]);
      return;
    }
    else if ($('.square')[indexCount2].dataset.check === '1' && $('.square')[indexCount3].dataset.check === '1' && $('.square')[indexCount1].dataset.check === '0'){
      $('.square')[indexCount1].dataset.check = 2;
      circleIcon.appendTo($('.square')[indexCount1]);
      return;
    }
    indexCount1 = 2;
    indexCount3 = 6;
  }
  let indexArray = [];
  for (let i = 0; i < 9; i++){
    if ($('.square')[i].dataset.check === '0'){
      indexArray.push(i);
    }
  }
  let randomNum = Math.floor(Math.random() * indexArray.length);
  $('.square')[indexArray[randomNum]].dataset.check = 2;
  circleIcon.appendTo($('.square')[indexArray[randomNum]]);
}

/*===========================================================================*/

/* --- Giving crown icon too winner --- */
function playerOneWins(){
  let crownIcon = $('<i class="fas fa-crown crown-icon"></i>');
  crownIcon.appendTo($('h2')[0]);
  $('h2')[1].style = 'background-color: none;';
}
function playerTwoWins(){
  let crownIcon = $('<i class="fas fa-crown crown-icon"></i>');
  crownIcon.appendTo($('h2')[1]);
  $('h2')[0].style = 'background-color: none;';
}

/*===========================================================================*/

/* --- if winner is found dataset will be 3 so that you can't continue clicking --- */
function winnerFound(){
  for(let x of $('.square')){
    x.dataset.check = 3;
  }
  vsAi = false;
  vsPlayer = false;
}

/*===========================================================================*/

/* --- clearing board from icons and reseting dataset --- */
function clearBoard(){
  $('h2').remove();
  for (let x of $('.square')){
    x.style = 'background-color: none;';
    x.dataset.check = 0;
  }
  $('.cross-icon').remove();
  $('.circle-icon').remove();
}

/*===========================================================================*/

/* --- function that checks if someone just won --- */
function checkIfWinner(){
  /* --- function that colors the winning squares --- */
  function colorSquares(c1, c2, c3){
    $('.square')[c1].style = 'background-color: #f7d2f0';
    $('.square')[c2].style = 'background-color: #f7d2f0';
    $('.square')[c3].style = 'background-color: #f7d2f0';
  }
  let count1 = 0;
  let count2 = 1;
  let count3 = 2;
  for (let i = 0; i < 3; i++){
    if ( $('.square')[count1].dataset.check === '1' && $('.square')[count2].dataset.check === '1' && $('.square')[count3].dataset.check === '1'){
      playerOneWins();
      colorSquares(count1, count2, count3);
      winnerFound();
    }
    else if ( $('.square')[count1].dataset.check === '2' && $('.square')[count2].dataset.check === '2' && $('.square')[count3].dataset.check === '2'){
      playerTwoWins();
      colorSquares(count1, count2, count3);
      winnerFound();
    }
    count1 += 3;
    count2 += 3;
    count3 += 3;
  }
  count1 = 0;
  count2 = 3;
  count3 = 6;
  for (let i = 0; i < 3; i++){
    if ( $('.square')[count1].dataset.check === '1' && $('.square')[count2].dataset.check === '1' && $('.square')[count3].dataset.check === '1'){
      playerOneWins();
      colorSquares(count1, count2, count3);
      winnerFound();
    }
    else if ( $('.square')[count1].dataset.check === '2' && $('.square')[count2].dataset.check === '2' && $('.square')[count3].dataset.check === '2'){
      playerTwoWins();
      colorSquares(count1, count2, count3);
      winnerFound();
    }
    count1++;
    count2++;
    count3++;
  }
  if( $('.square')[0].dataset.check === '1' && $('.square')[4].dataset.check === '1' && $('.square')[8].dataset.check === '1'){
    playerOneWins();
    colorSquares(0, 4, 8);
    winnerFound();
  }
  else if( $('.square')[2].dataset.check === '1' && $('.square')[4].dataset.check === '1' && $('.square')[6].dataset.check === '1'){
    playerOneWins();
    colorSquares(2, 4, 6);
    winnerFound();
  }
  else if( $('.square')[0].dataset.check === '2' && $('.square')[4].dataset.check === '2' && $('.square')[8].dataset.check === '2'){
    playerTwoWins();
    colorSquares(0, 4, 8);
    winnerFound();
  }
  else if( $('.square')[2].dataset.check === '2' && $('.square')[4].dataset.check === '2' && $('.square')[6].dataset.check === '2'){
    playerTwoWins();
    colorSquares(2, 4, 6);
    winnerFound();
  }
}
