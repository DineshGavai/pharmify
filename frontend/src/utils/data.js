export const regexPatterns = {
  "full_name": /([A-Za-z]+){2,}\s+([A-Za-z]+)(?:\s+([A-Za-z]+){2,})?$/,
  "business_name": /^[.@&]?[a-zA-Z0-9]+[\!\.\@\&\(\)]?[a-zA-Z0-9!\(\)]+/,
  "phone": /^\d{10}$/,
  "email": /^([a-zA-Z0-9._%\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})$/,
  "password": /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
}

export const exampleSupplierData = [
  {
    id: 1,
    name: "Medilife Pharma Pvt Ltd",
    contact_person: "Anita Sharma",
    phone: "+91 98230 12345",
    email: "contact@medilifepharma.in",
    address: "A-12, Industrial Estate, Hinjewadi",
    city: "Pune",
    state: "Maharashtra",
    country: "India"
  },
  {
    id: 2,
    name: "Greenleaf Distributors",
    phone: "+91 98111 66789",
    email: "support@greenleaf.in",
    address: "Plot 44, Sector 3, IMT",
    city: "Manesar",
    state: "Haryana",
    country: "India"
  },
  {
    id: 3,
    name: "MaxCure Supplies",
    email: "sales@maxcurehealth.com",
    address: "21/A Health Street, Bannerghatta Road",
    city: "Bangalore",
    state: "Karnataka",
    country: "India"
  },
  {
    id: 4,
    name: "Zenith Medicals",
    contact_person: "Rahul Kapoor",
    phone: "+91 99777 44221",
    address: "9th Floor, Empire Towers",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India"
  },
  {
    id: 5,
    name: "NeoGen Pharma",
    phone: "+91 98980 10101",
    email: "info@neogenpharma.com",
    address: "Plot 12, Biotech Park",
    city: "Hyderabad",
    state: "Telangana",
    country: "India"
  },
  {
    id: 6,
    name: "Aster Lifecare",
    contact_person: "Sneha Iyer",
    phone: "+91 91001 88877",
    email: "sneha@asterlifecare.com",
    address: "Building 3, Kurla West",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India"
  },
  {
    id: 7,
    name: "Biosure Distributors",
    email: "hello@biosure.in",
    address: "Unit 5, Science Zone, SIDCO",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India"
  },
  {
    id: 8,
    name: "CareWay Medsolutions",
    contact_person: "Vikram Desai",
    phone: "+91 93456 78901",
    address: "Shop 7, Central Plaza",
    city: "Indore",
    state: "Madhya Pradesh",
    country: "India"
  },
  {
    id: 9,
    name: "LifeTrack Agencies",
    phone: "+91 88888 23456",
    email: "contact@lifetrack.in",
    address: "K-88, Commercial Complex",
    city: "Kolkata",
    state: "West Bengal",
    country: "India"
  },
  {
    id: 10,
    name: "Truvita Wholesale",
    email: "admin@truvita.co.in",
    address: "Warehouse No. 6, MIDC Area",
    city: "Nagpur",
    state: "Maharashtra",
    country: "India"
  }
];


export const exampleBatchData = [
  {
    id: "BTC18787",
    version: "v7",
    levels: [
      { name: "Carton", units: 5 },
      { name: "Box", units: 10 },
      { name: "Strip", units: 32 },
      { name: "Tablet", units: 10 }
    ],
    totalUnits: 16000,
    unitsAvailable: 15240,
    unitsReserved: 760,
    supplier: "PharmaTech Ltd",
    costPrice: 12.50,
    sellingPrice: 18.75,
    totalCostPrice: 200000.00,
    dateManufacture: Date.now() - (365 * 24 * 60 * 60 * 1000), // 1 year ago
    dateExpiry: Date.now() + (180 * 24 * 60 * 60 * 1000),      // 6 months from now
    dateReceived: Date.now() - (120 * 24 * 60 * 60 * 1000),    // 4 months ago
    dateUpdated: Date.now() - (2 * 24 * 60 * 60 * 1000)        // 2 days ago
  },
  {
    id: "BTC18788",
    version: "v2",
    levels: [
      { name: "Bottle", units: 20 },
      { name: "ML", units: 250 }
    ],
    totalUnits: 5000,
    unitsAvailable: 4850,
    unitsReserved: 150,
    supplier: "MediCore Solutions",
    costPrice: 45.00,
    sellingPrice: 65.00,
    totalCostPrice: 225000.00,
    dateManufacture: Date.now() - (300 * 24 * 60 * 60 * 1000), // 10 months ago
    dateExpiry: Date.now() + (30 * 24 * 60 * 60 * 1000),       // 1 month from now (URGENT)
    dateReceived: Date.now() - (90 * 24 * 60 * 60 * 1000),     // 3 months ago
    dateUpdated: Date.now() - (1 * 24 * 60 * 60 * 1000)        // 1 day ago
  },
  {
    id: "BTC18789",
    version: "v1",
    levels: [
      { name: "Inhaler", units: 1 },
      { name: "Doses", units: 200 }
    ],
    totalUnits: 200,
    unitsAvailable: 180,
    unitsReserved: 20,
    supplier: "RespiCare Inc",
    costPrice: 320.00,
    sellingPrice: 450.00,
    totalCostPrice: 64000.00,
    dateManufacture: Date.now() - (450 * 24 * 60 * 60 * 1000), // 15 months ago
    dateExpiry: Date.now() + (365 * 24 * 60 * 60 * 1000),      // 1 year from now
    dateReceived: Date.now() - (60 * 24 * 60 * 60 * 1000),     // 2 months ago
    dateUpdated: Date.now() - (7 * 24 * 60 * 60 * 1000)        // 1 week ago
  },
  {
    id: "BTC18790",
    version: "v3",
    levels: [
      { name: "Vial", units: 12 },
      { name: "ML", units: 5 }
    ],
    totalUnits: 60,
    unitsAvailable: 48,
    unitsReserved: 12,
    supplier: "Injectable Pharma",
    costPrice: 150.00,
    sellingPrice: 220.00,
    totalCostPrice: 9000.00,
    dateManufacture: Date.now() - (200 * 24 * 60 * 60 * 1000), // 6.5 months ago
    dateExpiry: Date.now() + (90 * 24 * 60 * 60 * 1000),       // 3 months from now
    dateReceived: Date.now() - (30 * 24 * 60 * 60 * 1000),     // 1 month ago
    dateUpdated: Date.now() - (3 * 60 * 60 * 1000)             // 3 hours ago
  },
  {
    id: "BTC18791",
    version: "v5",
    levels: [
      { name: "Tube", units: 24 },
      { name: "Grams", units: 30 }
    ],
    totalUnits: 720,
    unitsAvailable: 680,
    unitsReserved: 40,
    supplier: "TopicalMed Co",
    costPrice: 25.00,
    sellingPrice: 40.00,
    totalCostPrice: 18000.00,
    dateManufacture: Date.now() - (150 * 24 * 60 * 60 * 1000), // 5 months ago
    dateExpiry: Date.now() + (270 * 24 * 60 * 60 * 1000),      // 9 months from now
    dateReceived: Date.now() - (14 * 24 * 60 * 60 * 1000),     // 2 weeks ago
    dateUpdated: Date.now() - (30 * 60 * 1000)                 // 30 minutes ago
  },
  {
    id: "BTC18792",
    version: "v4",
    levels: [
      { name: "Pack", units: 6 },
      { name: "Sachet", units: 12 },
      { name: "Grams", units: 5 }
    ],
    totalUnits: 360,
    unitsAvailable: 300,
    unitsReserved: 60,
    supplier: "NutriHealth Ltd",
    costPrice: 8.50,
    sellingPrice: 15.00,
    totalCostPrice: 3060.00,
    dateManufacture: Date.now() - (90 * 24 * 60 * 60 * 1000),  // 3 months ago
    dateExpiry: Date.now() + (450 * 24 * 60 * 60 * 1000),      // 15 months from now
    dateReceived: Date.now() - (7 * 24 * 60 * 60 * 1000),      // 1 week ago
    dateUpdated: Date.now() - (5 * 60 * 1000)                  // 5 minutes ago
  }
]


/* ///////////////
  EXAMPLE INVENTORY DATA LIST
/////////////// */

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
      totalPacks: 50,
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
      totalPacks: 0,
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
      totalPacks: 100,
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
      totalPacks: 5,
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
      totalPacks: 80,
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
      totalPacks: 40,
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
      totalPacks: 0,
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
      totalPacks: 2,
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
      totalPacks: 45,
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
      totalPacks: 120,
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
      totalPacks: 15,
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
      totalPacks: 18,
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
      totalPacks: 200,
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
      totalPacks: 35,
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
      totalPacks: 25,
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
      totalPacks: 8,
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
      totalPacks: 12,
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
      totalPacks: 0,
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
      totalPacks: 150,
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
      totalPacks: 25,
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
      totalPacks: 30,
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
      totalPacks: 5,
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
      totalPacks: 48,
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
      totalPacks: 15,
      reorder_level: 5
    }
  }
];