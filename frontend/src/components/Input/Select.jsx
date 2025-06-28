import IconButton from "../Button/IconButton";
import Input from "./Input";

const Select = ({ ...rest }) => {

    return (
        <div className="dropdown-box">
            <Input
                {...rest}
                rightElem={
                    <IconButton iconName={"chevron_down"} className="no-border" />
                }
            />
        </div>
    )

}

export default Select;