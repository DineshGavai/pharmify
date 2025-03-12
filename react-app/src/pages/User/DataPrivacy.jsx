import { useContext, useId } from "react"
import { UserContext } from "../../context/UserContext.jsx"
import CTAButton from "../../components/Button/CTAButton.jsx"
import IconButton from "../../components/Button/IconButton.jsx"
import Input from "../../components/Input/Input.jsx"
import { regexPatterns } from "../../utils/data.jsx"

const DataPrivacy = () => {

    const { userInfo, setUserInfo } = useContext(UserContext)

    return (
        <section className="edit-profile-sec">

            {/* Profile Picture Sec */}
            <form className="profile-picture-sec">
                <h2>Profile Picture</h2>

                <div className="sec-content">
                    <img src={userInfo.profile_picture || "./src/assets/illus/default-avatar.png"} alt="Your Profile Photo" />
                    <div>
                        <div>
                            <p className="text-emphasis">File smaller than 10 MB and at least 400px by 400px works best.</p>
                            <p className="text-muted">This image represents your business or brand on Pharmify. You can upload anything like your profile photo, business logo, or any relevant image.</p>
                        </div>
                        <div className="btn-box">
                            {
                                userInfo.profile_picture &&
                                <IconButton iconName={"trash"} />
                            }
                            <CTAButton
                                label="Upload New Photo"
                                iconName={"upload"}
                                className="primary" />
                        </div>
                    </div>
                </div>

            </form>
            
        </section>
    )

}


export default DataPrivacy