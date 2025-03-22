import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import PropTypes from "prop-types";
import IconButton from "./Button/IconButton";


const Header = ({ heading = "" }) => {

    const { isNavActive, setIsNavActive, } = useContext(GlobalContext);
    const { headerChildren, setHeaderChildren } = useContext(GlobalContext);

    return (
        <header id="main_header">
            <IconButton
                iconName={"hamburger_menu"}
                className="mobile-tab-only"
                onClick={() => setIsNavActive(true)}
            />

            <div>
                <h1 className="fs-700">{heading || "Pharmify"}</h1>
                <div className="options">{headerChildren}</div>
            </div>
        </header>
    );
}

Header.propTypes = {
    heading: PropTypes.string.isRequired
}

export default Header