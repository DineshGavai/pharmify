import { useState } from "react";
import { ThirdPartyLogos } from "../../assets/illus/logo-third-party";
import CTAButton from "../../components/Button/CTAButton";
import Input from "../../components/Input/Input.jsx"

const SignIn = ({ onSignInSuccess }) => {

    const [email, setEmail] = useState("vedant@gmail.com");
    const [pasword, setPassword] = useState("Pass@123");

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!email || !pasword) return;

        try {

            const response = await fetch("http://127.0.0.1:8000/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({ sign_in_email: email, sign_in_password: pasword })
            })

            const data = await response.json();

            if (data.status === 200) onSignInSuccess();
            else console.log("Invalid credentials.");


        } catch (error) {
            console.log("Something went wrong!");

        }
    }



    return (
        <main className="auth-main">

            <section className="main-sec sign-in-sec">

                <header>
                    <h1>Sign In to Pharmify</h1>
                    <p className="text-muted">New to Pharmify? <a href="#" className="text text-emphasis">Create Account</a>.</p>
                </header>

                <form
                    onSubmit={(e) => handleSignIn(e)}
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
                        defaultValue={pasword}
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

                    <p className="text-muted">- OR -</p>

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

}

export default SignIn