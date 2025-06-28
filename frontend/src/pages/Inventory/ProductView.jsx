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
import DataCell from "../../components/DataCell.jsx";
import InventoryInput from "../../components/Inventory/InventoryInput.jsx";
import FieldsetHeader from "../../components/Input/FieldsetHeader.jsx";
import Barcode from "../../components/Inventory/Barcode.jsx";

const ProductView = () => {

    // Hooks
    const [inventoryData, setInventoryData] = useState(() => getFromLocalStorage("viewed_product"));
    const [initialInventoryData, setInitialInventoryData] = useState({});
    const [updatedInventoryData, setUpdatedInventoryData] = useState({});

    const { isProductViewFormEditable, setIsProductViewFormEditable } = useContext(GlobalContext)
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
                        !isProductViewFormEditable ?
                            <CTAButton
                                className="primary"
                                label="Edit"
                                iconName="edit"
                                onClick={() => setIsProductViewFormEditable(true)}
                            />
                            :
                            <>
                                <CTAButton
                                    className="ghost"
                                    label="Cancel"
                                    onClick={() => setIsProductViewFormEditable(false)}
                                />
                                <CTAButton
                                    className="primary"
                                    label="Save"
                                    onClick={() => setIsProductViewFormEditable(false)}
                                />
                            </>
                    }
                </div>
            )
        });

        return () => setHeaderChildren({});
    }, [isProductViewFormEditable]);

    useEffect(() => {
        if (window.innerWidth > 560) {
            setActiveMobileForm("")
        } else {
            setIsProductViewFormEditable(activeMobileForm.length != 0);
        }
    }, [activeMobileForm])


    // Get mobile form section header
    const getFormFooter = () => {
        if (isProductViewFormEditable)
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
                    <fieldset className={`mobile-form ${mobileForms.BASIC_INFO} ${(activeMobileForm == mobileForms.BASIC_INFO) ? "active" : ""}`}>
                        <FieldsetHeader
                            setActiveMobileForm={setActiveMobileForm}
                            heading="Basic Info"
                        />

                        <InventoryInput
                            label={"Product Name"}
                            keyName={"name"}
                        />

                        {
                            inventoryData.generic_name &&
                            < InventoryInput
                                label={"Generic Name"}
                                keyName={"generic_name"}
                            />
                        }
                        <InventoryInput
                            label={"Brand Name"}
                            keyName={"brand"}
                        />

                        {getFormFooter()}
                    </fieldset>

                    {/* Category Info */}
                    <fieldset className={`mobile-form ${mobileForms.CATEGORIES} ${(activeMobileForm == mobileForms.CATEGORIES) ? "active" : ""}`}>
                        <FieldsetHeader
                            setActiveMobileForm={setActiveMobileForm}
                            heading="Categories"
                        />

                        {
                            !inventoryData.categories
                                ? "Not Available"
                                : <CategoryList
                                    categoryData={inventoryData.categories}
                                    marker={<Icon iconName={"label"} />}
                                />
                        }

                        {getFormFooter()}
                    </fieldset>


                    {/* Company Info */}
                    <fieldset className={`mobile-form ${mobileForms.COMPANY_INFO} ${(activeMobileForm == mobileForms.COMPANY_INFO) ? "active" : ""}`}>

                        <FieldsetHeader
                            setActiveMobileForm={setActiveMobileForm}
                            heading="Company Details"
                        />

                        <div className="sku-and-barcode">
                            <InventoryInput
                                label={"SKU (Stock Keeping Unit)"}
                                keyName={"sku"}
                                options={{
                                    readOnly: true
                                }}
                            />
                        </div>

                        <Barcode
                        />

                        <InventoryInput
                            label={"Manufacturer"}
                            keyName={"manufacturer"}
                        />
                        <InventoryInput
                            label={"Supplier"}
                            keyName={"supplier"}
                        />

                        {getFormFooter()}
                    </fieldset>
                </section>

                {/* Pricing Details */}
                <fieldset
                    className={`main-sec details-sec mobile-form ${mobileForms.PRICING_INFO} ${(activeMobileForm == mobileForms.PRICING_INFO) ? "active" : ""}`}>


                    {/* Pricing Inputs */}
                    <fieldset>
                        <FieldsetHeader
                            setActiveMobileForm={setActiveMobileForm}
                            heading="Pricing (Per Unit)"
                        />

                        <div className="input-group">

                            <InventoryInput
                                label={"Cost Price"}
                                keyName={"cost_price"}
                                options={
                                    {
                                        leftElem: <Icon iconName="rupee" />,
                                        type: "numeric",
                                        className: "currency",
                                    }
                                }
                            />

                            <InventoryInput
                                label={"Selling Price"}
                                keyName={"selling_price"}
                                options={
                                    {
                                        leftElem: <Icon iconName="rupee" />,
                                        type: "numeric",
                                        className: "currency"
                                    }
                                }
                            />

                        </div>

                        <InventoryInput
                            label={"Tax Rate"}
                            keyName={"tax_rate"}
                            options={
                                {
                                    rightElem: <Icon iconName="percentage" />,
                                    type: "numeric",
                                    className: "percentage"
                                }
                            }
                        />

                        {
                            inventoryData.discount_allowed &&
                            <InventoryInput
                                label={"Discount Limit"}
                                keyName={"discount"}
                                options={
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
                                }
                            />
                        }

                        {
                            isProductViewFormEditable && !inventoryData.discount_allowed &&
                            <CTAButton
                                label="Add Discount"
                                iconName="add"
                                className="ghost add-discount-btn"
                                onClick={controlledInput(setInventoryData, "discount_allowed", true)}
                            />
                        }
                    </fieldset>

                    <fieldset className="pricing-calc-box">
                        <FieldsetHeader
                            setActiveMobileForm={setActiveMobileForm}
                            heading="Summary"
                            backBtn={false}
                        />
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
                    </fieldset>

                    {
                        inventoryData.discount_allowed &&
                        <fieldset className="pricing-calc-box discount-box">
                            <FieldsetHeader
                                setActiveMobileForm={setActiveMobileForm}
                                heading="After Max Discount"
                                backBtn={false}
                            />

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

                        </fieldset>
                    }
                    {getFormFooter()}

                </fieldset>

                {/* Stock Details */}
                <section className={`main-sec details-sec mobile-form ${mobileForms.STOCK_INFO} ${(activeMobileForm == mobileForms.STOCK_INFO) ? "active" : ""}`}>

                    <div className="summary">
                        <FieldsetHeader
                            setActiveMobileForm={setActiveMobileForm}
                            heading="Stocks"
                        />

                        <div className="summary-row">
                            <DataCell
                                label="Total Units:"
                                data={inventoryData.total_units ?? "N/A"}
                                className="flex"
                            />
                            <DataCell
                                label="Batches:"
                                data={inventoryData.total_versions ?? "N/A"}
                                className="flex"
                            />
                        </div>

                        <div className="summary-row">
                            <DataCell
                                label="Expiring Units:"
                                data={inventoryData.total_units ?? "N/A"}
                                className="flex"
                            />
                            <DataCell
                                label="Next Expiry:"
                                data={inventoryData.next_expiry ?? "N/A"}
                                className="flex"
                            />
                        </div>

                        <div className="summary-row">
                            <DataCell
                                label="Total Value:"
                                data={`₹ ${inventoryData.total_value ?? "N/A"}`}
                                className="flex"
                            />
                        </div>
                        <CTAButton
                            className="primary"
                            label="See All Stocks"
                            iconName="arrow_right"
                            rightIcon={true}
                            onClick={() => navigate("/inventory/product/:id/stock")}
                        />

                    </div>

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

                </section>

            </section>
        </form>
    )
}

export default ProductView;