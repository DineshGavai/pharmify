import { ThirdPartyLogos } from "../../assets/illus/logo-third-party";
import CTAButton from "../../components/Button/CTAButton";

const SignIn = () => {

    return (
        <main className="auth-main">

            <section className="main-sec sign-in-sec">

                <header>
                    <h1>Welcome Back to Pharmify</h1>
                    <p className="text-muted">Manage your pharmacy inventory seamlessly.</p>
                </header>

                <CTAButton
                    iconName={ThirdPartyLogos.google}
                    iconType="custom"
                    label="Sign in with Google"
                    className="ghost one-tap-sign-in-btn"
                />


                <footer>
                    <p className="text-muted">By signing in, you agree to our <br /><a href="#" className="text">Terms of Service</a> & <a href="#" className="text">Privacy Policy</a>.</p>
                    <p className="fs-400">New to Pharmify? <a href="#" className="text text-emphasis">Create Account</a>.</p>
                </footer>
            </section>

        </main>
    );

}

export default SignIn