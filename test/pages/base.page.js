const cookiesCloseButton = '[aria-label="close and deny"]';
const firstNameInput = "#FirstName";
const lastNameInput = "#LastName";
const emailInput = "#Email";
const websiteInput = "#Website";
const submitButton = '[type="submit"]';
const errorMessages = {
    "First Name": "#ValidMsgFirstName",
    "Last Name": "#ValidMsgLastName",
    "Business email": "#ValidMsgEmail",
    "Company website": "#ValidMsgWebsite",
    "Choose reason for contact": "#ValidMsgReason_for_Contact__c",
    "Primary Interest": "#ValidMsgUse_Case_Form__c",
};

module.exports = class BasePage {
    async errorMessage(field) {
        return await $(errorMessages[field]);
    }

    /**
     * Opens a sub page of the page
     * @param path path of the sub page (e.g. /path/to/page.html)
     */
    async open(path) {
        await browser.setWindowSize(1920, 1080);
        return await browser.url(path);
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
