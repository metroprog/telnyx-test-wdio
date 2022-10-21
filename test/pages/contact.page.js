const BasePage = require("./base.page");
const intTelLinks = "#intl-tel-list a";
const callUsLink = '//header//button[text()="Call Us"]';
const callUsPopUp = '#telnyx-click2call-dialog';
const telLink = `//*[@id="${callUsPopUp.substring(1)}"]//*[contains(text(),"+")]`;
const socialLinks = '[data-e2e="Footer--navItem-social"] a';

class ContactPage extends BasePage {
	open() {
        super.open("/contact-us");
        super.closeCookies();
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

	async getLinkText(linkElem) {
		return await linkElem.getText().replace(/\s/g, "");
	}

	async getLinkHref(linkElem) {
		return await linkElem.getAttribute('href').replace(/-/g, "").slice(4);
	}

	async clickCallUsLink() {
		$(callUsLink).click();
	}
}


module.exports = new ContactPage();