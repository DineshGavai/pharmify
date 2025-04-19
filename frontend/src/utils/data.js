export const regexPatterns = {
    "full_name": /([A-Za-z]+){2,}\s+([A-Za-z]+)(?:\s+([A-Za-z]+){2,})?$/,
    "business_name": /^[.@&]?[a-zA-Z0-9]+[\!\.\@\&\(\)]?[a-zA-Z0-9!\(\)]+/,
    "phone": /^\d{10}$/,
    "email": /^([a-zA-Z0-9._%\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})$/,
    "password": /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
}

export const exampleInventoryList = [
    {
      id: "prod_00123",
      name: "GlowSoft Herbal Shampoo",
      brand: "GlowSoft",
      categories: [
        {
          type: "Personal Care",
          categories: {
            Shampoo: ["Anti-dandruff", "Moisturizing"]
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
    },
    {
      id: "prod_00124",
      name: "NutriGain Protein Powder",
      brand: "NutriPlus",
      categories: [
        {
          type: "Health Supplements",
          categories: {
            "Protein Powder": ["Weight Gain", "Post Workout"]
          }
        }
      ],
      expiry: new Date("2026-06-15").getTime(),
      unit_selling_price: 499.0,
      unit_cost_price: 450.0,
      quantity: {
        units_per_pack: 1,
        total_packs: 25,
        reorder_level: 10
      }
    },
    {
      id: "prod_00125",
      name: "BabyCare Wipes",
      brand: "Softies",
      categories: [
        {
          type: "Baby Care",
          categories: {
            Wipes: ["Aloe Vera", "Unscented"]
          }
        }
      ],
      expiry: new Date("2025-08-01").getTime(),
      unit_selling_price: 89.5,
      unit_cost_price: 75.0,
      quantity: {
        units_per_pack: 3,
        total_packs: 100,
        reorder_level: 30
      }
    },
    {
      id: "prod_00126",
      name: "PainRelief Balm",
      brand: "HealWell",
      categories: [
        {
          type: "Medicines",
          categories: {
            Balm: ["Joint Pain", "Headache"]
          }
        }
      ],
      expiry: new Date("2024-10-10").getTime(),
      unit_selling_price: 59.0,
      unit_cost_price: 45.0,
      quantity: {
        units_per_pack: 1,
        total_packs: 5,
        reorder_level: 10
      }
    },
    {
      id: "prod_00127",
      name: "EnergyBoost Tablets",
      brand: "PowerPlus",
      categories: [
        {
          type: "Health Supplements",
          categories: {
            Tablets: ["Energy", "Immunity"]
          }
        }
      ],
      expiry: new Date("2027-01-20").getTime(),
      unit_selling_price: 299.0,
      unit_cost_price: 260.0,
      quantity: {
        units_per_pack: 1,
        total_packs: 80,
        reorder_level: 25
      }
    },
    {
      id: "prod_00128",
      name: "DailyFresh Toothpaste",
      brand: "SmileBright",
      categories: [
        {
          type: "Oral Care",
          categories: {
            Toothpaste: ["Whitening", "Fluoride Free"]
          }
        }
      ],
      expiry: new Date("2026-11-11").getTime(),
      unit_selling_price: 69.0,
      unit_cost_price: 50.0,
      quantity: {
        units_per_pack: 2,
        total_packs: 40,
        reorder_level: 15
      }
    },
    {
      id: "prod_00129",
      name: "AquaGlow Face Cream",
      brand: "SkinNova",
      categories: [
        {
          type: "Personal Care",
          categories: {
            Cream: ["Hydrating", "Day Cream"]
          }
        }
      ],
      expiry: new Date("2025-03-15").getTime(),
      unit_selling_price: 199.0,
      unit_cost_price: 170.0,
      quantity: {
        units_per_pack: 1,
        total_packs: 0,
        reorder_level: 10
      }
    },
    {
      id: "prod_00130",
      name: "FreshMask Face Mask",
      brand: "PureSkin",
      categories: [
        {
          type: "Personal Care",
          categories: {
            Mask: ["Clay", "Acne Control"]
          }
        }
      ],
      expiry: new Date("2025-07-07").getTime(),
      unit_selling_price: 120.0,
      unit_cost_price: 95.0,
      quantity: {
        units_per_pack: 1,
        total_packs: 60,
        reorder_level: 25
      }
    },
    {
      id: "prod_00131",
      name: "KidzMultivitamin Gummies",
      brand: "TinyTots",
      categories: [
        {
          type: "Baby Care",
          categories: {
            Supplements: ["Multivitamins", "Gummies"]
          }
        }
      ],
      expiry: new Date("2026-09-30").getTime(),
      unit_selling_price: 350.0,
      unit_cost_price: 310.0,
      quantity: {
        units_per_pack: 1,
        total_packs: 45,
        reorder_level: 20
      }
    },
    {
      id: "prod_00132",
      name: "GentleWash Hand Wash",
      brand: "CleanTouch",
      categories: [
        {
          type: "Home Hygiene",
          categories: {
            Liquid: ["Anti-bacterial", "Moisturizing"]
          }
        }
      ],
      expiry: new Date("2025-06-18").getTime(),
      unit_selling_price: 99.0,
      unit_cost_price: 80.0,
      quantity: {
        units_per_pack: 2,
        total_packs: 120,
        reorder_level: 40
      }
    }
  ];
  