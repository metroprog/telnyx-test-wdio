const loginPage = require("../pages/login.page");
const user = require("../pages/tools");

describe("Test Login", () => {
    beforeEach(async () => {
        await loginPage.open();
    });

    it("cannot login with unregistered credentials", async () => {
        await loginPage.fillAndSubmitLogInForm(user);
        await expect(loginPage.getMessage("error")).toBeDisplayed();
        await expect(loginPage.getMessage("error")).toHaveTextContaining(
            "That email and password combination is not valid"
        );
        await expect(browser).toHaveUrlContaining("/sign-in");
    });

    it("cannot login with empty required fields", async () => {
        await loginPage.submitEmptyLoginForm();
        await expect(browser).toHaveUrlContaining("/sign-in");
        await expect(loginPage.getMessage("errorRequired")).toBeDisplayed();
        await expect(loginPage.getMessage("errorRequired")).toHaveTextContaining("Required");
        let requiredFieldsList = await loginPage.loginRequiredFields;
        await requiredFieldsList.map(async (e) => {
            await expect(e).toHaveElementProperty("border-color", "rgb(255, 102, 102)");
        });
    });

    it("cannot send Single Sign-On form with unregistered credentials", async () => {
        await loginPage.fillAndSubmitSSOForm(user);
        await expect(loginPage.getMessage("error")).toBeDisplayed();
        await expect(loginPage.getMessage("error")).toHaveTextContaining(
            "The requested resource or URL could not be found."
        );
        await expect(browser).toHaveUrlContaining("/sign-in");
    });

    it("successfully send 'Resend Verification Email' form", async () => {
        await loginPage.fillAndSubmitVerificationEmailForm(user);
        await expect(loginPage.getMessage("successResend")).toBeDisplayed();
        await expect(loginPage.getMessage("successResend")).toHaveTextContaining(
            "If your email address exists in our database, you will receive an email with instructions for how to confirm your email address in a few minutes."
        );
    });

	it.only("cannot send 'Resend Verification Email' form with empty field", async () => {
		await loginPage.submitEmptyVerificationEmailForm();
		await expect(loginPage.resendSubmitButton).toBeDisabled();
		await loginPage.resendEmailInput.click();
		await browser.keys('Tab');
		await loginPage.resendSubmitButton.click();
		await expect(loginPage.resendSubmitButton).toBeDisabled();
		await expect(loginPage.getMessage("errorRequired")).toBeDisplayed();
        await expect(loginPage.getMessage("errorRequired")).toHaveTextContaining("Required");
	});

    it("successfully send 'Password Reset' form", async () => {
        await loginPage.fillAndSubmitPasswordResetForm(user);
        await expect(loginPage.getMessage("successReset")).toBeDisplayed();
        await expect(loginPage.getMessage("successReset")).toHaveTextContaining(
            "We have accepted your password reset request. If you have a Telnyx account and are unable to reset your password successfully, please contact support for assistance."
        );
    });
});
