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
                className="aside-open-btn primary"
                onClick={() => setIsAsideActive(!isAsideActive)}
            />
        </>
    )
}

Aside.proptypes = {

}

export default Aside;