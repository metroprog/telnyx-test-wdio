const BasePage = require("./base.page");

const joinTheWaitListButtons = '[href*="#form"]';
const joinForm = "#form form";
const faqTitle = '//h2[contains(text(), "Frequently Asked Questions")]';
const accordionTitles = "[data-faq-question]";
const accordionContents = "[data-faq-answer]";

class StoragePage extends BasePage {
    open() {
        super.open("/products/storage");
        super.closeCookies();
    }

    get successPageHeader() {
        return $("h1");
    }

    async getAccordionContent(number) {
        return await $$(accordionContents)[number - 1];
    }

    async getAccordionsNumbers() {
        let accordionsCount = await $$(accordionTitles).length;
        let numbers = [...Array(accordionsCount + 1).keys()];
        numbers.splice(0, 1);
        return numbers;
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
