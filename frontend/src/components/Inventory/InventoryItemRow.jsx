import { sampleDataExpired, sampleDataExpiring, sampleDataInLoss, sampleDataLowStock, sampleDataNoProfit, sampleDataNormal, sampleDataOutOfStock } from "../../utils/data.js";
import { formatDate } from "../../utils/date.js";
import { extractCategoryStrings, getInventoryMetrics } from "../../utils/inventory.js";
import CTAButton from "../Button/CTAButton.jsx";
import Checkbox from "../Input/Checkbox.jsx";

const InventoryTableRow = ({ data }) => {

    // 🧪 Use this to switch which data you're testing
    data = sampleDataNormal;

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


    const expiryBadge = !isExpiringSoon && !isExpired && <span className="badge">Exp: {formatDate(data.expiry)}</span>;
    const expirySoonBadge = isExpiringSoon && <span className="badge">Expiring Soon: {formatDate(data.expiry)}</span>;
    const expiredBadge = isExpired && <span className="badge">Expired on: {formatDate(data.expiry)}</span>;
    const lowStockBadge = isLowStock && !isOutOfStock && <span className="badge">Low Stock</span>;
    const outOfStockBadge = isOutOfStock && <span className="badge">Out of Stock</span>;
    const inLossBadge = isInLoss && <span className="badge">Selling in Loss</span>;
    const noProfitBadge = isNoProfit && <span className="badge">No Profit</span>;

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
            <div className="cell selling-price">

                <p className="fs-500">
                    <span>₹ </span>
                    {data.unit_selling_price || "N/A"}
                    <span className="fs-300">/unit</span>
                </p>
                <p className="text-muted">
                    (Cost Price: ₹{data.unit_cost_price})
                </p>

            </div>

            {/* Available Quanity cell */}
            <div className="cell available-quantity">

                <p className="fs-500">{totalUnits} units
                </p>
                <p className="text-muted">
                    {data.quantity.units_per_pack > 1 && ` (${totalPacks} packs)`}
                </p>

            </div>

            {/* Expiry Date cell */}
            <div className="cell expiry">

                <p className="fs-400">{formatDate(data.expiry)}</p>
                <p className="text-muted">
                    ({formatDate(new Date(data.expiry) - new Date())})
                </p>


            </div>
        </div>
    )

}

export default InventoryTableRow;