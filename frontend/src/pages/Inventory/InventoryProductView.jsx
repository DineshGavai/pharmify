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

    // Renders subcategories <li> elements
    const renderSubcategories = (subcategories) => {
        return subcategories.map((subcategory, index) => (
            <li className="category-list-item subcategory" key={index}>
                <span className="slash">/</span> {subcategory}
            </li>
        ));
    };

    // Renders categories with their subcategories
    const renderCategories = (categories) => {
        return Object.entries(categories).map(([category, subcategories], index) => (
            <li className="category-list-item category" key={index}>
                <span className="slash">/</span> {category}
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
                        {item.type}
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
                    {/* Name Info */}
                    <div className="details-col">
                        {getInventoryInput("Product Name", "name")}
                        {inventoryData.generic_name && getInventoryInput("Generic Name", "generic_name")}
                        {getInventoryInput("Brand Name", "brand")}
                    </div>

                    {/* Category Info */}
                    <div className="details-col">
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

                    {/* Company Info */}
                    <div className="details-col">
                        {getInventoryInput("Manufacturer", "manufacturer")}
                        {getInventoryInput("Supplier", "supplier")}
                        <div>
                            {getInventoryInput("SKU (Stock Keeping Unit)", "sku")}
                            <img src={inventoryData.barcode ?? "/src/assets/placeholders/no-barcode.png"} alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </form >
    )
}

export default InventoryProductView;