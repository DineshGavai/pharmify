import { sampleDataExpired, sampleDataExpiring, sampleDataInLoss, sampleDataLowStock, sampleDataNoProfit, sampleDataNormal, sampleDataOutOfStock } from "../../utils/data.js";
import Checkbox from "../Input/Checkbox.jsx";
import InventoryItemRow from "./InventoryItemRow";


const InventoryTable = ({ data }) => {

    return (
        <section className="inventory-table">
            {/* Header */}
            <header className="table-header">
                <div className="cell checkbox">
                    <Checkbox
                        id={"select_all"}
                        name={"select_all"}
                    />
                </div>
                <div className="cell info">
                    Name & Brand
                </div>
                <div className="cell category">
                    Category
                </div>
                <div className="cell price">
                    Price
                </div>
                <div className="cell available-quantity">
                    Available Quantity
                </div>
                <div className="cell expiry">
                    Expiry
                </div>
                <div className="cell expand">
                    View
                </div>
            </header>


            {/* ROWS */}
            <div className="table-content">
                <InventoryItemRow data={sampleDataNormal} />
                <InventoryItemRow data={sampleDataExpired} />
                <InventoryItemRow data={sampleDataExpiring} />
                <InventoryItemRow data={sampleDataInLoss} />
                <InventoryItemRow data={sampleDataLowStock} />
                <InventoryItemRow data={sampleDataNoProfit} />
                <InventoryItemRow data={sampleDataOutOfStock} />
            </div>

        </section>
    )


}

export default InventoryTable;