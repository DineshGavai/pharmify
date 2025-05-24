import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import CTAButton from "../Button/CTAButton";
import IconButton from "../Button/IconButton";

const Input = ({
    // Core Input Attributes
    label = "",
    type = "text",
    name,
    id,
    value,
    defaultValue = "",
    placeholder = "",
    autoComplete = "off",
    autoFocus = false,
    required = true,
    disabled = false,
    readOnly = false,
    showPasswordButton = false,

    // Validation
    maxLength,
    minLength,
    pattern,
    maxNumber,
    minNumber,
    step,

    // Formatting & Behavior
    allowOnlyNumbers = false,
    numberFormat = "default",
    transformText,
    spellCheck = false,

    // Events
    onChange,

    // UI Enhancements
    className = "",
    multiline = false,
    clearable = false,
    autogrow = false,

    // Icons & Buttons
    leftElem,
    rightElem,

    // Messaging
    helpText,
    errorMessage,
    warningMessage,
    successMessage,

}) => {

    const [inputType, setInputType] = useState(type);

    leftElem = leftElem ? (<span className="left-elem">{leftElem}</span>) : null;
    rightElem = rightElem ? (<span className="right-elem">{rightElem}</span>) : null;

    if (showPasswordButton) {
        rightElem =
            <IconButton
                iconName={inputType == "password" ? "eye" : "eye_slash"}
                type="button"
                onClick={(e) => {
                    setInputType(inputType == "password" ? "text" : "password")
                }}
            />
    }

    return (
        <div className={`input-box ${value.length !== 0 ? "filled" : ""} ${(leftElem) ? "has-trail-item" : ""} ${className}`}>

            {
                label &&
                <label
                    htmlFor={`${id}`}
                >
                    {label} {!required && "(optional)"}
                </label>
            }

            <div className="input-frame text-input">
                {/* Left Icon or Button */}
                {leftElem}
                {/* Input */}
                <input
                    type={inputType}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    disabled={disabled}
                    readOnly={readOnly}
                    className={className}

                    // Validation
                    spellCheck={spellCheck}
                    required={required}
                    pattern={pattern}

                    // Events
                    onChange={(e) => {
                        value = e.target.value
                        if (onChange) onChange(e)
                    }}

                    // UI Enhancements
                    style={{
                        "--length": value.length + "ch"
                    }}
                />
                {/* Right Icon or Button */}
                {rightElem}
            </div>
            <p className="help-text text-muted">{helpText}</p>
        </div>
    );
};

Input.propTypes = {
    // Core Input Attributes
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,

    // Validation
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    pattern: PropTypes.string,
    maxNumber: PropTypes.number,
    minNumber: PropTypes.number,
    step: PropTypes.number,

    // Formatting & Behavior
    allowOnlyNumbers: PropTypes.bool,
    numberFormat: PropTypes.string,
    transformText: PropTypes.func,
    spellCheck: PropTypes.bool,

    // Events
    onChange: PropTypes.func,

    // UI Enhancements
    className: PropTypes.string,
    multiline: PropTypes.bool,
    clearable: PropTypes.bool,

    // Icons & Buttons
    leftElem: PropTypes.node,
    rightElem: PropTypes.node,

    // Messaging
    helpText: PropTypes.string,
    errorMessage: PropTypes.string,
    warningMessage: PropTypes.string,
    successMessage: PropTypes.string,
};

export default Input;


// Input Functions
export const controlledInput = (setter, key_name, explicitValue) => (e) => {
    const value = explicitValue !== null ? explicitValue : e.target.value;
    setter((data) => ({
        ...data,
        [key_name]: value,
    }));
};