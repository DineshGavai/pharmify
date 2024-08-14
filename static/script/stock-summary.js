import { allowNumberInputOnly, incrementWithDifference, refreshInputs, removeInputMsg, setDatalist, setIncDecOnKeypress, setInputMsg, updateDatalistPosition, validateInput } from "./utils/inputs.js";
import { toTwoDigit, formatCommonDate, saveToStorage, getFromStorage, subtractDates, formatINR, popFromArray } from "./utils/utils.js";
import { createSnackbar, createDialog } from "./utils/components.js";
import { UI_STATUS_FEEDBACK } from "./utils/const.js";


// GET SUMMARY OVERVIEW HTML
function getOverviewHTML(data) {
    return `
    <div>
        <div>
            <b class="fs-600 gradient-primary">${data.items} Products</b>
            <p>from <b>${data.brands.size} Brands</b> and <b>${data.sellers.size} Sellers</b></p>
        </div>
        <div class="count-box">
            <p>
                <span class="subtitle quantity">Total Quantity</span>
                <span>${formatINR(data.quantity, false)} <span class="subtitle">Packages</span></span>
            </p>
            <p>
                <span class="subtitle">Total Wholesale Price</span>
                <span>${formatINR(data.priceWholesale)}</span>
            </p>
            <p>
                <span class="subtitle">Total Selling Price</span>
                <span>${formatINR(data.priceSelling)}</span>
            </p>
        </div>
    </div>
    `;
}

// GET EACH PRODUCT'S SUMMARY INNER HTML
function getProductSummaryHTML(data, count, allowTitle = true) {
    count++;
    let totalDays = subtractDates(data.dateManufacture, data.dateExpiry)
    let daysLeft = subtractDates(new Date(), data.dateExpiry);

    return `
    <div>
        ${allowTitle ?
            `<p>
                <b class="name">${data.name}</b> by <b class="brand">${data.brand}</b><br>
                <span class="type">${data.type}</span>
            </p>`
            :
            `
            <p>
                <span class="subtitle">Type</span><br>
                <span class="type">${data.type}</span>
            </p>
            `
        }
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
                <span class="price-wholesale">${formatINR(data.priceWholesale)} per pack</span>

            </p>
            <p>
                <span class="subtitle">Selling Price</span><br>
                <span class="price-selling">${formatINR(data.priceSelling)} per pack</span>

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
                <span class="total-price-wholesale">${formatINR(Number(data.priceWholesale) * Number(data.quantity))}</span>
            </p>
            <p>
                <span class="subtitle">Total Selling Price</span><br>
                <span class="total-price-selling">${formatINR(Number(data.priceSelling) * Number(data.quantity))}</span>
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

    // MERGE and GROUP SIMILAR ITEMS into ARRAY OF ARRAYS
    const mergedProducts = {};
    productDataList.forEach(product => {
        const key = `${product.name}-${product.brand}`;
        // If Key Doesn't Exists
        if (!mergedProducts[key]) mergedProducts[key] = [];
        mergedProducts[key].push(product);
    });
    productDataList = Object.values(mergedProducts);



    // POPULATE and PRESENT DATA
    let summaryProductCtr = document.getElementById("summary_product_list");
    let overview = {
        items: productDataList.length,
        quantity: 0,
        priceWholesale: 0,
        priceSelling: 0,
        brands: new Set(),
        sellers: new Set()
    }

    let count = 0;

    productDataList.forEach(productArr => {
        if (productArr.length == 1) {
            let data = productArr[0];
            let productElem = document.createElement("div");
            productElem.className = "summary-product";
            productElem.innerHTML =
                `<div>
                <p class="number badge">${toTwoDigit(count + 1)}</p>
                <p class="status badge">${data.isNew ? "New product" : "Addition to Existing Product"}</p>
            </div>` + getProductSummaryHTML(data, count);
            summaryProductCtr.append(productElem);

            // Creating OVERVIEW
            overview.quantity += Number(data.quantity);
            overview.priceWholesale += (data.priceWholesale * data.quantity);
            overview.priceSelling += (data.priceSelling * data.quantity);
            overview.brands.add(data.brand);
            overview.sellers.add(data.sellerName);
            count++;
        } else {

            let mergedProductElem = document.createElement("div")
            mergedProductElem.className = "summary-product merged";
            mergedProductElem.innerHTML = `
            <div>
                <p class="number badge">${productArr.length} Similar Products</p>
                <p class="status badge">${productArr[0].isNew ? "All New Products" : "All Additions to Existing Products"}</p>
            </div>
            <div>
                <p>
                    <b class="name">${productArr[0].name}</b> by <b class="brand">${productArr[0].brand}</b><br>
                </p>
            </div>
            <div class="similar-product-box"></div>
            `
            summaryProductCtr.append(mergedProductElem);

            let similarProductBox = mergedProductElem.querySelector(".similar-product-box");

            productArr.forEach((data, i) => {
                let subcounter = document.createElement("span");
                subcounter.className = "badge";
                subcounter.innerHTML = toTwoDigit(i + 1);
                similarProductBox.append(subcounter)
                let productElem = document.createElement("div");
                productElem.className = "summary-product";
                productElem.innerHTML = getProductSummaryHTML(data, count, false);
                similarProductBox.append(productElem);


                // Creating OVERVIEW
                overview.quantity += Number(data.quantity);
                overview.priceWholesale += (data.priceWholesale * data.quantity);
                overview.priceSelling += (data.priceSelling * data.quantity);
                overview.brands.add(data.brand);
                overview.sellers.add(data.sellerName);
                count++;
            })

        }
    })

    let overviewCtr = document.getElementById("overview_sec")
    overviewCtr.innerHTML = getOverviewHTML(overview);



})