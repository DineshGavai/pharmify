import PropTypes from "prop-types";
import Icon from "../Icon";

const Checkbox = ({
    label = "",
    name,
    id,
    value,
    autoFocus = false,
    required = true,
    disabled = false,
    readOnly = false,
    checked,
    onChange,
    className = "",
    helpText,
}) => {
    return (
        <div className={`input-box checkbox`}>
            <label htmlFor={id}>
                <div className="input-frame">
                    <input
                        type="checkbox"
                        id={id}
                        name={name}
                        value={value}
                        autoFocus={autoFocus}
                        disabled={disabled}
                        readOnly={readOnly}
                        required={required}
                        checked={checked}
                        onChange={onChange}
                    />
                    <Icon iconName="check_lg" className="checkmark" />
                </div>
                {label} {!required && "(optional)"}
            </label>
            <p className="help-text text-muted">{helpText}</p>
        </div>
    );
};

Checkbox.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    autoFocus: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    helpText: PropTypes.string,
};

export default Checkbox;
