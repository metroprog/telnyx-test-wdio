const BasePage = require("./base.page");
const loginTab = '[data-testid="login.signin.tab.login"]';
const ssoTab = '[data-testid="login.signin.tab.sso"]';
const loginForm = '[aria-label="loginForm"]';
const ssoForm = '[aria-label="ssoForm"]';
const resendEmailForm = '[aria-label="resendEmailForm"]';
const passwordResetForm = '[aria-label="passwordResetForm"]';
const emailInput = '[name="email"]';
const passwordInput = '[name="password"]';
const submitButton = '[type="submit"]';
const messages = {
    error: '[data-testid="login.signin.message"]',
    successResend: '[data-testid="login.resend.message"]',
    successReset: '[data-testid="login.pwreset.message"]',
	errorRequired: '[class*="TextField__ErrorMessage"]'
};
const resendEmailLink = '[href*="/resend-email"]';
const passwordResetLink = '[href*="/password-reset"]';
const requiredFields = '.ui-reactv2-input';

class LoginPage extends BasePage {
    async open() {
        await super.open("https://portal.telnyx.com/");
        await super.closeCookies();
    }

    get loginRequiredFields() {
        return $$(`${loginForm} ${requiredFields}`);
    }

    async getMessage(field) {
        return await $(messages[field]);
    }

    async fillAndSubmitLogInForm(userCreds) {
        await $(loginTab).click();
        await $(`${loginForm} ${emailInput}`).setValue(userCreds.email);
        await $(`${loginForm} ${passwordInput}`).setValue(userCreds.password);
        await $(`${loginForm} ${submitButton}`).click();
    }

	async submitEmptyLoginForm() {
		await $(loginTab).click();
		await $(`${loginForm} ${submitButton}`).click();
	}

    async fillAndSubmitSSOForm(userCreds) {
        await $(ssoTab).click();
        await $(`${ssoForm} ${emailInput}`).setValue(userCreds.email);
        await $(`${ssoForm} ${submitButton}`).click();
    }

    async fillAndSubmitVerificationEmailForm(userCreds) {
        await $(resendEmailLink).click();
        await $(`${resendEmailForm} ${emailInput}`).setValue(userCreds.email);
        await $(`${resendEmailForm} ${submitButton}`).click();
    }

    async fillAndSubmitPasswordResetForm(userCreds) {
        await $(passwordResetLink).click();
        await $(`${passwordResetForm} ${emailInput}`).setValue(userCreds.email);
        await $(`${passwordResetForm} ${submitButton}`).click();
    }
}

module.exports = new LoginPage();
