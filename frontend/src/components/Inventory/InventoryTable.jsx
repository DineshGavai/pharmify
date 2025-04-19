import { useEffect } from "react";
import { exampleInventoryList } from "../../utils/data.js";
import Checkbox from "../Input/Checkbox.jsx";
import InventoryItemRow from "./InventoryItemRow";


const InventoryTable = ({ data }) => {

    return (
        <table className="inventory-table">
            {/* Header */}
            <thead className="table-header">
                <tr>
                    <th className="cell checkbox">
                        <Checkbox
                            id={"select_all"}
                            name={"select_all"}
                        />
                    </th>
                    <th className="cell info">
                        Name & Brand
                    </th>
                    <th className="cell category">
                        Category
                    </th>
                    <th className="cell price">
                        Price
                    </th>
                    <th className="cell available-quantity">
                        Available Quantity
                    </th>
                    <th className="cell expiry">
                        Expiry
                    </th>
                    <th className="cell expand">
                        View
                    </th>
                </tr>
            </thead>


            {/* ROWS */}
            <tbody className="table-content">

                {
                    exampleInventoryList?.map((item, i) => (
                        <InventoryItemRow data={item} key={i} />
                    ))
                }

                <tr className="padding-row">
                    <td></td>
                </tr>
            </tbody>

        </table>
    )


}

export default InventoryTable;