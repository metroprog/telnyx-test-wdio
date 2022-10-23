const signupPage = require("../pages/signup.page");
const user = require("../pages/tools");

describe("Test SignUp", () => {
    beforeEach(async () => {
        await signupPage.open();
    });

    it("cannot submit 'Signup' form with empty fields", async () => {
        await signupPage.submitForm();
        await expect(signupPage.errorMessages).toBeDisplayed();
        await expect(signupPage.errorMessages).toHaveTextContaining("This field is required.");
        await expect(signupPage.requiredFields).toHaveAttr("aria-invalid", "true");
        await expect(browser).toHaveUrlContaining("/sign-up");
    });

    it("cannot sign up with not business email", async () => {
        await signupPage.fillAndSubmitSignUpForm(user);
        await expect(signupPage.errorMessages).toBeDisplayed();
        await expect(signupPage.errorMessages).toHaveTextContaining(
            "We were unable to create a new account with this email. Please email support@telnyx.com for help with creating an account."
        );
    });
});
