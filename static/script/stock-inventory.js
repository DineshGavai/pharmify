import { createChartDonut, setAsSlider } from "./utils/components.js"
import { formatDateCommon, formatINR, setLocationByRegion } from "./utils/utils.js"
import { setDropDownMenu } from "./utils/inputs.js"


document.addEventListener("DOMContentLoaded", () => {

    // Fetch data from a given URL
    fetch('http://127.0.0.1:8000/stock/inventory/api')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok :( ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let overviewData;

            // Default data
            // /*
            overviewData = {
                lastUpdated: "",
                count: {
                    products: 0,
                    productsInStock: 0,
                    productsOutOfStock: 0,
                    productsLowStock: 0,
                    productsNearExpiry: 0,
                    productExpired: 0,
                    productsMostSold: 0,
                    productsLeastSold: 0
                },
                types: {
                    names: [],
                    counts: []
                },
                financial: {
                    cost: 0,
                    profitProductCount: 0,
                    profitPercent: 0,
                    lossProductCount: 0,
                    lossPercent: 0,
                    sameAsWholesaleAmount: 0
                }
            }

            // */

            // If data is avaiable and is sent from backend
            if (data != 0) {
                overviewData = data.inventory_overview;
            }

            let { financial, count } = overviewData;

            // Populate all the last update boxes
            document.querySelectorAll(".date-last-updated")
                .forEach(elem => {
                    if (!overviewData.lastUpdated || overviewData.lastUpdated == "") elem.setAttribute("aria-hidden", "true");
                    elem.innerHTML = formatDateCommon(overviewData.lastUpdated)
                })

            /* ///////////////
                Stock Overview
            /////////////// */


            // Populating Donut Chart
            let donutChartData = [];

            if (count.products == 0) {
                donutChartData = [{ label: "Available", value: 0, color: "var(--clr-grey-divider)" }]
            } else {
                donutChartData = [
                    { label: "Available", value: count.productsInStock, color: "var(--clr-primary-dark)" },
                    { label: "Low in Stock", value: count.productsLowStock, color: "var(--clr-primary-light)" },
                    { label: "Out of Stock", value: count.productsOutOfStock, color: "var(--clr-grey-divider)" },
                ]
            }
            document.getElementById("overview_donut_chart").innerHTML = createChartDonut(donutChartData);

            // Populating other stock overview data
            document.getElementById("overview_product_count").innerHTML = formatINR(count.products, false);
            document.getElementById("overview_product_in_stock_count").innerHTML = formatINR(count.productsInStock, false) + " <span class='subtitle'>Available in Stock</span>";
            document.getElementById("overview_product_low_stock_count").innerHTML = formatINR(count.productsLowStock, false) + " <span class='subtitle'>Low in Stock</span>";
            document.getElementById("overview_product_out_of_stock_count").innerHTML = formatINR(count.productsOutOfStock, false) + " <span class='subtitle'>Out of Stock</span>";


            /* ///////////////
            Expiry Overview
            /////////////// */

            let expiredCount = document.getElementById("overview_expired_count");
            let expirySoonCount = document.getElementById("overview_expiry_soon_count");

            if (count.productExpired > 0) expiredCount.classList.remove("safe");
            if (count.productsNearExpiry > 0) expirySoonCount.classList.remove("safe");

            expiredCount.innerHTML = formatINR(count.productExpired, false);
            expirySoonCount.innerHTML = formatINR(count.productsNearExpiry, false);


            /* ///////////////
                FINANCIAL OVERVIEW
            /////////////// */

            let financialTotalValue = document.getElementById("overview_total_value");

            function setFinancialData(elemCount, elemPercent, countData, percentData, label) {
                if (percentData && percentData > 0) percentData = "+" + percentData;
                if (!countData) elemCount.classList.add("safe");
                if (elemCount) elemCount.innerHTML = formatINR(countData, false);
                if (elemPercent) elemPercent.innerHTML = percentData ? percentData + "%" : label;
            }

            financialTotalValue.innerHTML = formatINR(financial.cost, false);

            setFinancialData(
                document.getElementById("overview_loss_products"), document.getElementById("overview_loss_percent"),
                financial.lossProductCount, financial.lossPercent, "No Loss"
            )

            setFinancialData(
                document.getElementById("overview_no_change_products"), null,
                financial.sameAsWholesaleAmount, null, null
            )

            setFinancialData(
                document.getElementById("overview_profit_products"), document.getElementById("overview_profit_percent"),
                financial.profitProductCount, financial.profitPercent, "No Profit"
            )


            /* ///////////////
                DROP DOWN MENUS - BADGES, COLUMN VISIBILITY, FILTERS
            /////////////// */

            let menuOptionsSec = document.getElementById("inventory_filter_options");
            setAsSlider(menuOptionsSec);

            let menuBtnBadges = document.getElementById("badges_menu_btn");
            let menuBtnColumn = document.getElementById("column_menu_btn");
            let menuBtnCategory = document.getElementById("category_menu_btn");
            let menuBtnFilter = document.getElementById("more_filter_menu_btn");
            setDropDownMenu(menuBtnBadges);
            setDropDownMenu(menuBtnColumn);
            setDropDownMenu(menuBtnCategory);
            setDropDownMenu(menuBtnFilter);

            // menuBtnFilter.click();

        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
})