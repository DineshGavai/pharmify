import PropTypes from "prop-types";
import CTAButton from "./Button/CTAButton";
import React from "react";

/**
* Dropdown Component
* 
* A responsive dropdown component that displays as a modal popup on mobile devices.
* Features a scrim overlay, drag handle for mobile, and customizable content list.
* 
* @param {Object} props - Component props
* @param {Array} props.dropdownItemList - Array of React elements to display in dropdown list
* @param {boolean} props.isDropdownActive - Controls dropdown visibility state
* @param {Function} props.setIsDropdownActive - State setter function for dropdown visibility
* @param {boolean} [props.mobileSearchBar=false] - Whether to show search bar on mobile (TODO: not implemented)
* @param {Object} [props.rect={}] - Positioning rectangle for dropdown placement
* 
* @throws {Error} Throws error if required state props are not provided
* 
* TODO: 
* - Implement searchbar component integration
* - Implement rect positioning logic
* - Add keyboard navigation support
* - Add ARIA accessibility attributes
* - Add selection handling logic
* - Handle empty state
*/
const Dropdown = ({
    dropdownItemList,
    isDropdownActive,
    setIsDropdownActive,
    mobileSearchBar = false,
    rect = {}
}) => {

    // Validate required props
    if (isDropdownActive == null || !setIsDropdownActive) {
        throw new Error(
            "Required to pass the state and setter: `isDropdownActive` and `setIsDropdownActive`"
        );
    }

    return (
        <>
            {/* Background scrim overlay */}
            <div
                className={`scrim ${isDropdownActive ? "active" : ""}`}
                onClick={() => setIsDropdownActive(false)}
                role="button"
                tabIndex={-1}
                aria-label="Close dropdown"
            />

            {/* Main dropdown container */}
            <div
                className={`dropdown mobile-pop-up ${isDropdownActive ? "active" : ""}`}
                role="listbox"
                aria-expanded={isDropdownActive}
                style={{
                    top: (rect.top + rect.height + 4) || 0,
                    width: rect.width || 0,
                    left: rect.x || 0,
                }}
            >
                {/* Mobile drag handle controls */}
                <div className="controls top below-600-only">
                    <span className="drag-handle" />
                </div>

                {/* TODO: Create a Searchbar component to add in here. */}
                {/* {mobileSearchBar && <SearchBar />} */}

                {/* Dropdown content list */}
                <ul className="dropdown-list" role="list">
                    {dropdownItemList.map((item) => (
                        React.cloneElement(item, {
                            isDropdownActive,
                            setIsDropdownActive
                        })
                    ))}
                </ul>

                {/* Bottom controls (currently empty) */}
                <div className="controls bottom" />
            </div>

            {/* Mobile floating action button */}
            <CTAButton
                iconName="check_lg"
                className="fab below-600-only"
                aria-label="Confirm selection"
            />
        </>
    );
};

// PropTypes validation
Dropdown.propTypes = {
    dropdownItemList: PropTypes.arrayOf(PropTypes.node).isRequired,
    isDropdownActive: PropTypes.bool.isRequired,
    setIsDropdownActive: PropTypes.func.isRequired,
    mobileSearchBar: PropTypes.bool,
    rect: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
    }),
};

Dropdown.defaultProps = {
    mobileSearchBar: false,
    rect: {},
};

export default Dropdown;