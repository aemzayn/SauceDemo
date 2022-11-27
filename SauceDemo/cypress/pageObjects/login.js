
export class Login {
    navigate() {
        cy.visit("https://www.saucedemo.com/")
    }

    typeUsernameTextBox(username) {
        cy.get("#user-name").clear().type(username)
    }

    typePasswordTextBox(password) {
        cy.get("#password").clear().type(password)
    }

    clickLoginButton() {
        cy.get("#login-button").click()
    }

    login(user) {
        this.typeUsernameTextBox(user.username)
        this.typePasswordTextBox(user.password)
        this.clickLoginButton()
    }
}