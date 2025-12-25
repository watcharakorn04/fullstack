const guests = ['Alice', 'Bob', 'Charlie', 'David'];
let i = 0;

// 2.1
while (i < guests.length) {

    if (guests[i] === 'Charlie') {
        console.log('Found Charlie!');
        break;
    }
    i++;
}

console.log('---------------')

// 2.2
const message = "Hello World";
const word = ['a', 'e', 'i', 'o', 'u'];

for (const char of message) {
    if (word.includes(char.toLowerCase())) {
        console.log(char)
    }
}