import PropTypes from "prop-types";
import IconButton from "./Button/IconButton";
import { useState } from "react";

const Accordion = ({ heading, content, activeStatus = false, className = "" }) => {

    const [isActive, setIsActive] = useState(activeStatus);

    return (
        <div className={`accordion ${className} ${isActive ? "active" : ""}`}>
            <header
                onClick={() => setIsActive(!isActive)}
            >
                <h3>{heading}</h3>
                <IconButton
                    iconName={"chevron_down"}
                    onClick={() => setIsActive(!isActive)}
                />
            </header>

            <div className="accordion-body">
                {content}
            </div>
        </div>
    )
}

Accordion.proptypes = {
    heading: PropTypes.string,
    content: PropTypes.any,
    activeStatus: PropTypes.bool,
    className: PropTypes.string
}

export default Accordion;