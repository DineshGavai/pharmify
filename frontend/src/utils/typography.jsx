/**
    * Checks if content matches the search input
    * @param {string} text - The text to search within
    * @param {string} searchValue - The value to search for
    * @returns {boolean} - Whether the text contains the search value
    */
export const isIncludesMatchingText = (text, searchValue) => {
    // If no search value, show all items
    if (!searchValue) return true;

    // If content is not a string, hide it when searching
    if (typeof text !== 'string') return false;

    // Case-insensitive match check
    return text.toLowerCase().includes(searchValue.toLowerCase());
};


/**
    * Highlights matching text within content string
    * @param {string} text - The text to search within
    * @param {string} searchValue - The value to highlight
    * @returns {React.ReactNode} - Text with highlighted matches
    */

export const highlightMatchingText = (text, searchValue) => {
    // If no search value or content is not a string, return as-is
    if (!searchValue || typeof text !== 'string') return text;

    // Create case-insensitive regex for global matching
    const regex = new RegExp(`(${searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');

    // Split text by matches and map to JSX
    const parts = text.split(regex);

    // Return matching part
    return parts.map((part, index) => {
        if (part.toLowerCase() === searchValue.toLowerCase()) {
            return <b key={index}>{part}</b>
        }
        return part;
    });
};
