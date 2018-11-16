$('.square').on('click', clickSquare);
$('.newgame-btn').on('click', createNewGame);
let playerOne = 0;
let playerTwo = 0;

function clickSquare(e){
  if(playerOne === playerTwo && $(e.target).attr('data-check') === '0'){
    let crossIcon = $('<i class="fas fa-times cross-icon"></i>');
    crossIcon.appendTo($(e.target));
    playerOne++;
    $(e.target).attr('data-check', '1');
    $('h2')[0].style = 'background-color: none;';
    $('h2')[1].style = 'background-color: #f7d2f0;';
    checkIfWinner();
    return;
  }

  if(playerOne > playerTwo && $(e.target).attr('data-check') === '0'){
    let circleIcon = $('<i class="far fa-circle circle-icon"></i>');
    circleIcon.appendTo($(e.target));
    playerTwo++;
    $(e.target).attr('data-check', '2');
    $('h2')[1].style = 'background-color: none;';
    $('h2')[0].style = 'background-color: #f7d2f0;';
    checkIfWinner();
    return;
  }
}

function checkIfWinner(){
  let count1 = 0;
  let count2 = 1;
  let count3 = 2;
  for (let i = 0; i < 3; i++){
    if ( $('.square')[count1].dataset.check === '1' && $('.square')[count2].dataset.check === '1' && $('.square')[count3].dataset.check === '1'){
      playerOneWins();
      $('.square')[count1].style = 'background-color: #f7d2f0';
      $('.square')[count2].style = 'background-color: #f7d2f0';
      $('.square')[count3].style = 'background-color: #f7d2f0';
      winnerFound();
    }
    else if ( $('.square')[count1].dataset.check === '2' && $('.square')[count2].dataset.check === '2' && $('.square')[count3].dataset.check === '2'){
      playerTwoWins();
      $('.square')[count1].style = 'background-color: #f7d2f0';
      $('.square')[count2].style = 'background-color: #f7d2f0';
      $('.square')[count3].style = 'background-color: #f7d2f0';
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
      $('.square')[count1].style = 'background-color: #f7d2f0';
      $('.square')[count2].style = 'background-color: #f7d2f0';
      $('.square')[count3].style = 'background-color: #f7d2f0';
      winnerFound();
    }
    else if ( $('.square')[count1].dataset.check === '2' && $('.square')[count2].dataset.check === '2' && $('.square')[count3].dataset.check === '2'){
      playerTwoWins();
      $('.square')[count1].style = 'background-color: #f7d2f0';
      $('.square')[count2].style = 'background-color: #f7d2f0';
      $('.square')[count3].style = 'background-color: #f7d2f0';
      winnerFound();
    }
    count1++;
    count2++;
    count3++;
  }
  if( $('.square')[0].dataset.check === '1' && $('.square')[4].dataset.check === '1' && $('.square')[8].dataset.check === '1'){
    playerOneWins();
    $('.square')[0].style = 'background-color: #f7d2f0';
    $('.square')[4].style = 'background-color: #f7d2f0';
    $('.square')[8].style = 'background-color: #f7d2f0';
    winnerFound();
  }
  else if( $('.square')[2].dataset.check === '1' && $('.square')[4].dataset.check === '1' && $('.square')[6].dataset.check === '1'){
    playerOneWins();
    $('.square')[2].style = 'background-color: #f7d2f0';
    $('.square')[4].style = 'background-color: #f7d2f0';
    $('.square')[6].style = 'background-color: #f7d2f0';
    winnerFound();
  }
  else if( $('.square')[0].dataset.check === '2' && $('.square')[4].dataset.check === '2' && $('.square')[8].dataset.check === '2'){
    playerTwoWins();
    $('.square')[0].style = 'background-color: #f7d2f0';
    $('.square')[4].style = 'background-color: #f7d2f0';
    $('.square')[8].style = 'background-color: #f7d2f0';
    winnerFound();
  }
  else if( $('.square')[2].dataset.check === '2' && $('.square')[4].dataset.check === '2' && $('.square')[6].dataset.check === '2'){
    playerTwoWins();
    $('.square')[2].style = 'background-color: #f7d2f0';
    $('.square')[4].style = 'background-color: #f7d2f0';
    $('.square')[6].style = 'background-color: #f7d2f0';
    winnerFound();
  }
}

function createNewGame(){
  playerOne = 0;
  playerTwo = 0;
  $('h2').remove();
  for (let x of $('.square')){
    x.style = 'background-color: none;';
    x.dataset.check = 0;
  }
  $('.cross-icon').remove();
  $('.circle-icon').remove();
  $('.player-container').append('<h2>Player 1</h2>');
  $('h2').attr('style', 'background-color: #f7d2f0;');
  $('.player-container').append('<h2>Player 2</h2>');
}

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

function winnerFound(){
  for(let x of $('.square')){
    x.dataset.check = 3;
  }
}
