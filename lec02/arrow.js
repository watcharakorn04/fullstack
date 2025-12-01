const a = 5
const b = 10

const add = function(x, y) {
    return x + y
}

console.log(`The sum of ${a} and ${b} is ${add(a, b)}`)

const xadd = (x, y) => x + y
console.log(`The sum of ${a} and ${b} is ${xadd(a, b)}`)

const subtract = (x, y) => {
    return x - y
}

console.log(`The differenc of ${b} and ${a} is ${subtract(b, a)}`)