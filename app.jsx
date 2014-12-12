

var TicTacToeGame = React.createClass({

	getInitialState:function(){
		rows = [];
		for(var i=0; i < this.props.rows; i++){
			row = [];
			for(var j=0; j < this.props.rows; j++){
				row.push(" ");

			}
			rows.push(row);
		}
		return {rows:rows, turn:"x"}

	},

	render: function(){
		return <div>Hello {this.state.rows}</div>


	}
})

React.render(<TicTacToeGame rows = "10"/>, document.getElementById('test'));
