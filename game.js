var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

function nextSequence() {
  gamePattern.push(buttonColors[Math.floor(Math.random() * 4)])
  var loopCounter = -1;
  var playBackLoop = setInterval(function() {
    loopCounter += 1;
    if (loopCounter == gamePattern.length) {
      clearInterval(playBackLoop);
    }
    else {
      pushButton(gamePattern[loopCounter]);
    }
  }, 300)
}

function playSound(color) {
  var audio = new Audio('sounds/' + color + '.mp3')
  audio.play();
}

function pushButton(color) {
  $('#' + color).fadeOut(100).fadeIn(100);
  playSound(color);
}

function gameOver() {
  flashClass('body', 'game-over', 200);
  $('h1').text("Game Over, Push Any Key to Try Again");
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
  level = 0;
}

function flashClass(element, cl, time){
  $(element).addClass(cl);
  setTimeout(function() {
    $(element).removeClass(cl);
  }, time)
}

function updateLevel() {
  level += 1;
  $('#level-title').text("Level " + level);
  flashClass('#level-title', 'green-text', 700);
}

$('.btn').click(function() {
  var color = $(this).attr('id');
  userClickedPattern.push(color);
  last_idx = userClickedPattern.length - 1;
  if (userClickedPattern[last_idx] != gamePattern[last_idx]) {
    pushButton('wrong');
    gameOver();
    return;
  }
  else {
    pushButton(color);
  }

  if (userClickedPattern.length == gamePattern.length) {
    updateLevel();
    setTimeout(function() {
      nextSequence();
      userClickedPattern = [];
    },1300)
  }
  })

$(document).keypress(function() {
  if (!gameStarted) {
    gameStarted = true;
    updateLevel();
    nextSequence();
  }
})
