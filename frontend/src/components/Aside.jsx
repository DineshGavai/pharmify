import PropTypes from "prop-types";
import { useState } from "react";
import IconButton from "./Button/IconButton";

const Aside = ({
    className,
    heading,
    content,
    activeStatus = true,
}) => {

    const [isAsideActive, setIsAsideActive] = useState(activeStatus)

    return (
        <>
            <aside className={`${className} ${isAsideActive ? "active" : ""}`} >
                {/* Aside Header */}
                <header>
                    <h2>{heading}</h2>
                    <IconButton
                        iconName={"cross"}
                        className="mobile-tab-only"
                        onClick={() => setIsAsideActive(false)}
                    />
                </header>

                {/* Aside Body */}
                <section className="aside-body">
                    {content}
                </section>
            </aside>

            <IconButton
                iconName={"chevron_right"}
                className="aside-open-btn"
                onClick={() => setIsAsideActive(!isAsideActive)}
            />
        </>
    )
}

Aside.proptypes = {
    className: PropTypes.string,
    heading: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.node
    ]),
    content: PropTypes.any,
    activeStatus: PropTypes.bool,
}

export default Aside;