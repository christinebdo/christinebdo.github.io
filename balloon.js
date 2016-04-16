var APP = {};

$.get('/uniqueToken', function(data) {
    APP.token = data.token;
});

function saveResult(args, cb) {
    args.sessionToken = APP.token;

    console.log(args);
    $.post('/save', args, function(data) {
        console.log(data);
        cb();
    });

}



var balloon;
var maxBlows;
var currentBlow = 0;
var count;
var boom;
var playerScore=0;
var maxScore=0;
var currentScore=0;
var score;
var rounds=20;
//array size 10, max should be 10 blows before 100% probbaility of exploding
var blowTime = ["", "", "", "", "", "", "", "", "", ""];
var tieTime;
var explodeTime;
var startTime;
var newRoundTime;

function loadGame() {
	balloon = document.getElementById("balloon");
	balloon.style.width = "50px";	
	count = document.getElementById("count");
	score = document.getElementById("score");
	max = document.getElementById("max");
	round = document.getElementById("round");	
	
	boom = document.getElementById("boom");
	boom.style.display="none";
	
	//timestamp of inital start
	startTime = new Date();
	startTime.getDate();
	
	
	//maxBlows = 6;
	//maxBlows = Math.floor(Math.random() * (9 - 6) + 6);
	//alert(maxBlows);
}
function blow() {
	//takes time stamp immediately, also before currentBlow is updated
	blowTime[currentBlow] = new Date();
	blowTime[currentBlow].getDate();
	
	//returns what???
	maxBlows = Math.floor(Math.random()*(10 - 1) + 1);
	//alert(maxBlows);
	currentBlow = currentBlow + 1;
	if (currentScore == 0) {
		currentScore = 100;
	} else {
	currentScore = (currentScore * 2);
	}
	if (currentBlow <= maxBlows) {  	
		var blowAmount = 50;
		var balloonWidth = parseInt(balloon.style.width);
		var newBalloonWidth = blowAmount + balloonWidth;
		balloon.style.width = newBalloonWidth + "px";
		
		count.innerHTML = currentBlow;
		score.innerHTML = currentScore;
	
	} else {
	
		balloon.style.display = 'none';
		boom.style.display="block";
		currentScore = 0;
		/*//alert("Sorry balloon popped");
		rounds = rounds - 1;
		if(rounds == 0){
			//alert("Game over")
		}
		round.innerHTML = rounds;
		resetGame();*/
		setTimeout(other, 1500);
	}
}
function other() {
	/*balloon.style.display = 'none';
		boom.style.display="block";
		currentScore = 0;
		//alert("Sorry balloon popped");*/
		rounds = rounds - 1;
		if(rounds == 0){
			rounds = 20;
			alert('Thank you for playing, your score is: '+maxScore);
			resetGame();
			maxScore = 0;
			max.innerHTML = maxScore;
		}
		round.innerHTML = rounds;
		resetGame();
}
function tieBalloon() {
	
	
	if(currentBlow > maxBlows){
		
		//timestamp of explosion
		explodeTime = new Date();
		explodeTime.getDate();
		
		//alert("sorry you lost");
		
		
	} else if(currentBlow <= maxBlows) {
		
		//timestamp of tieBalloon
		tieTime = new Date();
		tieTime.getDate();
		
		//alert('You win, your score is '+currentScore);
		maxScore = maxScore + currentScore;
		max.innerHTML = maxScore;

	}
	rounds = rounds - 1;
	if (rounds == 0) {
		alert('Thank you for playing, your score is: '+maxScore);
		resetGame();
		rounds = 20;
		maxScore = 0;
		max.innerHTML = maxScore;
	}
	round.innerHTML = rounds;
	resetGame();
	
	
}

function resetGame() {
    //send data
    saveResult({
        count: currentBlow, 
        score: currentScore,
        totalScore: maxScore,
        blowTime: blowTime,
        tieTime: tieTime,
        explodeTime: explodeTime,
        startTime: startTime,
        newRoundTime: newRoundTime,
        maxScore: macScore
    }, function() {
        balloon = document.getElementById("balloon");
        balloon.style.width = "50px";	
        count = document.getElementById("count");	
        
        boom = document.getElementById("boom");
        boom.style.display="none";
        balloon.style.display ="block";
        currentBlow = 0;
        count.innerHTML = 0;
        currentScore = 0;
        score.innerHTML = 0;
        round.innerHTML = rounds;

        //rounds = 20;
        //rounds.innerHTML = rounds;
        
        //new round start time
        newRoundTime = new Date();
        //need to collect data for this round before resetGame
        blowTime = ["", "", "", "", "", "", "", "", "", ""];
        tieTime = "";
        explodeTime = "";     
    });
}
	
