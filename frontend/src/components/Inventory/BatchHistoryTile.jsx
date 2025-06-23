import PropTypes from "prop-types";
import Input, { controlledInput } from "../Input/Input"
import { useEffect, useState } from "react";
import Icon from "../Icon";
import IconButton from "../Button/IconButton";
import DataCell from "../DataCell";


const BatchHistoryTile = () => {
    const [batchData, setBatchData] = useState({})

    return (
        <div className="batch-summary-tile">
            {/* Header */}
            <header className="flex sp-btw">
                <div className="flex">

                    <Input
                        label="Batch"
                        id={"batch_summary_id"}
                        className="batch-id flex bottom-border"
                        leftElem={"#"}
                        value={batchData.id}
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
            <div className="packaging-wrapper">
                <h3>Packaging & Stock</h3>

                <div className="packaging-hierarchy"></div>

                <DataCell
                    className="flex total-units"
                    label={"Total Units: "}
                    data={batchData.total_units || "1234"}
                />

                <div className="input-group">
                    <Input
                        label="Reserved Units"
                        id="units_reserved"
                        value={batchData.units_reserved}
                        onChange={controlledInput(setBatchData, "units_reserved")}
                    />

                    <Input
                        label="Available Units"
                        id="units_available"
                        value={batchData.units_available}
                        disabled={true}
                    />

                </div>
            </div>

            {/* Pricing Section */}
            <div className="pricing-wrapper">
                <h3>Pricing</h3>

                <Input
                    label="Supplier"
                    id="supplier"
                    value={batchData.supplier}
                    onChange={controlledInput(setBatchData, "supplier")}
                    rightElem={<Icon iconName={"chevron_down"} />}
                />

                <div className="input-group">


                    <Input
                        label="Cost Price (CP)"
                        id="cost_price"
                        defaultValue={batchData.cost_price}
                        onChange={controlledInput(setBatchData, "cost_price")}
                        leftElem={"₹"}
                    />

                    <Input
                        label="Selling Price (SP)"
                        id="selling_price"
                        defaultValue={batchData.selling_price || "1234.00"}
                        leftElem={"₹"}
                        disabled={true}
                    />
                </div>

                <DataCell
                    className="flex total-price"
                    label={"Total CP: "}
                    data={batchData.total_price || "1234"}
                />
            </div>

            {/* Packaging & Stock Section */}
            <div className="date-wrapper">
                <h3>Date</h3>

                <div className="input-group">
                    <Input
                        label="Manufacture Date (MFD)"
                        id="date_manufacture"
                        type="date"
                        value={batchData.date_manufacture}
                        onChange={controlledInput(setBatchData, "date_manufacture")}
                    />

                    <Input
                        label="Expiry Date"
                        id="date_expiry"
                        type="date"
                        value={batchData.date_expiry}
                        onChange={controlledInput(setBatchData, "date_expiry")}
                    />
                </div>

                <div className="flex">
                    <DataCell
                        label={"Received On"}
                        data={batchData.date_received || "Jan 01, 1970"}
                    />

                    <DataCell
                        label={"Last Updated"}
                        data={batchData.date_updated || "Jan 01, 1970"}
                    />
                </div>
            </div>


        </div>
    );
}

BatchHistoryTile.proptypes = {

}

export default BatchHistoryTile;