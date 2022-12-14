const BasePage = require("./base.page");

const joinTheWaitListButtons = '[href*="#form"]';
const joinForm = "#form form";
const faqTitle = '//h2[contains(text(), "Frequently Asked Questions")]';
const accordionTitles = "[data-faq-question]";
const accordionContents = "[data-faq-answer]";

class StoragePage extends BasePage {
    async open() {
        await super.open("/products/storage");
        await super.closeCookies();
    }

    get successPageHeader() {
        return $("h1");
    }

    async getAccordionContents(number = 0) {
        return number == 0 ? await $$(accordionContents) : $$(accordionContents)[number - 1];
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

    async scrollToFAQ() {
        await $(faqTitle).scrollIntoView();
    }

    async toggleAccordion(number) {
        await $$(accordionTitles)[number - 1].click();
    }
}

module.exports = new StoragePage();
