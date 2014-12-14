/**
 * @jsx React.DOM
 */
 (function(){

 	var TicTacToeGame = React.createClass({

 		getInitialState:function(){

 			//call the make board function to create a board based on number of rows requested
 			return {board:this.makeBoard(),turn:"O",rows:3}
 		},
 		makeTurn: function(square, row, turn) {
 			var board = this.state.board;
 			//check to make sure the player is not attempting to place their piece in square that is already occupied 
 			if(board[row][square] == " "){
 				//if the square is empty, fill it with piece of current turn
 				board[row][square] = turn;
 				//change turns based on who just went
 				if (turn== "O"){
 					var newTurn = "X";
 				}
 				else{
 					var newTurn = "O";
 				}
 				this.setState({board:board, turn:newTurn});

 			}
 			else{
 				//if the square is taken, alert player that they can not go there
 				alert("You can't go there!")
 			}
 			checkWin = this.winningBoard()
 			
 			//this.winningBoard() returns an array, the first element of the array is a message, the second is 
 			//whether or not a win occurred
 			if (checkWin[1] == true){
 				//alert players to win/win location and start a new game when alert box is closed
 				alert(checkWin[0]+" ,click ok to start a new game")
 				this.newGame()

 				
 			}
 			else if(checkWin[0] == "tie" ){
 				//inform players a tie has occurred, start new game when alert box has closed
 				alert("The game has ended in a tie, click ok to start a new game")
 				this.newGame()
 			}

 		},

 		winningBoard:function(){
 			//get the length of the board, how many rows/squares per row
 			boardLength = parseInt(this.props.rows)
 			//calcuate total number of squares on the board
 			totalSquares = boardLength * boardLength
 			//create a flattened version of the nested board array, this will help us determine a tie
 			var flattenedBoard = this.state.board.reduce(function(a, b) {
 				return a.concat(b);
 			});
 			//join the flattened board, then split it back into an array by spaces, then rejoin with no spaces, the length of this will let us the total number of plays so far
 			flattenedBoard = flattenedBoard.join('').split(' ').join('');
 			//instantiate empty array that will be filled with multiple columns array
 			var columnsArray = [];
 			//instatiate array for left and righ diagonal
 			leftDiagonal = [];
 			rightDiagonal = [];
 			//we will join the arrays for each column/row to actually check for wins, checkX and checkO will be what we check against
 			var checkX = '';
 			var checkO = '';
 			//nested loops to get the columns
 			for(var i = 0; i < boardLength; i++){
 				var newColumn=[];
 				for(var n = 0; n < boardLength; n++){

 					newColumn.push(this.state.board[boardLength-(n+1)][i]);
 				}
 				//calculate the diagonals as well
 				leftDiagonal.push(this.state.board[i][i]);
 				rightDiagonal.push(this.state.board[i][boardLength-(i+1)]);
 				columnsArray.push(newColumn);
 				//this will calculate the variable length check strings for X and O
 				checkX = checkX + 'X';
 				checkO = checkO + 'O';
 			}
 			//loop through to check all columns/rows/diagonals on the board for winning state/check whole board for tie
 			for(var k = 0; k < boardLength; k++){
 				if((this.state.board[k].join('') == checkX) || (this.state.board[k].join('') == checkO)){
 						//win in a row
 					return [this.state.board[k][0]+" has won in row "+ (k+1),true];
 				}else if((columnsArray[k].join('') == checkX)||(columnsArray[k].join('') == checkO)){
 					//win in a column
 					return [columnsArray[k][0]+" has won in column " + (k+1),true];

 				}	else if((leftDiagonal.join('') == checkX) || (leftDiagonal.join('') == checkO)){
 					//win on left diagonal
 					return [leftDiagonal[0] + " has won on left diagonal",true];

 				} else if((rightDiagonal.join('') == checkX) || (rightDiagonal.join('') == checkO)){
 					//win on right diagonal
 					return [rightDiagonal[0] + " has won on right diagonal",true];

 				}else if(flattenedBoard.length == totalSquares){
 					//tie
 					return ["tie" , false]

 				}
 			}
 			//if we make it through the loop without a winner, return no winner and false
 			return ["no winner",false];
 		},
 		//function to start a new game, resets the states back to initial states
 		newGame:function(){

 			this.setState({board:this.makeBoard(), turn:"O"});
 		},
 		//make rows for the board based on number specified when rendering the game
 		makeBoard:function(){

 			var board = [];
 			//first loop for number of rows
 			for(var i=0; i < this.props.rows; i++){
 				row = []
 				//second loop for number of items in row
 				for(var j=0; j < this.props.rows; j++){
 					row.push(" ")

 				}
 				board.push(row)
 			}
 			return board;

 		},
	//render the actual game board
	render: function(){
 			var myTurn = this.state.turn;
 			var makeTurn = this.makeTurn;

 			return <div>
 			<div className = "container">

 			<h1>Welcome to React Tac Toe</h1>
 			<h1>Current Turn is: {this.state.turn}</h1>
 			<button className="btn btn-danger" onClick = {this.newGame}>Restart Game</button><br /><br />
 			<table>
 			{this.state.board.map(function(row,index){
 				return(<tr key={index}>
 					{row.map(function(square,location){

 						return( <Square play = {square} key = {location} location = {location} row = {index} turn = {myTurn}  makeTurn = {makeTurn} />);
 						
 					})}
 					</tr>);
 			})}
 			</table>
 			</div>
 			</div>



 		}
 	});

var Square = React.createClass({
	//click event on individual squares, call function in TicTacToeGame class that was passed as prop to actually do things like check for win
	handleClick: function(){

		this.props.makeTurn(this.props.location, this.props.row,this.props.turn);

	},
	//render square with click handler
	render:function(){
		return <td className="square" onClick={this.handleClick}><h3>{this.props.play}</h3></td>
	}

})
//render the game to the dom, attach to document.body
React.render(<TicTacToeGame rows="3" />, document.body);


})();