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
        await signupPage.fillAndSubmitSignUpForm(user, "valid");
        await expect(signupPage.errorMessages).toBeDisplayed();
        await expect(signupPage.errorMessages).toHaveTextContaining(
            "unable to create a new account with this email.",
            "your browser could not be authenticated via recaptcha",
            "reCAPTCHA validation required"
        );
    });

    it.only("cannot sign up with already registered email", async () => {
        await signupPage.fillAndSubmitSignUpForm(user, "exist");
        await expect(signupPage.errorMessages).toBeDisplayed();
        await expect(signupPage.errorMessages).toHaveTextContaining(
            "That email and password combination is not valid",
            "your browser could not be authenticated via recaptcha",
            "reCAPTCHA validation required"
        );
    });
});
