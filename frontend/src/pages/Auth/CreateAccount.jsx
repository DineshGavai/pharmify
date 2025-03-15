import { ThirdPartyLogos } from "../../assets/illus/logo-third-party";
import CTAButton from "../../components/Button/CTAButton";

const CreateAccount = () => {

    return (
        <main className="auth-main">

            <section className="main-sec sign-up-sec">

                <header>
                    <h1>Create Your Pharmify Account</h1>
                    <p className="text-muted">Sign up with your Google account to get started.</p>
                </header>

                <CTAButton
                    iconName={ThirdPartyLogos.google}
                    iconType="custom"
                    label="Create account with Google"
                    className="ghost one-tap-sign-in-btn"
                />


                <footer>
                    <p className="text-muted">By creating an account, you agree to our <br /><a href="#" className="text">Terms of Service</a> & <a href="#" className="text">Privacy Policy</a>.</p>
                    <p className="fs-400">Already have an Account? <a href="#" className="text text-emphasis">Sign In</a>.</p>
                </footer>
            </section>

        </main>
    );

}

export default CreateAccount