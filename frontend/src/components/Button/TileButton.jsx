import PropTypes from "prop-types";
import Icon from "../Icon.jsx";
import { forwardRef } from "react";
import CTAButton from "./CTAButton.jsx";

const TileButton = forwardRef(({
    type = "button",
    children,
    className = "",
    iconName = "chevron_right",
    iconType = "icon",
    rightIcon = true,
    disabled = false,
    ...rest
}, ref) => {


    return (
        <CTAButton
            type={type}
            label={children}
            className={`tile ${className}`}
            iconName={iconName}
            rightIcon={rightIcon}
            disabled={disabled}
            iconType={iconType}
        />
    );
});

TileButton.propTypes = {
    children: PropTypes.node.isRequired,
    iconName: PropTypes.string,
    iconType: PropTypes.string,
    rightIcon: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default TileButton;
