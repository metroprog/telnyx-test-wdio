const storagePage = require('../pages/storage.page');
const user = require("../pages/tools");

describe('Test Storage', () => {
    it('Successfully join the waitlist by sending form with valid values', async () => {
        await storagePage.open();
        await storagePage.goToJoinForm();
        await storagePage.fillAndSubmitJoinForm(user);
        await expect(browser).toHaveUrlContaining("/storage-waitlist");
        await expect(storagePage.successPageHeader).toHaveText("You're on the waitlist!");
    });
});


