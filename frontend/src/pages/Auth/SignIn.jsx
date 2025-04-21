import { useCallback, useContext, useState } from "react";
import { ThirdPartyLogos } from "../../assets/illus/logo-third-party";
import { Link, useNavigate } from "react-router-dom";
import CTAButton from "../../components/Button/CTAButton";
import Input from "../../components/Input/Input.jsx";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { apiRequest } from "../../utils/api.js";
import { getFromLocalStorage, saveToLocalStorage } from "../../utils/browserStorage.js";
import { UserContext } from "../../context/UserContext.jsx";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const SignIn = ({ onSignInSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { userInfo, setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) return;

        await apiRequest({
            url: "http://127.0.0.1:8000/login/",
            method: "POST",
            body: { sign_in_email: email, sign_in_password: password },
            onSuccess: (data) => {
                // Save user info locally
                saveToLocalStorage("user", data.user);
                console.log("Login successful:", data);

                onSignInSuccess();
                setUserInfo(getFromLocalStorage("user").user || {});
            },
            onError: (error) => {
                console.log(error.message);
            },
        });
    };

    // Google Login Success Handler
    const handleLoginSuccess = async (response) => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/google-login/", {
                credential: response.credential,
            });
            // Save user info locally
            let data = res.data;

            saveToLocalStorage("user", data.user);
            console.log("Login successful:", data);


            onSignInSuccess();
            setUserInfo(getFromLocalStorage("user").user || {});

        } catch (error) {
            console.error("Google Login Failed:", error);
        }
    };

    return (
        <main className="auth-main">
            <section className="main-sec sign-in-sec">
                <header>
                    <h1>Sign In to Pharmify</h1>
                    <p className="text-muted">
                        New to Pharmify? <span />
                        <Link to="/create-account" className="text text-emphasis">Create Account</Link>.
                    </p>
                </header>

                <form onSubmit={handleFormSubmit} id="sign_in_form" name="sign_in_form">
                    <Input
                        label="Email"
                        id="sign_in_email"
                        name="sign_in_email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        label="Password"
                        id="sign_in_password"
                        name="sign_in_password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p className="text-muted">
                        I accept <a href="#" className="text">Terms of Service</a> & <a href="#" className="text">Privacy Policy</a>.
                    </p>

                    <CTAButton
                        label="Sign In"
                        className="primary"
                        type="submit"
                    />
                </form>

                <div className="one-tap-options">
                    <p className="text-muted" style={{ textAlign: "center" }}>- OR -</p>

                    <GoogleOAuthProvider clientId={clientId}>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={() => console.log('Google Login Failed')}
                        />
                    </GoogleOAuthProvider>
                </div>

                <footer></footer>
            </section>
        </main>
    );
};

export default SignIn;


{/* <CTAButton
                        iconName={ThirdPartyLogos.google}
                        iconType="custom"
                        label="Sign in with Google"
                        className="ghost one-tap-btn"
                    /> */}