const storagePage = require('../pages/storage.page');
const user = require("../pages/tools");
let accNumber = 1;

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

    it("cannot submit 'Join the waitlist form' with empty required fields", async () => {
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

    it.only("only one accordion at a time can be opened and displayed its content", async () => {
        await storagePage.scrollToFAQ();
        await browser.pause(5000);
        await expect(storagePage.getAccordionContent(accNumber)).toHaveAttrContaining("data-is-open", "true");
        await expect(storagePage.getAccordionContent(accNumber)).toBeDisplayed();
        await storagePage.toggleAccordion(accNumber);
        for (let number of await storagePage.getAccordionsNumbers()) {
            if (number == accNumber) {
                continue;
            }
            await expect(storagePage.getAccordionContent(accNumber)).toHaveAttrContaining("data-is-open", "false");
            await expect(storagePage.getAccordionContent(accNumber)).not.toBeDisplayed();
        }
        accNumber = 2;
        await storagePage.toggleAccordion(accNumber);
        await expect(storagePage.getAccordionContent(accNumber)).toHaveAttrContaining("data-is-open", "true");
        await expect(storagePage.getAccordionContent(accNumber)).toBeDisplayed();
        // storagePage.assertAccordionsAreClosedExcept(accNumber);
        // accNumber = 3;
        // storagePage.toggleAccordion(accNumber);
        // storagePage.assertAccordionIsOpened(accNumber);
        // storagePage.assertAccordionsAreClosedExcept(accNumber);
    });
});


