import { useContext, useEffect, useId, useState } from "react"
import { UserContext } from "../../context/UserContext.jsx"
import CTAButton from "../../components/Button/CTAButton.jsx"
import IconButton from "../../components/Button/IconButton.jsx"
import Input, { controlledInput } from "../../components/Input/Input.jsx"
import { regexPatterns } from "../../utils/data.js"
import Icon from "../../components/Icon.jsx"
import { apiRequest, contentTypes } from "../../utils/api.js"
import { getFromLocalStorage, saveToLocalStorage } from "../../utils/browserStorage.js"

const EditProfile = () => {

    const { userInfo, setUserInfo } = useContext(UserContext)
    const [updatedUserInfo, setUpdatedUserInfo] = useState({});
    const [initialUserInfo, setInitialUserInfo] = useState({});
    const [isInfoUpdated, setIsInfoUpdated] = useState(false);

    // Set inital user info (only when actual userInfo is loaded)
    useEffect(() => {
        const isUserInfoLoaded = Object.keys(userInfo).length > 0;
        const isInitialEmpty = Object.keys(initialUserInfo).length === 0;
        const isUpdatedEmpty = Object.keys(updatedUserInfo).length === 0;

        if (isUserInfoLoaded && isInitialEmpty && updatedUserInfo) {
            setInitialUserInfo(userInfo);
            setUpdatedUserInfo(userInfo);
        }
    }, [userInfo, initialUserInfo, updatedUserInfo]);

    // Compare current and initial user info to detect changes
    useEffect(() => {
        const hasChanged = Object.entries(initialUserInfo).some(
            ([key, value]) => updatedUserInfo[key] !== value
        );

        // Update changes status
        setIsInfoUpdated(hasChanged);
    }, [updatedUserInfo, initialUserInfo]);


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!isInfoUpdated && Object.values(updatedUserInfo).some((val) => val === "")) return;

        await apiRequest({
            url: "http://127.0.0.1:8000/settings/edit-profile",
            method: "POST",
            headers: { "Content-Type": contentTypes.FORM_URLENCODED },
            body: {
                email: userInfo.email,
                edit_profile_full_name: updatedUserInfo.name,
                edit_profile_shop_name: updatedUserInfo.business_name,
                edit_profile_phone: updatedUserInfo.phone_number
            },
            onSuccess: (data) => {
                console.log(data.user);
                saveToLocalStorage("user", data.user)
                setUserInfo(getFromLocalStorage("user") || {});
            },
            onError: (error) => {
                console.log(error.message);
            },
        });
    };



    return (
        <section className="edit-profile-sec">

            {/* Profile Picture Sec */}
            <form className="profile-picture-sec">
                <h2>Profile Picture</h2>

                <div className="sec-content">
                    <img src={userInfo.profile_picture || "/src/assets/placeholders/default-avatar.png"} alt="Your Profile Photo" />
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

                <form className="sec-content" onSubmit={handleFormSubmit}>

                    <Input
                        label="Your Name"
                        id="full_name"
                        name="full_name"
                        value={updatedUserInfo.name || ""}
                        onChange={controlledInput(setUpdatedUserInfo, "name")}
                    />

                    <Input
                        label="Business Name"
                        id="business_name"
                        name="business_name"
                        value={updatedUserInfo.business_name ?? updatedUserInfo.shop_name ?? ""}
                        onChange={controlledInput(setUpdatedUserInfo, "business_name")}
                    />

                    <Input
                        label="Phone Number"
                        id="phone_number"
                        name="phone_number"
                        value={updatedUserInfo.phone_number ?? ""}
                        leftIcon={"flag_india"}
                        onChange={controlledInput(setUpdatedUserInfo, "phone_number")}
                    />

                    <div className="btn-box">
                        {
                            isInfoUpdated &&
                            <CTAButton className="ghost"
                                label="Undo Changes"
                                type="button"
                                onClick={() => {
                                    setUpdatedUserInfo(initialUserInfo);
                                    setIsInfoUpdated(false);
                                }}
                            />
                        }
                        <CTAButton
                            type="submit"
                            className="primary"
                            label="Save changes"
                            aria-disabled={!isInfoUpdated}
                            disabled={!isInfoUpdated}
                        />
                    </div>

                </form>
            </section>

            {/* Other Documents Sec */}
            <form className="other-doc-sec">
                <h2>Documents</h2>

                <div className="sec-content">
                    <img src={userInfo.retail_drug_liscence || "/src/assets/placeholders/default-file-image.png"} alt="Your Retail Drug License" />
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