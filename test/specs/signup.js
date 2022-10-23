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
        await expect(signupPage.errorMessages).toHaveTextContaining([
            "unable to create a new account with this email.",
            "your browser could not be authenticated via recaptcha",
            "reCAPTCHA validation required",
        ]);
        await expect(browser).toHaveUrlContaining("/sign-up");
    });

    it("cannot sign up with already registered email", async () => {
        await signupPage.fillAndSubmitSignUpForm(user, "existingEmail");
        await expect(signupPage.errorMessages).toBeDisplayed();
        await expect(signupPage.errorMessages).toHaveTextContaining([
            "That email and password combination is not valid",
            "your browser could not be authenticated via recaptcha",
            "reCAPTCHA validation required",
        ]);
        await expect(browser).toHaveUrlContaining("/sign-up");
    });

    it("cannot sign up with invalid email", async () => {
        await signupPage.fillAndSubmitSignUpForm(user, "invalidEmail");
        await expect(signupPage.errorMessages).toBeDisplayed();
        await expect(signupPage.errorMessages).toHaveTextContaining("Please enter a valid email address.");
        await expect(browser).toHaveUrlContaining("/sign-up");
    });

    it("cannot sign up with invalid password", async () => {
        await signupPage.fillAndSubmitSignUpForm(user, "email", "invalidPassword");
        await expect(signupPage.passwordErrorMessage).toBeDisplayed();
        await expect(signupPage.passwordErrorMessage).toHaveTextContaining("Password must");
        await expect(browser).toHaveUrlContaining("/sign-up");
    });
});
