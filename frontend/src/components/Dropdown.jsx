import CTAButton from "./Button/CTAButton";

const Dropdown = ({ dataList }) => {

    return (
        <div className="scrim">
            <div className="dropdown">
                {/* Options */}
                <div className="options top">
                    <span className="drag-handle"></span>
                </div>
                
                <ul className="dropdown-list">
                    {dataList}
                </ul>

                {/* Options */}
                <div className="options bottom">
                    <CTAButton
                        label="Close"
                        className="ghost"
                    />
                </div>
            </div>
        </div>
    )
}

export default Dropdown;