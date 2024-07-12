import { UI_STATUS_FEEDBACK, UI_CLASS } from "./const.js";
import { getFirstIfArray, getParentElement, setMsgIcons } from "./utils.js";

/* ///////////////
    INPUT's FUNCTIONALITY
/////////////// */

// FUNCTION to SET specified INPUT VALUE or REMOVE it not specified
export function setInputValue(inputTag, value = "") {
  inputTag.value = value;
}

// FUNCTION to SET TOGGLE INPUTS CHECKED
export function setToggleInputChecked(inputTagArr, value = "") {
  if (value || value != ``) return;

  inputTagArr.forEach((input) => (input.checked = input.value == value));
}

// FUNCTION to Allow NUMBER in the INPUTS
export function allowNumberInputOnly(inputTag) {
  inputTag.addEventListener("keydown", function (event) {
    // Allowed characters (including backspace and delete for editing)
    const allowedKeys = [
      "-",
      "+", // Allow for negative/positive numbers
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      ".", // Numeric characters
      "Backspace",
      "Delete",
      "Enter", // Editing keys
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown", // Navigation keys
      "Shift",
      "Control",
      "Tab",
      "Home",
      "End",
      "PageUp",
      "PageDown", // Standard modifier and movement keys
      "PrintScreen",
      "Insert",
      "NumLock",
      "CapsLock", // Additional user actions
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6",
      "F7",
      "F8",
      "F9",
      "F10",
      "F11",
      "F12", // Function keys (consider use case)
      "Escape",
    ];

    if (event.ctrlKey) return;

    // Prevent default behavior for disallowed keys
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  });
}

// OTP Input
export function handleOTPInput(inputArr) {
  inputArr.forEach((input, i) => {
    // Disable all keyboard keys except - number, functional and navigation keys
    allowNumberInputOnly(input);
    // Maximum length - 1 digits

    // Select when focused
    input.addEventListener("focus", (e) => {
      input.setSelectionRange(0, 1);
    });

    // Move to next location on input
    input.addEventListener("input", (e) => {
      input.value = input.value.slice(0, 1);
      if (input.value != ``) {
        inputArr[i + 1]?.focus();
      }
    });

    // Fill all boxes on paste
    input.addEventListener("paste", (e) => {
      e.preventDefault();
      const pastedOTP = e.clipboardData.getData("text");
      // Pasted OTP must be a 6 digit number
      if (parseInt(pastedOTP) !== NaN && pastedOTP.length == 6) {
        for (let j = 0; j < inputArr.length; j++) {
          inputArr[j].value = pastedOTP[j];
        }
      }
    });

    // Navigation back and forth on buttons pressed
    input.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Backspace":
          if (input.value == ``) inputArr[i - 1]?.focus();
          break;

        case "ArrowRight":
          inputArr[i + 1]?.focus();
          break;

        case "ArrowLeft":
          inputArr[i - 1]?.focus();
          break;

        case "End":
          inputArr[inputArr.length - 1]?.focus();
          break;

        case "Home":
          inputArr[0]?.focus();
          break;
      }
    });
  });
}

/* ///////////////
    INPUT's VALIDATION
/////////////// */

// FUNCTION to REFRESH INPUT TAG PROPERTIES
export function refreshInputs() {
  // FILLABLE INPUTS (all inputs except Radios and Checkboxes)
  let inputArr = document.querySelectorAll(
    "input:not([type=radio]):not([type=checkbox]), .text-input"
  );

  inputArr.forEach((input) => {
    // POPULATE 👁️ Password Visibility Button if current input is Password
    if (input.type == "password") {
      let passwordVisibilityBtn = document.createElement("button");
      passwordVisibilityBtn.type = "button";
      passwordVisibilityBtn.classList.add(
        "password-visibility-btn",
        "trail",
        "icon"
      );
      passwordVisibilityBtn.innerHTML = `
            <img src="../static/assets/eye.png" class="eye">
            <img src="../static/assets/eye-slash.png" class="eye-slash">
            `;

      // Get Parent Element of current Password Input and  append Eye button in it.
      input.parentNode.append(passwordVisibilityBtn);

      // Password Visibility Event
      passwordVisibilityBtn.addEventListener("click", function (e) {
        e.preventDefault();
        input.type = input.type == "password" ? "text" : "password";
        passwordVisibilityBtn.classList.toggle(
          "visible",
          input.type != "password"
        );
      });
    }
  });

  // TOGGLE INPUTS like Radio and Checkbox
  let inputToggleArr = document.querySelectorAll(
    "input[type=radio], input[type=checkbox]"
  );
  inputToggleArr.forEach((input) => {
    input.classList.add("toggle-input");
  });
}

// FUNCTION to SET specified INPUT MESSAGE
export function setInputMsg(inputTag, msg, status = UI_STATUS_FEEDBACK.error) {
  inputTag = getFirstIfArray(inputTag);
  removeInputMsg(inputTag, status);

  // Create message div
  const msgDiv = document.createElement("div");
  // Set class, by default, it's "error"
  msgDiv.classList.add("msg", status);
  msgDiv.innerHTML = `${msg}`;
  setMsgIcons(msgDiv, status);

  // Find parent for appending
  const fieldset = getParentElement(inputTag, UI_CLASS.fieldset);
  fieldset.append(msgDiv);
}

// FUNCTION to REMOVE specified INPUT MESSAGE
export function removeInputMsg(inputTag, status = UI_STATUS_FEEDBACK.error) {
  inputTag = getFirstIfArray(inputTag);

  const fieldset = getParentElement(inputTag, UI_CLASS.fieldset);
  // Get type of msg to be deleted, by default, "error"
  fieldset.querySelectorAll("." + status).forEach((div) => div.remove());
}

// FUNCTION for INPUT VALIDATION
export function validateInput(inputTag, errorMsg) {
  inputTag.value = inputTag.value.trim();
  if (inputTag.required && !inputTag.value) {
    setInputMsg(inputTag, "This field is required");
    return false;
  }

  const pattern = inputTag.pattern?.trim();
  if (!pattern || new RegExp(pattern).test(inputTag.value.trim())) {
    removeInputMsg(inputTag);
    return true;
  }

  setInputMsg(inputTag, errorMsg);
  return false;
}

// FUNCTION to validate TOGGLE INPUTS like radio and checkboxes
export function validateToggleInputs(
  toggleInputs,
  errorMsg = "This field is required"
) {
  removeInputMsg(toggleInputs);
  let isRequired = false,
    isChecked = false;
  toggleInputs.forEach((input) => {
    if (input.required) isRequired = true;
    if (input.checked) isChecked = true;
  });

  if (isRequired && !isChecked) {
    setInputMsg(toggleInputs, errorMsg);
    return false;
  }

  return true;
}

// FUNCTION TO VALIDATE OTP CODE INPUT
export function validateOTPInput(
  inputElemArr,
  digits,
  errorMsg = "This field is required"
) {
  removeInputMsg(inputElemArr);

  let enteredOTP = ``;

  inputElemArr.forEach((input) => {
    enteredOTP += input.value;
  });

  if (inputElemArr[0].required && !enteredOTP) {
    setInputMsg(inputElemArr, "This field is required");
    return false;
  }

  if (new RegExp(/^\d{6}$/).test(enteredOTP.trim())) {
    removeInputMsg(inputElemArr);
    return true;
  }

  setInputMsg(inputElemArr, errorMsg);
  return false;
}
