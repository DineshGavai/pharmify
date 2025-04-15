export const formatDate = (timestamp) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(timestamp).toLocaleDateString("en-US", options);
};