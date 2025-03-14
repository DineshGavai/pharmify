import { useContext, useId } from "react"
import { UserContext } from "../../context/UserContext.jsx"

const Settings = () => {

    const { userInfo, setUserInfo } = useContext(UserContext)

    return (
        <section className="settings-sec">

            {/* Settings Sec */}
            <section className="todo-sec">
            <h2>Appearance</h2>

                <div className="sec-content">
                    <div>
                        <p className="text-muted">TODO: </p>
                        <p className="text-emphasis">
                            Light / Dark Mode → Toggle between light and dark themes.
                        </p>
                    </div>
                    <div>
                        <p className="text-muted">TODO: </p>
                        <p className="text-emphasis">
                            Font Size & Scaling → Small / Medium / Large text size for better readability.
                        </p>
                    </div>
                    <div>
                        <p className="text-muted">TODO: </p>
                        <p className="text-emphasis">
                            Grid / List View for Inventory → Choose how items in the inventory are displayed.
                        </p>
                    </div>
                    <div>
                        <p className="text-muted">TODO: </p>
                        <p className="text-emphasis">
                            Pop-up Notifications → Enable/disable pop-ups for important updates.
                        </p>
                    </div>
                    <div>
                        <p className="text-muted">TODO: </p>
                        <p className="text-emphasis">
                            Control Number of stock additions limit, and other limts
                        </p>
                    </div>
                </div>

            </section>

        </section>
    )

}


export default Settings