import { data, useNavigate } from "react-router-dom";
import IconButton from "../../components/Button/IconButton.jsx";
import { getFromLocalStorage, removeFromLocalStorage } from "../../utils/browserStorage.js"
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext.jsx";
import CTAButton from "../../components/Button/CTAButton.jsx";
import Input, { controlledInput } from "../../components/Input/Input.jsx";
import Checkbox from "../../components/Input/Checkbox.jsx"

const InventoryProductView = () => {

    // Hooks
    const [inventoryData, setInventoryData] = useState(getFromLocalStorage("viewed_product"));
    const [isFormEditable, setIsFormEditable] = useState(false)
    const navigate = useNavigate();

    // Customizing Header
    const { headerChildren, setHeaderChildren } = useContext(GlobalContext);

    useEffect(() => {
        setHeaderChildren({
            backBtn: (
                <IconButton
                    iconName="arrow_left"
                    onClick={() => {
                        removeFromLocalStorage("viewed_product");
                        navigate("/inventory");
                    }}
                />
            ),
            heading: `Product - ${inventoryData.name}`,
            elements: (
                <CTAButton
                    label="Edit"
                    iconName="edit"
                    className="primary"
                    onClick={() => setIsFormEditable(true)}
                />
            ),
        });

        return () => setHeaderChildren({});
    }, []);



    // Get simple & redundant Inventory Inputs
    const getInventoryInput = (label, keyName, options = {
        spellCheck: false,
        required: true,
        readOnly: false,
    }) => {
        return (
            <Input
                label={label}
                id={`inventory_${keyName}`}
                name={`inventory_${keyName}`}
                value={inventoryData[keyName] || ""}
                placeholder={options.readOnly || !isFormEditable ? "Not Available" : ""}
                disabled={options.readOnly || !isFormEditable}
                spellCheck={options.spellCheck}
                required={options.required}
                readOnly={options.readOnly}
                onChange={controlledInput(setInventoryData, keyName)}
            />
        )
    }

    // Renders subcategories <li> elements
    const renderSubcategories = (subcategories) => {
        return subcategories.map((subcategory, index) => (
            <li className="category-list-item subcategory" key={index}>
                <Checkbox
                    type="checkbox"
                    label={subcategory}
                    id={`subcategory_${index}`}
                    name={`subcategory`}
                    checked={true}
                    disabled={true}
                />
            </li>
        ));
    };

    // Renders categories with their subcategories
    const renderCategories = (categories) => {
        return Object.entries(categories).map(([category, subcategories], index) => (
            <li className="category-list-item category" key={index}>
                <Checkbox
                    type="checkbox"
                    label={category}
                    id={`category_${index}`}
                    name={`category`}
                    checked={true}
                    disabled={true}
                />
                {subcategories.length > 0 && (
                    <ul>{renderSubcategories(subcategories)}</ul>
                )}
            </li>
        ));
    };

    // Main function to render full nested category structure
    const getNestedCategoryList = (categoryData) => {
        return (
            <>
                {categoryData.map((item, index) => (
                    <li className="category-list-item type" key={index}>
                        <Checkbox
                            type="checkbox"
                            label={item.type}
                            id={`type_${index}`}
                            name={`type`}
                            checked={true}
                            disabled={true}
                        />
                        <ul>
                            {item.categories && renderCategories(item.categories)}
                        </ul>
                    </li>
                ))}
            </>
        );
    };

    return (
        <form className={`inventory-product-view ${isFormEditable ? "editable" : ""}`}>
            {/* Core Details Section */}
            <section className="main-sec core-details">
                <h2>
                    Core Product Details
                </h2>

                <div>
                    {/* Basic Info */}
                    <div className="details-col basic-info">
                        {getInventoryInput("Product Name", "name")}
                        {inventoryData.generic_name && getInventoryInput("Generic Name", "generic_name")}
                        {getInventoryInput("Brand Name", "brand")}

                        {/* Category Info */}
                        <div className="categories">
                            <p className="fs-300"
                                style={{
                                    color: `hsl(var(--clr-neutral-800))`
                                }}
                            >Categories</p>
                            <ul className="categories-list">
                                {
                                    !inventoryData.categories
                                        ? "Not Available"
                                        : getNestedCategoryList(inventoryData.categories)
                                }
                            </ul>
                        </div>
                    </div>


                    {/* Company Info */}
                    <div className="details-col">
                        {getInventoryInput("Manufacturer", "manufacturer")}
                        {getInventoryInput("Supplier", "supplier")}
                        <div className="sku-and-barcode">
                            {getInventoryInput("SKU (Stock Keeping Unit)", "sku", {
                                readOnly: true
                            })}
                            <img src={inventoryData.barcode ?? "/src/assets/placeholders/no-barcode.png"} className="barcode" />
                        </div>
                    </div>
                </div>
            </section>
        </form >
    )
}

export default InventoryProductView;