import { data, useNavigate } from "react-router-dom";
import IconButton from "../../components/Button/IconButton.jsx";
import { getFromLocalStorage, removeFromLocalStorage } from "../../utils/browserStorage.js"
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext.jsx";
import CTAButton from "../../components/Button/CTAButton.jsx";
import Input from "../../components/Input/Input.jsx";
import { controlledInput } from "../../utils/inventory.js";

const InventoryProductView = () => {

    // Hooks
    const [inventoryData, setInventoryData] = useState(getFromLocalStorage("viewed_product"));
    const [isFormEditable, setIsFormEditable] = useState(false)
    const navigate = useNavigate();

    // Customized header
    const { headerChildren, setHeaderChildren } = useContext(GlobalContext);

    useEffect(() => {
        setHeaderChildren({
            backBtn: <IconButton iconName={"arrow_left"} onClick={() => {
                removeFromLocalStorage("viewed_product")
                navigate("/inventory")
            }} />,
            heading: `Product - ${inventoryData.name}`,
            elements: <CTAButton label={"Edit"} iconName="edit" className="primary" />
        })

        return () => setHeaderChildren({});
    }, [])


    // Get simple & redundant Inventory Inputs
    const getInventoryInput = (label, keyName, options = {
        spellCheck: false,
        required: true,
    }) => {
        return (
            <Input
                label={label}
                id={`inventory_${keyName}`}
                name={`inventory_${keyName}`}
                value={inventoryData[keyName] || ""}
                placeholder={isFormEditable ? "" : "Not Available"}
                disabled={!isFormEditable}
                spellCheck={options.spellCheck}
                required={options.required}
                onChange={controlledInput(setInventoryData, keyName)}
            />
        )
    }

    return (
        <form className={`inventory-product-view ${isFormEditable ? "editable" : ""}`}>
            {/* Core Details Section */}
            <section className="main-sec core-details">
                <h2>
                    Core Product Details
                </h2>

                <div>
                    {/* Name Info */}
                    <div className="details-col">
                        {getInventoryInput("Product Name", "name")}
                        {inventoryData.generic_name && getInventoryInput("Generic Name", "generic_name")}
                        {getInventoryInput("Brand Name", "brand")}
                    </div>

                    {/* Category Info */}
                    <div className="details-col">
                        <h3 className="fs-500">Categories</h3>
                    </div>

                    {/* Company Info */}
                    <div className="details-col">
                        {getInventoryInput("Manufacturer", "manufacturer")}
                        {getInventoryInput("Supplier", "supplier")}
                        {getInventoryInput("SKU (Stock Keeping Unit)", "sku")}
                    </div>
                </div>
            </section>
        </form>
    )
}

export default InventoryProductView;