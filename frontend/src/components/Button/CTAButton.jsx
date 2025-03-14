import PropTypes from "prop-types";
import Icon from "../Icon.jsx";
import { forwardRef } from "react";

const CTAButton = forwardRef(({
    label,
    className = "",
    iconName,
    iconType = "icon",
    rightIcon = false,
    ...rest
}, ref) => {
    return (
        <button className={className} {...rest}>
            {
                !rightIcon && iconName &&
                <Icon iconName={iconName} />
            }
            {label}
            {
                rightIcon && iconName &&
                <Icon iconName={iconName} />
            }
        </button>
    )
})

CTAButton.propTypes = {
    icon: PropTypes.string,
    rightIcon: PropTypes.bool,
    iconType: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
};


export default CTAButton;