import { useState } from "react";
import { useState } from "react";
import { ThirdPartyLogos } from "../../assets/illus/logo-third-party";
import { Link } from "react-router-dom";
import CTAButton from "../../components/Button/CTAButton";
import Input from "../../components/Input/Input.jsx"
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { apiRequest } from "../../utils/api.js";

const SignIn = ({ onSignInSuccess }) => {

    const [email, setEmail] = useState("vedant@gmail.com");
    const [password, setPassword] = useState("Pass@123");

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) return;

        await apiRequest({
            url: "http://127.0.0.1:8000/login/",
            method: "POST",
            body: { sign_in_email: email, sign_in_password: password },
            onSuccess: () => onSignInSuccess(),
            onError: () => console.log("Invalid Credentials"),
        })
    }
    // Handle Google Login Success
    const handleGoogleSuccess = async (response) => {
        console.log(response.credential)
        try {
            const res = await axios.post("http://localhost:8000/api/auth/google/", {
                access_token: response.credential,
            });

            console.log("Google Login Success:", res.data);
            onSignInSuccess(); // Call the sign-in success callback
        } catch (error) {
            console.error("Google Login Failed:", error);
        }
    }

    return (
        <main className="auth-main">

            <section className="main-sec sign-in-sec">

                <header>
                    <h1>Sign In to Pharmify</h1>
                    <p className="text-muted">
                        New to Pharmify? <span> </span>
                        <Link to="/create-account" className="text text-emphasis">Create Account</Link>.
                    </p>
                </header>

                <form
                    onSubmit={(e) => handleFormSubmit(e)}
                    id="sign_in_form"
                    name="sign_in_form">

                    <Input
                        label="Email"
                        id={"sign_in_email"}
                        name={"sign_in_email"}
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />

                    <Input
                        label="Password"
                        id={"sign_in_password"}
                        name={"sign_in_password"}
                        defaultValue={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p className="text-muted">I accept <a href="#" className="text">Terms of Service</a> & <a href="#" className="text">Privacy Policy</a>.</p>

                    <CTAButton
                        label="Sign In"
                        className="primary"
                        type="submit"
                    />

                </form>

                <div className="one-tap-options">

                    <p className="text-muted" style={{
                        textAlign: "center"
                    }}>- OR -</p>

                    <CTAButton
                        iconName={ThirdPartyLogos.google}
                        iconType="custom"
                        label="Sign in with Google"
                        className="ghost one-tap-btn"
                    />
                </div>

                <footer>
                </footer>
            </section>

        </main>
    );
};

export default SignIn;