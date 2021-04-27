var userClickedPattern=[];
var gamePattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var isGameStart=false;
var level=0;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}
function playSound(name){
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();
}
$(".btn").click(function(e){
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(document).keypress(function() {
    if(!isGameStart){
        isGameStart=true;
        $("#level-title").text("Level "+level);
        nextSequence();
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        if (userClickedPattern.length === gamePattern.length){
  
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
    }
    else {
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $('body').addClass("game-over");
        setTimeout(function () {
            $('body').removeClass("game-over");
        }, 200);
        playSound("wrong");
        startOver();
      } 
}

function startOver() {
    level=0;
    isGameStart=false;
    gamePattern=[];
}