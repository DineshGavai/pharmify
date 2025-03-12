import React, { useEffect, useState, useRef } from "react";

const Tabs = ({ tabs }) => {

    const [activeTabIndex, setActiveTabIndex] = useState(
        tabs.findIndex(item => item.isActive)
    );

    const tabBtnRef = useRef([]);
    const tabContentRef = useRef([]);

    useEffect(() => {
        tabBtnRef.current.forEach((item, index) => {
            if (item) {
                if (index === activeTabIndex) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }
            }
        });
    }, [activeTabIndex]);

    return (<section className="tab-sec">
        <div className="tab-btns">
            {tabs.map((tab, index) => (
                React.cloneElement(tab.button, {
                    key: index,
                    ref: (elem) => (tabBtnRef.current[index] = elem),
                    className: `${tab.button.props.className || ""} ${index === activeTabIndex ? "active" : ""}`.trim(),
                    onClick: () => setActiveTabIndex(index)
                })
            ))}
        </div>

        <div className="tab-content">
            {tabs.map((tab, index) => (
                <div
                    className={`tab-item ${index === activeTabIndex ? "active" : ""}`}
                    key={index}
                >
                    {
                        React.cloneElement(tab.content, {
                            ref: (elem) => (tabContentRef.current[index] = elem),
                        })
                    }
                </div>
            ))}
        </div>
    </section>);
}

export default Tabs;