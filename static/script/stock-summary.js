import { toTwoDigit, formatCommonDate, saveToStorage, getFromStorage, subtractDates, formatINR, popFromArray, setMsgIcons } from "./utils/utils.js";
import { createDialog } from "./utils/components.js";


// GET SUMMARY OVERVIEW HTML
function getOverviewHTML(data) {
    const { items, brands, sellers } = data;
    let makePlural = (num) => num != 1 ? "s" : "";

    return `
        <div>
            <p class="overline">Overview</p>
            <b class="fs-600 gradient-primary">${items} Product${makePlural(items)}</b>
            <p>from <b>${brands.size} Brand${makePlural(brands.size)}</b> and <b>${sellers.size} Seller${makePlural(sellers.size)}</b></p>
        </div>
        <div class="count-box">
            <p>
                <span class="subtitle quantity">Total Quantity</span>
                <span>${formatINR(data.quantity, false)} <span class="subtitle">Packs</span></span>
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
    `;
}

// GET EACH PRODUCT'S SUMMARY INNER HTML
function getProductSummaryHTML(data, count, allowTitle = true) {
    count++;
    let totalDays = subtractDates(data.dateManufacture, data.dateExpiry)
    let daysLeft = subtractDates(new Date(), data.dateExpiry);

    return `
    <div>
        ${allowTitle
            ? `<p>
                <b class="name">${data.name}</b> by <b class="brand">${data.brand}</b><br>
                <span class="type">${data.type}</span>
                </p>`
            : `<p>
                <span class="subtitle">Type</span><br>
                <span class="type">${data.type}</span>
                </p>`
        }
        <p><span class="subtitle">Sold by</span><br><span class="seller">${data.sellerName}</span></p>
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
        <svg class="icon"><use href="/static/assets/icon-sprite.svg#cross" /></svg>
        <p><span class="quantity fs-700">${data.quantity}</span><span class="subtitle">Packages</span></p>
        <svg class="icon"><use href="/static/assets/icon-sprite.svg#equals" /></svg>
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
        ${data.priceWholesale >= data.priceSelling
            ? `<div><p class="note warn"><span>The selling price must be higher than wholesale price to <b>avoid financial loss</b>.</span></p></div>`
            : ``}
    `;
}

document.addEventListener("DOMContentLoaded", () => {

    // GET NEW PRODUCTS DATA
    let productDataList = getFromStorage("new_products")

    // Check if Data Even Exists or Not
    if (!productDataList || productDataList.length == 0) window.location.href = "/stock/new";

    /* ///////////////
        IF PRODUCTS EXISTS
    /////////////// */

    // MERGE and GROUP SIMILAR ITEMS into ARRAY OF ARRAYS
    const groupedProducts = {};
    productDataList.forEach(product => {
        const key = `${product.name}-${product.brand}`;
        // If Key Doesn't Exists
        if (!groupedProducts[key]) groupedProducts[key] = [];
        groupedProducts[key].push(product);
    });
    productDataList = Object.values(groupedProducts);
    // Get Unique and Merged Products into seperate array
    const uniqueProductsList = productDataList.filter(elem => elem.length === 1).map(elem => elem = elem[0]);
    const mergedProductsList = productDataList.filter(elem => elem.length != 1)

    // POPULATE and PRESENT DATA
    const summaryProductCtr = document.getElementById("summary_product_list");

    // Summary JSON for OVERVIEW
    let overview = {
        items: productDataList.length,
        quantity: 0,
        priceWholesale: 0,
        priceSelling: 0,
        brands: new Set(),
        sellers: new Set(),
        isWholesalePriceMore: false
    }

    function updateOverview(data) {
        overview.quantity += Number(data.quantity);
        overview.priceWholesale += data.priceWholesale * data.quantity;
        overview.priceSelling += data.priceSelling * data.quantity;
        overview.brands.add(data.brand);
        overview.sellers.add(data.sellerName);
        if (data.priceWholesale >= data.priceSelling) overview.isWholesalePriceMore = true;
    }

    uniqueProductsList.forEach((data, i) => {
        let productElem = document.createElement("div");
        productElem.className = "summary-product";
        productElem.innerHTML =
            `<div>  <p class="number badge">${toTwoDigit(i + 1)}</p>
                    <p class="status badge">${data.isNew ? "New product" : "Addition to Existing Product"}</p>
            </div>` + getProductSummaryHTML(data, i);

        summaryProductCtr.append(productElem);
        updateOverview(data);
    })

    mergedProductsList.forEach(subArr => {

        const { length } = subArr;
        const { name, brand, isNew } = subArr[0];

        let mergedProductElem = document.createElement("div")
        mergedProductElem.className = "summary-product merged";
        mergedProductElem.innerHTML = `
            <div>
                <p class="number badge">${length} Similar Products</p>
                <p class="status badge">${isNew ? "All New Products" : "All Additions to Existing Products"}</p>
            </div>
            <div><p><b class="name">${name}</b> by <b class="brand">${brand}</b><br></p></div>
            <div class="similar-product-box"></div>
            `
        summaryProductCtr.append(mergedProductElem);

        let similarProductBox = mergedProductElem.querySelector(".similar-product-box");
        subArr.forEach((data, i) => {
            // Creating Number Badge
            const subcounter = document.createElement("span");
            subcounter.className = "badge";
            subcounter.innerHTML = toTwoDigit(i + 1);
            similarProductBox.append(subcounter)
            // Creating Product Details
            const productElem = document.createElement("div");
            productElem.className = "summary-product";
            productElem.innerHTML = getProductSummaryHTML(data, i, false);
            similarProductBox.append(productElem);
            updateOverview(data);
        })
    })

    // POPULATE COLLECTED OVERVIEW DATA
    const overviewCtr = document.getElementById("overview_sec")
    overviewCtr.innerHTML = getOverviewHTML(overview);
    // POPULATING WARNING NOTES ICONS
    document.querySelectorAll(".warn").forEach(note => setMsgIcons(note, "warn"))

    const confirmSaveBtn = document.getElementById("confirm_save_btn");

    // HANDLE DATA SAVING TO BACKEND
    confirmSaveBtn.addEventListener("click", () => {
        let dialogDesc = "You are about to add these products to your stock. Are you sure?";
        let productData = getFromStorage("new_products");

        if (!productData || productData.length == 0) return;

        createDialog({
            headline: "Review Your Products.",
            description: overview.isWholesalePriceMore ?
                `<p class='note warn'><span>
                            ${dialogDesc} <b>There are some products with lower selling price than wholesale price. This might result in financial loss.</b>
                </span></p>`
                : dialogDesc,
            primaryBtnLabel: "Confirm & Add",
            secondaryBtnLabel: "Go Back",
            primaryAction: () => {
                // TODO: HANDLE DATA SAVING TO BACKEND
                // productData
                return true;
            }
        })

    })


})