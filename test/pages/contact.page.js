const BasePage = require("./base.page");
const intTelLinks = "#intl-tel-list a";
const callUsLink = '//header//button[text()="Call Us"]';
const callUsPopUp = "#telnyx-click2call-dialog";
const telLink = `//*[@id="${callUsPopUp.substring(1)}"]//*[contains(text(),"+")]`;
const socialLinks = '[data-e2e="Footer--navItem-social"] a';
const talkToExpertLink = 'header [href*="contact-us"]';
const mainHeader = "main h1";
const reasonContactSelect = "#Reason_for_Contact__c";
const requiredFields = "form .mktoRequiredField input";

class ContactPage extends BasePage {
    async open() {
        await super.open("/contact-us");
        await super.closeCookies();
    }

    get intTelLinks() {
        return $$(intTelLinks);
    }

    get callUsPopUp() {
        return $(callUsPopUp);
    }

    get telLink() {
        return $(telLink).parentElement();
    }

    get socialLinks() {
        return $$(socialLinks);
    }

    get mainHeader() {
        return $(mainHeader);
    }

    get requiredFields() {
        return $$(requiredFields);
    }

    async getLinkText(linkElem) {
        return await linkElem.getText().replace(/\s/g, "");
    }

    async getLinkHref(linkElem) {
        return await linkElem.getAttribute("href").replace(/-/g, "").slice(4);
    }

    async clickCallUsLink() {
        await $(callUsLink).click();
    }

    async clickTalkToExpertLink() {
        await $$(talkToExpertLink)[0].click();
    }

    async chooseReasonSelect(index = 2) {
        await $(reasonContactSelect).selectByIndex(index);
    }

    async fillAndSubmitTalkExpertForm(userCreds) {
        await this.chooseReasonSelect();
        await this.fillFirstNameInput(userCreds.firstName);
        await this.fillLastNameInput(userCreds.lastName);
        await this.fillEmailInput(userCreds.email);
        await this.fillWebsiteInput(userCreds.website);
        await this.submitForm();
    }
}

module.exports = new ContactPage();
