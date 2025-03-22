export const regexPatterns = {
    "full_name": /([A-Za-z]+){2,}\s+([A-Za-z]+)(?:\s+([A-Za-z]+){2,})?$/,
    "business_name": /^[.@&]?[a-zA-Z0-9]+[\!\.\@\&\(\)]?[a-zA-Z0-9!\(\)]+/,
    "phone": /^\d{10}$/,
    "email": /^([a-zA-Z0-9._%\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})$/,
    "password": /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
}