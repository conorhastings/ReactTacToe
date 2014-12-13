(function(){

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
			console.log('hello')
			return {rows:rows, turn:"o"}

		},

		render: function(){

			{ this.state.rows.map(function(row){
				return (
					<Square />
					);
			}, this) }


		}
	})


	var Row = React.createClass({
		render:function(){
			return <tr><Square /></tr>
		}

	})


	var Square = React.createClass({
		render:function(){
			return <td></td>
		}

	})


	// React.render(<Square /> , document.getElementById('board'));

	React.render(<TicTacToeGame rows="3" />, document.getElementById('board'));


})();