
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

function loadGame() {
	balloon = document.getElementById("balloon");
	balloon.style.width = "50px";	
	count = document.getElementById("count");
	score = document.getElementById("score");
	max = document.getElementById("max");
	round = document.getElementById("round");	
	
	boom = document.getElementById("boom");
	boom.style.display="none";
	
	//maxBlows = 6;
	//maxBlows = Math.floor(Math.random() * (9 - 6) + 6);
	//alert(maxBlows);
}

function blow() {

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
			//alert("Game over")
		}
		round.innerHTML = rounds;
		resetGame();
}

function tieBalloon() {
	
	if(currentBlow > maxBlows){
		//alert("sorry you lost");
		rounds = rounds - 1;
		if(rounds == 0){
			//alert("Game over")
		}
		round.innerHTML = rounds;
		resetGame();
	} else if(currentBlow <= maxBlows) {
		//alert('You win, your score is '+currentScore);
			maxScore = maxScore + currentScore;
			max.innerHTML = maxScore;
			rounds = rounds - 1;
			round.innerHTML = rounds;
			if(rounds == 0){
				//alert("Game over")
			}
			resetGame();
	}
}

function resetGame() {
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

}


	