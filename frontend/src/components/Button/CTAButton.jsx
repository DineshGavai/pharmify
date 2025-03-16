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

    let iconSVG = iconType.toLowerCase() == "custom"
        ? iconName
        : <Icon iconName={iconName} />;

    return (
        <button className={className} {...rest}>
            {!rightIcon && iconName && iconSVG}
            {label}
            {rightIcon && iconName && iconSVG}
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