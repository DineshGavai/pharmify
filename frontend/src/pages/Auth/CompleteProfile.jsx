import { useState } from "react";
import CTAButton from "../../components/Button/CTAButton";
import IconButton from "../../components/Button/IconButton";
import Input from "../../components/Input/Input.jsx"
import Icon from "../../components/Icon.jsx";
import { apiRequest } from "../../utils/api.js"

const CompleteProfile = ({ onSignInSuccess }) => {

    const [stepCount, setStepCount] = useState(1);
    const [inputData, setInputData] = useState({
        email: "vedantmali@gmail.com"
    })

    const steps = [
        "Personal Info",
        "Business Info",
        "Password",
    ]

    const handlePersonalInfoSubmit = (e) => {
        e.preventDefault()
        if (!inputData.full_name || !inputData.phone_num) return;
        setStepCount(2);
    }

    const handleBusinessInfoSubmit = (e) => {
        e.preventDefault()
        if (!inputData.business_name || !inputData.business_name) return;
        setStepCount(3);
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        if (!inputData.create_password || !inputData.confirm_password) return;

        await apiRequest({
            url: "http://127.0.0.1:8000/signup/",
            method: "POST",
            body: {
                signup_full_name: inputData.full_name,
                signup_phone: inputData.phone_num,
                signup_shop_name: inputData.business_name,
                signup_shop_address: inputData.business_address,
                signup_create_password: inputData.create_password,
                signup_confirm_password: inputData.confirm_password,
                email: inputData.email,
            },
            onSuccess: (data) => { onSignInSuccess() },
            onError: (error) => console.log(error.message),
        })
    }


    return (<main className="auth-main">

        <section className="main-sec complete-profile-sec">

            <header>
                <h1>Complete Your Profile.</h1>
                <div className="step-box">
                    <div className="step-info">
                        <p className="text-emphasis">{steps[stepCount - 1]}</p>
                        <p className="text-muted">Next: {
                            stepCount == steps.length ? "Welcome 🎉" : steps[stepCount]
                        }</p>
                    </div>
                    <p className="step-count">
                        {stepCount} of {steps.length}
                    </p>
                </div>
            </header>

            {
                (stepCount === 1) &&
                <form onSubmit={(e) => handlePersonalInfoSubmit(e)}
                    id="complete_profile_form_step_1"
                    name="complete_profile_form_step_1"
                >

                    <Input
                        type=""
                        label="Email"
                        id={"complete_profile_email"}
                        name={"complete_profile_email"}
                        disabled={true}
                        value={inputData.email || ""}
                        rightElem={<CTAButton label="Edit" className="text" />}
                    />

                    <Input
                        label="Full Name"
                        id={"complete_profile_full_name"}
                        name={"complete_profile_full_name"}
                        autoComplete="name"
                        value={inputData.full_name || ""}
                        onChange={(e) => setInputData((data) =>
                            ({ ...data, full_name: e.target.value })
                        )}
                        helpText={"Please enter your First, Middle & then Lastname"}
                    />

                    <Input
                        label="Phone Number"
                        id={"complete_profile_phone_number"}
                        name={"complete_profile_phone_number"}
                        autoComplete="tel-national"
                        value={inputData.phone_num || ""}
                        onChange={(e) => setInputData((data) =>
                            ({ ...data, phone_num: e.target.value })
                        )}
                        leftElem={
                            <Icon iconName={"flag_india"} />
                        }
                    />

                    <CTAButton
                        className="primary"
                        type="submit"
                        label="Next"
                        rightIcon={true}
                        iconName="chevron_right"
                    />
                </form>
            }

            {
                (stepCount === 2) &&
                <form onSubmit={(e) => handleBusinessInfoSubmit(e)}
                    id="complete_profile_form_step_2"
                    name="complete_profile_form_step_2"
                >

                    <Input
                        label="Business Name"
                        id={"complete_profile_business_name"}
                        name={"complete_profile_business_name"}
                        value={inputData.business_name || ""}
                        onChange={(e) => setInputData((data) =>
                            ({ ...data, business_name: e.target.value })
                        )}
                        helpText={"Name of your business, brand, or store."}
                    />

                    <Input
                        label="Business Address"
                        id={"complete_profile_business_address"}
                        name={"complete_profile_business_address"}
                        value={inputData.business_address || ""}
                        onChange={(e) => setInputData((data) =>
                            ({ ...data, business_address: e.target.value })
                        )}
                        helpText={"Main address where your business is located."}
                    />

                    <CTAButton
                        className="primary"
                        type="submit"
                        label="Next"
                        rightIcon={true}
                        iconName="chevron_right"
                    />
                </form>
            }

            {
                (stepCount === 3) &&
                <form onSubmit={(e) => handlePasswordSubmit(e)}
                    id="complete_profile_form_step_3"
                    name="complete_profile_form_step_3"
                >

                    <Input
                        showPasswordButton={true}
                        type="password"
                        label="Create Password"
                        id={"complete_profile_create_password"}
                        name={"complete_profile_create_password"}
                        value={inputData.create_password || ""}
                        onChange={(e) => setInputData((data) =>
                            ({ ...data, create_password: e.target.value })
                        )}
                        helpText={
                            <>
                                <span>
                                    Password must be at least 8 characters long.
                                    <br />
                                    Password must contain at least an uppercase character, a number, and a special character.
                                    <br />
                                    Password must not contain any whitespaces.
                                </span>
                            </>
                        }
                    />

                    <Input
                        showPasswordButton={true}
                        type="password"
                        label="Confirm Password (Type again)"
                        id={"complete_profile_confirm_password"}
                        name={"complete_profile_confirm_password"}
                        value={inputData.confirm_password || ""}
                        onChange={(e) => setInputData((data) =>
                            ({ ...data, confirm_password: e.target.value })
                        )}
                    />

                    <CTAButton
                        className="primary"
                        type="submit"
                        label="Let's Go! 🚀"
                    />
                </form>
            }
        </section>

    </main>)

}

export default CompleteProfile