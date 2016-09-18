/**
 * Created by kylegsessions on 9/17/16.
 */
var React = require('react');

var CheckersBoard = React.createClass({
	render: function () {
		var rowLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
			colLabels = ['1', '2', '3', '4', '5', '6', '7', '8'],
			cells = rowLabels.map(function(rowLabel, rowIdx) {
				var rowId = 'row_' + rowLabel;
				var rowCells = colLabels.map(function(colLabel, colIdx) {
					var id = 'cell_' + rowLabel + colLabel,
						className = 'cell',
						playable =  (
							(rowIdx % 2 == 0 && colIdx % 2 == 1) ||
							(rowIdx % 2 == 1 && colIdx % 2 == 0)
						);

					if (playable) className += ' black';
					else className += ' white';

					return <div className={className} id={id} key={id}
								style={{
									float: 'left',
									width: '12.5%',
									paddingTop: '12.5%',
									background: playable ? '#000' : '#fff'
								}}
						></div>;
				});

				return <div className="row" id={rowId} key={rowId}>{rowCells}</div>;
			});

		return (
			<div className="checkersBoard" style={{
				border: '3px solid gold',
				overflow: 'hidden',
				maxWidth: 700
			}}>
				{cells}
			</div>
		);
	}
});

module.exports = CheckersBoard;