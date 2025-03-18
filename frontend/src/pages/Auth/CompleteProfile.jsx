import { useState } from "react";
import CTAButton from "../../components/Button/CTAButton";
import Input from "../../components/Input/Input.jsx"
import Icon from "../../components/Icon.jsx";

const CompleteProfile = ({ onSignInSuccess }) => {

    const [stepCount, setStepCount] = useState(1);

    const steps = [
        "Personal Info",
        "Business Info",
        "Password",
    ]

    const handlePersonalInfoSubmit = (e) => {

    }

    const handleBusinessInfoSubmit = (e) => {

    }

    const handlePasswordSubmit = (e) => {

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
                        defaultValue="vedant@gmail.com"
                        rightElem={<CTAButton label="Edit" className="text" />}
                    />

                    <Input
                        label="Full Name"
                        id={"complete_profile_full_name"}
                        name={"complete_profile_full_name"}
                        autoComplete="name"
                        helpText={"Please enter your First, Middle & then Lastname"}
                    />

                    <Input
                        label="Username"
                        id={"complete_profile_username"}
                        name={"complete_profile_username"}
                        autoComplete="username"
                        helpText={"Must be Alphanumeric only, and must not contain whitespace or special characters"}
                    />

                    <Input
                        label="Phone Number"
                        id={"complete_profile_phone_number"}
                        name={"complete_profile_phone_number"}
                        autoComplete="tel-national"
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
                        helpText={"Name of your business, brand, or store."}
                    />

                    <Input
                        label="Business Address"
                        id={"complete_profile_business_name"}
                        name={"complete_profile_business_name"}
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
                        label="Create Password"
                        id={"complete_profile_create_password"}
                        name={"complete_profile_create_password"}
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
                        label="Confirm Password (Type again)"
                        id={"complete_profile_confirm_password"}
                        name={"complete_profile_confirm_password"}
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