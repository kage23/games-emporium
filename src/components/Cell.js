var React = require('react');

function Cell (props) {
    var style = Object.assign({}, props.style),
        cellSize = (100 / props.boardSize).toFixed(8) + '%',
        className = 'cell';

    style.width = cellSize;
    style.paddingTop = cellSize;

    if (props.highlighted) className += ' highlighted';

    return (
        <div className={className}
             style={style}
             id={props.id}
            ></div>
    );
}

Cell.propTypes = {
    boardSize: React.PropTypes.number.isRequired,
    id: React.PropTypes.string.isRequired,
    highlighted: React.PropTypes.bool.isRequired,
    style: React.PropTypes.object
};

module.exports = Cell;