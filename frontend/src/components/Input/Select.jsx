import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { exampleSupplierData } from "../../utils/data";
import IconButton from "../Button/IconButton";
import Dropdown from "../Dropdown";
import Input from "./Input";
import DropdownItem from "../DropdownItem";

/**
* Select Component
* 
* A custom select input component that combines an Input field with a Dropdown.
* Displays supplier data in a searchable dropdown format on mobile devices.
* 
* @param {Object} props - All Input component props are passed through via rest spread
* 
* Features:
* - Inherits all Input component functionality
* - Dropdown activation on input focus
* - Mobile search bar support
* - Chevron down indicator icon
* - Supplier data integration
*/

const Select = ({ dropdownItemList, ...rest }) => {

    const selectInputParentRef = useRef();
    const selectInputRef = useRef();

    // Dropdown visibility state
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const [firstItem, setFirstItem] = useState("")

    // Handle item selection from dropdown
    const handleItemSelect = (selectedValue) => {
        selectInputRef.current.value = selectedValue
        setIsDropdownActive(false);
        selectInputRef.current.focus();
    };


    return (
        <div
            className="select-input"
            ref={selectInputParentRef}
        >
            {/* The select input field */}
            <Input
                {...rest}
                ref={selectInputRef}
                rightElem={
                    <IconButton
                        iconName="chevron_down"
                        className="no-border"
                        aria-label="Open dropdown"
                    />
                }
                onFocus={() => setIsDropdownActive(true)}
                // onChange={() => setIsDropdownActive(true)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        // Find first matching item and select it
                        const firstMatch = dropdownItemList.find(item =>
                            item.props.content.toLowerCase().includes(selectInputRef.current.value.toLowerCase())
                        );
                        if (firstMatch) {
                            handleItemSelect(firstMatch.props.value);
                        }
                    }
                }}
            />

            {/* Dropdown component */}
            <Dropdown
                mobileSearchBar={true}
                isDropdownActive={isDropdownActive}
                setIsDropdownActive={setIsDropdownActive}
                rect={selectInputParentRef.current?.getBoundingClientRect()}
                // Add the new `inputValue` prop
                dropdownItemList={
                    dropdownItemList.map(item => (
                        React.cloneElement(item, {
                            inputValue: selectInputRef.current?.value,
                            input: selectInputRef
                        })
                    ))}
            />
        </div>
    );
};

// PropTypes validation
Select.propTypes = {
    /** All props from Input component are accepted via rest spread */
    // Note: Specific Input props would be documented here if Input component had defined PropTypes
};

export default Select;