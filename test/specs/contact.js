const contactPage = require("../pages/contact.page");
const user = require("../pages/tools");
const socialUrls = [
    "https://www.linkedin.com/company/telnyx",
    "https://twitter.com/telnyx",
    "https://www.facebook.com/Telnyx",
];

describe("Test Contact", () => {
    beforeEach(async () => {
        await contactPage.open();
    });

    it("verify phone number in 'Call us' pop-up", async () => {
        await contactPage.clickCallUsLink();
        await expect(contactPage.callUsPopUp).toBeDisplayed();
        await expect(contactPage.telLink).toHaveAttrContaining("href", "tel");
    });

    it("verify social links", async () => {
        let socialLinksList = await contactPage.socialLinks;
        await socialLinksList.map(async (e, i) => {
            await expect(e).toHaveAttrContaining("href", socialUrls[i]);
        });
    });

    it("verify phone numbers in 'Calling from overseas' section", async () => {
        let intTelLinksList = await contactPage.intTelLinks;
        await intTelLinksList.map(async (e) => {
            await expect(e).toHaveAttrContaining("href", "tel");
            await expect(contactPage.getLinkText(e)).toEqual(contactPage.getLinkHref(e));
        });
    });

    it("successfully send 'Talk to an expert' form with valid values", async () => {
        await contactPage.clickTalkToExpertLink();
        await expect(contactPage.mainHeader).toHaveText("Talk to an expert");
        await contactPage.fillAndSubmitTalkExpertForm(user);
        await expect(browser).toHaveUrlContaining("/thank-you");
        await expect(contactPage.mainHeader).toHaveText("Thanks for Reaching Out!");
    });

    it("cannot send 'Talk to an expert' form with empty required fields", async () => {
        await contactPage.clickTalkToExpertLink();
        await expect(contactPage.mainHeader).toHaveText("Talk to an expert");
        await contactPage.submitForm();
        await expect(browser).toHaveUrlContaining("/contact-us");
        await expect(contactPage.errorMessage("reasonContact")).toBeDisplayed();
        await expect(contactPage.errorMessage("reasonContact")).toHaveText("This field is required.");
        await expect(contactPage.requiredFields).toHaveElementClass("mktoInvalid");
    });
});
