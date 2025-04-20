const supportedFormats = [
    "dd mon, yyyy",
    "mon dd, yyyy",
    "dd/mm/yyyy",
    "mm/dd/yyyy",
    "yyyy-mm-dd",
    "mm/yyyy",
    "dd-mm-yy",
    "full",
    "mon yyyy",
    "dd mon",
];

const units = [
    { label: "year", seconds: 86400 * 30 * 12 },
    { label: "month", seconds: 86400 * 30 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 }
];

// Get date formatted in given format
export const formatDate = (timestamp, format = "dd mon, yyyy") => {
    const date = new Date(timestamp);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const shortYear = year.toString().slice(-2);

    const monthNamesShort = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const monthShort = monthNamesShort[date.getMonth()];

    switch (format) {
        case "dd mon, yyyy":
            return `${day} ${monthShort}, ${year}`;
        case "mon dd, yyyy":
            return `${monthShort} ${day}, ${year}`;
        case "dd/mm/yyyy":
            return `${day}/${month}/${year}`;
        case "mm/dd/yyyy":
            return `${month}/${day}/${year}`;
        case "yyyy-mm-dd":
            return `${year}-${month}-${day}`;
        case "mm/yyyy":
            return `${month}/${year}`;
        case "mm/yy":
            return `${month}/${shortYear}`;
        case "dd-mm-yy":
            return `${day}-${month}-${shortYear}`;
        case "full":
            return date.toDateString(); // Example: "Mon Apr 13 2025"
        case "mon yyyy":
            return `${monthShort} ${year}`;
        case "dd mon":
            return `${day} ${monthShort}`;
        default:
            return `${day} ${monthShort}, ${year}`;
    }
};

// Get time distance formatted in the form of: A year B months C days and so on ...
export const getTimeDifferenceLong = (from, to = Date.now()) => {
    let delta = Math.abs(to - from) / 1000;

    const parts = [];

    for (const { label, seconds } of units) {
        const amount = Math.floor(delta / seconds);
        if (amount > 0) {
            parts.push(`${amount} ${label}${amount > 1 ? "s" : ""}`);
            delta -= amount * seconds;
        }
    }

    return parts.length > 0 ? parts.join(" ") : "0 seconds";
};


// Get shorter version of the time difference
export const getTimeDifferenceShort = (from, to = Date.now()) => {
    let delta = Math.abs(to - from) / 1000;

    for (let i = 0; i < units.length; i++) {
        const { label, seconds } = units[i];
        const value = Math.floor(delta / seconds);

        if (value > 0) {
            return `${value} ${label}${value > 1 ? "s" : ""}`;
        }
    }

    return `0 seconds`;
};
