import { useContext, useId } from "react"
import { UserContext } from "../../context/UserContext.jsx"
import CTAButton from "../../components/Button/CTAButton.jsx"
import IconButton from "../../components/Button/IconButton.jsx"
import Input from "../../components/Input/Input.jsx"
import { regexPatterns } from "../../utils/data.jsx"

const DataPrivacy = () => {

    const { userInfo, setUserInfo } = useContext(UserContext)

    return (
        <section className="data-privacy-sec">

            {/* Security Settings Sec */}
            <section className="todo-sec">
                <h2>Security Settings</h2>

                <div className="sec-content">
                    <div>
                        <p className="text-muted">TODO: </p>
                        <p className="text-emphasis">
                            Change Password → Option to update/reset passwords.
                        </p>
                    </div>
                    <div>
                        <p className="text-muted">TODO: </p>
                        <p className="text-emphasis">
                            Enable Two-Factor Authentication (2FA) → If Pharmify supports multi-factor authentication.
                        </p>
                    </div>
                    <div>
                        <p className="text-muted">TODO: </p>
                        <p className="text-emphasis">
                            Manage Connected Devices → Show a list of logged-in devices with an option to revoke access.
                        </p>
                    </div>
                    <div>
                        <p className="text-muted">TODO: </p>
                        <p className="text-emphasis">
                            Session & Login History → Display recent logins with timestamps and locations.
                        </p>
                    </div>
                </div>

            </section>

        </section>
    )

}


export default DataPrivacy