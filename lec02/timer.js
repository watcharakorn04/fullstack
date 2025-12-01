const startTime1 = Date.now();

function someHeavyTask() {
    let result = 0;
}

const endTime1 = Date.now()

const duration = endTime1 - startTime1;
console.log(`Execution Time: ${duration} ms`);

console.log('--------------------------------------------------');

const startTime = Date.now();

function someHeavyTask() {
    for (let i = 0; i < 4e7; i++) {
        Math.sqrt(i);
    }
}

someHeavyTask();
const endTime = Date.now()
console.log(`Execution Time: ${endTime - startTime} ms`);