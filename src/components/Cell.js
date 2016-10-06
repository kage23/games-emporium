var React = require('react');

var Cell = React.createClass({
    propTypes: {
        boardSize: React.PropTypes.number.isRequired,
        id: React.PropTypes.string.isRequired,
        highlighted: React.PropTypes.bool.isRequired,
        handleClick: React.PropTypes.func.isRequired,
        style: React.PropTypes.object
    },

    handleClick: function () {
        this.props.handleClick(this);
    },

    render: function () {
        var style = Object.assign({}, this.props.style),
            cellSize = (100 / this.props.boardSize).toFixed(8) + '%',
            className = 'cell';

        style.width = cellSize;
        style.paddingTop = cellSize;

        if (this.props.highlighted) className += ' highlighted';

        return (
            <div className={className}
                 style={style}
                 id={this.props.id}
                 onClick={this.handleClick}
                ></div>
        );
    }

});

module.exports = Cell;