import { useContext, useEffect, useState } from "react";
import { ThirdPartyLogos } from "../../assets/illus/logo-third-party";
import { Link, useNavigate } from "react-router-dom";
import CTAButton from "../../components/Button/CTAButton";
import Input from "../../components/Input/Input.jsx"
import { apiRequest } from "../../utils/api.js";
import { UserContext } from "../../context/UserContext.jsx";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { getFromLocalStorage, saveToLocalStorage } from "../../utils/browserStorage.js";


const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const CreateAccount = ({ onSignInSuccess }) => {

    const { createAccountInputData, setCreateAccountInputData } = useContext(UserContext);
    const { userInfo, setUserInfo } = useContext(UserContext);


    const navigate = useNavigate();


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!createAccountInputData.email) return;

        await apiRequest({
            url: "http://127.0.0.1:8000/verify-email/",
            method: "POST",
            body: { email: createAccountInputData.email },
            onSuccess: (data) => {
                navigate("complete-profile")
            },
            onError: (error) => console.log(error.message),
        })

    }
    const handleLoginSuccess = async (response) => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/google-login/", {
                credential: response.credential,
            });
            // Save user info locally
            let data = res.data;

            saveToLocalStorage("user", data);
            console.log("Login successful:", data);


            onSignInSuccess();
            setUserInfo(getFromLocalStorage("user").user || {});

        } catch (error) {
            console.error("Google Login Failed:", error);
        }
    };


    return (
        <main className="auth-main">

            <section className="main-sec create-account-sec">

                <header>
                    <h1>Create Your Pharmify Account</h1>
                    <p className="text-muted">
                        Already have an account? <span> </span>
                        <Link to="/signin" className="text text-emphasis">Sign In</Link>.
                    </p>
                </header>

                <form
                    onSubmit={(e) => handleFormSubmit(e)}
                    id="create_account_form"
                    name="create_account_form">

                    <Input
                        label="Email"
                        type="email"
                        id={"create_account_email"}
                        name={"create_account_email"}
                        value={createAccountInputData.email || ""}
                        onChange={(e) => setCreateAccountInputData((data) =>
                            ({ ...data, email: e.target.value })
                        )}

                    />

                    <p className="text-muted">I accept <a href="#" className="text">Terms of Service</a> & <a href="#" className="text">Privacy Policy</a>.</p>

                    <CTAButton
                        label="Get Started"
                        className="primary"
                        type="submit"
                    />

                </form>

                <div className="one-tap-options">

                    <p className="text-muted" style={{
                        textAlign: "center"
                    }}>- OR -</p>

                    <GoogleOAuthProvider clientId={clientId}>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={() => console.log('Google Login Failed')}
                        />
                    </GoogleOAuthProvider>
                </div>
            </section>

        </main>
    );

}

export default CreateAccount