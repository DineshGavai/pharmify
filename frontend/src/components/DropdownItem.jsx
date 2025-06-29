import PropTypes from "prop-types";
import { isIncludesMatchingText, highlightMatchingText } from "../utils/typography";

/**
* DropdownItem Component
* 
* A dropdown list item component that highlights matching text within the content.
* Used within dropdown menus to display selectable options with search highlighting.
* Items are hidden when they don't match the search input.
* 
* @param {Object} props - Component props
* @param {string|React.ReactNode} props.content - The display content for the item
* @param {string} props.value - The value associated with this dropdown item
* @param {string} props.inputValue - The search/input value to highlight within content
* 
* Features:
* - Text highlighting for search matches
* - Automatic filtering - hides non-matching items
* - Accessible list item structure
* - Value association for selection handling
* 
* TODO:
* - Add click/selection handlers
* - Implement keyboard navigation support
* - Add hover/focus states
*/
const DropdownItem = ({ content, value, inputValue, input, setIsDropdownActive }) => {

    // Return null if input value doesn't match
    if (!isIncludesMatchingText(content, inputValue)) {
        return null;
    }

    // Highlight matching text with input
    const processedContent = typeof content === 'string'
        ? highlightMatchingText(content, inputValue)
        : content;

    return (
        <li
            className="item"
            value={value}
            role="option"
            tabIndex={0}
            aria-selected={false}
            onClick={() => {
                input.current.value = value;
                setIsDropdownActive(false);
            }}
        >
            {processedContent}
        </li>
    );
};

DropdownItem.propTypes = {
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]).isRequired,
    value: PropTypes.string.isRequired,
    inputValue: PropTypes.string.isRequired,
};

export default DropdownItem;