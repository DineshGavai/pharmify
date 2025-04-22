import { data, useNavigate } from "react-router-dom";
import IconButton from "../../components/Button/IconButton.jsx";
import { getFromLocalStorage, removeFromLocalStorage } from "../../utils/browserStorage.js"
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext.jsx";
import CTAButton from "../../components/Button/CTAButton.jsx";
import Input, { controlledInput } from "../../components/Input/Input.jsx";
import Checkbox from "../../components/Input/Checkbox.jsx"
import Icon from "../../components/Icon.jsx";
import TileButton from "../../components/Button/TileButton.jsx";
import InventoryItemTile from "../../components/Inventory/InventoryItemTile.jsx";

const InventoryProductView = () => {

    // Hooks
    const [inventoryData, setInventoryData] = useState(getFromLocalStorage("viewed_product"));
    const [isFormEditable, setIsFormEditable] = useState(false)
    const navigate = useNavigate();

    // Customizing Header
    const { headerChildren, setHeaderChildren } = useContext(GlobalContext);

    useEffect(() => {

        console.log(inventoryData);

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
                <span><Icon iconName={"label"} /> {subcategory}</span>
            </li>
        ));
    };

    // Renders categories with their subcategories
    const renderCategories = (categories) => {
        return Object.entries(categories).map(([category, subcategories], index) => (
            <li className="category-list-item category" key={index}>
                <span><Icon iconName={"label"} /> {category}</span>
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
                        <span><Icon iconName={"label"} /> {item.type}</span>
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
            <section className="main-sec product-view-nav">

                <InventoryItemTile
                    data={inventoryData}
                    className="compact"
                />

                {/* Core Product Details */}
                <div className="nav-body">
                    <p className="nav-heading">Core Product Details</p>

                    <TileButton
                        children={
                            <div>
                                <p className="label">Basic Info</p>
                                <p className="sublabel">Product Name, {inventoryData.generic_name && `Generic Name, `}Brand Name, Categories</p>
                            </div>
                        }
                    />
                    <TileButton
                        children={
                            <div>
                                <p className="label">Company Info</p>
                                <p className="sublabel">Manufacturer Name, Supplier Name, SKU & Barcode</p>
                            </div>
                        }
                    />
                </div>

                {/* Pricing & Stock Details */}
                <div className="nav-body">
                    <p className="nav-heading">Pricing & Stock Details</p>

                    <TileButton
                        children={
                            <div>
                                <p className="label">Pricing Details</p>
                                <p className="sublabel">Cost Price, Selling Price, Profit, Tax, Discount Allowed</p>
                            </div>
                        }
                    />
                    <TileButton
                        children={
                            <div>
                                <p className="label">Stock Info</p>
                                <p className="sublabel">Total Stock Quantity, Units per pack, Batch No., Mfg. Date, Expiry, Reorder Level</p>
                            </div>
                        }
                    />
                </div>
            </section>

            <section className="details-sec">
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
                        <div className="details-col tab-desk-only">
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

                {/* Pricing & Stock Details */}
                <section className="main-sec details-sec pricing-stock-details">
                    <h2>Pricing & Stock Details</h2>

                    <div className="mobile-only">

                    </div>
                </section>

            </section>
        </form >
    )
}

export default InventoryProductView;