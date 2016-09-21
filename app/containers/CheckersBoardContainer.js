/**
 * Created by kylegsessions on 9/17/16.
 */
var React = require('react');
var CheckersBoard = require('../components/CheckersBoard');
var Cell = require('../components/Cell');

var CheckersBoardContainer = React.createClass({
	render: function () {
		var cellSize = (100 / this.props.size).toFixed(2) + '%',
			cellCount = this.props.size * this.props.size;

		function cellArray (currentArray, count, boardSize, cellStyle, color, secondaryColor) {
			var id, col, row, backgroundColor;

			if (currentArray.length >= count) {
				return currentArray;
			} else {
				col = (currentArray.length % boardSize) + 1;
				row = Math.floor(currentArray.length / boardSize) + 1;
				id = 'c' + col + 'r' + row;

				if (row % 2 != col % 2) {
					backgroundColor = color;
				} else {
					backgroundColor = secondaryColor;
				}

				currentArray.push(<Cell style={{
					width: cellStyle.width,
					paddingTop: cellStyle.paddingTop,
					float: cellStyle.float,
					backgroundColor: backgroundColor
				}} id={id} key={id} />);
				return cellArray(currentArray, count, boardSize, cellStyle, color, secondaryColor);
			}
		}

		var cells = cellArray([], cellCount, this.props.size, {
			width: cellSize,
			paddingTop: cellSize,
			float: 'left'
		}, this.props.color, this.props.secondary_color);

		return (
			<CheckersBoard>
				{cells}
			</CheckersBoard>
		);
	}
});

module.exports = CheckersBoardContainer;