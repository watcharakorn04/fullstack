const cat = {
    name: "Lucifer",
    age: 8,

    whatName: function() {
        return this.name;
    }
};

const dog = {
    name: "Chiyo",

    whatName: cat.whatName
};

console.log(cat.whatName());
console.log(dog.whatName());