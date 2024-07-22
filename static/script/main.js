"use strict";

import { createSnackbar } from "./utils/components.js";
import {
  UI_CLASS,
  UI_SIZE,
  DATE_WEEK_DAYS,
  DATE_MONTHS_SHORT,
  UI_STATUS_FEEDBACK,
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

  pictureLogoArr.forEach((logo) => {
    let img = this.createElement("img");
    let type = ``;
    if (logo.getAttribute("data-white")) {
      type = "-white";
    } else if (logo.getAttribute("data-black")) {
      type = "-black";
    }

    img.src = `/static/assets/logo/logo${type}.svg`;
    switch (logo.getAttribute("data-size")) {
      default:
      case UI_SIZE.xs:
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
    if (logo.getAttribute("data-name")) {
      let logoName = this.createElement("p");
      logoName.innerHTML = `Pharmify`;
      logo.appendChild(logoName);
    }
    logo.appendChild(img);
  });

  // Input Tags
  refreshInputs();

  // Set Title Attributes for Accessibility
  setTitleAttr();

  // Set Icons to Respective Messages - Notes, Snackbars and Input Messages
  let errorElemsArr = this.querySelectorAll(
    "fieldset .msg.error, .snackbar.error .msg, .note.error"
  );
  let warnElemsArr = this.querySelectorAll(
    "fieldset .msg.warn, .snackbar.warn .msg, .note.warn"
  );
  let successElemsArr = this.querySelectorAll(
    "fieldset .msg.success, .snackbar.success .msg, .note.success"
  );
  let infoElemsArr = this.querySelectorAll(
    "fieldset .msg.info, .snackbar.info .msg, .note.info"
  );

  infoElemsArr.forEach((elem) => {
    setMsgIcons(elem, UI_CLASS.info);
  });
  successElemsArr.forEach((elem) => {
    setMsgIcons(elem, UI_CLASS.success);
  });
  warnElemsArr.forEach((elem) => {
    setMsgIcons(elem, UI_CLASS.warn);
  });
  errorElemsArr.forEach((elem) => {
    setMsgIcons(elem, UI_CLASS.error);
  });

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
    dateDayNumBoxArr.forEach((elem) => {
      elem.innerHTML = toTwoDigit(DATE.getDate());
    });

    // Month Name
    dateMonthBoxArr.forEach((elem) => {
      elem.innerHTML = DATE_MONTHS_SHORT[DATE.getMonth()];
    });

    // Year
    dateYearBoxArr.forEach((elem) => {
      elem.innerHTML = DATE.getFullYear();
    });

    // Weekday
    dateDayWeekBoxArr.forEach((elem) => {
      elem.innerHTML = DATE_WEEK_DAYS[DATE.getDay()];
    });

    // Current time
    timeBoxArr.forEach((elem) => {
      let hours = DATE.getHours();
      let meridian = hours >= 12 ? "PM" : "AM";
      elem.innerHTML = `${toTwoDigit(hours % 12 || hours)}:${toTwoDigit(
        DATE.getMinutes()
      )} ${meridian}`;
    });
  }, 1000);


  /* ///////////////
    Navigation Bar
  /////////////// */

  

});
