function criticalCode() {
    throw "throwing an exception";
}

function logError(theExceotion) {
    console.log(theExceotion);
}

console.log("\n***********Try..Catcgh************\n");

try {
    criticalCode();
} catch (ex) {
    console.log("Got an error");
    logError(ex);
}

console.log("\n***********Throwing in Try..Catch************\n");

try {
    throw "An exception that is thrown evertime";
} catch (ex) {
    console.log("Got an error");
    logError(ex);
}

console.log("\n***********Try..Catch..Finally************\n");

try {
    criticalCode();
}   catch (ex) {
    console.log("Got an error");
    logError(ex);
} finally {
    console.log("Code that always will runs");
}

function hello() {
    console.log("\n***********Throwing Exception************\n");
}