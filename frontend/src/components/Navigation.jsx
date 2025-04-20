import { useContext, useState, useNavigator, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IconButton from "./Button/IconButton.jsx";
import CTAButton from "./Button/CTAButton.jsx"
import { GlobalContext } from "../context/GlobalContext.jsx"
import { UserContext } from "../context/UserContext.jsx";
import { removeCookie, removeFromLocalStorage } from "../utils/browserStorage.js";

const Navigation = ({ setIsSignedIn }) => {
    const { activePage, setActivePage } = useContext(GlobalContext)
    const { isNavActive, setIsNavActive } = useContext(GlobalContext)
    const { userInfo, setUserInfo } = useContext(UserContext)

    useEffect(() => {
        console.log(userInfo)
    }, []);

    const navigate = useNavigate();
    const location = useLocation();

    const checkIfActive = (item) => {
        return location.pathname.split("/")[1].toLowerCase() === item.key.toLowerCase() ? "active" : "";
    }

    const menuItems = [
        { iconName: "home", label: "Home", key: "home", explicitRoute: "/" },
        { iconName: "invoice", label: "Bills", key: "bills" },
        { iconName: "inventory", label: "Inventory", key: "inventory" },
        { iconName: "insights", label: "Insights", key: "insights" },
        { iconName: "customers", label: "Customers", key: "customers" }
    ];

    function closeNav(e) {
        if (e.target.tagName.toLowerCase() === "Nav".toLowerCase())
            setIsNavActive(false)
    }

    return (
        <nav
            className={isNavActive ? "active" : ""}
            onClick={(e) => closeNav(e)}
        >
            {/* Body */}
            <section className="nav-body">
                {/* Header */}
                <section className="nav-header">
                    <IconButton
                        iconName={isNavActive ? "cross" : "hamburger_menu"}
                        className="close-nav"
                        onClick={() => setIsNavActive(!isNavActive)}
                    />
                </section>

                {/* Menus */}
                <section className="nav-contents">
                    <menu>
                        <CTAButton
                            className={`menu user-info ${checkIfActive({ key: "profile" })}`}
                            label={
                                <>
                                    <img src={userInfo.profile_picture || "/src/assets/placeholders/default-avatar.png"} />
                                    <div>
                                        <span className="name fs-400">{`${userInfo?.first_name} ${userInfo?.last_name}` || "Full name not found"}</span>
                                        <span className="email fs-300">{userInfo?.email || "Email not found"}</span>
                                    </div>
                                </>
                            }
                            onClick={() => {
                                navigate("/profile");
                            }}
                        />
                    </menu>

                    <menu>
                        {
                            menuItems.map(item => (
                                <CTAButton
                                    key={item.key}
                                    className={`menu ${checkIfActive(item)}`}
                                    iconName={item.iconName}
                                    label={item.label}
                                    onClick={() => {
                                        navigate(item.explicitRoute || `/${item.key}`)
                                    }}
                                />
                            ))
                        }
                    </menu>
                </section>

                {/* Footer */}
                <section className="nav-footer">
                    <div>
                        <IconButton
                            iconName={"logout"}
                            className="logout-btn danger"
                            onClick={() => {
                                setIsSignedIn(false);
                                removeCookie("isSignedIn");
                                removeFromLocalStorage("user");
                                setUserInfo({});
                            }}
                        />
                        <IconButton iconName={"settings"} />
                    </div>
                    <p className="project-links">
                        <a href="#" className="text" tabIndex={isNavActive ? undefined : "-1"}>About Us</a> <span>·</span>
                        <a href="#" className="text" tabIndex={isNavActive ? undefined : "-1"}>Terms</a><span>·</span>
                        <a href="#" className="text" tabIndex={isNavActive ? undefined : "-1"}>Privacy Policy</a>
                    </p>
                    <p className="social-links" aria-disabled={!isNavActive}>
                        <a href="#" className="text" tabIndex={isNavActive ? undefined : "-1"}>Dinesh Gavai</a> <span>·</span>
                        <a href="#" className="text" tabIndex={isNavActive ? undefined : "-1"}>Vedant Mali</a>
                    </p>
                </section>

            </section>
        </nav>
    );
};

export default Navigation;
