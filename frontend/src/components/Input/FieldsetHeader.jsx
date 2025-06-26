import IconButton from "../Button/IconButton";

const FieldsetHeader = ({ heading, backBtn = true, setActiveMobileForm }) => {


    return (
        <header className={`form-header ${backBtn ? "" : "not-sticky"}`}>
            {
                backBtn &&
                <IconButton
                    iconName={"arrow_left"}
                    className="mobile-form-back"
                    type="button"
                    onClick={() => {
                        if (setActiveMobileForm) setActiveMobileForm("")
                    }}
                />
            }

            <h2>
                {heading}
            </h2>
        </header>
    )

}

export default FieldsetHeader;