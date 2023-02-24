export function getFormattedDate(date) {
    return date.toISOString().slice(0, 10);
}

export function getDate7DaysAgo(date, days){
    return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate() - days)
}