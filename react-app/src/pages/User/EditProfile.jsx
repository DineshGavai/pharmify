import { useContext } from "react"
import { UserContext } from "../../context/UserContext.jsx"
import CTAButton from "../../components/Button/CTAButton.jsx"
import IconButton from "../../components/Button/IconButton.jsx"

const EditProfile = () => {

    const { userInfo, setUserInfo } = useContext(UserContext)

    return (
        <section className="edit-profile-sec">

            {/* Profile Picture Sec */}
            <section className="profile-picture-sec">
                <h2>Profile Picture</h2>

                <div className="sec-content">
                    <img src={userInfo.profile_picture} alt="Your Profile Photo" />
                    <div>
                        <div>
                            <p className="text-emphasis">File smaller than 10 MB and at least 400px by 400px works best.</p>
                            <p className="text-muted">This image can be anything related to your business or brand like your photo, business logo, etc. and will act as your identity on Pharmify.</p>
                        </div>
                        <div className="btn-box">
                            <IconButton iconName={"trash"} />
                            <CTAButton label="Upload New Photo" className="primary" />
                        </div>
                    </div>
                </div>

            </section>

            {/* User Information Sec */}
            <section className="user-info-sec">
                <h2>Your Information</h2>
            </section>

            {/* Other Documents Sec */}
            <section className="other-doc-sec">
                <h2>Other Documents</h2>
            </section>

        </section>
    )

}


export default EditProfile