import { useContext, useId } from "react"
import { UserContext } from "../../context/UserContext.jsx"
import CTAButton from "../../components/Button/CTAButton.jsx"
import IconButton from "../../components/Button/IconButton.jsx"
import Input from "../../components/Input/Input.jsx"
import { regexPatterns } from "../../utils/data.js"
import Icon from "../../components/Icon.jsx"

const EditProfile = () => {

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

            {/* User Information Sec */}
            <section className="user-info-sec">

                <h2>Your Information</h2>

                <form className="sec-content">

                    <Input
                        label="Your Name"
                        id="full_name"
                        name="full_name"
                        defaultValue={userInfo.name || "Vedant Mali"}
                        pattern={regexPatterns.full_name}
                    />

                    <Input
                        label="Business Name"
                        id="business_name"
                        name="business_name"
                        defaultValue={userInfo.business_name || "Pharmify Stores"}
                        pattern={regexPatterns.business_name}
                    />

                    <Input
                        label="Phone Number"
                        id="phone_number"
                        name="phone_number"
                        defaultValue={userInfo.phone_number || "9000000000"}
                        pattern={regexPatterns.phone_number}
                        leftIcon={"flag_india"}
                    />

                    <div className="btn-box">
                        <CTAButton className="ghost" label="Undo Changes" />
                        <CTAButton className="primary" label="Save changes" />
                    </div>

                </form>
            </section>

            {/* Other Documents Sec */}
            <form className="other-doc-sec">
                <h2>Documents</h2>

                <div className="sec-content">
                    <img src={userInfo.retail_drug_liscence || "./src/assets/illus/default-file-image.png"} alt="Your Retail Drug License" />
                    <div>
                        <div>
                            <p className="text-emphasis">A clear and valid image, smaller than 10 MB, of your Retail Drug License.</p>
                            <p className="text-muted">This license is essential for verification and compliance with legal
                                regulations, ensuring that only authorized retailers can operate.  </p>
                        </div>
                        <div className="btn-box">
                            {
                                userInfo.retail_drug_liscence &&
                                <IconButton iconName={"trash"} />
                            }
                            <CTAButton
                                label="Upload Document Photo"
                                iconName={"upload"}
                                className="primary" />
                        </div>
                    </div>
                </div>
            </form>

            <section className="other-links-sec">
                <h2>Other Links</h2>

                <div className="sec-content">

                    <button className="ghost edit-profile-link">
                        <div>
                            <p className="text-emphasis">Change Email Adress</p>
                            <p className="text-muted">To update the email you will need to input password and then you will also receive also an verification code on the updated email address.</p>
                        </div>
                        <Icon iconName={"chevron_right"} />
                    </button>

                    <button className="ghost edit-profile-link">
                        <div>
                            <p className="text-emphasis">Change Password</p>
                            <p className="text-muted">Updating your password regularly keeps your Pharmify account secure. Make sure you have your registered email address available, as you will receive a verification code</p>
                        </div>
                        <Icon iconName={"chevron_right"} />
                    </button>

                </div>

            </section>

        </section>
    )

}


export default EditProfile