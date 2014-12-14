/**
 * @jsx React.DOM
 */
 (function(){

 	var TicTacToeGame = React.createClass({

 		getInitialState:function(){
 			rows = [];
 			for(var i=0; i < this.props.rows; i++){
 				row = []
 				for(var j=0; j < this.props.rows; j++){
 					row.push(" ")

 				}
 				rows.push(row)

 			}


 			return {rows:rows,turn:"O"}
 		},
 		clickBox: function(square, row, turn) {
 			var rows = this.state.rows;
 			rows[row][square] = turn
 			if (turn== "O"){
 				var newTurn = "X"
 			}
 			else{
 				var newTurn = "O"
 			}
 			console.log(rows)

 			this.setState({rows:rows, turn:newTurn})

 		},

 		winningBoard:function(){

 		},

 		render: function(){
 			myTurn = this.state.turn;
 			clickBox = this.clickBox;
 			return <div>
 			<h1>Current Turn is: {this.state.turn}</h1>
 			<table>
 			{this.state.rows.map(function(row,index){
 				return(<tr key={index}>
 					{row.map(function(square,location){

 						return( <Square status={square} key = {location} location = {location} row = {index} turn={myTurn} clickBox={clickBox} />);
 						console.log()
 					})}
 					</tr>);
 			})}
 			</table>
 			</div>



 		}
 	});




 	var Square = React.createClass({

 		getInitialState:function(){
 			return {square: " "}
 		},

 		handleClick: function(){
 			console.log('clicked')
 			this.props.clickBox(this.props.location, this.props.row,this.props.turn);
 			this.setState({square:this.props.turn})

 		},
 		render:function(){
 			return <td className="square" onClick={this.handleClick}><h3>{this.state.square}</h3></td>
 		}

 	})


	// React.render(<Square /> , document.getElementById('board'));

	React.render(<TicTacToeGame rows="5" />, document.getElementById('targetEl'));


})();