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
      total_packs: 0,
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
    name: "Diclofenac Sodium Gel",
    generic_name: "Diclofenac",
    brand: "Mankind Pharma",
    categories: [
      {
        type: "Medicines",
        categories: {
          "Pain Relief": ["Topical", "NSAID"]
        }
      }
    ],
    expiry: new Date("2024-05-10").getTime(),
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
    name: "Vitamin B Complex",
    brand: "Generic",
    categories: [
      {
        type: "Health Supplements",
        categories: {
          Tablets: ["Energy", "Immunity", "Daily Supplement"]
        }
      },
      {
        type: "Medicines",
        categories: {
          "Prescription": ["Vitamin Deficiency", "Nutritional Support"]
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
    name: "Metformin HCl 500mg",
    brand: "Generic",
    categories: [
      {
        type: "Medicines",
        categories: {
          "Prescription": ["Diabetes", "Blood Sugar Control"]
        }
      }
    ],
    expiry: new Date("2025-07-07").getTime(),
    unit_selling_price: 120.0,
    unit_cost_price: 95.0,
    quantity: {
      units_per_pack: 100,
      total_packs: 2,
      reorder_level: 5
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
  },
  {
    id: "prod_00133",
    name: "Amoxicillin 250mg",
    brand: "Generic",
    categories: [
      {
        type: "Medicines",
        categories: {
          Antibiotics: ["Penicillin", "Broad Spectrum"]
        }
      }
    ],
    expiry: new Date("2024-12-15").getTime(),
    unit_selling_price: 249.99,
    unit_cost_price: 199.99,
    quantity: {
      units_per_pack: 20,
      total_packs: 15,
      reorder_level: 10
    }
  },
  {
    id: "prod_00134",
    name: "Himalayan Herbal Tea",
    brand: "NatureTea",
    categories: [
      {
        type: "Beverages",
        categories: {
          Tea: ["Herbal", "Caffeine Free", "Digestive"]
        }
      },
      {
        type: "Health Supplements",
        categories: {
          "Herbal Remedies": ["Digestive Health", "Relaxation"]
        }
      }
    ],
    expiry: new Date("2026-03-25").getTime(),
    unit_selling_price: 179.50,
    unit_cost_price: 120.75,
    quantity: {
      units_per_pack: 25,
      total_packs: 18,
      reorder_level: 8
    }
  },
  {
    id: "prod_00135",
    name: "Surgical Mask N95",
    brand: "SafeBreath",
    categories: [
      {
        type: "Medical Equipment",
        categories: {
          "Protective Gear": ["Respiratory", "Disposable", "Medical Grade"]
        }
      }
    ],
    expiry: new Date("2027-10-10").getTime(),
    unit_selling_price: 49.99,
    unit_cost_price: 29.99,
    quantity: {
      units_per_pack: 10,
      total_packs: 200,
      reorder_level: 50
    }
  },
  {
    id: "prod_00136",
    name: "Digital Thermometer",
    brand: "MediTech",
    categories: [
      {
        type: "Medical Equipment",
        categories: {
          "Diagnostic": ["Temperature", "Digital", "Home Use"]
        }
      }
    ],
    expiry: null,
    unit_selling_price: 399.00,
    unit_cost_price: 275.50,
    quantity: {
      units_per_pack: 1,
      total_packs: 35,
      reorder_level: 15
    }
  },
  {
    id: "prod_00137",
    name: "Atorvastatin 10mg",
    brand: "Generic",
    categories: [
      {
        type: "Medicines",
        categories: {
          "Prescription": ["Cholesterol", "Cardiovascular"]
        }
      }
    ],
    expiry: new Date("2025-01-31").getTime(),
    unit_selling_price: 149.99,
    unit_cost_price: 89.99,
    quantity: {
      units_per_pack: 30,
      total_packs: 25,
      reorder_level: 10
    }
  },
  {
    id: "prod_00138",
    name: "Organic Coconut Oil",
    brand: "PureNature",
    categories: [
      {
        type: "Personal Care",
        categories: {
          "Hair Care": ["Oil", "Natural", "Moisturizing"]
        }
      },
      {
        type: "Dietary Products",
        categories: {
          "Edible Oils": ["Organic", "Cold Pressed"]
        }
      }
    ],
    expiry: new Date("2026-08-20").getTime(),
    unit_selling_price: 299.99,
    unit_cost_price: 210.00,
    quantity: {
      units_per_pack: 1,
      total_packs: 8,
      reorder_level: 15
    }
  },
  {
    id: "prod_00139",
    name: "Blood Glucose Monitor",
    brand: "DiaCare",
    categories: [
      {
        type: "Medical Equipment",
        categories: {
          "Diagnostic": ["Diabetes", "Home Monitoring", "Electronic"]
        }
      }
    ],
    expiry: null,
    unit_selling_price: 1299.99,
    unit_cost_price: 899.99,
    quantity: {
      units_per_pack: 1,
      total_packs: 12,
      reorder_level: 5
    }
  },
  {
    id: "prod_00140",
    name: "Glucose Test Strips",
    brand: "DiaCare",
    categories: [
      {
        type: "Medical Equipment",
        categories: {
          "Consumables": ["Diabetes", "Testing", "Disposable"]
        }
      }
    ],
    expiry: new Date("2025-09-15").getTime(),
    unit_selling_price: 599.99,
    unit_cost_price: 420.00,
    quantity: {
      units_per_pack: 50,
      total_packs: 0,
      reorder_level: 20
    }
  },
  {
    id: "prod_00141",
    name: "Paracetamol 500mg",
    brand: "Generic",
    categories: [
      {
        type: "Medicines",
        categories: {
          "Over-the-counter": ["Pain Relief", "Fever", "Antipyretic"]
        }
      }
    ],
    expiry: new Date("2026-04-30").getTime(),
    unit_selling_price: 39.99,
    unit_cost_price: 20.00,
    quantity: {
      units_per_pack: 10,
      total_packs: 150,
      reorder_level: 40
    }
  },
  {
    id: "prod_00142",
    name: "Premium First Aid Kit",
    brand: "MediAssist",
    categories: [
      {
        type: "Medical Equipment",
        categories: {
          "Emergency": ["First Aid", "Comprehensive"]
        }
      },
      {
        type: "Home Hygiene",
        categories: {
          "Safety": ["Emergency", "Family Care"]
        }
      }
    ],
    expiry: new Date("2028-12-31").getTime(),
    unit_selling_price: 999.00,
    unit_cost_price: 750.00,
    quantity: {
      units_per_pack: 1,
      total_packs: 25,
      reorder_level: 10
    }
  },
  {
    id: "prod_00143",
    name: "Vegan Protein Bar",
    brand: "GreenFit",
    categories: [
      {
        type: "Health Supplements",
        categories: {
          "Nutrition Bars": ["Vegan", "High Protein", "Low Sugar"]
        }
      },
      {
        type: "Dietary Products",
        categories: {
          "Specialty Foods": ["Plant-Based", "Fitness", "Snacks"]
        }
      }
    ],
    expiry: new Date("2024-08-15").getTime(),
    unit_selling_price: 89.99,
    unit_cost_price: 65.00,
    quantity: {
      units_per_pack: 12,
      total_packs: 30,
      reorder_level: 20
    }
  },
  {
    id: "prod_00144",
    name: "Salbutamol Inhaler",
    brand: "Generic",
    categories: [
      {
        type: "Medicines",
        categories: {
          "Prescription": ["Respiratory", "Asthma", "Bronchodilator"]
        }
      }
    ],
    expiry: new Date("2025-11-20").getTime(),
    unit_selling_price: 189.99,
    unit_cost_price: 150.00,
    quantity: {
      units_per_pack: 1,
      total_packs: 5,
      reorder_level: 10
    }
  },
  {
    id: "prod_00145",
    name: "Derma Moisturizing Lotion",
    brand: "DermaCalm",
    categories: [
      {
        type: "Personal Care",
        categories: {
          "Skin Care": ["Moisturizer", "Sensitive Skin", "Hypoallergenic"]
        }
      },
      {
        type: "Medicines",
        categories: {
          "Dermatological": ["Dry Skin", "Eczema Relief"]
        }
      }
    ],
    expiry: new Date("2026-02-28").getTime(),
    unit_selling_price: 249.99,
    unit_cost_price: 180.00,
    quantity: {
      units_per_pack: 1,
      total_packs: 48,
      reorder_level: 15
    }
  },
  {
    id: "prod_00456",
    name: "HealthGuard Wellness Kit",
    brand: "HealthGuard",
    categories: [
      {
        type: "Personal Care",
        categories: {
          Shampoo: ["Anti-dandruff", "Herbal", "Daily Use"],
          Soap: ["Aloe Vera", "Antibacterial"]
        }
      },
      {
        type: "Medical Equipment",
        categories: {
          "Thermometer": ["Digital", "Infrared"],
          "BP Monitor": ["Automatic", "Manual"]
        }
      },
      {
        type: "Wellness",
        categories: {
          Supplements: ["Vitamin C", "Zinc", "Multivitamins"],
          "Health Drinks": ["Protein Shake", "Electrolyte Boost"]
        }
      }
    ],
    expiry: new Date("2026-06-30").getTime(),
    unit_selling_price: 1999.99,
    unit_cost_price: 1499.49,
    quantity: {
      units_per_pack: 1,
      total_packs: 15,
      reorder_level: 5
    }
  }
];