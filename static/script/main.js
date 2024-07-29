"use strict";

import { createSnackbar, setAsSlider } from "./utils/components.js";
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
  let pictureLogoList = this.querySelectorAll(".logo");

  pictureLogoList.forEach((logo) => {
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
  let errorElemsList = this.querySelectorAll(
    "fieldset .msg.error, .snackbar.error .msg, .note.error"
  );
  let warnElemsList = this.querySelectorAll(
    "fieldset .msg.warn, .snackbar.warn .msg, .note.warn"
  );
  let successElemsList = this.querySelectorAll(
    "fieldset .msg.success, .snackbar.success .msg, .note.success"
  );
  let infoElemsList = this.querySelectorAll(
    "fieldset .msg.info, .snackbar.info .msg, .note.info"
  );

  infoElemsList.forEach((elem) => {
    setMsgIcons(elem, UI_CLASS.info);
  });
  successElemsList.forEach((elem) => {
    setMsgIcons(elem, UI_CLASS.success);
  });
  warnElemsList.forEach((elem) => {
    setMsgIcons(elem, UI_CLASS.warn);
  });
  errorElemsList.forEach((elem) => {
    setMsgIcons(elem, UI_CLASS.error);
  });

  /* ///////////////
        CURRENT DATE AND TIME HANDLING
    /////////////// */

  let dateDayNumBoxList = this.querySelectorAll(".date-day-num");
  let dateDayWeekBoxList = this.querySelectorAll(".date-day-week");
  let dateMonthBoxList = this.querySelectorAll(".date-month");
  let dateYearBoxList = this.querySelectorAll(".date-year");
  let timeBoxList = this.querySelectorAll(".time");

  setInterval(() => {
    const DATE = new Date();

    // Date Day Number
    dateDayNumBoxList.forEach((elem) => {
      elem.innerHTML = toTwoDigit(DATE.getDate());
    });

    // Month Name
    dateMonthBoxList.forEach((elem) => {
      elem.innerHTML = DATE_MONTHS_SHORT[DATE.getMonth()];
    });

    // Year
    dateYearBoxList.forEach((elem) => {
      elem.innerHTML = DATE.getFullYear();
    });

    // Weekday
    dateDayWeekBoxList.forEach((elem) => {
      elem.innerHTML = DATE_WEEK_DAYS[DATE.getDay()];
    });

    // Current time
    timeBoxList.forEach((elem) => {
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

  let navbar = document.querySelector("nav");
  let navOpenBtn = document.querySelector(".nav-open-btn");
  let navCloseBtn = document.querySelector(".nav-close-btn");

  // Opening Navbar - add .visible class
  navOpenBtn?.addEventListener("click", () => {
    navbar.classList.add("visible");
    navOpenBtn.classList.add("visible");
  })
  // Closing Navbar - remove .visible class
  navCloseBtn?.addEventListener("click", () => {
    navbar.classList.remove("visible");
    navOpenBtn.classList.remove("visible");
  })
  // Closing Navbar when clicked on Scrim - remove .visible class
  navbar?.addEventListener("click", (e) => {
    if (e.target === navbar) {
      navbar.classList.remove("visible");
      navOpenBtn.classList.remove("visible");
    }
  })

  // Navbar's drop down menu items expand and collapse effect - toggle .visible class
  let dropDownNavItemList = document.querySelectorAll("nav .has-submenu");
  let navSubmenus = document.querySelectorAll("submenu");

  if (dropDownNavItemList) {
    dropDownNavItemList.forEach(menuItem => {
      menuItem?.addEventListener("click", () => {
        menuItem.classList.toggle("visible");
      });
    })
  }


  /* ///////////////
    TABs
  /////////////// */

  // Function to Update active tab indicator
  function updateActiveTab(ctr) {
    let activeTab = ctr.querySelector(".tab.active");
    let indicator = ctr.querySelector(".indicator");
    let tabWidth = activeTab.clientWidth;
    indicator.style.setProperty("--width", (tabWidth * 0.60) + "px");
    indicator.style.setProperty("--left", (activeTab.offsetLeft + (tabWidth / 6)) + "px");
    ctr.scrollLeft = activeTab.offsetLeft - (tabWidth / 6);
  }

  // Enlist all Tab containers
  let tabCtrList = document.querySelectorAll(".tab-sec");

  tabCtrList.forEach(ctr => {

    setAsSlider(ctr);

    // Set currently active tab
    let tabList = ctr.querySelectorAll(".tab");
    updateActiveTab(ctr);

    // Tab navigation
    tabList.forEach(tab => {

      tab?.addEventListener("click", () => {
        // Remove active status from other tabs
        tabList.forEach(otherTab => otherTab.classList.remove("active"));

        // Add active status to current tab
        tab.classList.add("active");
        updateActiveTab(ctr);
      })
    })
  })



});
