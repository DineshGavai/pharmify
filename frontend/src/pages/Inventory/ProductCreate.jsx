import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import IconButton from "../../components/Button/IconButton";
import { useNavigate } from "react-router-dom";
import FieldsetHeader from "../../components/Input/FieldsetHeader";
import Input from "../../components/Input/Input";
import { controlledInput } from "../../utils/inventory";
import CategoryList from "../../components/Inventory/CategoryList"
import CTAButton from "../../components/Button/CTAButton";
import { saveToLocalStorage } from "../../utils/browserStorage.js"
import Barcode from "../../components/Inventory/Barcode.jsx";
import Select from "../../components/Input/Select.jsx";
import Dropdown from "../../components/Dropdown.jsx";
import { exampleSupplierData } from "../../utils/data.js"
import DropdownItem from "../../components/DropdownItem.jsx";

const ProductCreate = () => {

    const [productInfo, setProductInfo] = useState({});

    // Customized header
    const navigate = useNavigate()
    const { headerChildren, setHeaderChildren } = useContext(GlobalContext);

    useEffect(() => {
        setHeaderChildren({
            backBtn: <IconButton iconName="arrow_left" onClick={() => navigate("/inventory")} />,
            heading: "Create & Add New Product"
        })

        return () => setHeaderChildren({});
    }, [])


    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(productInfo);
    }

    return (
        <form
            className="main-sec create-new-product-view"
            onSubmit={handleFormSubmit}
        >
            {/* Basic Info */}
            <fieldset className="basic-info">
                <FieldsetHeader
                    heading={"Basic Info"}
                    backBtn={false}
                />

                <Input
                    className="inventory-input"
                    label="Product Name"
                    id="product_name"
                    name="product_name"
                    defaultValue={productInfo.name}
                    onChange={controlledInput(setProductInfo, "name")}
                />

                <Input
                    className="inventory-input"
                    label="Brand Name"
                    id="brand_name"
                    name="brand_name"
                    defaultValue={productInfo.brand}
                    onChange={controlledInput(setProductInfo, "brand")}
                />
            </fieldset>

            {/* Categories */}
            <fieldset className="categories">
                <FieldsetHeader
                    heading={"Categories"}
                    backBtn={false}
                />

                <CategoryList />
            </fieldset>

            {/* Source Details */}
            <fieldset className="source-info">
                <FieldsetHeader
                    heading={"Source Info"}
                    backBtn={false}
                />

                <Input
                    className="inventory-input"
                    label="SKU (Stock Keeping Unit)"
                    id="sku"
                    name="sku"
                    defaultValue={productInfo.sku}
                    onChange={controlledInput(setProductInfo, "sku")}
                    disabled={true}
                />

                <Barcode />

                <Input
                    className="inventory-input"
                    label="Manufacturer"
                    id="manufacturer"
                    name="manufacturer"
                    defaultValue={productInfo.manufacturer}
                    onChange={controlledInput(setProductInfo, "manufacturer")}
                />

                <Select
                    className="inventory-input"
                    label="Supplier"
                    id="supplier"
                    name="supplier"
                    defaultValue={productInfo.supplier}
                    onChange={controlledInput(setProductInfo, "supplier")}
                    dropdownItemList={
                        exampleSupplierData.map((supplier, index) =>
                            <DropdownItem
                                key={index}
                                content={supplier.name}
                                value={supplier.name}
                            />
                        )}
                />

            </fieldset>

            <div className="btn-box flex sp-btw">
                <CTAButton
                    label="Save Draft & Back"
                    iconName="arrow_left"
                    className="ghost"
                />

                <CTAButton
                    label="Continue"
                    className="primary"
                    iconName="arrow_right"
                    rightIcon={true}
                    onClick={() => {
                        saveToLocalStorage("viewed_product", productInfo)
                        navigate("/inventory/product/:id")
                    }}
                />

            </div>
        </form>
    )
}

export default ProductCreate;