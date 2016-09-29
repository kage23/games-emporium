function Player (name, color, positions, tokens) {
    // debugger;
    var playerName, playerColor, playerPositions, playerTokens;

    playerName = name;
    playerColor = color;
    playerPositions = positions;
    playerTokens = tokens;

    // Getters

    this.getName = function () {
        return playerName;
    };

    this.getColor = function () {
        return playerColor;
    };

    this.getPositions = function () {
        return playerPositions;
    };

    this.getTokens = function () {
        return playerTokens;
    };

    // Setters

    this.setName = function (inName) {
        playerName = inName;
    };

    this.setColor = function (inColor) {
        playerColor = inColor;
    };

    this.setPositions = function (inPositions) {
        playerPositions = inPositions;
    };

    this.setTokens = function (inTokens) {
        playerTokens = inTokens;
    };
}

module.exports = Player;