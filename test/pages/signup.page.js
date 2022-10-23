const BasePage = require("./base.page");
const emailInput = "#email";
const fullNameInput = "#full_name";
const passwordInput = "#password";
const termsAndConditionsCheckbox = "[aria-labelledby='terms-label']";
const errorMessages = '[id*="_error"]';
const requiredFields = "input[required]";

class SignupPage extends BasePage {
    async open() {
        await super.open("/sign-up");
        await super.closeCookies();
    }

    get errorMessages() {
        return $(errorMessages);
    }

    get requiredFields() {
        return $(requiredFields);
    }

    async fillEmailInput(email) {
        await $(emailInput).setValue(email);
    }

    async fillAndSubmitSignUpForm(userCreds) {
        await this.fillEmailInput(userCreds.email);
        await $(fullNameInput).setValue(`${userCreds.firstName} ${userCreds.lastName}`);
        await $(passwordInput).setValue(userCreds.password);
        await $(termsAndConditionsCheckbox).click();
        await this.submitForm();
    }
}

module.exports = new SignupPage();
