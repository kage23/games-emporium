function NumberWithOrd (number) {
    var ord;

    if (number % 10 === 1 && number % 100 !== 11) ord = 'st';
    else if (number % 10 === 2 && number % 100 !== 12) ord = 'nd';
    else if (number % 10=== 3 && number % 100 !== 13) ord = 'rd';
    else ord = 'th';

    return number + ord;
}

module.exports = NumberWithOrd;