import { formatDate, getTimeDifferenceLong, getTimeDifferenceShort } from "../../utils/date.js";
import { extractCategoryStrings, getInventoryMetrics } from "../../utils/inventory.js";
import { saveToLocalStorage } from "../../utils/browserStorage.js"
import { useNavigate } from "react-router-dom";
import CTAButton from "../Button/CTAButton.jsx";
import Checkbox from "../Input/Checkbox.jsx";
import IconButton from "../Button/IconButton.jsx";
import { useEffect, useState } from "react";

const InventoryItemRow = ({ data }) => {

    const navigate = useNavigate();

    const {
        totalPacks,
        totalUnits,
        isExpired,
        isExpiringSoon,
        isLowStock,
        isOutOfStock,
        isInLoss,
        isNoProfit
    } = getInventoryMetrics(data);


    const expiryRemainingTime = getTimeDifferenceShort(new Date(), data.expiry)


    const expirySoonBadge = <span className="badge">Only {expiryRemainingTime} left</span>;
    const expiredBadge = <span className="badge">Expired</span>;
    const lowStockBadge = <span className="badge">Low Stock</span>;
    const outOfStockBadge = <span className="badge">Out of Stock</span>;
    const inLossBadge = <span className="badge">Selling in Loss</span>;
    const noProfitBadge = <span className="badge">No Profit</span>;

    const [checkedItems, setCheckedItems] = useState([]);

    const handleCheckboxChange = (id) => {
        setCheckedItems((prev) =>
            prev.includes(id)
                ? prev.filter((itemId) => itemId !== id)
                : [...prev, id]
        );
    };

    return (
        <tr className="inventory-item row">
            <td className="cell checkbox">
                <Checkbox
                    id={`checkbox_${data.id}`}
                    name="checkboxes"
                    checked={checkedItems.includes(data.id) || false}
                    onChange={(e) => handleCheckboxChange(data.id)}
                />
            </td>

            {/* Info cell */}
            <td className="cell info">
                <div>
                    <p className="fs-200 text-muted id"># {data.id || "Unknown ID"}</p>
                    <p className="text-emphasis name">{data.name || "Name not specified."}</p>
                    {
                        data.generic_name && <p className="generic-name">{data.generic_name}</p>
                    }
                    <p className="text-muted brand text-emphasis">by {data.brand || "Unknown Brand"}</p>
                </div>
            </td>

            {/* Category cell */}
            <td className="cell category">
                <CTAButton
                    label={
                        <div>
                            {extractCategoryStrings(data.categories).join(", ")}
                        </div>
                    }
                    className="text"
                    iconName="chevron_down"
                    rightIcon={true}
                />
            </td>

            {/* Selling Price cell */}
            <td className="cell price">

                <p className="fs-500">
                    <span>₹ </span>
                    {data.unit_selling_price || "N/A"}
                    <span className="fs-300">/unit</span>
                </p>
                <p className="text-muted">Cost: ₹{data.unit_cost_price}/unit</p>
                {isInLoss && inLossBadge}
                {isNoProfit && noProfitBadge}

            </td>

            {/* Available Quanity cell */}
            <td className="cell available-quantity">

                <p className="fs-500">
                    {totalUnits ?? "N/A"}
                    <span className="fs-300"> unit{!(totalUnits == 1) && `s`}</span>
                </p>
                <p className="text-muted">
                    {data.quantity.units_per_pack > 1 && ` (${totalPacks} pack${!(totalUnits == 1) ? "s" : ""})`}
                </p>

                {isLowStock && !isOutOfStock && lowStockBadge}
                {isOutOfStock && outOfStockBadge}

            </td>

            {/* Expiry Date cell */}
            <td className="cell expiry">
                <p className="fs-400">{formatDate(data.expiry, "mm/yy")}</p>
                {
                    (!isExpiringSoon && !isExpired) && <p className="text-muted">{expiryRemainingTime} left</p>
                }
                {(isExpiringSoon && !isExpired) && expirySoonBadge}
                {isExpired && expiredBadge}
            </td>

            {/* Expand Btn cell */}
            <td className="cell expand">
                <IconButton
                    iconName={"arrow_right"}
                    className="row-expand-btn"
                    onClick={() => {
                        saveToLocalStorage("viewed_product", data)
                        navigate("/inventory/product")
                    }}
                />
            </td>
        </tr>
    )

}

export default InventoryItemRow;