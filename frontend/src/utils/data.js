export const regexPatterns = {
    "full_name": /([A-Za-z]+){2,}\s+([A-Za-z]+)(?:\s+([A-Za-z]+){2,})?$/,
    "business_name": /^[.@&]?[a-zA-Z0-9]+[\!\.\@\&\(\)]?[a-zA-Z0-9!\(\)]+/,
    "phone": /^\d{10}$/,
    "email": /^([a-zA-Z0-9._%\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})$/,
    "password": /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
}

// ✅ Normal sample data
export const sampleDataNormal = {
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
export const sampleDataExpiring = {
    ...sampleDataNormal,
    id: "prod_00124",
    name: "PureGlow Face Cream",
    expiry: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).getTime() // 25 days from now
};

// ❌ Expired product
export const sampleDataExpired = {
    ...sampleDataNormal,
    id: "prod_00125",
    name: "FreshMint Toothpaste",
    expiry: new Date("2023-11-01").getTime()
};

// ⚠️ Low stock (e.g., less than 10 packs)
export const sampleDataLowStock = {
    ...sampleDataNormal,
    id: "prod_00126",
    name: "CareSoft Hand Sanitizer",
    quantity: {
        units_per_pack: 1,
        total_packs: 5,
        reorder_level: 10
    }
};

// ❌ Out of stock
export const sampleDataOutOfStock = {
    ...sampleDataNormal,
    id: "prod_00127",
    name: "SafeClean Surface Disinfectant",
    quantity: {
        units_per_pack: 1,
        total_packs: 0
    }
};

// 🔻 In loss (selling price < cost price)
export const sampleDataInLoss = {
    ...sampleDataNormal,
    id: "prod_00128",
    name: "HealQuick Pain Relief Gel",
    unit_cost_price: 100.00,
    unit_selling_price: 80.00
};

// ⚖️ No profit (selling price = cost price)
export const sampleDataNoProfit = {
    ...sampleDataNormal,
    id: "prod_00129",
    name: "NutriKids Vitamin Drops",
    unit_cost_price: 120.00,
    unit_selling_price: 120.00
};
