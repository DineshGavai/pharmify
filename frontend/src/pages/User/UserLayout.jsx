import CTAButton from "../../components/Button/CTAButton";
import Tabs from "../../components/Tabs";
import EditProfile from "./EditProfile.jsx";
import DataPrivacy from "./DataPrivacy.jsx"
import Settings from "./Settings.jsx"
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";

const UserLayout = () => {

    const { isSignedIn, setIsSignedIn } = useContext(UserContext);

    console.log();


    const tabs = [
        {
            button: <CTAButton label={"Edit Profile"} className="tab-btn" />,
            content: <EditProfile />,
            isActive: true,
        },
        {
            button: <CTAButton label={"Settings"} className="tab-btn" />,
            content: <Settings />,
        },
        {
            button: <CTAButton label={"Data & Privacy"} className="tab-btn" />,
            content: <DataPrivacy />,
        },
    ]

    return (
        <>
            <section className="main-sec user-main-sec">
                <Tabs tabs={tabs} />
            </section>
        </>
    );

}

export default UserLayout