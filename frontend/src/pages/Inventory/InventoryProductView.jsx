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
    const [initialInventoryData, setInitialInventoryData] = useState({});
    const [updatedInventoryData, setUpdatedInventoryData] = useState({});

    const [isFormEditable, setIsFormEditable] = useState(false)
    const [activeMobileForm, setActiveMobileForm] = useState("");

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
            children: (
                <div className="header-options">
                    {
                        !isFormEditable ?
                            <CTAButton
                                className="primary"
                                label="Edit"
                                iconName="edit"
                                onClick={() => setIsFormEditable(true)}
                            />
                            :
                            <>
                                <CTAButton
                                    className="ghost"
                                    label="Cancel"
                                    onClick={() => setIsFormEditable(false)}
                                />
                                <CTAButton
                                    className="primary"
                                    label="Save"
                                    onClick={() => setIsFormEditable(false)}
                                />
                            </>
                    }
                </div>
            )
        });

        return () => setHeaderChildren({});
    }, [isFormEditable]);

    useEffect(() => {
        if (window.innerWidth > 560) {
            setActiveMobileForm("")
        } else {
            setIsFormEditable(activeMobileForm.length != 0);
        }
    }, [activeMobileForm])

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


    // Get simple & redundant Inventory Inputs
    const getInventoryInput = (label, keyName, options = {}) => {

        options = { ...defaultInputOptions, ...options }
        label = options.required && isFormEditable && !options.readOnly ? <>{label} <span className="asterisk">*</span></> : label;
        let notAvailableLabel = options.type == "numeric" ? "00" : "Not Available";

        return (
            <Input
                type={options.type}
                label={label}
                id={`inventory_${keyName}`}
                name={`inventory_${keyName}`}
                value={inventoryData[keyName] || ""}
                placeholder={options.readOnly || !isFormEditable ? notAvailableLabel : ""}
                disabled={options.readOnly || !isFormEditable}
                spellCheck={options.spellCheck}
                required={options.required}
                readOnly={options.readOnly}
                onChange={controlledInput(setInventoryData, keyName)}
                className={`
                    ${options.readOnly || !isFormEditable ? "disabled" : ""}
                    ${options.required ? "required" : ""}
                    ${options.className}
                    ${options.autogrow ? "autogrow" : ""}
                `}
                leftElem={options.leftElem}
                rightElem={options.rightElem}
            />
        )
    }

    // Get mobile form section header
    const getMobileFormHeader = (heading) => {
        return (
            <header className="mobile-form-header">
                <IconButton
                    iconName={"arrow_left"}
                    type="button"
                    onClick={() => {
                        setActiveMobileForm("")
                    }}
                />
                <h2>{heading}</h2>
            </header>
        )
    }

    // Get mobile form section header
    const getFormSectionFooter = () => {
        if (isFormEditable)
            return (
                <footer className="form-footer">
                    <CTAButton
                        label="Undo"
                        className="ghost"
                        type="button"
                    />
                    <CTAButton
                        label="Save"
                        className="primary"
                        type="submit"
                    />
                </footer>
            )
    }

    const mobileForms = {
        BASIC_INFO: "basic-info",
        COMPANY_INFO: "company-info",
        PRICING_INFO: "pricing-info",
        STOCK_INFO: "stock-info",
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
        <form className={`inventory-product-view`}>
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
                        onClick={() => setActiveMobileForm(mobileForms.BASIC_INFO)}
                    />
                    <TileButton
                        children={
                            <div>
                                <p className="label">Company Info</p>
                                <p className="sublabel">Manufacturer Name, Supplier Name, SKU & Barcode</p>
                            </div>
                        }
                        onClick={() => setActiveMobileForm(mobileForms.COMPANY_INFO)}
                    />
                </div>

                {/* Pricing & Stock Details */}
                <div className="nav-body">
                    <p className="nav-heading">Pricing & Stock Details</p>

                    <TileButton
                        children={
                            <div>
                                <p className="label">Pricing Info</p>
                                <p className="sublabel">Cost Price, Selling Price, Profit, Tax, Discount Limit</p>
                            </div>
                        }
                        onClick={() => setActiveMobileForm(mobileForms.PRICING_INFO)}
                    />
                    <TileButton
                        children={
                            <div>
                                <p className="label">Stock Info</p>
                                <p className="sublabel">Total Stock Quantity, Units per pack, Batch No., Mfg. Date, Expiry, Reorder Level</p>
                            </div>
                        }
                        onClick={() => setActiveMobileForm(mobileForms.STOCK_INFO)}
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
                        <div className={`details-col ${mobileForms.BASIC_INFO} ${(activeMobileForm == mobileForms.BASIC_INFO) ? "mobile-form-active" : ""}`}>
                            {getMobileFormHeader("Basic Info")}

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

                            {getFormSectionFooter()}
                        </div>


                        {/* Company Info */}
                        <div className={`details-col ${mobileForms.COMPANY_INFO} ${(activeMobileForm == mobileForms.COMPANY_INFO) ? "mobile-form-active" : ""}`}>

                            {getMobileFormHeader("Company Details")}

                            {getInventoryInput("Manufacturer", "manufacturer")}
                            {getInventoryInput("Supplier", "supplier")}
                            <div className="sku-and-barcode">
                                {getInventoryInput("SKU (Stock Keeping Unit)", "sku", {
                                    readOnly: true
                                })}
                                <img src={inventoryData.barcode ?? "/src/assets/placeholders/no-barcode.png"} className="barcode" />
                            </div>

                            {getFormSectionFooter()}
                        </div>
                    </div>
                </section>

                {/* Pricing & Stock Details */}
                <section className="main-sec details-sec pricing-stock-details">
                    <h2>Pricing & Stock Details</h2>

                    <div>
                        <div className={`details-col ${mobileForms.PRICING_INFO} ${(activeMobileForm == mobileForms.PRICING_INFO) ? "mobile-form-active" : ""}`}>
                            {getMobileFormHeader("Pricing Info")}

                            {
                                getInventoryInput(
                                    <span className="fs-400">Cost Price<br /><span className="fs-200 text-muted">(Purchase Price)</span></span>,
                                    "cost_price",
                                    {
                                        leftElem: <Icon iconName="rupee" />,
                                        type: "numeric",
                                        className: "currency flex",
                                        autogrow: true,
                                    }
                                )
                            }
                            {
                                getInventoryInput(
                                    <span className="fs-400">Selling Price<br /><span className="fs-200 text-muted">(Inclusive of all taxes)</span></span>,
                                    "selling_price",
                                    {
                                        leftElem: <Icon iconName="rupee" />,
                                        type: "numeric",
                                        className: "currency flex"
                                    }
                                )
                            }
                            {
                                getInventoryInput(
                                    <span className="fs-400">Tax Rate</span>,
                                    "tax_rate",
                                    {
                                        rightElem: <Icon iconName="percentage" />,
                                        type: "numeric",
                                        className: "percentage flex"
                                    }
                                )
                            }

                            <div className="pricing-calc-box">
                                <p>
                                    <span className="text-muted">Net Selling Price</span>
                                    <span className="value-box">
                                        <Icon iconName="rupee" />
                                        00.00
                                    </span>
                                </p>
                                <p>
                                    <span className="text-muted">Profit Amount</span>
                                    <span className="value-box">
                                        <Icon iconName="rupee" />
                                        00.00
                                    </span>
                                </p>
                                <p>
                                    <span className="text-muted">Profit Percentage</span>
                                    <span className="value-box">
                                        00.00
                                        <Icon iconName="percentage" />
                                    </span>
                                </p>
                            </div>

                            {
                                isFormEditable && !inventoryData.discount_allowed &&
                                <TileButton
                                    children={
                                        <p className="label">Add Discount</p>
                                    }
                                    iconName="add"
                                    className="add-discount-btn"
                                    onClick={controlledInput(setInventoryData, "discount_allowed", true)}
                                />
                            }

                            {
                                inventoryData.discount_allowed &&
                                <div className="pricing-calc-box discount-box">

                                    {
                                        getInventoryInput(
                                            <span className="fs-400">
                                                Discount Limit
                                                <CTAButton
                                                    label="Remove"
                                                    className="text cancel-discount-btn"
                                                    onClick={controlledInput(setInventoryData, "discount_allowed", false)}
                                                />
                                            </span>,
                                            "discount",
                                            {
                                                rightElem: <>
                                                    <Icon iconName="percentage" />
                                                </>,
                                                type: "numeric",
                                                className: "percentage flex"
                                            }
                                        )
                                    }
                                    <p className="text-muted text-emphasis fs-300">After Max Discount</p>
                                    <p>
                                        <span className="text-muted">Net Selling Price</span>
                                        <span className="value-box">
                                            <Icon iconName="rupee" />
                                            00.00
                                        </span>
                                    </p>
                                    <p>
                                        <span className="text-muted">Profit Amount</span>
                                        <span className="value-box">
                                            <Icon iconName="rupee" />
                                            00.00
                                        </span>
                                    </p>
                                    <p>
                                        <span className="text-muted">Profit Percentage</span>
                                        <span className="value-box">
                                            00.00
                                            <Icon iconName="percentage" />
                                        </span>
                                    </p>

                                </div>
                            }


                            {getFormSectionFooter()}
                        </div>

                        <div className={`details-col ${mobileForms.STOCK_INFO} ${(activeMobileForm == mobileForms.STOCK_INFO) ? "mobile-form-active" : ""}`}>

                        </div>
                    </div>

                </section>

            </section>
        </form>
    )
}

export default InventoryProductView;