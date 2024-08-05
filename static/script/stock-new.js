import { refreshInputs } from "./utils/inputs.js";

function getNewProductHTML(idNumList) {
    let idNum = idNumList.slice(-1)[0];
    return `
        <div class="information">
        <fieldset>
            <label for="product_name_${idNum}">Name</label>
            <input type="text" class="text-input name" id="product_name_${idNum}" name="product_name_${idNum}">
        </fieldset>

        <fieldset>
            <label for="product_brand_${idNum}">Brand</label>
            <input type="text" class="text-input" id="product_brand_${idNum}" name="product_brand_${idNum}">
        </fieldset>

        <fieldset>
            <label for="product_type_${idNum}">Product Type</label>
            <div class="icon-frame">
                <input type="text" class="text-input" id="product_type_${idNum}" name="product_type_${idNum}"
                    data-list="product_type_list">
            </div>
            <button class="text"><a href="{% url 'settings' %}">Edit product types list</a></button>
        </fieldset>
    </div>
    <div class="date">
        <fieldset>
            <label for="product_date_manufacture_${idNum}">Manufacture Date</label>
            <input type="date" class="text-input" id="product_date_manufacture_${idNum}" name="product_date_manufacture_${idNum}">
        </fieldset>

        <fieldset>
            <label for="product_date_expiry_${idNum}">Expiry Date</label>
            <input type="date" class="text-input" id="product_date_expiry_${idNum}" name="product_date_expiry_${idNum}">
        </fieldset>

        <p class="note info subtitle">Make sure the expiry date is correct.</p>
    </div>
    <div class="seller">
        <fieldset>
            <label for="product_quantity_${idNum}">Seller</label>
            <div class="icon-frame combo-box">
                <input type="text" name="product_seller_${idNum}" id="product_seller_${idNum}" class="text-input"
                    data-list="seller_list">
            </div>
            <button class="text">Add new Seller</button>
        </fieldset>
    </div>
    <div class="rate">
        <fieldset>
            <label for="product_wholesale_price_${idNum}">Wholesale Price</label>
            <div class="icon-frame">
                <span class="lead">₹</span>
                <input type="text" class="text-input" id="product_wholesale_price_${idNum}" name="product_wholesale_price_${idNum}"
                    placeholder="0.0">
            </div>
        </fieldset>
        <fieldset>
            <label for="product_selling_price_${idNum}">Selling Price</label>
            <div class="icon-frame">
                <span class="lead">₹</span>
                <input type="text" class="text-input" id="product_selling_price_${idNum}" name="product_selling_price_${idNum}"
                    placeholder="0.0">
            </div>
        </fieldset>
        <fieldset class="quantity">
            <label for="product_quantity_${idNum}">Quantity</label>
            <input type="text" class="text-input" id="product_quantity_${idNum}" name="product_quantity_${idNum}" placeholder="00">
        </fieldset>
    </div>
    <div class="product-options">
        <button class="icon negative">
            <svg class="icon">
                <use href="/static/assets/icon-sprite.svg#delete" />
            </svg>
        </button>

        <button class="text">
            <svg class="icon">
                <use href="/static/assets/icon-sprite.svg#stock-add-existing" />
            </svg>
            Add to Existing
        </button>
    </div>
    `;
}


function generateNewProductTile() {

}

document.addEventListener("DOMContentLoaded", () => {

    let newProductBtnList = document.querySelectorAll(".new-product-btn");
    let newProductsCtr = document.getElementById("new_product_list");

    let numberOfProducts = 0;
    let idNumList = [];

    newProductBtnList.forEach(btn => {
        btn.addEventListener("click", () => {
            numberOfProducts++;
            idNumList.push(numberOfProducts);

            let newProduct = document.createElement("div");
            newProduct.className = "new-product";
            newProduct.innerHTML = getNewProductHTML(idNumList);
            newProductsCtr.append(newProduct);

            refreshInputs();
        })
    })

})