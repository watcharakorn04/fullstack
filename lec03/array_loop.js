const names = ['Justin', 'Sarah', 'Christopher'];

//The Old Way
for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
}

//The Modern Way
names.forEach(name => {
    console.log*(name);
});

//More
names.forEach(myFunction);

function myFunction(name) {
    console.log(name);
}

for (let name of names) {
    console.log(name);
}