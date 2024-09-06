import { createChartDonut } from "./utils/components.js"
import { formatDateCommon, formatINR } from "./utils/utils.js"


document.addEventListener("DOMContentLoaded", () => {

    let overviewData = {
        lastUpdated: "2024-09-06",
        count: {
            products: 21,
            productsInStock: 18,
            productsOutOfStock: 2,
            productsLowStock: 1,
            productsNearExpiry: 2,
            productsExpired: 1,
            productsMostSold: 3,
            productsLeastSold: 1
        },
        types: {
            names: ["Electronics", "Clothing", "Food"],
            counts: [4, 3, 3]
        },
        financial: {
            cost: 15000,
            profitAmount: 3000,
            lossAmount: 0,
            sameAsWholesale: 2
        }
    }

    // Populate all the last update boxes
    document.querySelectorAll(".date-last-updated")
        .forEach(elem => elem.innerHTML = formatDateCommon(overviewData.lastUpdated))

    /* ///////////////
        Stock Overview
    /////////////// */


    // Populating Donut Chart
    let donutChartData = [];

    if (overviewData.count.products == 0) {
        donutChartData = [{ label: "Available", value: 0, color: "var(--clr-grey-divider)" }]
    } else {
        donutChartData = [
            { label: "Available", value: overviewData.count.productsInStock - overviewData.count.productsLowStock, color: "var(--clr-primary-dark)" },
            { label: "Low in Stock", value: overviewData.count.productsLowStock, color: "var(--clr-primary-light)" },
            { label: "Out of Stock", value: overviewData.count.productsOutOfStock, color: "var(--clr-grey-divider)" },
        ]
    }
    document.getElementById("overview_donut_chart").innerHTML = createChartDonut(donutChartData);

    // Populating other stock overview data
    document.getElementById("overview_product_count").innerHTML = formatINR(overviewData.count.products, false);
    document.getElementById("overview_product_in_stock_count").innerHTML = formatINR(overviewData.count.productsInStock, false) + " <span class='subtitle'>Available in Stock</span>";
    document.getElementById("overview_product_low_stock_count").innerHTML = formatINR(overviewData.count.productsLowStock, false) + " <span class='subtitle'>Low in Stock</span>";
    document.getElementById("overview_product_out_of_stock_count").innerHTML = formatINR(overviewData.count.productsOutOfStock, false) + " <span class='subtitle'>Out of Stock</span>";


    /* ///////////////
    Expiry Overview
    /////////////// */

    let overviewExpiredCount = document.getElementById("overview_expired_count");
    let overviewExpirySoonCount = document.getElementById("overview_expiry_soon_count");

    if (overviewData.count.productsExpired > 0) overviewExpiredCount.classList.remove("safe");
    if (overviewData.count.productsNearExpiry > 0) overviewExpirySoonCount.classList.remove("safe");

    overviewExpiredCount.innerHTML = formatINR(overviewData.count.productsExpired, false)
    overviewExpirySoonCount.innerHTML = formatINR(overviewData.count.productsNearExpiry, false)
})