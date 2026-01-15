function promiseTimeout(ms) {
    return new Promise((resolve, reject) => { 
        setTimeout(resolve, ms); //can reject
    });
}

async function longRunningOperation() {

    //logic
    return 42;
}

async function run() {
    console.log("Start!!");
    await promiseTimeout(2000);

    const response = await longRunningOperation();
    console.log(response);

    console.log("Stop!!");
}

console.log("Before run()")
run();
console.log("After run()")