function checkDayType(dayName) {
    switch (dayName.toLowerCase()) {
        case "monday":
        case "tuesday":
        case "wednesday":
        case "thursday":
        case "friday":
            return "Weekdat";
        case "saturday":
        case "sunday":
            return "Weekend";
        default:
            return "Invalid day name"
    }
}