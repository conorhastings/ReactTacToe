/**
 * @jsx React.DOM
 */
 (function(){

 	var TicTacToeGame = React.createClass({

 		getInitialState:function(){

 	
 		return {board:this.makeBoard(),turn:"O"}
 		},
 		makeTurn: function(square, row, turn) {
 			var board = this.state.board;
 			if(board[row][square] == " "){
 				board[row][square] = turn;
 				if (turn== "O"){
 					var newTurn = "X";
 				}
 				else{
 					var newTurn = "O";
 				}
 				this.setState({board:board, turn:newTurn});

 			}
 			else{
 				alert("You can't go there!")
 			}
 			checkWin = this.winningBoard()
 			
 			if (checkWin[1] == true){
 			
 				alert(checkWin[0]+" ,click ok to start a new game")
 				this.newGame()
 			}
 			else if(checkWin[0] == "tie" ){
 				alert("The game has ended in a tie, click ok to start a new game")
 				this.newGame()
 			}

 		},

 		winningBoard:function(){
 			length = this.state.board.length
 			totalSquares = length * length
 			var flattenedBoard = this.state.board.reduce(function(a, b) {
 				return a.concat(b);
 			});
 			flattenedBoard = flattenedBoard.join('').split(' ').join('');
 		
 			var columnsArray = [];
 			leftDiagonal = [];
 			rightDiagonal = [];
 			var checkX = '';
 			var checkO = '';
 			for(var i = 0; i < length; i++){
 				var newColumn=[];
 				for(var n = 0; n < length; n++){

 					newColumn.push(this.state.board[length-(n+1)][i]);
 				}
 				leftDiagonal.push(this.state.board[i][i]);
 				rightDiagonal.push(this.state.board[i][length-(i+1)]);
 				columnsArray.push(newColumn);
 				checkX = checkX + 'X';
 				checkO = checkO + 'O';
 			}
 			for(var k = 0; k < length; k++){
 				if((this.state.board[k].join('') == checkX) || (this.state.board[k].join('') == checkO)){
 					
 					return [this.state.board[k][0]+" has won in row "+ (k+1),true];
 				}else if((columnsArray[k].join('') == checkX)||(columnsArray[k].join('') == checkO)){
 					
 					return [columnsArray[k][0]+" has won in column " + (k+1),true];

 				}	else if((leftDiagonal.join('') == checkX) || (leftDiagonal.join('') == checkO)){
 					
 					return [leftDiagonal[0] + " has won on left diagonal",true];

 				} else if((rightDiagonal.join('') == checkX) || (rightDiagonal.join('') == checkO)){
 					
 					return [rightDiagonal[0] + " has won on right diagonal",true];

 				}else if(flattenedBoard.length == totalSquares){

 					return ["tie" , false]

 				}
 			}

 			return ["no winner",false];
 		},

 		newGame:function(){
 			this.setState({board:this.makeBoard(), turn:"O"});
 		},
 		makeBoard:function(){
 			var board = [];
 			for(var i=0; i < this.props.rows; i++){
 				row = []
 				for(var j=0; j < this.props.rows; j++){
 					row.push(" ")

 				}
 				board.push(row)
 			}
 			return board;

 		},


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
 					
 						return( <Square play = {square} key = {location} location = {location} row = {index} turn = {myTurn} makeTurn = {makeTurn} />);
 						
 					})}
 					</tr>);
 			})}
 			</table>
 			</div>
 			</div>



 		}
 	});

var Square = React.createClass({

	handleClick: function(){
	
		this.props.makeTurn(this.props.location, this.props.row,this.props.turn);
	
	},
	render:function(){
		return <td className="square" onClick={this.handleClick}><h3>{this.props.play}</h3></td>
	}

})

React.render(<TicTacToeGame rows="3" />, document.body);


})();