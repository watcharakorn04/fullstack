const numbers = [15, 16, 17, 18, 19];

const sum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
});

console.log(sum)