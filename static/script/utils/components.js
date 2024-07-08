import { UI_STATUS_FEEDBACK } from "./const.js";

/* ///////////////
    COMPONENTS
/////////////// */

// SNACKBAR GENERATION FUNCTION

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
        : `<button class="icon close-snackbar-btn"><i class="bi bi-x-lg"></i></button>`;
    snackbar.innerHTML = `<p class="fs-400 msg">${msg}</p> ${closeBtn}`;
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


//  DIALOG BOX COMPONENT CREATOR

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

    refreshInputs();

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