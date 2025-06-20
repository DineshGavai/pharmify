import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Input, { controlledInput } from "../Input/Input";
import { getFromLocalStorage } from "../../utils/browserStorage";


// Get simple & redundant Inventory Inputs
const InventoryInput = ({ label, keyName, options = {} }) => {

    const { isProductViewFormEditable, setIsProductViewFormEditable } = useContext(GlobalContext);
    const [inventoryData, setInventoryData] = useState(() => getFromLocalStorage("viewed_product"));

    const defaultInputOptions = {
        spellCheck: false,
        required: true,
        readOnly: false,
        className: "",
        leftElem: null,
        rightElem: null,
        type: "",
        autogrow: false,
    };

    options = { ...defaultInputOptions, ...options }
    label = options.required && isProductViewFormEditable && !options.readOnly ? <>{label} <span className="asterisk">*</span></> : label;
    let notAvailableLabel = options.type == "numeric" ? "00" : "Not Available";

    return (
        <Input
            type={options.type}
            label={label}
            id={`inventory_${keyName}`}
            name={`inventory_${keyName}`}
            value={inventoryData[keyName]}
            placeholder={options.readOnly || !isProductViewFormEditable ? notAvailableLabel : ""}
            disabled={options.readOnly || !isProductViewFormEditable}
            spellCheck={options.spellCheck}
            required={options.required}
            readOnly={options.readOnly}
            onChange={controlledInput(setInventoryData, keyName)}
            className={`
                    ${options.readOnly || !isProductViewFormEditable ? "disabled" : ""}
                    ${options.required ? "required" : ""}
                    ${options.className}
                    ${options.autogrow ? "autogrow" : ""}
                `}
            leftElem={options.leftElem}
            rightElem={options.rightElem}
            helpText={options.helpText || ""}
        />
    )
}


InventoryInput.proptypes = {
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
        PropTypes.element,
    ]),
    keyName: PropTypes.string,
    options: PropTypes.object
}

export default InventoryInput