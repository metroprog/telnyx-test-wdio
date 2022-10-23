class User {
    constructor() {
        this.firstName = "Test";
        this.lastName = "User";
        this.email = "testuser@example.com";
        this.password = "Password55!!";
        this.website = "https://example.com";
        this.existingEmail = "example@google.com";
    }
}

module.exports = new User();
