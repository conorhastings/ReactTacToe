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
		
			{ this.state.rows.map(function(){
				return (
					<tr></tr>
					);
			}, this) }


		}
	})




	React.render(<TicTacToeGame rows="3" />, document.getElementById('board'));


})();