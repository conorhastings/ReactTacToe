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
			console.log(rows)
			return {rows:rows,turn:"o"}
		},

		render: function(){
			return (
				<table>
			{this.state.rows.map(function(row){
			return(<tr>
				{row.map(function(square){
					return(<td className="square">Hello</td>)
					console.log()
				})}
			</tr>)
			})}
			</table>
			)


		}
	});


// var Square = React.createClass({
// 	render:function(){
// 		return <td></td>
// 	}

// })


	// React.render(<Square /> , document.getElementById('board'));

	React.render(<TicTacToeGame rows="5" />, document.body);


})();