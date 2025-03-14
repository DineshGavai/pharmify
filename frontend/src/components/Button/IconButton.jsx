import PropTypes from "prop-types";
import Icon from "../Icon.jsx";

const IconButton = ({ iconName, iconType = "icon", className = "", ...rest }) => {


    return (
        <button className={`icon ${className}`} {...rest}>
            {<Icon iconName={iconName} />}
        </button>
    )
}

IconButton.propTypes = {
    iconName: PropTypes.string.isRequired,
    iconType: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string
}

export default IconButton;