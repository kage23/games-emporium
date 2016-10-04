var React = require('react');

function Cell (props) {
    var style = Object.assign({}, props.style),
        cellSize = (100 / props.boardSize).toFixed(8) + '%';

    style.width = cellSize;
    style.paddingTop = cellSize;

    return (
        <div className="cell"
             style={style}
             id={props.id}
            ></div>
    );
}

Cell.propTypes = {
    boardSize: React.PropTypes.number.isRequired,
    id: React.PropTypes.string.isRequired,
    style: React.PropTypes.object
};

module.exports = Cell;