import PropTypes from "prop-types";
import Icon from "../Icon.jsx";

const IconButton = ({ icon, iconType = "icon", className = "", ...rest }) => {
    return (
        <button className={`icon ${className}`} {...rest}>
            {<Icon iconName={icon} />}
        </button>
    )
}

IconButton.propTypes = {
    icon: PropTypes.string.isRequired,
    iconType: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string
}

export default IconButton;