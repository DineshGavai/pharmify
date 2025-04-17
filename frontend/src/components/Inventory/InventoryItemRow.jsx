import { sampleDataExpired, sampleDataExpiring, sampleDataInLoss, sampleDataLowStock, sampleDataNoProfit, sampleDataNormal, sampleDataOutOfStock } from "../../utils/data.js";
import { formatDate, getTimeDifferenceLong, getTimeDifferenceShort } from "../../utils/date.js";
import { extractCategoryStrings, getInventoryMetrics } from "../../utils/inventory.js";
import CTAButton from "../Button/CTAButton.jsx";
import Checkbox from "../Input/Checkbox.jsx";
import IconButton from "../Button/IconButton.jsx";

const InventoryItemRow = ({ data }) => {

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

    return (
        <div className="inventory-item row">
            <div className="cell checkbox">
                <Checkbox
                    id="checkbox_1"
                    name="checkboxes"
                />
            </div>

            {/* Info cell */}
            <div className="cell info">
                <div>
                    <p className="fs-200 text-muted id"># {data.id || "Unknown ID"}</p>
                    <p className="text-emphasis name">{data.name || "Name not specified."}</p>
                    {
                        data.generic_name && <p className="generic-name">{data.generic_name}</p>
                    }
                    <p className="text-muted brand">by {data.brand || "Unknown Brand"}</p>
                </div>
            </div>

            {/* Category cell */}
            <div className="cell category">
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
            </div>

            {/* Selling Price cell */}
            <div className="cell price">

                <p className="fs-500">
                    <span>₹ </span>
                    {data.unit_selling_price || "N/A"}
                    <span className="fs-300">/unit</span>
                </p>
                <p className="text-muted">(Cost: ₹{data.unit_cost_price}/unit)</p>
                {isInLoss && inLossBadge}
                {isNoProfit && noProfitBadge}

            </div>

            {/* Available Quanity cell */}
            <div className="cell available-quantity">

                <p className="fs-500">
                    {totalUnits || "0"}
                    <span className="fs-300"> unit{!(totalUnits == 1) && `s`}</span>
                </p>
                <p className="text-muted">
                    {data.quantity.units_per_pack > 1 && ` (${totalPacks} pack${!(totalUnits == 1) ? "s" : ""})`}
                </p>

                {isLowStock && !isOutOfStock && lowStockBadge}
                {isOutOfStock && outOfStockBadge}

            </div>

            {/* Expiry Date cell */}
            <div className="cell expiry">
                <p className="fs-400">{formatDate(data.expiry, "mm/yy")}</p>
                {
                    (!isExpiringSoon && !isExpired) && <p className="text-muted">({expiryRemainingTime} left)</p>
                }
                {(isExpiringSoon && !isExpired) && expirySoonBadge}
                {isExpired && expiredBadge}
            </div>

            {/* Expand Btn cell */}
            <div className="cell expand">
                <IconButton
                    iconName={"arrow_right"}
                    className="row-expand-btn"
                />
            </div>
        </div>
    )

}

export default InventoryItemRow;