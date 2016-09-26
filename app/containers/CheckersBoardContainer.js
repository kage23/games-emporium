/**
 * Created by kylegsessions on 9/17/16.
 */
var React = require('react');
var CheckersBoard = require('../components/CheckersBoard');
var Cell = require('../components/Cell');

function CheckersBoardContainer (props) {
    var cellSize = (100 / props.size).toFixed(8) + '%',
        cellCount = props.size * props.size;

    function cellArray (currentArray, count, boardSize, cellStyle, color, secondaryColor) {
        var id, col, row, backgroundColor;

        if (currentArray.length >= count) {
            return currentArray;
        } else {
            col = (currentArray.length % boardSize);
            row = Math.floor(currentArray.length / boardSize);
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

    var cells = cellArray([], cellCount, props.size, {
        width: cellSize,
        paddingTop: cellSize,
        float: 'left'
    }, props.color, props.secondary_color);

    return (
        <CheckersBoard>
            {cells}
            {props.children}
        </CheckersBoard>
    );
}

module.exports = CheckersBoardContainer;