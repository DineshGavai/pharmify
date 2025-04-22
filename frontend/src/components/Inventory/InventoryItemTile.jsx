import { useNavigate } from "react-router-dom";
import { saveToLocalStorage } from "../../utils/browserStorage.js";
import { formatDate } from "../../utils/date.js";
import { extractCategoryStrings, getInventoryMetrics } from "../../utils/inventory.js";
import CTAButton from "../Button/CTAButton.jsx";
import IconButton from "../Button/IconButton.jsx";

const InventoryItemTile = ({ data, className }) => {

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


    const expiryBadge = !isExpiringSoon && !isExpired && <span className="badge">Exp: {formatDate(data.expiry)}</span>;
    const expirySoonBadge = isExpiringSoon && <span className="badge">Expiring on: {formatDate(data.expiry)}</span>;
    const expiredBadge = isExpired && <span className="badge">Expired on: {formatDate(data.expiry)}</span>;
    const lowStockBadge = isLowStock && !isOutOfStock && <span className="badge">Low Stock</span>;
    const outOfStockBadge = isOutOfStock && <span className="badge">Out of Stock</span>;
    const inLossBadge = isInLoss && <span className="badge">Selling in Loss</span>;
    const noProfitBadge = isNoProfit && <span className="badge">No Profit</span>;

    return (
        <div className={`inventory-item tile ${className}`}>
            {/* # ID cell */}
            <div className="cell id">
                <p className="fs-200 text-muted"># {data.id || "Unknown ID"}</p>
            </div>
            {/* Columns for Mobile */}
            <div className="col col-left">

                {/* Info cell */}
                <div className="cell info">
                    <p className="text-emphasis name">{data.name || "Name not specified."}</p>
                    {
                        data.generic_name && <p className="generic-name">{data.generic_name}</p>
                    }
                    <p className="text-muted brand">by {data.brand || "Unknown Brand"}</p>
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
            </div>

            <div className="col col-right">
                {/* Price & Quantity cell */}
                <div className="cell prices quantity">
                    <p className="fs-500 text-emphasis">
                        <span>₹ </span>
                        {data.unit_selling_price || "N/A"}
                        <span className="fs-300">/unit</span>
                    </p>

                    <div className="total-box">
                        <p className="text-muted">x {totalUnits} units
                            {
                                data.quantity.units_per_pack > 1 &&
                                ` (${totalPacks} packs)`
                            }
                        </p>
                        <div className="divider"></div>
                        <p className="fs-300">
                            <span>₹ </span>
                            {data.unit_selling_price ? (totalUnits * data.unit_selling_price) : "N/A"}
                            <span> Total</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="base">
                {expiryBadge}
                {expirySoonBadge}
                {expiredBadge}
                <div>
                    {lowStockBadge}
                    {outOfStockBadge}
                    {noProfitBadge}
                    {inLossBadge}
                    <IconButton
                        iconName={"arrow_right"}
                        className="navigate-btn"
                        onClick={() => {
                            saveToLocalStorage("viewed_product", data)
                            navigate("/inventory/product")
                        }}
                    />
                </div>
            </div>
        </div>
    )

}

export default InventoryItemTile;