const err_status = 200;

if (err_status === 200) {
    console.log("Operation was successful.");
} else if (err_status === 400) {
    console.log("Bad request. Please check your input.");
} else {
    console.log("An unexpected error occurred");
}

switch (err_status) {
    case 200:
        console.log("Operation was successful.");
        break;
    case 400:
        console.log("Bad request. Please check your input.");
        break;
    default:
        console.log("An unexpected error occurred");
}

const message = (err_status === 200) ? "OK!" : "Error";
console.log(message)