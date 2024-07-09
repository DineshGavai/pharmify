import { UI_CLASSES } from "./utils/const.js";
import { setInputMsg, validateInput } from "./utils/inputs.js";
import { setMsgIcons } from "./utils/utils.js";

document.addEventListener("DOMContentLoaded", () => {

    let loginForm = document.getElementById("login_form");
    let loginEmailInput = document.getElementById("login_email");
    let loginPasswordInput = document.getElementById("login_password");
    let loginValidateBtn = document.getElementById("login_validate_btn");
    let loginBtn = document.getElementById("login_login_btn");

    loginValidateBtn.addEventListener("click", (e) => {
        e.preventDefault();

        let validationArray = [
            validateInput(loginEmailInput),
            validateInput(loginPasswordInput)
        ];
        
        if (!validationArray.includes(false)) {
            console.log(loginBtn);
            loginBtn.click();
        }
    })

});
