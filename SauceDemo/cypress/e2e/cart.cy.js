import { Inventory } from "../pageObjects/inventory"
import { Login } from "../pageObjects/login"

const login = new Login()
const inventory = new Inventory()

describe('Cart', () => {
  beforeEach(() => {
    login.navigate()
    cy.fixture("valid_user.json").as("user")
    cy.get("@user").then((user) => {
      cy.login(user)
    })
  })

  it("should show corrent amount of items in cart", () => {
    cy.getBySel("add-to-cart-sauce-labs-backpack").click()
    cy.getBySel("add-to-cart-sauce-labs-bike-light").click()
    cy.getBySel("add-to-cart-sauce-labs-bolt-t-shirt").click()

    // go to cart page
    cy.get("a.shopping_cart_link").click()
    cy.location("pathname").should("equal", "/cart.html")

    cy.get(".cart_item").should("have.length", 3)

    // clean up
    inventory.clearCart()
    cy.getBySel("continue-shopping").click()
  })

  it("should checkout cart", () => {
    // cy.visit("https://www.saucelab.com/inventory.html")

    cy.getBySel("add-to-cart-sauce-labs-backpack").click()
    cy.getBySel("add-to-cart-sauce-labs-bike-light").click()
    cy.getBySel("add-to-cart-sauce-labs-bolt-t-shirt").click()

    // go to cart page
    cy.get("a.shopping_cart_link").click()

    // go to checkout page
    cy.getBySel("checkout").click()
    cy.location("pathname").should("equal", "/checkout-step-one.html")

    // fill out form
    cy.getBySel("firstName").clear().type("John Doe")
    cy.getBySel("lastName").clear().type("John Doe")
    cy.getBySel("postalCode").clear().type("16285")
    cy.getBySel("continue").click()

    cy.location("pathname").should("equal", "/checkout-step-two.html")
    cy.getBySel("finish").click()

    cy.location("pathname").should("equal", "/checkout-complete.html")
    cy.get(".complete-header").should("be.visible").and("have.text", "THANK YOU FOR YOUR ORDER")
  })
})  