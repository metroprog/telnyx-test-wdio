class User {
    constructor() {
        this.firstName = "Test";
        this.lastName = "User";
        this.email = "testuser@example.com";
        this.password = "Password55!!";
        this.website = "https://example.com";
        this.existingEmail = "example@google.com";
        this.invalidEmail = "testuserexample.com";
        this.invalidPassword = "Password";
    }
}

module.exports = new User();
