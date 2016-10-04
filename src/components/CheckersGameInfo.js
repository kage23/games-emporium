var React = require('react');

var CheckersGameInfo = React.createClass({
    render: function () {
        return (
            <h3>It is <span style={{color:this.props.color}}>{this.props.name}</span>'s turn</h3>
        );
    }
});

CheckersGameInfo.propTypes = {
    name: React.PropTypes.string.isRequired,
    color: React.PropTypes.string.isRequired
};

module.exports = CheckersGameInfo;