let turnNum = 0;
let gameOver = 0;
let player = "One";
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
			player = "Two";

			// pushes the tile number into that player's "move" array
			playerOne.moves.push(this.className);
			console.log(playerOne.moves);

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
		// loops through the tiles a player placed an X or an O
		for (move of moves) {
		}
	}

	document.querySelector(".new_game").addEventListener("click", () => {
		turnNum = 0;
		for (tile of tiles) tile.firstChild.innerHTML = "";
		player = "One";
		playerTurn.innerHTML = `Player ${player}`;
		playerOne.moves = [];
		playerTwo.moves = [];
	});

	document.querySelector(".reset").addEventListener("click", () => {
		turnNum = 0;
		for (tile of tiles) tile.firstChild.innerHTML = "";
		player = "One";
		playerTurn.innerHTML = `Player ${player}`;
		playerOne.score = 0;
		playerTwo.score = 0;
		playerOne.moves = [];
		playerTwo.moves = [];
	});
};
