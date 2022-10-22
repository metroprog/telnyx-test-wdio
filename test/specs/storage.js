const storagePage = require("../pages/storage.page");
const user = require("../pages/tools");
let accNumber = 1;

describe("Test Storage", () => {
    beforeEach(async () => {
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
        await expect(storagePage.errorMessage("Business email")).toHaveTextContaining("Must be valid email.");
        await browser.refresh();
        await storagePage.fillFirstNameInput(user.firstName);
        await storagePage.fillEmailInput(user.email);
        await storagePage.submitForm();
        await expect(storagePage.errorMessage("Last Name")).toHaveText("This field is required.");
        await browser.refresh();
        await storagePage.fillLastNameInput(user.lastName);
        await storagePage.fillEmailInput(user.email);
        await storagePage.submitForm();
        await expect(storagePage.errorMessage("First Name")).toHaveText("This field is required.");
    });

    it("only one accordion at a time can be opened and displayed its content", async () => {
        await storagePage.scrollToFAQ();
        await expect(storagePage.getAccordionContents(accNumber)).toHaveAttrContaining("data-is-open", "true");
        await expect(storagePage.getAccordionContents(accNumber)).toBeDisplayed();
        await storagePage.toggleAccordion(accNumber);
        let accordionsList = await storagePage.getAccordionContents();
        await accordionsList.map(async (e) => {
            await expect(e).toHaveAttrContaining("data-is-open", "false");
            await expect(e).not.toBeDisplayed();
        });
        accNumber = 2;
        await storagePage.toggleAccordion(accNumber);
        await expect(storagePage.getAccordionContents(accNumber)).toHaveAttrContaining("data-is-open", "true");
        await expect(storagePage.getAccordionContents(accNumber)).toBeDisplayed();
        await accordionsList.map(async (e, i) => {
            if (accNumber !== i + 1) {
                await expect(e).toHaveAttrContaining("data-is-open", "false");
                await expect(e).not.toBeDisplayed();
            }
        });
        accNumber = 3;
        await storagePage.toggleAccordion(accNumber);
        await expect(storagePage.getAccordionContents(accNumber)).toHaveAttrContaining("data-is-open", "true");
        await expect(storagePage.getAccordionContents(accNumber)).toBeDisplayed();
        await accordionsList.map(async (e, i) => {
            if (accNumber !== i + 1) {
                await expect(e).toHaveAttrContaining("data-is-open", "false");
                await expect(e).not.toBeDisplayed();
            }
        });
    });
});
