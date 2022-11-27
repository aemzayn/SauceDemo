import { Login } from "../pageObjects/login";

const login = new Login();

describe('User login', () => {
    beforeEach(function () {
        login.navigate()
    })

    it("should redirect unauthenticated user to login page", () => {
        cy.visit("https://www.saucedemo.com/inventory.html", {
            failOnStatusCode: false
        })
        cy.location("pathname").should("equal", "/")
        cy.get('h3[data-test="error"]')
            .should("be.visible")
            .invoke("text")
            .and("include", "Epic sadface: You can only access '/inventory.html' when you are logged in.")
    })

    it("should error for invalid user", () => {
        cy.fixture("invalid_user.json").as("user")
        cy.get("@user").then((user) => {
            cy.login(user)
        })
        cy.get('h3[data-test="error"]')
            .should("be.visible")
            .invoke("text")
            .and("include", "Epic sadface: Username and password do not match any user in this service")
    })

    it("should error for blocked user", () => {
        cy.fixture("locked_user.json").as("user")
        cy.get("@user").then(user => {
            cy.login(user)
        })
        cy.get('h3[data-test="error"]')
            .should("be.visible")
            .invoke("text")
            .and("include", "Epic sadface: Sorry, this user has been locked out.")
    })

    it("should redirect user to inventory page after successful login", () => {
        cy.fixture("valid_user.json").as("user")
        cy.get("@user").then((user) => {
            cy.login(user)
        })
        cy.location("pathname").should("equal", "/inventory.html");
    })

    it("should redirect to login page after sign out", () => {
        cy.fixture("valid_user.json").as("user")
        cy.get("@user").then((user) => {
            cy.login(user)
        })
        cy.get("#react-burger-menu-btn").click()
        cy.wait(500)
        cy.get("a#logout_sidebar_link")
            .should("be.visible")
            .invoke("text")
            .and("include", "Logout")

        cy.get("a#logout_sidebar_link")
            .click()
        cy.location("pathname").should("equal", "/")
    })
})
