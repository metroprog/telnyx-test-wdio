const BasePage = require("./base.page");

const joinTheWaitListButtons = '[href*="#form"]';
const joinForm = "#form form";
const signUpButtons = 'main [href*="sign-up"]';
const storageButtons = 'main [href*="storage"]';
const accordionTitles = "[data-faq-question]";
const accordionContents = "[data-faq-answer]";

class StoragePage extends BasePage {
    open() {
        super.open("products/storage");
        super.closeCookies();
    }

    get successPageHeader() {
        return $("h1");
    }

    async goToJoinForm() {
        await $(joinTheWaitListButtons).click();
        await expect(browser).toHaveUrlContaining("#form");
        await $(joinForm).waitForDisplayed({ timeout: 10000 });
    }

    async fillAndSubmitJoinForm(userCreds) {
        await this.fillFirstNameInput(userCreds.firstName);
        await this.fillLastNameInput(userCreds.lastName);
        await this.fillEmailInput(userCreds.email);
        await this.submitForm();
    }
}

module.exports = new StoragePage();
