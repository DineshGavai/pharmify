import { allowNumberInputOnly, incrementWithDifference, refreshInputs, removeInputMsg, setDatalist, setIncDecOnKeypress, setInputMsg, updateDatalistPosition, validateInput } from "./utils/inputs.js";
import { toTwoDigit, formatCommonDate, saveToStorage, getFromStorage, subtractDates, formatCurrencyINR } from "./utils/utils.js";
import { createSnackbar, createDialog } from "./utils/components.js";
import { UI_STATUS_FEEDBACK } from "./utils/const.js";


function getProductSummaryHTML(data, count) {
    count++;
    let totalDays = subtractDates(data.dateManufacture, data.dateExpiry)
    let daysLeft = subtractDates(new Date(), data.dateExpiry);
    return `
    <div>
        <p class="number badge">${toTwoDigit(count)}</p>
        <p class="status badge">${data.isNew ? "New product" : "Addition to Existing Product"}</p>
    </div>
    <div>
        <p>
            <b class="name">${data.name}</b>
            by
            <b class="brand">${data.brand}</b><br>
            <span class="type">${data.type}</span>
        </p>
        <p>
            <span class="subtitle">Sold by</span><br>
            <span class="seller">${data.sellerName}</span>
        </p>
    </div>
    <div>
        <p>
            <span class="subtitle">Manufacture Date</span><br>
            <span class="date-manufacture">${formatCommonDate(data.dateManufacture)}</span>
        </p>
        <p>
            <span class="days-total">Total ${totalDays} days</span><br>
            <span class="days-left ${daysLeft <= 5 ? "warn" : ""}">${daysLeft} days left from today</span>
        </p>
        <p>
            <span class="subtitle">Expiry Date</span><br>
            <span class="date-expiry">${formatCommonDate(data.dateExpiry)}</span>
        </p>
    </div>
    <div>
        <div>
            <p>
                <span class="subtitle">Wholesale Price</span><br>
                <span class="price-wholesale">${formatCurrencyINR(data.priceWholesale)} per pack</span>

            </p>
            <p>
                <span class="subtitle">Selling Price</span><br>
                <span class="price-selling">${formatCurrencyINR(data.priceSelling)} per pack</span>

            </p>
        </div>
        <svg class="icon">
            <use href="/static/assets/icon-sprite.svg#cross" />
        </svg>
        <p>
            <span class="quantity fs-700">${data.quantity}</span>
            <span class="subtitle">Packages</span>
        </p>
        <svg class="icon">
            <use href="/static/assets/icon-sprite.svg#equals" />
        </svg>
        <div>
            <p>
                <span class="subtitle">Total Wholesale Price</span><br>
                <span class="total-price-wholesale">${formatCurrencyINR(Number(data.priceWholesale) * Number(data.quantity))}</span>
            </p>
            <p>
                <span class="subtitle">Total Selling Price</span><br>
                <span class="total-price-selling">${formatCurrencyINR(Number(data.priceSelling) * Number(data.quantity))}</span>
            </p>
        </div>
    </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {

    // GET NEW PRODUCTS DATA
    let productDataList = getFromStorage("new_products")

    // Check if Data Even Exists or Not
    if (!productDataList || productDataList.length == 0) window.location.href = "/stock/new";

    // POPULATE and PRESENT DATA
    let summaryProductCtr = document.getElementById("summary_product_list");

    productDataList.forEach((data, i) => {
        let productElem = document.createElement("div");
        productElem.className = "summary-product";
        productElem.innerHTML = getProductSummaryHTML(data, i);
        summaryProductCtr.append(productElem);
    })

})