var React = require('react'),

    Cell = require('./Cell');

function CheckersBoard (props) {
    function generateCellArray (currentArray, boardSize, color, secondaryColor) {
        var id, col, row, highlighted = false, newStyle = {}, count = boardSize * boardSize;

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

            if (props.highlightedCells.indexOf(id) > -1) highlighted = true;

            currentArray.push((
                <Cell style={newStyle} id={id} key={id} boardSize={boardSize} highlighted={highlighted}
                      handleClick={props.handleCellClick}
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
    secondaryColor: React.PropTypes.string.isRequired,
    highlightedCells: React.PropTypes.array.isRequired,
    handleCellClick: React.PropTypes.func.isRequired
};

module.exports = CheckersBoard;