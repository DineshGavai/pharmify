import { UI_STATUS_FEEDBACK, UI_LOADER, UI_SIZE } from "./const.js";
import { setMsgIcons } from "./utils.js";

/* ///////////////
    LOADERS - Spinners, Loading Bars, Skeletons
/////////////// */

// Function to Set a Loading Spinner
function setLoadingSpinner(elem, theme, size) {
    let spinner = document.createElement("span");
    spinner.classList.add("loader", "spinner", theme);
    spinner.innerHTML = `
        <svg viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.3"
                d="M110 55C110 85.3757 85.3757 110 55 110C24.6243 110 0 85.3757 0 55C0 24.6243 24.6243 0 55 0C85.3757 0 110 24.6243 110 55ZM17.1499 55C17.1499 75.904 34.096 92.8501 55 92.8501C75.904 92.8501 92.8501 75.904 92.8501 55C92.8501 34.096 75.904 17.1499 55 17.1499C34.096 17.1499 17.1499 34.096 17.1499 55Z" />
            <path
                d="M96.985 74.8127C101.268 76.8338 106.45 75.0087 107.781 70.4639C109 66.3026 109.726 62.0021 109.936 57.6509C110.284 50.4365 109.208 43.2243 106.769 36.4259C104.33 29.6276 100.575 23.3762 95.7201 18.0288C92.7918 14.8035 89.4976 11.9452 85.911 9.50815C81.9939 6.84653 76.8338 8.73209 74.8127 13.015V13.015C72.7916 17.2979 74.7097 22.3414 78.4291 25.2729C80.0726 26.5681 81.6097 28.0005 83.0229 29.557C86.3641 33.237 88.9478 37.5391 90.6264 42.2176C92.305 46.8962 93.0456 51.8595 92.8061 56.8243C92.7047 58.9242 92.4289 61.007 91.9838 63.0517C90.9763 67.6791 92.7021 72.7916 96.985 74.8127V74.8127Z" />
        </svg>
        `;

    let width = 2.4;
    switch (size) {
        case UI_SIZE.xs: width = 2; break;
        case UI_SIZE.s: width = 2.8; break;
        case UI_SIZE.m: width = 3.2; break;
        case UI_SIZE.l: width = 3.6; break;
        case UI_SIZE.xl: width = 4.2; break;
    }
    spinner.style.width = `${width}rem`;

    elem.append(spinner);
}

// Main Function to Set a specified loader
export function setLoader(elem, theme, type = UI_LOADER.spinner, size = UI_SIZE.xs) {
    elem.disabled = true;
    switch (type) {
        case UI_LOADER.spinner:
            setLoadingSpinner(elem, theme, size);
            break;

        // Coming soon
        case UI_LOADER.progressBar:

            break;
        case UI_LOADER.skeleton:

            break;

        default:
            break;
    }
}

// Remove the loader
export function removeLoader(elem) {
    elem.disabled = false;
    elem.querySelector(".loader").remove();
}

/* ///////////////
    SNACKBAR GENERATION FUNCTION
/////////////// */

export function createSnackbar(options = {}) {
    // OPTION DEFAULTS
    const { msg, status = UI_STATUS_FEEDBACK.info, undo } = options;

    // ERROR CONDITIONS - msg must exist
    if (!msg) throw new Error("Provide a message for Snackbar");

    // SNACKBAR CONSTRUCTION
    let snackbar = document.createElement("div");
    snackbar.classList.add("snackbar", status)

    // Close button, if undo() exists, else just close
    let closeBtn = undo
        ? `<button class="text close-snackbar-btn undo-btn">Undo</button>`
        : `<button class="icon close-snackbar-btn"><svg class="icon"><use href="/static/assets/icon-sprite.svg#cross" /></svg></button>`;
    snackbar.innerHTML = `<p class="fs-400 msg">${msg}</p> ${closeBtn}`;
    setMsgIcons(snackbar.querySelector(".msg"), status);
    document.querySelector(".snackbar-sec").prepend(snackbar);

    // SNACKBAR CLOSING - Automatic - Add animation and remove
    setTimeout(() => snackbar.style.animation = `fadeScaleOut 0.5s linear`, 4600);
    setTimeout(() => snackbar.remove(), 5000);

    // Snackbar Closing - On close / undo button click
    closeBtn = snackbar.querySelector(".close-snackbar-btn");
    closeBtn.addEventListener("click", function () {
        if (undo) undo();

        // SNACKBAR CLOSING - On Click - Add animation and remove
        snackbar.style.animation = `fadeScaleOut 0.5s linear`;
        setTimeout(() => snackbar.remove(), 500);
    })
}


/* ///////////////
    DIALOG BOX GENERATION CODE
/////////////// */


export function createDialog(options = {}) {
    // INITIALIZATION - Set default options and handle mandatory conditons
    const {
        illustration,
        headline,
        description,
        componentID,
        componentPreset = function (component) { },
        fullscreen = false,
        primaryBtnLabel = "Continue",
        secondaryBtnLabel = "Cancel",
        primaryAction = function () { return true },
        secondaryAction = function () { return true },
        danger = false,
        invert = false
    } = options;

    if (!headline) throw new Error("Provide a headline for Dialog");

    // GET AND MAKE COMPONENT VISIBLE
    const component = document.querySelector(`[data-dialog-id="${componentID}"]`);
    component?.setAttribute("aria-hidden", "false");

    if (componentPreset) componentPreset(component);

    // DIALOG SECTION CONSTRUCTION
    const dialogSec = document.createElement("section");
    dialogSec.classList.add("dialog-sec");
    if (fullscreen) dialogSec.classList.add("fullscreen")
    dialogSec.innerHTML = `
    <section class="dialog" style="animation: fadeScaleDownIn 0.5s linear">
    <h3 class="fs-500 center">${headline}</h3>
    <section class="dialog-body">
            ${illustration ? `<div><picture class="center dialog-illus"><img src="./assets/illus/${illustration}"></picture></div>` : ""}
            ${description ? `<div><p class="msg subtitle center">${description}</p></div>` : ""}
            ${component ? `<div class="dialog-component">${component?.outerHTML}</div>` : ""}
            </section>
            <div class="btn-box">
            ${secondaryBtnLabel !== false ? `<button class="ghost secondary-btn">${secondaryBtnLabel}</button>` : ""}
            <button class="primary primary-btn ${danger ? 'negative' : ''}">${primaryBtnLabel}</button>
            </div>
            </section>
            `;

    // REMOVE COMPONENT temporarily from DOM to avoid duplicancy issues before DialogSec population
    component?.remove();
    document.body.prepend(dialogSec);
    dialogSec.style.animation = `fadeIn 0.5s linear`;

    // Function Remove the Dialog box
    function removeDialogBox() {
        component?.setAttribute("aria-hidden", "true");
        if (component) document.body.prepend(component);
        dialogSec.style.animation = `fadeOut 0.5s linear`;
        dialogSec.querySelector(".dialog").style.animation = `fadeScaleOut 0.5s linear`;
        setTimeout(() => {
            document.body.querySelector(".dialog-sec").remove();
        }, 400);
    }

    // CLOSE DIALOG BY CANCEL BUTTON PRESS
    let secondaryBtn = dialogSec.querySelector(".secondary-btn");
    if (secondaryBtn) {
        secondaryBtn.addEventListener("click", function () {
            secondaryAction();
            removeDialogBox();
            return false;
        })
    }

    // CLOSE DIALOG BY PRIMARY BUTTON PRESS
    let primaryBtn = dialogSec.querySelector(".primary-btn");
    primaryBtn.addEventListener("click", function () {
        let doClose = primaryAction();
        if (doClose) {
            removeDialogBox();
            return true;
        }
    })
}

/* ///////////////
    Give HORIZONTAL SLIDER EFFECT TO ELEMENTS
/////////////// */

export function setAsSlider(slider) {
    slider.classList.add("slider");

    const elemChildrenList = Array.from(slider.children);
    elemChildrenList.forEach(child => child.classList.add("slide"));

    let isDown = false;
    let startX, scrollLeft;

    slider.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.cursor = "grabbing";
    })
    slider.addEventListener("mouseleave", (e) => {
        isDown = false;
        slider.style.cursor = "grab";
    })
    slider.addEventListener("mouseup", (e) => {
        isDown = false;
        slider.style.cursor = "grab";
    })
    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();

        const x = e.pageX - slider.offsetLeft;
        const walk = x - startX;
        slider.scrollLeft = scrollLeft - walk;

    })
}