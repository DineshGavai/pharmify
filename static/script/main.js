"use strict"

import {
    UI_CLASSES,
    UI_SIZE,
    DATE_WEEK_DAYS,
    DATE_MONTHS_SHORT
} from "./utils/const.js";
import { refreshInputs } from "./utils/inputs.js";
import { toTwoDigit, setTitleAttr, setMsgIcons } from "./utils/utils.js";

document.addEventListener("DOMContentLoaded", function () {

    /* ///////////////
        SNACKBAR
    /////////////// */

    let snackbarSec = this.createElement("section");
    snackbarSec.classList.add("snackbar-sec");
    this.body.prepend(snackbarSec);


    /* ///////////////
        Populate UI elements and attributes
    /////////////// */

    // LOGO
    let pictureLogoArr = this.querySelectorAll(".logo");

    pictureLogoArr.forEach(logo => {
        let img = this.createElement("img");
        img.src = "../static/assets/logo/logo.svg";
        switch (logo.getAttribute("data-size")) {
            default: case UI_SIZE.xs:
                img.style.width = "3.2rem";
                break;
            case UI_SIZE.s:
                img.style.width = "4.8rem";
                break;
            case UI_SIZE.m:
                img.style.width = "6.4rem";
                break;
            case UI_SIZE.l:
                img.style.width = "8rem";

                break;
            case UI_SIZE.xl:
                img.style.width = "9.6rem";

                break;
        }
        if (logo.getAttribute("data-name") == "true") {
            let logoName = this.createElement("p");
            logoName.innerHTML = `Pharmify`;
            logo.appendChild(logoName)
        }
        logo.appendChild(img);
    });

    // Input Tags
    refreshInputs();

    // Set Title Attributes for Accessibility
    setTitleAttr();

    // Set Icons to Respective Messages - Notes, Snackbars and Input Messages
    let errorElemsArr = this.querySelectorAll("fieldset .msg.error, .snackbar.error .msg, .note.error");
    let warnElemsArr = this.querySelectorAll("fieldset .msg.warn, .snackbar.warn .msg, .note.warn");
    let successElemsArr = this.querySelectorAll("fieldset .msg.success, .snackbar.success .msg, .note.success");
    let infoElemsArr = this.querySelectorAll("fieldset .msg.info, .snackbar.info .msg, .note.info");

    setMsgIcons(infoElemsArr, UI_CLASSES.info);

    successElemsArr.forEach(elem => {
        let icon = this.createElement("span");
        icon.innerHTML = `<svg><use href="../static/assets/icon-sprite.svg#success"/></svg>`;
        elem.prepend(icon);
    })

    warnElemsArr.forEach(elem => {
        let icon = this.createElement("span");
        icon.innerHTML = `<svg><use href="../static/assets/icon-sprite.svg#warn"/></svg>`;
        elem.prepend(icon);
    })

    errorElemsArr.forEach(elem => {
        let icon = this.createElement("span");
        icon.innerHTML = `<svg><use href="../static/assets/icon-sprite.svg#error"/></svg>`;
        elem.prepend(icon);
    })


    /* ///////////////
        CURRENT DATE AND TIME HANDLING
    /////////////// */

    let dateDayNumBoxArr = this.querySelectorAll(".date-day-num");
    let dateDayWeekBoxArr = this.querySelectorAll(".date-day-week");
    let dateMonthBoxArr = this.querySelectorAll(".date-month");
    let dateYearBoxArr = this.querySelectorAll(".date-year");
    let timeBoxArr = this.querySelectorAll(".time");

    setInterval(() => {
        const DATE = new Date();

        // Date Day Number
        dateDayNumBoxArr.forEach(elem => {
            elem.innerHTML = toTwoDigit(DATE.getDate());
        })

        // Month Name
        dateMonthBoxArr.forEach(elem => {
            elem.innerHTML = DATE_MONTHS_SHORT[DATE.getMonth()];
        })

        // Year
        dateYearBoxArr.forEach(elem => {
            elem.innerHTML = DATE.getFullYear();
        })

        // Weekday
        dateDayWeekBoxArr.forEach(elem => {
            elem.innerHTML = DATE_WEEK_DAYS[DATE.getDay()];
        })

        // Current time
        timeBoxArr.forEach(elem => {
            let hours = DATE.getHours();
            let meridian = hours >= 12 ? "PM" : "AM";
            elem.innerHTML = `${toTwoDigit(hours % 12 || hours)}:${toTwoDigit(DATE.getMinutes())} ${meridian}`
        })
    }, 1000);

});