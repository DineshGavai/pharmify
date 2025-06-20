import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { getFromLocalStorage } from "../../utils/browserStorage";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/date";
import IconButton from "../../components/Button/IconButton";
import DataCell from "../../components/DataCell";
import Aside from "../../components/Aside";
import CategoryList from "../../components/Inventory/CategoryList";
import Accordion from "../../components/Accordion";
import InventoryInput from "../../components/Inventory/InventoryInput";
import Icon from "../../components/Icon";
import Input from "../../components/Input/Input";

const ProductStockView = () => {

    const [inventoryData, setInventoryData] = useState(() => getFromLocalStorage("viewed_product"));
    const [initialInventoryData, setInitialInventoryData] = useState({});
    const [updatedInventoryData, setUpdatedInventoryData] = useState({});

    const [isFormEditable, setIsFormEditable] = useState(true);

    const navigate = useNavigate();

    const { headerChildren, setHeaderChildren } = useContext(GlobalContext);

    useEffect(() => {
        setHeaderChildren({
            backBtn: (
                <IconButton
                    iconName="arrow_left"
                    onClick={() => {
                        navigate("/inventory/product");
                    }}
                />
            ),
            heading: `Stock - ${inventoryData.name}`,
            collapsible: true,
        })
    }, [])


    return (
        <form className={`inventory-stock-view`}>
            <Aside
                className={"product-summary"}
                heading={<>Product</>}
                activeStatus={window.innerWidth > 1024}
                content={
                    <>
                        <div className="info">
                            <DataCell
                                label={"Product Name"}
                                data={inventoryData.name}
                            />
                            {
                                inventoryData.generic_name &&
                                <DataCell
                                    label={"Generic Name"}
                                    data={inventoryData.generic_name}
                                />
                            }
                            <DataCell
                                label={"Brand Name"}
                                data={inventoryData.brand}
                            />
                        </div>

                        <div className="info">
                            <DataCell
                                label={"Supplier Name"}
                                data={inventoryData.supplier}
                            />
                        </div>

                        <div className="info">
                            <DataCell
                                label={"Cost Price"}
                                data={"₹" + (inventoryData.cost_price || "NA")}
                            />
                            <DataCell
                                label={"Selling Price"}
                                data={"₹" + (inventoryData.selling_price || "NA")}
                            />
                            <DataCell
                                label={"Tax Rate"}
                                data={(inventoryData.tax_rate || "NA") + "%"}
                            />
                        </div>

                        <div className="info">
                            <DataCell
                                label={"Net Selling Price"}
                                data={"₹" + (inventoryData.net_selling_price || "NA")}
                            />
                            <DataCell
                                label={"Profit Amount"}
                                data={"₹" + (inventoryData.selling_price || "NA")}
                            />
                            <DataCell
                                label={"Profit Percentage Rate"}
                                data={(inventoryData.tax_rate || "NA") + "%"}
                            />
                        </div>

                        <div className="info">
                            <DataCell
                                label={"Categories"}
                                data={<CategoryList categoryData={inventoryData.categories} />}
                            />
                        </div>
                    </>
                }
            />

            <section className="main-sec">

                {/* Stock Overview & Form section */}
                <div className="stock-overview-sec">
                    {/* Overview Section */}
                    <div className="overview-wrapper">
                        <header>
                            <h2>Stock Overview</h2>
                            <DataCell
                                className="flex"
                                label={"Last Updated:"}
                                data={formatDate(inventoryData.last_updated) || "NA"}
                            />
                        </header>

                        <div className="overview-body">
                            <Accordion
                                heading={"Quantity"}
                                className="card quantity"
                                activeStatus={window.innerWidth > 425}
                                content={
                                    <>
                                        <DataCell
                                            label={"Total Batches"}
                                            data={`${inventoryData.batch_count || "NA"} (${inventoryData.batch_count_active || "NA"} Active)`}
                                        />
                                        <DataCell
                                            label={"Total Units"}
                                            data={inventoryData.total_units || "NA"}
                                            className="total-units"
                                        />
                                        <DataCell
                                            label={"Reserved"}
                                            data={inventoryData.total_reserved_units || "NA"}
                                        />

                                        <DataCell
                                            label={"Available"}
                                            data={inventoryData.total_available_units || "NA"}
                                        />

                                    </>
                                }
                            />
                            <Accordion
                                heading={"Finance"}
                                className="card finance"
                                activeStatus={window.innerWidth > 425}
                                content={
                                    <>
                                        <DataCell
                                            label={
                                                <>
                                                    Total value
                                                    <br />
                                                    (₹ {inventoryData.selling_price || "NA"} per unit)
                                                </>
                                            }
                                            className="flex"
                                            data={<>₹ {inventoryData.total_available_units || "NA"}</>}
                                        />
                                        <DataCell
                                            label={"Highest Cost Batch"}
                                            className="flex"
                                            data={<># {inventoryData.highest_cost_batch_id || "NA"}</>}
                                        />

                                        <DataCell
                                            label={"Lowest Cost Batch"}
                                            className="flex"
                                            data={<># {inventoryData.lowest_cost_batch_id || "NA"}</>}
                                        />

                                    </>
                                }
                            />
                            <Accordion
                                heading={"Expiry"}
                                className="card expiry"
                                activeStatus={window.innerWidth > 425}
                                content={
                                    <>
                                        <div className="expiry-col">
                                            <DataCell
                                                label={"Oldest Batch"}
                                                data={<>
                                                    {inventoryData.oldest_batch_id || "NA"} - {formatDate(inventoryData.oldest_batch_date) || "NA"}
                                                </>
                                                }
                                            />

                                            <DataCell
                                                label={"Newest Batch"}
                                                data={<>
                                                    {inventoryData.newest_batch_id || "NA"} - {formatDate(inventoryData.newest_batch_date) || "NA"}
                                                </>
                                                }
                                            />
                                        </div>
                                        <div className="expiry-col">
                                            <h4>
                                                Expiring Soon
                                            </h4>

                                            <div className="bar">
                                                <span className="id"># NA</span>
                                                <span className="date">NA</span>
                                            </div>
                                            <div className="bar">
                                                <span className="id"># NA</span>
                                                <span className="date">NA</span>
                                            </div>
                                            <div className="bar">
                                                <span className="id"># NA</span>
                                                <span className="date">NA</span>
                                            </div>
                                        </div>
                                        <div className="expiry-col">
                                            <h4>
                                                Expired
                                            </h4>

                                            <div className="bar">
                                                <span className="id"># NA</span>
                                                <span className="date">NA</span>
                                            </div>
                                            <div className="bar">
                                                <span className="id"># NA</span>
                                                <span className="date">NA</span>
                                            </div>
                                            <div className="bar">
                                                <span className="id"># NA</span>
                                                <span className="date">NA</span>
                                            </div>

                                        </div>
                                    </>
                                }
                            />

                        </div>

                    </div>
                    {/* Form & Measurment section */}
                    <div className="main-sec details-col product-form-wrapper">
                        <h2>Form & Measurement</h2>

                        <Input
                            label="Form (Physical Type)"
                            name={"form"}
                            rightElem={<Icon iconName={"chevron_down"} />}
                        />


                        <div className="input-group">
                            <Input
                                label="Measure Value"
                                name={"measure_value"}
                            />

                            <Input
                                label="Measure Unit"
                                name={"measure_unit"}
                                rightElem={<Icon iconName={"chevron_down"} />}
                            />

                        </div>

                    </div>
                </div>

            </section>
        </form>
    )
}

export default ProductStockView;