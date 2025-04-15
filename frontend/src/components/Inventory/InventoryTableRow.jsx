import { formatDate } from "../../utils/date";

const InventoryTableRow = ({ data }) => {

    // ✅ Normal sample data
    const sampleDataNormal = {
        id: "prod_00123",
        name: "GlowSoft Herbal Shampoo",
        generic_name: "Herbal Hair Cleanser",
        brand: "GlowSoft",
        categories: [
            {
                type: "Personal Care",
                categories: {
                    Shampoo: ["Anti-dandruff", "Moisturizing"],
                    Conditioner: ["Damage Repair"]
                }
            },
            {
                type: "Baby Care",
                categories: {
                    Lotion: ["Body Lotion", "Sunscreen"]
                }
            }
        ],
        expiry: new Date("2025-12-31").getTime(),
        unit_selling_price: 149.99,
        unit_cost_price: 139.99,
        quantity: {
            units_per_pack: 2,
            total_packs: 50,
            reorder_level: 20
        }
    };

    // ⚠️ Expiring soon (within 30 days)
    const sampleDataExpiring = {
        ...sampleDataNormal,
        id: "prod_00124",
        name: "PureGlow Face Cream",
        expiry: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).getTime() // 25 days from now
    };

    // ❌ Expired product
    const sampleDataExpired = {
        ...sampleDataNormal,
        id: "prod_00125",
        name: "FreshMint Toothpaste",
        expiry: new Date("2023-11-01").getTime()
    };

    // ⚠️ Low stock (e.g., less than 10 packs)
    const sampleDataLowStock = {
        ...sampleDataNormal,
        id: "prod_00126",
        name: "CareSoft Hand Sanitizer",
        quantity: {
            units_per_pack: 1,
            total_packs: 5
        }
    };

    // ❌ Out of stock
    const sampleDataOutOfStock = {
        ...sampleDataNormal,
        id: "prod_00127",
        name: "SafeClean Surface Disinfectant",
        quantity: {
            units_per_pack: 1,
            total_packs: 0
        }
    };

    // 🔻 In loss (selling price < cost price)
    const sampleDataInLoss = {
        ...sampleDataNormal,
        id: "prod_00128",
        name: "HealQuick Pain Relief Gel",
        unit_cost_price: 100.00,
        unit_selling_price: 80.00
    };

    // ⚖️ No profit (selling price = cost price)
    const sampleDataNoProfit = {
        ...sampleDataNormal,
        id: "prod_00129",
        name: "NutriKids Vitamin Drops",
        unit_cost_price: 120.00,
        unit_selling_price: 120.00
    };

    // 🧪 Use this to switch which data you're testing
    data = sampleDataNormal;

    // Derivations
    const totalPacks = data.quantity.total_packs;
    const totalUnits = data.quantity.units_per_pack * totalPacks;

    const now = Date.now();
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

    const isExpired = data.expiry < now;
    const isExpiringSoon = !isExpired && (data.expiry - now <= THIRTY_DAYS);

    const isLowStock =
        data.quantity.reorder_level !== undefined
        && totalPacks <= data.quantity.reorder_level;
    const isOutOfStock = totalPacks === 0;

    const isInLoss = data.unit_selling_price < data.unit_cost_price;
    const isNoProfit = data.unit_selling_price === data.unit_cost_price;

    // ✅ Badges
    const expiryBadge = !isExpired ? (
        <span className="badge">Exp: {formatDate(data.expiry)}</span>
    ) : <></>;

    const expirySoonBadge = isExpiringSoon ? (
        <span className="badge">Expiring Soon: {formatDate(data.expiry)}</span>
    ) : <></>;

    const expiredBadge = isExpired ? (
        <span className="badge">Expired on: {formatDate(data.expiry)} </span>
    ) : <></>;

    const lowStockBadge = isLowStock && !isOutOfStock ? (
        <span className="badge">Low Stock</span>
    ) : <></>;

    const outOfStockBadge = isOutOfStock ? (
        <span className="badge">Out of Stock</span>
    ) : <></>;

    const inLossBadge = isInLoss ? (
        <span className="badge">Selling in Loss</span>
    ) : <></>;

    const noProfitBadge = isNoProfit ? (
        <span className="badge">No Profit</span>
    ) : <></>;


    return (
        <div className="inventory-table-row">
            {/* Columns for Mobile */}
            <div className="col col-left">
                {/* # ID cell */}
                <div className="cell id">
                    <p className="fs-200"># {data.id || "Unknown ID"}</p>
                </div>

                {/* Info cell */}
                <div className="cell info">
                    <p className="text-emphasis">{data.name || "Name not specified."}</p>
                    {
                        data.generic_name && <p className="text-italic">{data.generic_name}</p>
                    }
                    <p className="text-muted">{data.brand || "Unknown Brand"}</p>
                </div>

                {/* Category cell */}
                <div className="cell category">

                </div>
            </div>
            <div className="col col-right">
                {/* Price & Quantity cell */}
                <div className="cell prices quantity">
                    <p className="fs-500">
                        <span className="fs-200">₹ </span>
                        {data.unit_selling_price || "N/A"}
                        <span className="fs-300">/unit</span>
                    </p>

                    <div className="total-box">
                        <p className="text-muted">x {totalUnits} units
                            {
                                data.quantity.units_per_pack > 1 &&
                                ` (${data.quantity.total_packs} packs)`
                            }
                        </p>
                        <div className="divider"></div>
                        <p className="fs-400">
                            <span className="fs-200">₹ </span>
                            {totalUnits * data.unit_selling_price || "N/A"}
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
                </div>
            </div>
        </div>
    )

}

export default InventoryTableRow;