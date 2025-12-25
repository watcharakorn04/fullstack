let values1 = ['Apple', 1, false];
let values2 = ['Fries', 2, true, 'Apple'];
let values3 = ['Mars', 9, 'Apple'];

//แบบที่ 1
for (let val1 of values1) {
    for (let val2 of values2) {
        for (let val3 of values3) {
            if (val1 === val2 && val2 === val3) {
                console.log(val1);
            }
        }
    }
}

console.log('------------')

//แบบที่ 2
const result = values1.filter(value => 
    values2.includes(value) && values3.includes(value)
);

console.log(result)