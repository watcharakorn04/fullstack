function countString(input, type) {
    // Your code here
    
    if (typeof input !== "string" ) {
        throw new Error("invalid parameter")
    }
    if (input == 0) {
        return 0;
    }

    if (type === "w"){
        result = input.split(" ");
        return result.length;

    }else if(type === "c"){
        result = input.replace(/\s+/g, '');
        return result.length;

    }else if(type === "v"){
        const vowels = 'aeiou';
        let count = 0;
        result = input.replace(new RegExp(`[^${vowels}]`, 'gi'), '');
        return result.length;

    }else{
        throw new Error("Invalid parameter")
    }
}

// Example usage
console.log("Word count:", countString("Hello world, how are you?", "w")); // Output: 5
console.log("Character count:", countString("Hello world, how are you?", "c")); // Output: 21
console.log("Vowel count:", countString("Hello world, how are you?", "v")); // Output: 8