class Dog {
    constructor(name) {
        this._name = name;
    }

    introduce() {
        console.log("This is " + this._name + " !"); //('This dog's name is ${this._name}');
    }

    static bark() {
        console.log("Woof!");
    }
}

const myDog = new Dog("Buster");
myDog.introduce(); // This is Buster !
Dog.bark(); // Woof!
//myDog.bark(); // Error: myDog.bark is not a function