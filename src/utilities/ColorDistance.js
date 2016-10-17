function ColorDistance (color1, color2) {
    var color1RGB, color2RGB;

    function colorStringToRGBArray (colorString) {
        return colorString.match(/\d+/g).map(numStr => { return parseInt(numStr, 10); });
    }

    function colorDistance (color1, color2) {
        // From http://stackoverflow.com/a/2103422
        var rmean, r, g, b;
        rmean = (color1[0] + color2[0]) / 2;
        r = color1[0] - color2[0];
        g = color1[1] - color2[1];
        b = color1[2] - color2[2];
        return Math.sqrt((((512 + rmean) * r * r) >> 8) + 4 * g * g + (((767 - rmean) * b * b) >> 8));
    }

    color1RGB = colorStringToRGBArray(color1);
    color2RGB = colorStringToRGBArray(color2);

    return colorDistance(color1RGB, color2RGB);
}

module.exports = ColorDistance;