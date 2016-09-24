var React = require('react');

function Token (props) {
    return (
        <div style={props.style} />
    );
}

Token.propTypes = {
    style: React.PropTypes.object.isRequired
};

module.exports = Token;