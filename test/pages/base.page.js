const cookiesCloseButton = '[aria-label="close and deny"]';
const firstNameInput = "#FirstName";
const lastNameInput = "#LastName";
const emailInput = "#Email";
const websiteInput = "#Website";
const submitButton = '[type="submit"]';
const errorMessages = {
    firstName: "#ValidMsgFirstName",
    lastName: "#ValidMsgLastName",
    email: "#ValidMsgEmail",
    website: "#ValidMsgWebsite",
    reasonContact: "#ValidMsgReason_for_Contact__c",
    primaryInterest: "#ValidMsgUse_Case_Form__c",
};

module.exports = class BasePage {
    errorMessage(field) {
        return $(errorMessages[field]);
    }

    /**
     * Opens a sub page of the page
     * @param path path of the sub page (e.g. /path/to/page.html)
     */
    open(path) {
        browser.setWindowSize(1920, 1080);
        return browser.url(`${path}`);
    }

    async closeCookies() {
        if (await $(cookiesCloseButton).isDisplayed()) {
            await $(cookiesCloseButton).click();
        }
    }

    async fillFirstNameInput(firstName) {
        await $(firstNameInput).setValue(firstName);
    }

    async fillLastNameInput(lastName) {
        await $(lastNameInput).setValue(lastName);
    }

    async fillEmailInput(email) {
        await $(emailInput).setValue(email);
    }

    async fillWebsiteInput(website) {
        await $(websiteInput).setValue(website);
    }

    async submitForm() {
        await $(submitButton).click();
    }
};
