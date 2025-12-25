const scores = [85, 92, 78, 95, 88];
let sum = 0;

// 1.1
for (let i = 10; i >= 1; i--) {
  console.log(i);
}

console.log('Total Score: ', sum);

console.log('----------------');

// 1.2
for (let i = 0; i < scores.length; i++) {
  sum += scores[i];
}

console.log('Total score:', sum);