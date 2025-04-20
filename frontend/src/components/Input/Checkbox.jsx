import PropTypes from "prop-types";
import { useState } from "react";
import Icon from "../Icon";

const Checkbox = ({
    // Core Input Attributes
    label = "",
    type = "checkbox",
    checkboxgroup = "",
    name,
    id,
    value,
    defaultValue = "",
    autoFocus = false,
    required = true,
    disabled = false,
    readOnly = false,

    // Events
    checked = false,
    onChange,

    // UI Enhancements
    className = "",

    // Messaging
    helpText,
    errorMessage,
    warningMessage,
    successMessage,
}) => {

    const [isChecked, setIsChecked] = useState(checked ?? false);

    return (
        <div className={`input-box checkbox`}>

            <label htmlFor={`${id}`} >

                <div className="input-frame">
                    <input
                        type={type}
                        checkboxgroup={checkboxgroup}
                        id={id}
                        name={name}
                        value={value}
                        defaultValue={value}
                        autoFocus={autoFocus}
                        disabled={disabled}
                        readOnly={readOnly}

                        // Validation
                        required={required}

                        // Events
                        checked={isChecked}
                        onChange={(e) => {
                            setIsChecked(e.target.checked);
                            if (onChange) onChange(e);
                        }}

                    />

                    {
                        type == "checkbox" &&
                        <Icon
                            iconName={"check_lg"}
                            className={"checkmark"}
                        />
                    }
                </div>

                {label} {!required && "(optional)"}
            </label>
            <p className="help-text text-muted">{helpText}</p>
        </div>
    )

}

Checkbox.propTypes = {
    // Core Input Attributes
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    autoFocus: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,

    onChange: PropTypes.func,

    // UI Enhancements
    className: PropTypes.string,

    // Messaging
    helpText: PropTypes.string,
    errorMessage: PropTypes.string,
    warningMessage: PropTypes.string,
    successMessage: PropTypes.string,
};


export default Checkbox;