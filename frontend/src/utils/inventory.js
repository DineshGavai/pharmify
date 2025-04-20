import { formatDate } from "./date";

// Convert the categories into "type / category / subcategory, ..." format
export const extractCategoryStrings = (categories) => {
    const result = [];

    categories.forEach(group => {
        const type = group.type;
        const categories = group.categories;

        Object.entries(categories).forEach(([category, subcategories]) => {
            subcategories.forEach(sub => {
                result.push(`${type} / ${category} / ${sub}`);
            });
        });
    });

    return result;
};

export const getInventoryMetrics = (data) => {
    const now = Date.now();
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

    const totalPacks = data.quantity.total_packs;
    const totalUnits = data.quantity.units_per_pack * totalPacks;

    const isExpired = data.expiry < now;
    const isExpiringSoon = !isExpired && (data.expiry - now <= THIRTY_DAYS);
    const isLowStock = data.quantity.reorder_level !== undefined && totalPacks <= data.quantity.reorder_level;
    const isOutOfStock = totalPacks === 0;
    const isInLoss = data.unit_selling_price < data.unit_cost_price;
    const isNoProfit = data.unit_selling_price === data.unit_cost_price;

    return {
        totalPacks,
        totalUnits,
        isExpired,
        isExpiringSoon,
        isLowStock,
        isOutOfStock,
        isInLoss,
        isNoProfit
    };
}

export const controlledInput = (setter, key_name) => (e) => {
    const value = e.target.value; // capture the value immediately
    setter((data) => ({
        ...data,
        [key_name]: value,
    }));
};