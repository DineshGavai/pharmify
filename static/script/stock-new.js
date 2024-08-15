import {
  refreshInputs,
  removeInputMsg,
  setDatalist,
  setInputMsg,
  updateDatalistPosition,
  validateInput,
} from "./utils/inputs.js";
import { toTwoDigit, saveToStorage, getFromStorage } from "./utils/utils.js";
import { createSnackbar, createDialog } from "./utils/components.js";
import { UI_STATUS_FEEDBACK } from "./utils/const.js";

function getNewProductHTML(idNumList, savedItem = undefined) {
  let idNum = idNumList.slice(-1)[0];
  return `
        <div class="product-options">
            <span>
            <span class="badge number"></span>
            <span class="badge hidden status"></span>
            </span>
            <button type="button" class="icon negative delete-current-product">
                <svg class="icon">
                    <use href="/static/assets/icon-sprite.svg#delete" />
                </svg>
            </button>
        </div>
        <div class="information">
        <fieldset>
            <label for="product_name_${idNum}">Name</label>
            <div class="icon-frame">
                <input type="text" required class="text-input product-name" value="${
                  savedItem?.name || ""
                }" pattern="^[a-zA-Z0-9_.,&/\s-]+$" id="product_name_${idNum}" name="product_name_${idNum}" data-list="existing_products">
            </div>
        </fieldset>

        <fieldset>
            <label for="product_brand_${idNum}">Brand</label>
            <input type="text" required class="text-input product-brand" value="${
              savedItem?.brand || ""
            }" pattern="^[a-zA-Z0-9_.,&\\s\\-]+$" id="product_brand_${idNum}" name="product_brand_${idNum}">
        </fieldset>

        <fieldset>
            <label for="product_type_${idNum}">Product Type</label>
            <div class="icon-frame">
                <input type="text" required class="text-input product-type" value="${
                  savedItem?.type || ""
                }" pattern="^[a-zA-Z0-9:,.&\\s\\-]+$" id="product_type_${idNum}" name="product_type_${idNum}"
                    data-list="product_type_list">
            </div>
            <button type="button" class="text"><a href="{% url 'settings' %}">Edit product types list</a></button>
        </fieldset>
    </div>
    <div class="date">
        <fieldset>
            <label for="product_date_manufacture_${idNum}">Manufacture Date</label>
            <input type="date" required class="text-input product-date-manufacture" value="${
              savedItem?.dateManufacture || ""
            }" id="product_date_manufacture_${idNum}" name="product_date_manufacture_${idNum}">
        </fieldset>

        <fieldset>
            <label for="product_date_expiry_${idNum}">Expiry Date</label>
            <input type="date" required class="text-input product-date-expiry" value="${
              savedItem?.dateExpiry || ""
            }" id="product_date_expiry_${idNum}" name="product_date_expiry_${idNum}">
        </fieldset>

        <p class="note info subtitle">Make sure the expiry date is correct.</p>
    </div>
    <div class="seller">
        <fieldset>
            <label for="product_seller_${idNum}">Seller</label>
            <div class="icon-frame combo-box">
                <input type="text" required class="text-input product-seller-name" value="${
                  savedItem?.sellerName || ""
                }" pattern="^[a-zA-Z0-9_.,\\s\\-]+$" id="product_seller_${idNum}" name="product_seller_${idNum}" data-list="seller_list">
            </div>
            <button type="button" class="text add-new-seller-btn">Add new Seller</button>
        </fieldset>
    </div>
    <div class="rate">
        <fieldset>
            <label for="product_wholesale_price_${idNum}">Wholesale Price</label>
            <div class="icon-frame">
                <span class="lead">₹</span>
                <input type="text" required class="text-input product-price-wholesale" value="${
                  savedItem?.priceWholesale || ""
                }" pattern="^\d+(\.\d{1,2})?$" id="product_wholesale_price_${idNum}" name="product_wholesale_price_${idNum}"
                    placeholder="0.0">
            </div>
        </fieldset>
        <fieldset>
            <label for="product_selling_price_${idNum}">Selling Price</label>
            <div class="icon-frame">
                <span class="lead">₹</span>
                <input type="text" required class="text-input product-price-selling" value="${
                  savedItem?.priceSelling || ""
                }" pattern="^\d+(\.\d{1,2})?$" id="product_selling_price_${idNum}" name="product_selling_price_${idNum}"
                    placeholder="0.0">
            </div>
        </fieldset>
        <fieldset class="quantity">
            <label for="product_quantity_${idNum}">Quantity</label>
            <input type="text" required class="text-input product-quantity" pattern="^\d+$" value="${
              savedItem?.quantity || ""
            }" id="product_quantity_${idNum}" name="product_quantity_${idNum}" placeholder="00">
        </fieldset>
    </div>
    `;
}

function handleNewProductTile() {
  // All New Product Elements and Inputs
  const tileList = document.querySelectorAll(".new-product");
  const numberList = document.querySelectorAll(".new-product .number");
  const statusList = document.querySelectorAll(".new-product .status");
  const nameList = document.querySelectorAll(".new-product .product-name");
  const typeList = document.querySelectorAll(".new-product .product-type");
  const sellerNameList = document.querySelectorAll(
    ".new-product .product-seller-name"
  );
  const deleteBtnList = document.querySelectorAll(
    ".new-product .delete-current-product"
  );
  const existingProductList = Array.from(
    document.querySelectorAll("#existing_products li")
  );

  numberList.forEach((elem, i) => (elem.innerHTML = `${toTwoDigit(++i)}`));

  document.getElementById("item_count").innerHTML = `${tileList.length} Item${
    tileList.length != 1 ? "s" : ""
  } Listed`;

  // Function to check if existing product is selected
  function checkMatch(input) {
    // .textContent returns innerText of hidden elements too.
    return existingProductList.some(
      (item) => input.value.toLowerCase() === item.textContent.toLowerCase()
    );
  }

  // Function to Set "New" or "Addition to Existing Product" badges
  function setStatus(badge, input) {
    badge.classList.remove("hidden");
    badge.innerHTML = checkMatch(input)
      ? "Addition to Existing Product"
      : "New Product";
  }

  // Set "New" or "Addition to Existing Product" badges
  nameList.forEach((input, i) => {
    // Presetting
    if (input.value) setStatus(statusList[i], input);

    input.addEventListener("input", () => {
      if (!input.value) statusList[i].classList.add("hidden");
      else setStatus(statusList[i], input);
    });

    // input.addEventListener("change", () => setStatus(statusList[i], input))

    input.addEventListener("keydown", (e) => {
      if (e.key == "Enter") setStatus(statusList[i], input);
    });

    // When list item is clicked
    existingProductList.forEach((li) =>
      li.addEventListener("click", () => setStatus(statusList[i], input))
    );

    // Setting DATALIST
    setDatalist(input);

    document
      .getElementById(input.getAttribute("data-list"))
      .querySelectorAll("li")
      .forEach((li) =>
        li.addEventListener("click", () => {
          if (!input.value) statusList[i].classList.add("hidden");
          else setStatus(statusList[i], input);
        })
      );
  });

  // SETTING DATALIST TO PRODUCT TYPE
  typeList.forEach((input) => setDatalist(input));
  // SETTING DATALIST TO SELLER NAME
  sellerNameList.forEach((input) => setDatalist(input));

  // Delete the current product tile
  deleteBtnList.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      tileList[i].remove();
      refreshInputs();
      handleNewProductTile();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const newProductBtnList = document.querySelectorAll(".new-product-btn");
  const deleteAllProductsBtn = document.getElementById("delete_all_products");
  const newProductsCtr = document.getElementById("new_product_list");
  const saveBatchBtn = document.getElementById("save_batch_btn");

  // Product ID tracking
  let numberOfProducts = 0;
  let idNumList = [];

  // Adding new product
  newProductBtnList.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Track New Product ID
      numberOfProducts++;
      idNumList.push(numberOfProducts);

      // Create new product and append
      let newProduct = document.createElement("div");
      newProduct.className = "new-product";
      newProduct.innerHTML = getNewProductHTML(idNumList);
      newProductsCtr.append(newProduct);
      newProductsCtr.parentElement.scrollTop = newProduct.offsetTop - 60;

      // Handle events after DOM Manipulation
      refreshInputs();
      handleNewProductTile();
    });
  });

  // Load previously unsaved products from Local Storage
  let savedProducts = getFromStorage("new_products");

  if (savedProducts && savedProducts.length > 0) {
    savedProducts.forEach((item) => {
      // Track New Product ID
      numberOfProducts++;
      idNumList.push(numberOfProducts);

      // Create new product and append
      let newProduct = document.createElement("div");
      newProduct.className = "new-product";
      newProduct.innerHTML = getNewProductHTML(idNumList, item);
      newProductsCtr.append(newProduct);
      newProductsCtr.parentElement.scrollTop = newProduct.offsetTop - 60;

      // Handle events after DOM Manipulation
      refreshInputs();
      handleNewProductTile();
    });
  } else {
    // Add first tile
    newProductBtnList[0].click();
  }

  // Delete all product list in one click
  deleteAllProductsBtn.addEventListener("click", () => {
    createDialog({
      headline: "Delete All Added Products?",
      description:
        "This will delete all the new products you enlisted and filled with details. This action cannot be undone. Are you sure want to clear the new product list?",
      primaryBtnLabel: "Delete All",
      secondaryBtnLabel: "Keep",
      primaryAction: () => {
        numberOfProducts = 0;
        idNumList = [];
        newProductsCtr.innerHTML = ``;
        return true;
      },
      danger: true,
    });
  });

  const addNewSellerBtn = document.getElementById("add_new_seller_btn");

  // ADD NEW SELLER Btn
  addNewSellerBtn.addEventListener("click", (e) => {
    e.preventDefault();

    createDialog({
      headline: "Add New Seller.",
      description:
        "Please enter his/her name and phone number to add the seller to the list.",
      componentID: "add_new_seller_form",
      fullscreen: true,
      primaryBtnLabel: "Add",
      secondaryBtnLabel: "Cancel",
      primaryAction: function () {
        let newSellerForm = document.getElementById("add_new_seller_form");
        let sellerNameInput = document.getElementById("new_seller_name");
        let sellerPhoneInput = document.getElementById("new_seller_phone");

        let validationArray = [
          validateInput(sellerNameInput, "Please enter a valid seller name."),
          validateInput(
            sellerPhoneInput,
            "Please enter a 10 digit phone number."
          ),
        ];

        if (!validationArray.includes(false)) {
          // TODO: HANDLE DATA SAVING AFTER SUBMIT
          // newSellerForm.submit();
          setTimeout(() => {
            newSellerForm.reset();
          }, 1000);
          // IMP: Don't remove following line
          return true;
        }
        return false;
      },
      secondaryAction: function () {
        let newSellerForm = document.getElementById("add_new_seller_form");
        newSellerForm.reset();

        return true;
      },
      danger: false,
    });
  });

  window.addEventListener("beforeunload", () => {
    const newProductList = document.querySelectorAll(".new-product");
    const statusList = document.querySelectorAll(".new-product .status");
    const nameList = document.querySelectorAll(".new-product .product-name");
    const brandList = document.querySelectorAll(".new-product .product-brand");
    const typeList = document.querySelectorAll(".new-product .product-type");
    const dateManufactureList = document.querySelectorAll(
      ".new-product .product-date-manufacture"
    );
    const dateExpiryList = document.querySelectorAll(
      ".new-product .product-date-expiry"
    );
    const sellerNameList = document.querySelectorAll(
      ".new-product .product-seller-name"
    );
    const priceWholesaleList = document.querySelectorAll(
      ".new-product .product-price-wholesale"
    );
    const priceSellingList = document.querySelectorAll(
      ".new-product .product-price-selling"
    );
    const quantityList = document.querySelectorAll(
      ".new-product .product-quantity"
    );

    let newProductJSON = [];

    // THIS JSON MUST BE USED TO SAVE PRODUCTS
    newProductList.forEach((product, i) => {
      newProductJSON.push({
        isNew: statusList[i].textContent == "New Product" ? true : false,
        name: nameList[i].value,
        brand: brandList[i].value,
        type: typeList[i].value,
        dateManufacture: dateManufactureList[i].value,
        dateExpiry: dateExpiryList[i].value,
        sellerName: sellerNameList[i].value,
        priceWholesale: priceWholesaleList[i].value,
        priceSelling: priceSellingList[i].value,
        quantity: quantityList[i].value,
      });
    });

    saveToStorage("new_products", newProductJSON);
  });

  saveBatchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const newProductList = document.querySelectorAll(".new-product");
    const statusList = document.querySelectorAll(".new-product .status");
    const nameList = document.querySelectorAll(".new-product .product-name");
    const brandList = document.querySelectorAll(".new-product .product-brand");
    const typeList = document.querySelectorAll(".new-product .product-type");
    const dateManufactureList = document.querySelectorAll(
      ".new-product .product-date-manufacture"
    );
    const dateExpiryList = document.querySelectorAll(
      ".new-product .product-date-expiry"
    );
    const sellerNameList = document.querySelectorAll(
      ".new-product .product-seller-name"
    );
    const priceWholesaleList = document.querySelectorAll(
      ".new-product .product-price-wholesale"
    );
    const priceSellingList = document.querySelectorAll(
      ".new-product .product-price-selling"
    );
    const quantityList = document.querySelectorAll(
      ".new-product .product-quantity"
    );

    let newProductJSON = [];

    // THIS JSON MUST BE USED TO SAVE PRODUCTS
    newProductList.forEach((product, i) => {
      newProductJSON.push({
        isNew: statusList[i].textContent == "New Product" ? true : false,
        name: nameList[i].value,
        brand: brandList[i].value,
        type: typeList[i].value,
        dateManufacture: dateManufactureList[i].value,
        dateExpiry: dateExpiryList[i].value,
        sellerName: sellerNameList[i].value,
        priceWholesale: priceWholesaleList[i].value,
        priceSelling: priceSellingList[i].value,
        quantity: quantityList[i].value,
      });
    });

    saveToStorage("new_products", newProductJSON);

    let validationArray = [];
    [
      nameList,
      brandList,
      typeList,
      sellerNameList,
      priceWholesaleList,
      priceSellingList,
      quantityList,
    ].forEach((inputList) => {
      inputList.forEach((input) => {
        validationArray.push(
          validateInput(input, "Please enter a valid value.")
        );
      });
    });

    // Validate Dates
    const today = new Date();
    let [yyyy, mm, dd] = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    ];
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    const formattedToday = dd + "/" + mm + "/" + yyyy;

    dateManufactureList.forEach((input) => {
      if (!input.value) {
        validationArray.push(false);
        setInputMsg(input, `This field is required.`);
      } else if (new Date(input.value) > today) {
        validationArray.push(false);
        setInputMsg(
          input,
          `This must be less than today's date ${formattedToday}. Cannot add an unmanufactured product.`
        );
      } else removeInputMsg(input);
    });

    dateExpiryList.forEach((input) => {
      if (!input.value) {
        validationArray.push(false);
        setInputMsg(input, `This field is required.`);
      } else if (new Date(input.value) < today) {
        validationArray.push(false);
        setInputMsg(
          input,
          `This must be more than today's date ${formattedToday}. Cannot add an expired product.`
        );
      } else removeInputMsg(input);
    });

    // If their are mistakes
    // if (validationArray.includes(false)) {
    //     createSnackbar({
    //         msg: "Please fill all the inputs correctly first.",
    //         status: UI_STATUS_FEEDBACK.error
    //     });
    // } else {
    //     // TODO: SUBMIT
    // }

    fetch("/stock/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newProductJSON: newProductJSON }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const contentType = response.headers.get("content-type");

        if (contentType.includes("application/json")) {
          return response.json(); // Parse the JSON body
        } else {
          throw new Error("Unsupported content type: " + contentType);
        }
      })
      .then((data) => {
        if (data.redirect_url) {
          // Redirect the browser to the new URL
          window.location.href = data.redirect_url;
        } else {
          console.log(data); // Handle other JSON data if needed
        }
      })
      .catch((error) => console.error("Error:", error));

    // document.getElementById("new_product_list").submit();
  });
});
