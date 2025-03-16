import { ThirdPartyLogos } from "../../assets/illus/logo-third-party";
import CTAButton from "../../components/Button/CTAButton";
import Input from "../../components/Input/Input.jsx"

const SignIn = () => {

    return (
        <main className="auth-main">

            <section className="main-sec sign-in-sec">

                <header>
                    <h1>Sign In to Pharmify</h1>
                    <p className="text-muted">New to Pharmify? <a href="#" className="text text-emphasis">Create Account</a>.</p>
                </header>

                <form action="" id="sign_in_form" name="sign_in_form">

                    <Input
                        label="Email"
                        id={"sign_in_email"}
                        name={"sign_in_email"}
                    />

                    <Input
                        label="Password"
                        id={"sign_in_password"}
                        name={"sign_in_password"}
                    />

                    <p className="text-muted">I accept <a href="#" className="text">Terms of Service</a> & <a href="#" className="text">Privacy Policy</a>.</p>

                    <CTAButton
                        label="Sign In"
                        className="primary"
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