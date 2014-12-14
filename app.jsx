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
 		clickBox: function(square, row, player) {
 			console.log('hello')
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

 		handleClick: function(){
 			console.log('clicked')
 			this.props.clickBox(this.props.location, this.props.row,this.props.turn);
 		},
 		render:function(){
 			return <td className="square" onClick={this.handleClick}></td>
 		}

 	})


	// React.render(<Square /> , document.getElementById('board'));

	React.render(<TicTacToeGame rows="3" />, document.getElementById('targetEl'));


})();