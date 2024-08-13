import { DATE_MONTHS_SHORT } from "./const.js";

/* ///////////////
    MISCELLANEOUS HELPER UTILITY FUNCTION
/////////////// */


// Convert single digit number to 2 digit
export function toTwoDigit(num) {
  return ("0" + num).slice(-2);
}

// Generate random integer between given number
// FISHER YATES SHUFFLE
export function getRandomInRange(min, max) {
  // Create an array [start,......,end]
  const allNumbers = [];
  for (let i = min; i <= max; i++) {
    allNumbers.push(i);
  }
  // Fisher-Yates Array shuffle
  let i = allNumbers.length;
  while (i !== 0) {
    let randomIndex = Math.floor(Math.random() * i);
    i--;
    // Swap current element with random index
    [allNumbers[i], allNumbers[randomIndex]] = [
      allNumbers[randomIndex],
      allNumbers[i],
    ];
  }

  // Return Random Array element
  return allNumbers[Math.floor(Math.random() * allNumbers.length)];
}

// If given ELEMENT is an ARRAY, return the first element.
export function getFirstIfArray(elems) {
  if (Array.isArray(elems) || elems instanceof NodeList) return elems[0];
  else return elems;
}

/* ///////////////
    FUNCTIONS for DOM TRAVERSAL
/////////////// */

// FUNCTION to TRAVERSE and RETURN the PARENT with given class
export function getParentElement(element, targetParent) {
  element = getFirstIfArray(element);
  let parent = element.parentNode;

  while (parent && parent.tagName !== "BODY") {
    if (parent.tagName.toUpperCase() === targetParent.toUpperCase()) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return null; // No parent found with the target class
}

// FUNCTION to Set Title Attribute
export function setTitleAttr() {
  let textElementsArr = document.querySelectorAll(
    "p, h1, h2, h3, h4, h5, h6, th, td"
  );

  textElementsArr.forEach((elem) => {
    elem.setAttribute("title", elem.innerText);
  });
}

// Set Icons to Respective Messages - Notes, Snackbars and Input Messages
export function setMsgIcons(elem, iconName) {
  if (elem.querySelector(".icon")) return;
  if (!elem) return;
  let icon = document.createElement("span");
  icon.className = "icon";
  icon.innerHTML = getIconFromSprite(iconName);
  elem.prepend(icon);
}

// Get SVG SPRITE FILE ICONS PATH
export function getIconFromSprite(iconName) {
  return `<svg class="icon"><use href="/static/assets/icon-sprite.svg#${iconName}"/></svg>`
}



/* ///////////////
DATA STORAGE FUNCTIONS
/////////////// */

// FUNCTION to SAVE data to storage throughout the project
export function saveToStorage(key, data) {
  try {
    if (!key || typeof key !== "string") {
      throw new Error("Invalid key: Key must be a non-empty string.");
    }

    data = data.filter(item => item !== null);

    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);

  } catch (error) {
    return null;
  }
}

// FUNCTION to READ data to storage throughout the project
export function getFromStorage(key) {
  try {
    if (!key || typeof key !== "string") {
      throw new Error("Invalid key: Key must be a non-empty string.");
    }

    // Retrieve data
    const storedData = localStorage.getItem(key);
    if (!storedData) {
      throw new Error("Key not found");
    }

    // Parse retrieved data
    const parsedData = JSON.parse(storedData);

    return parsedData;

  } catch (error) {
    return null;
  }
}

/* ///////////////
  DATE, TIME and CURRENCY FORMMATING
/////////////// */

export function formatCommonDate(dateStr) {
  const DATE = new Date(dateStr);
  return `${toTwoDigit(DATE.getDate())} ${DATE_MONTHS_SHORT[DATE.getMonth()]}, ${DATE.getFullYear()}`;
}

export function addDates(date1, date2) {
  return new Date(date2).getDate() + new Date(date1).getDate();
}

export function subtractDates(date1, date2) {
  return new Date(date2).getDate() - new Date(date1).getDate();
}

export function formatCurrencyINR(num) {
  // Convert to String and Split the Integer and Decimal Part
  num = num.toString();
  let [integerPart, decimalPart] = num.split('.');
  // Format the Integer part
  integerPart = integerPart.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  // Join the Integer + Decimal part if it exists
  num = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
  return "₹ " + num;
}
