function findPerimeter(length, width) {
    const perimeter = (length + width) * 2;
    return perimeter;
}

let result = findPerimeter(5,10);
console.log(`The perimeter is: ${result}`);