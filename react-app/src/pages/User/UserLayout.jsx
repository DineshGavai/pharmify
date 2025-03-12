import CTAButton from "../../components/Button/CTAButton";
import Tabs from "../../components/Tabs";
import EditProfile from "./EditProfile";

const UserLayout = () => {

    const tabs = [
        {
            button: <CTAButton label={"Edit Profile"} className="tab-btn" />,
            content: <EditProfile />,
            isActive: true,
        },
        {
            button: <CTAButton label={"Settings"} className="tab-btn" />,
            content: <section className="hello">Replace this later...</section>,
        },
        {
            button: <CTAButton label={"Data & Privacy"} className="tab-btn" />,
            content: <section className="hello">Replace this later...</section>,
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