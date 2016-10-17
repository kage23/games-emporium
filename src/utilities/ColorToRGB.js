function ColorToRGB (stringToTest) {
    // From http://stackoverflow.com/a/16994164
    // and http://stackoverflow.com/a/1573154
    var colorIsValid, d, returnColor;

    if (stringToTest === "") { colorIsValid = false; }
    if (stringToTest === "inherit") { colorIsValid = false; }
    if (stringToTest === "transparent") { colorIsValid = false; }

    d = document.createElement("div");
    d.style.color = "rgb(0, 0, 0)";
    d.style.color = stringToTest;
    if (d.style.color !== "rgb(0, 0, 0)") { colorIsValid = true; }
    else {
        d.style.color = "rgb(255, 255, 255)";
        d.style.color = stringToTest;
        colorIsValid = d.style.color !== "rgb(255, 255, 255)";
    }

    if (colorIsValid) {
        document.body.appendChild(d);
        returnColor = window.getComputedStyle(d).color;
        document.body.removeChild(d);
        return returnColor;
    } else { return false; }
}

module.exports = ColorToRGB;