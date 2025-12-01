function createLogEntry(message) {
    const now = new Date();
    const timestamp = now.toLocaleTimeString('th-TH');
    const evenID = Math.random().toString(16).substring(2, 10).toUpperCase();
    
    const logMessage = message.toUpperCase();
    return `[${timestamp}] [${evenID}] - ${logMessage}`;
}

const log = createLogEntry("User login in");
console.log(log)