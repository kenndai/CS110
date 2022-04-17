let turnNum = 0;
let gameOver = 0;
let player = "One";
let ai = false;
let allMoves = ['one','two','three','four','five','six','seven','eight','nine'];
playerTurn = document.querySelector(".display_player");
playerTurn.innerHTML = `Player ${player}`;
// gets all the DIRECT children of rows and adds a click event listener to them
tiles = document.querySelectorAll(".row > div");

const playerOne = {
	score: 0,
	moves: [],
};

const playerTwo = {
	score: 0,
	moves: [],
};

window.onload = function () {
	for (tile of tiles) {
		tile.addEventListener("click", setXO);
	}

	function setXO(e) {
		console.log(`CLICKED ${this.className}`);

		// if a tile has already been set don't let it be set again
		if (this.firstChild.innerHTML != "" || gameOver === 1) {
			e.preventDefault();
			return;
		}

		turnNum++;
		console.log(turnNum);

		if (player === "One") {
			// sets the tile as "X"
			this.firstChild.innerHTML = "X";
			if(!ai){
				player = "Two";
			}
			// pushes the tile number into that player's "move" array
			playerOne.moves.push(this.className);
			console.log(playerOne.moves);
			
			//ai 
			if(ai){
				//gets the remaining moves by filtering the total moves by the moves made by player one and player two
				remainingMoves = allMoves.filter(item => !(playerOne.moves).includes(item)).filter(item => !(playerTwo.moves).includes(item));
				if(!remainingMoves == []){
					newMove = remainingMoves[Math.floor(Math.random()*remainingMoves.length)];
					ai_move = document.querySelector("."+newMove);
					ai_move.firstChild.innerHTML = "O";
					playerTwo.moves.push(newMove);
					isWin(playerTwo.moves);
				}

			}
			// check if player won after placing the tile
			isWin(playerOne.moves);
		} else if (player === "Two") {
			// sets the tile as "O"
			this.firstChild.innerHTML = "O";
			player = "One";

			// pushes the tile number into that player's "move" array
			playerTwo.moves.push(this.className);
			console.log(playerTwo.moves);

			// check if player won after placing the tile
			isWin(playerTwo.moves);
		}

		playerTurn.innerHTML = `Player ${player}`;
	}

	// return true or false depending if a player won or not
	function isWin(moves) {
		/*
		1 4 7
		2 5 8
		3 6 9
		*/
		//horizontal wins
		if(moves.includes('one') && (moves.includes('four') && moves.includes('seven'))){
			console.log('win!');
			return true;
		}
		if(moves.includes('two') && (moves.includes('five') && moves.includes('eight'))){
			console.log('win!');
		}
		if(moves.includes('three') && (moves.includes('six') && moves.includes('nine'))){
			console.log('win!');
			return true;
		}
		//vertical wins
		if(moves.includes('one') && (moves.includes('two') && moves.includes('three'))){
			console.log('win!');
			return true;
		}
		if(moves.includes('four') && (moves.includes('five') && moves.includes('six'))){
			console.log('win!');
			return true;
		}
		if(moves.includes('seven') && (moves.includes('eight') && moves.includes('nine'))){
			console.log('win!');
			return true;
		}
		//diagonal wins
		if(moves.includes('one') && (moves.includes('five') && moves.includes('nine'))){
			console.log('win!');
			return true;
		}
		if(moves.includes('three') && (moves.includes('five') && moves.includes('seven'))){
			console.log('win!');
			return true;
		}

	}

	document.querySelector(".new_game").addEventListener("click", () => {
		ai = false;
		turnNum = 0;
		for (tile of tiles) tile.firstChild.innerHTML = "";
		player = "One";
		playerTurn.innerHTML = `Player ${player}`;
		playerOne.moves = [];
		playerTwo.moves = [];
	});
	document.querySelector(".reset").addEventListener("click", () => {
		ai = false;
		turnNum = 0;
		for (tile of tiles) tile.firstChild.innerHTML = "";
		player = "One";
		playerTurn.innerHTML = `Player ${player}`;
		playerOne.score = 0;
		playerTwo.score = 0;
		playerOne.moves = [];
		playerTwo.moves = [];
	});
	document.querySelector(".ai_game").addEventListener("click",()=>{
		console.log("ai_game click");
		ai = true;
		turnNum = 0;
		for (tile of tiles) tile.firstChild.innerHTML = "";
		player = "One";
		playerTurn.innerHTML = `Player ${player}`;
		playerOne.score = 0;
		playerTwo.score = 0;
		playerOne.moves = [];
		playerTwo.moves = [];
	})
	document.querySelector(".two_player").addEventListener("click",()=>{
		console.log("two player");
		ai = false;
		turnNum = 0;
		for (tile of tiles) tile.firstChild.innerHTML = "";
		player = "One";
		playerTurn.innerHTML = `Player ${player}`;
		playerOne.score = 0;
		playerTwo.score = 0;
		playerOne.moves = [];
		playerTwo.moves = [];
	})
};
