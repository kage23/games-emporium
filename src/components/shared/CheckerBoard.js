import React from 'react'
import Cell from './Cell'

export default class CheckerBoard extends React.Component {
    static propTypes = {
        size: React.PropTypes.number.isRequired,
        color: React.PropTypes.string.isRequired,
        secondaryColor: React.PropTypes.string.isRequired,
        highlightedCells: React.PropTypes.array.isRequired,
        handleCellClick: React.PropTypes.func.isRequired
    };

    render() {
        function generateCellArray (currentArray, props) {
            var id, col, row, highlighted = false, newStyle = {}, count = props.size * props.size;

            if (currentArray.length >= count) {
                return currentArray;
            } else {
                col = (currentArray.length % props.size);
                row = Math.floor(currentArray.length / props.size);
                id = 'c' + col + 'r' + row;

                if (row % 2 !== col % 2) {
                    newStyle.backgroundColor = props.color;
                } else {
                    newStyle.backgroundColor = props.secondaryColor;
                }

                if (props.highlightedCells.indexOf(id) > -1) highlighted = true;

                currentArray.push((
                    <Cell style={newStyle} id={id} key={id} boardSize={props.size} highlighted={highlighted}
                          handleClick={props.handleCellClick}
                        ></Cell>
                ));

                return generateCellArray(currentArray, props);
            }
        }

        var cells = generateCellArray([], this.props);

        return (
            <div className="checkerBoard">
                {cells}
                {this.props.children}
            </div>
        );
    }
}