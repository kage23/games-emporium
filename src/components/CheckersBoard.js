var React = require('react'),

    Cell = require('./Cell');

function CheckersBoard (props) {
    function generateCellArray (currentArray, boardSize, color, secondaryColor) {
        var id, col, row, newStyle = {}, count = boardSize * boardSize;

        if (currentArray.length >= count) {
            return currentArray;
        } else {
            col = (currentArray.length % boardSize);
            row = Math.floor(currentArray.length / boardSize);
            id = 'c' + col + 'r' + row;

            if (row % 2 !== col % 2) {
                newStyle.backgroundColor = color;
            } else {
                newStyle.backgroundColor = secondaryColor;
            }

            // TODO: highlighted cells for selected token
            // TODO: maybe make a list of occupied cells
            // TODO: Add the handleClick stuff

            currentArray.push((
                <Cell style={newStyle} id={id} key={id} boardSize={boardSize}
                    ></Cell>
            ));

            return generateCellArray(currentArray, boardSize, color, secondaryColor);
        }
    }

    var cells = generateCellArray([], props.size, props.color, props.secondaryColor);

    return (
        <div className="checkersBoard">
            {cells}
            {props.children}
        </div>
    );
}

CheckersBoard.propTypes = {
    size: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
    secondaryColor: React.PropTypes.string.isRequired
};

module.exports = CheckersBoard;