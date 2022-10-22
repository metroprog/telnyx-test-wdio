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

    it("successfully send 'Password Reset' form", async () => {
        await loginPage.fillAndSubmitPasswordResetForm(user);
        await expect(loginPage.getMessage("successReset")).toBeDisplayed();
        await expect(loginPage.getMessage("successReset")).toHaveTextContaining(
            "We have accepted your password reset request. If you have a Telnyx account and are unable to reset your password successfully, please contact support for assistance."
        );
    });
});
