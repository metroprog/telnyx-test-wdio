const storagePage = require('../pages/storage.page');
const user = require("../pages/tools");

describe('Test Storage', () => {
    beforeEach(async() => {
        await storagePage.open();
    });
    
    it("successfully send 'Join the waitlist' form with valid values", async () => {
        await storagePage.goToJoinForm();
        await storagePage.fillAndSubmitJoinForm(user);
        await expect(browser).toHaveUrlContaining("/storage-waitlist");
        await expect(storagePage.successPageHeader).toHaveText("You're on the waitlist!");
    });

    it.only("cannot submit 'Join the waitlist form' with empty required fields", async () => {
        await storagePage.goToJoinForm();
        await storagePage.fillFirstNameInput(user.firstName);
        await storagePage.fillLastNameInput(user.lastName);
        await storagePage.submitForm();
        await expect(storagePage.errorMessage("email")).toHaveTextContaining("Must be valid email.");
        await browser.refresh();
        await storagePage.fillFirstNameInput(user.firstName);
        await storagePage.fillEmailInput(user.email);
        await storagePage.submitForm();
        await expect(storagePage.errorMessage("lastName")).toHaveText("This field is required.");
        await browser.refresh();
        await storagePage.fillLastNameInput(user.lastName);
        await storagePage.fillEmailInput(user.email);
        await storagePage.submitForm();
        await expect(storagePage.errorMessage("firstName")).toHaveText("This field is required.");
    });
});


