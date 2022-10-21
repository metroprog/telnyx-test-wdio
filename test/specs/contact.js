const contactPage = require("../pages/contact.page");
const socialUrls = [
	"https://www.linkedin.com/company/telnyx",
	"https://twitter.com/telnyx",
	"https://www.facebook.com/Telnyx"
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

	it.only("verify social links", async () => {
		let socialLinksList = await contactPage.socialLinks;
		await socialLinksList.map(async (e, i) => {
			await expect(e).toHaveAttrContaining("href", socialUrls[i]);
		});
    });

	it("verify phone numbers in 'Calling from overseas' section", async () => {
		let intTelLinksList = await contactPage.intTelLinks;
		await intTelLinksList.map(async (e) => {
			await expect(e).toHaveAttrContaining("href", "tel");
			await expect(await contactPage.getLinkText(e) == await contactPage.getLinkHref(e));
		});
    });

});

