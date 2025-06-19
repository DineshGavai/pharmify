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
import BatchSummaryCard from "../../components/Inventory/BatchSummaryCard.jsx";
import Slider from "../../components/Slider.jsx";
import CategoryList from "../../components/Inventory/CategoryList.jsx";

const ProductView = () => {

    // Hooks
    const [inventoryData, setInventoryData] = useState(() => getFromLocalStorage("viewed_product"));
    const [initialInventoryData, setInitialInventoryData] = useState({});
    const [updatedInventoryData, setUpdatedInventoryData] = useState({});

    const [isFormEditable, setIsFormEditable] = useState(true)
    const [activeMobileForm, setActiveMobileForm] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

    }, []);

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
                value={inventoryData[keyName]}
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
                helpText={options.helpText || ""}
            />
        )
    }

    // Get mobile form section header
    const getFormHeader = (heading, backBtn = true) => {
        return (
            <header className={`form-header ${backBtn ? "" : "not-sticky"}`}>
                {
                    backBtn &&
                    <IconButton
                        iconName={"arrow_left"}
                        className="mobile-form-back"
                        type="button"
                        onClick={() => {
                            setActiveMobileForm("")
                        }}
                    />
                }
                <h2>
                    {heading}
                </h2>
            </header>
        )
    }

    // Get mobile form section header
    const getFormFooter = () => {
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
        CATEGORIES: "categories",
        COMPANY_INFO: "company-info",
        PRICING_INFO: "pricing-info",
        STOCK_INFO: "stock-info",
    }

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
                                <p className="sublabel">Product Name, {inventoryData.generic_name && `Generic Name, `}Brand Name</p>
                            </div>
                        }
                        onClick={() => setActiveMobileForm(mobileForms.BASIC_INFO)}
                    />
                    <TileButton
                        children={
                            <div>
                                <p className="label">Categories</p>
                                <p className="sublabel">Select, Add, Edit, Remove Categories</p>
                            </div>
                        }
                        onClick={() => setActiveMobileForm(mobileForms.CATEGORIES)}
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
                                <p className="label">Pricing</p>
                                <p className="sublabel">Cost Price, Selling Price, Profit, Tax, Discount Limit</p>
                            </div>
                        }
                        onClick={() => setActiveMobileForm(mobileForms.PRICING_INFO)}
                    />
                    <TileButton
                        children={
                            <div>
                                <p className="label">Stock</p>
                                <p className="sublabel">Stock Versions, Total Stock Quantity, Units per pack, Batch No., Mfg. Date, Expiry, Reorder Level</p>
                            </div>
                        }
                        onClick={() => setActiveMobileForm(mobileForms.STOCK_INFO)}
                    />
                </div>
            </section>

            <section className="details-sec">
                {/* Core Details Section */}
                <section className="main-sec core-details">

                    {/* Basic Info */}
                    <div className={`details-col mobile-form ${mobileForms.BASIC_INFO} ${(activeMobileForm == mobileForms.BASIC_INFO) ? "active" : ""}`}>
                        {getFormHeader("Basic Info")}

                        {getInventoryInput("Product Name", "name")}
                        {inventoryData.generic_name && getInventoryInput("Generic Name", "generic_name")}
                        {getInventoryInput("Brand Name", "brand")}

                        {getFormFooter()}
                    </div>

                    {/* Category Info */}
                    <div className={`details-col mobile-form ${mobileForms.CATEGORIES} ${(activeMobileForm == mobileForms.CATEGORIES) ? "active" : ""}`}>
                        {getFormHeader("Categories")}

                        {
                            !inventoryData.categories
                                ? "Not Available"
                                : <CategoryList
                                    categoryData={inventoryData.categories}
                                    marker={<Icon iconName={"label"} />}
                                />
                        }

                        {getFormFooter()}
                    </div>


                    {/* Company Info */}
                    <div className={`details-col mobile-form ${mobileForms.COMPANY_INFO} ${(activeMobileForm == mobileForms.COMPANY_INFO) ? "active" : ""}`}>

                        {getFormHeader("Company Details")}

                        <div className="sku-and-barcode">
                            {getInventoryInput("SKU (Stock Keeping Unit)", "sku", {
                                readOnly: true
                            })}
                            <img src={inventoryData.barcode || "/src/assets/placeholders/no-barcode.png"} className="barcode" />
                        </div>
                        {getInventoryInput("Manufacturer", "manufacturer")}
                        {getInventoryInput("Supplier", "supplier")}

                        {getFormFooter()}
                    </div>
                </section>

                {/* Pricing Details */}
                <section
                    className={`main-sec details-col details-sec mobile-form ${mobileForms.PRICING_INFO} ${(activeMobileForm == mobileForms.PRICING_INFO) ? "active" : ""}`}>


                    {/* Pricing Inputs */}
                    <div className="details-col">
                        {getFormHeader("Pricing (Per Unit)")}

                        <div className="input-group">

                            {
                                getInventoryInput(
                                    "Cost Price",
                                    "cost_price",
                                    {
                                        leftElem: <Icon iconName="rupee" />,
                                        type: "numeric",
                                        className: "currency",
                                    }
                                )
                            }
                            {
                                getInventoryInput(
                                    "Selling Price",
                                    "selling_price",
                                    {
                                        leftElem: <Icon iconName="rupee" />,
                                        type: "numeric",
                                        className: "currency"
                                    }
                                )
                            }
                        </div>

                        {
                            getInventoryInput(
                                "Tax Rate",
                                "tax_rate",
                                {
                                    rightElem: <Icon iconName="percentage" />,
                                    type: "numeric",
                                    className: "percentage"
                                }
                            )
                        }
                        {
                            inventoryData.discount_allowed &&
                            getInventoryInput(
                                "Discount Limit",
                                "discount",
                                {
                                    rightElem: <>
                                        <Icon iconName="percentage" />
                                    </>,
                                    type: "numeric",
                                    className: "percentage",
                                    helpText:
                                        <CTAButton
                                            label="Remove Discount"
                                            className="underlined"
                                            onClick={controlledInput(setInventoryData, "discount_allowed", false)}
                                        />
                                }
                            )
                        }

                        {
                            isFormEditable && !inventoryData.discount_allowed &&
                            <CTAButton
                                label="Add Discount"
                                iconName="add"
                                className="ghost add-discount-btn"
                                onClick={controlledInput(setInventoryData, "discount_allowed", true)}
                            />
                        }
                    </div>

                    <div className="details-col pricing-calc-box">
                        {getFormHeader("Summary", false)}
                        <p style={{
                            marginTop: "-.8rem"
                        }}>
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
                        inventoryData.discount_allowed &&
                        <div className="details-col pricing-calc-box discount-box">
                            {getFormHeader("After Max Discount", false)}

                            <p style={{
                                marginTop: "-.8rem"
                            }}>
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
                    {getFormFooter()}

                </section>

                {/* Stock Details */}
                <section className={`main-sec details-col details-sec mobile-form ${mobileForms.STOCK_INFO} ${(activeMobileForm == mobileForms.STOCK_INFO) ? "active" : ""}`}>

                    <div className="details-col summary">
                        {getFormHeader("Stocks")}

                        <div className="summary-row">
                            <p>Total Units: <span>{inventoryData.total_units ?? "N/A"}</span></p>
                            <p>Versions: <span>{inventoryData.total_versions ?? "N/A"}</span></p>
                        </div>

                        <div className="summary-row">
                            <p>Expiring Units: <span>{inventoryData.total_units ?? "N/A"}</span></p>
                            <p>Next Expiry: <span>{inventoryData.next_expiry ?? "N/A"}</span></p>
                        </div>

                        <div className="summary-row">
                            <p>Total Value: <span>₹ {inventoryData.total_value ?? "N/A"}</span></p>
                        </div>

                        <CTAButton
                            className="primary"
                            label="See All Stocks"
                            iconName="arrow_right"
                            rightIcon={true}
                            onClick={() => navigate("/inventory/product/stock")}
                        />

                    </div>

                    <div className="details-col">
                        <Slider
                            className="stock-slider"
                            slides={
                                [
                                    <BatchSummaryCard />,
                                    <BatchSummaryCard />,
                                    <BatchSummaryCard />

                                ]
                            }
                        />
                    </div>

                </section>

            </section>
        </form>
    )
}

export default ProductView;