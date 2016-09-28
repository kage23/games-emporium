var React = require('react');

function Token (props) {
    return (
        <div style={props.style} onClick={props.handleClick} id={props.id} className={props.classes} />
    );
}

Token.propTypes = {
    style: React.PropTypes.object.isRequired,
    handleClick: React.PropTypes.func.isRequired,
    id: React.PropTypes.string.isRequired
};

module.exports = Token;