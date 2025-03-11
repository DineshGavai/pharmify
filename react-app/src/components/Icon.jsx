import PropTypes from "prop-types";
import { cloneElement } from "react";
import { icons } from "../assets/iconSprite.jsx";

// Function to reset the SVG attributes
const resetSVGAttr = (icon) => {
    return cloneElement(icon, {
        className: "icon",
        stroke: undefined,
        fill: undefined,
        children: Array.isArray(icon.props.children)
            ? icon.props.children.map((child, index) => cloneElement(child, { key: index, stroke: undefined, fill: undefined, strokeWidth: undefined }))
            : cloneElement(icon.props.children, { stroke: undefined, fill: undefined, strokeWidth: undefined })
    });
};

const Icon = ({ name }) => {
    const iconSVG = icons[name.toLowerCase()];
    if (!iconSVG) throw new Error(`Icon Not Found: "${name}" is not available`);
    return resetSVGAttr(iconSVG);
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Icon;
