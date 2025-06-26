import PropTypes from "prop-types";
import Input, { controlledInput } from "../Input/Input"
import { useEffect, useState } from "react";
import Icon from "../Icon";
import IconButton from "../Button/IconButton";
import DataCell from "../DataCell";
import CTAButton from "../Button/CTAButton";
import { formatDate } from "../../utils/date";


const BatchTile = ({ data }) => {
    const [batchData, setBatchData] = useState(data)

    return (
        <div className="batch-tile">
            {/* Header */}
            <header className="flex sp-btw">
                <div className="flex">

                    <Input
                        label="Batch"
                        id={`batch_id_${batchData.id}`}
                        className="batch-id flex bottom-border"
                        leftElem={"#"}
                        defaultValue={batchData.id}
                        onChange={controlledInput(setBatchData, "id")}
                    />

                    <span className="interpunct"></span>

                    <span className="text-muted">{batchData.version || "v0.0"}</span>
                </div>

                <div>
                    <IconButton
                        iconName={"three_dots"}
                    />
                </div>

            </header>

            {/* Packaging & Stock Section */}
            <div className="packaging-wrapper" style={{
                "--max-width": `${batchData.levels.length}rem`
            }}>
                <h3>Packaging & Stock</h3>

                <div className="packaging-hierarchy">

                    <CTAButton
                        label="Add Level"
                        className="ghost add-level-btn"
                        iconName="add"
                    />
                    {
                        batchData.levels.map((level, index) => (
                            <div
                                className="input-group hierarchy-level"
                                key={index}
                                style={{
                                    "--indentation-level": index
                                }}
                            >

                                <Input
                                    placeholder="Value"
                                    id={`level_${index}_value_${batchData.id}`}
                                    defaultValue={level.units}
                                    className={"input-value"}
                                    autogrow={true}
                                />

                                <Input
                                    placeholder="Name"
                                    id={`level_${index}_name_${batchData.id}`}
                                    defaultValue={level.name}
                                    rightElem={<Icon iconName={"chevron_down"} />}
                                />

                                <IconButton
                                    iconName={"cross"}
                                    className="remove-level-btn"
                                />
                            </div>
                        ))
                    }

                </div>

                <DataCell
                    className="flex total-units"
                    label={"Total Units: "}
                    data={batchData.totalUnits || "1234"}
                />

                <div className="input-group">
                    <Input
                        className="inventory-input"
                        label="Reserved Units"
                        id={`units_reserved_${batchData.id}`}
                        defaultValue={batchData.unitsReserved}
                        onChange={controlledInput(setBatchData, "units_reserved")}
                    />

                    <Input
                        className="inventory-input"
                        label="Available Units"
                        id={`units_available_${batchData.id}`}
                        defaultValue={batchData.unitsAvailable}
                        disabled={true}
                    />

                </div>
            </div>

            {/* Pricing Section */}
            <div className="pricing-wrapper">
                <h3>Pricing</h3>

                <Input
                    className="inventory-input"
                    label="Supplier"
                    id={`supplier_${batchData.id}`}
                    defaultValue={batchData.supplier}
                    onChange={controlledInput(setBatchData, "supplier")}
                    rightElem={<Icon iconName={"chevron_down"} />}
                />

                <div className="input-group">


                    <Input
                        className="inventory-input"
                        label="Cost Price (CP)"
                        id={`cost_price_${batchData.id}`}
                        defaultValue={batchData.costPrice}
                        onChange={controlledInput(setBatchData, "cost_price")}
                        leftElem={"₹"}
                    />

                    <Input
                        className="inventory-input"
                        label="Selling Price (SP)"
                        id={`selling_price_${batchData.id}`}
                        defaultValue={batchData.sellingPrice || "1234.00"}
                        leftElem={"₹"}
                        disabled={true}
                    />
                </div>

                <DataCell
                    className="flex total-price"
                    label={"Total CP: "}
                    data={batchData.totalCostPrice || "1234"}
                />
            </div>

            {/* Packaging & Stock Section */}
            <div className="date-wrapper">
                <h3>Date</h3>

                <div className="input-group">
                    <Input
                        className="inventory-input"
                        label="Manufacture Date (MFD)"
                        id={`date_manufacture_${batchData.id}`}
                        type="date"
                        defaultValue={formatDate(batchData.dateManufacture, "yyyy-mm-dd")}
                        onChange={controlledInput(setBatchData, "date_manufacture")}
                    />

                    <Input
                        className="inventory-input"
                        label="Expiry Date"
                        id={`date_expiry_${batchData.id}`}
                        type="date"
                        defaultValue={formatDate(batchData.dateExpiry, "yyyy-mm-dd")}
                        onChange={controlledInput(setBatchData, "date_expiry")}
                    />
                </div>

                <div className="flex">
                    <DataCell
                        label={"Received On"}
                        data={formatDate(batchData.dateReceived) || "Jan 01, 1970"}
                    />

                    <DataCell
                        label={"Last Updated"}
                        data={formatDate(batchData.dateUpdated) || "Jan 01, 1970"}
                    />
                </div>
            </div>


        </div>
    );
}

BatchTile.proptypes = {

}

export default BatchTile;