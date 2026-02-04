const logs = [
    { "timestamp": "2024-09-15T08:23:45Z", "user": "Alice", "action": "LOGIN", "details": "User Alice logged in" },
    { "timestamp": "2024-09-15T08:25:12Z", "user": "Alice", "action": "REQUEST", "details": "Requested resource 123" },
    { "timestamp": "2024-09-15T08:27:30Z", "user": "Alice", "action": "LOGOUT", "details": "User Alice logged out" },
    { "timestamp": "2024-09-15T08:35:11Z", "user": "Bob", "action": "LOGIN", "details": "User Bob logged in" },
    { "timestamp": "2024-09-15T08:40:22Z", "user": "Bob", "action": "REQUEST", "details": "Requested resource 124" },
    { "timestamp": "2024-09-15T08:42:08Z", "user": "Bob", "action": "ERROR", "details": "Database connection failed" },
    { "timestamp": "2024-09-15T08:45:15Z", "user": "Alice", "action": "LOGIN", "details": "User Alice logged in" },
    { "timestamp": "2024-09-15T08:50:30Z", "user": "Alice", "action": "REQUEST", "details": "Requested resource 125" },
    { "timestamp": "2024-09-15T08:55:45Z", "user": "Bob", "action": "ERROR", "details": "File not found" },
    { "timestamp": "2024-09-15T09:27:30Z", "user": "Alice", "action": "LOGOUT", "details": "User Alice logged out" },
    { "timestamp": "2024-09-15T09:00:00Z", "user": "Bob", "action": "LOGOUT", "details": "User Bob logged out" },
    { "timestamp": "2024-09-16T08:35:11Z", "user": "Bob", "action": "LOGIN", "details": "User Bob logged in" },
    { "timestamp": "2024-09-16T08:55:45Z", "user": "Bob", "action": "ERROR", "details": "File not found" },
    { "timestamp": "2024-09-16T10:00:00Z", "user": "Bob", "action": "LOGOUT", "details": "User Bob logged out" }
];

// Log processing function
function processLogs(logs) {
    const totalActionsPerUser = {};
    const errorCount = {};
    const sessionDurations = {};
    const activeSessions = {};

    for (const log of logs) {
        const { user, action, timestamp } = log;

        if (!totalActionsPerUser[user]) {
        totalActionsPerUser[user] = 0;
        }

        totalActionsPerUser[user]++;
        if (!errorCount[user]) {
            errorCount[user] = 0;
        }

        if (action === "ERROR") {
            errorCount[user]++;
        }

        if (action === "LOGIN") {
            activeSessions[user] = new Date(timestamp);
        }

        if (action === "LOGOUT" && activeSessions[user]) {
            const loginTime = activeSessions[user];
            const logoutTime = new Date(timestamp);

            const durationMinutes =
                (logoutTime - loginTime) / 1000 / 60;

            if (!sessionDurations[user]) {
                sessionDurations[user] = [];
            }

            sessionDurations[user].push(Math.round(durationMinutes));

            delete activeSessions[user];
        }
    }

        let mostActiveUser = null;
        let maxActions = 0;

        for (const user in totalActionsPerUser) {
            if (totalActionsPerUser[user] > maxActions) {
                maxActions = totalActionsPerUser[user];
                mostActiveUser = user;
            }
        }

    return {
        totalActionsPerUser,
        sessionDurations,
        errorCount,
        mostActiveUser
    };
}

const report = processLogs(logs);
console.log(report);

/*
Expected Output:
{
    totalActionsPerUser: { Alice: 6, Bob: 8 },
    sessionDurations: { Alice: [4, 42], Bob: [25, 85] },
    errorCount: { Alice: 0, Bob: 3 },
    mostActiveUser: 'Bob'
}
*/

// npx mocha testProcessLog.js