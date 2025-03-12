import { useState } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import CTAButton from "../Button/CTAButton";

const Input = ({
    // Core Input Attributes
    label = "",
    type = "text",
    name = "",
    id = "",
    defaultValue = "",
    placeholder = "",
    autoComplete = "off",
    autoFocus = false,
    required = true,
    disabled = false,
    readOnly = false,

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
    onChange = () => { },

    // UI Enhancements
    className = "",
    multiline = false,
    clearable = false,

    // Icons & Buttons
    leftIcon,
    rightIcon,
    leftButton,
    rightButton,
    leftButtonClass,
    rightButtonClass,
    leftButtonOnClick,
    rightButtonOnClick,

    // Messaging
    helpText,
    errorMessage,
    warningMessage,
    successMessage,

}) => {

    const [inputValue, setInputValue] = useState(defaultValue || "");


    return (
        <div className={`input-box ${inputValue.length > 0 ? "filled" : ""} ${(leftIcon || leftButton) ? "has-trail-item" : ""}`}>

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
                {
                    leftIcon &&
                    <Icon iconName={leftIcon} className="left-elem" />
                }
                {
                    leftButton &&
                    <CTAButton
                        iconName={leftButton}
                        className={leftButtonClass}
                        onClick={leftButtonOnClick}
                    />
                }
                {/* Input */}
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={inputValue}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    disabled={disabled}
                    readOnly={readOnly}

                    // Validation
                    required={required}
                    pattern={pattern}

                    // Events
                    onChange={(e) => setInputValue(e.target.value)}

                />
                {/* Right Icon or Button */}
                {
                    rightIcon &&
                    <Icon iconName={rightIcon} />
                }
                {
                    rightButton &&
                    <CTAButton
                        iconName={rightButton}
                        className={rightButtonClass}
                        onClick={rightButtonOnClick}
                    />
                }
            </div>
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
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    leftButton: PropTypes.node,
    rightButton: PropTypes.node,
    leftButtonOnClick: PropTypes.func,
    rightButtonOnClick: PropTypes.func,

    // Messaging
    helpText: PropTypes.string,
    errorMessage: PropTypes.string,
    warningMessage: PropTypes.string,
    successMessage: PropTypes.string,
};

export default Input;
