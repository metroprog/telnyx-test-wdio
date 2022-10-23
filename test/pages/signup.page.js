const BasePage = require("./base.page");
const emailInput = "#email";
const fullNameInput = "#full_name";
const passwordInput = "#password";
const termsAndConditionsCheckbox = "[aria-labelledby='terms-label']";
const errorMessages = '[id*="_error"]';
const requiredFields = "input[required]";
const passwordErrorMessage = "#password_requirements";

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

    get passwordErrorMessage() {
        return $(passwordErrorMessage);
    }

    async fillEmailInput(email) {
        await $(emailInput).setValue(email);
    }

    async fillAndSubmitSignUpForm(userCreds, typeEmail = "email", typePassword = "password") {
        await this.fillEmailInput(userCreds[typeEmail]);
        await $(fullNameInput).setValue(`${userCreds.firstName} ${userCreds.lastName}`);
        await $(passwordInput).setValue(userCreds[typePassword]);
        await $(termsAndConditionsCheckbox).click();
        await this.submitForm();
    }
}

module.exports = new SignupPage();
