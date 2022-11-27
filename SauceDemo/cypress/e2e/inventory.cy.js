import { Inventory } from "../pageObjects/inventory";
import { Login } from "../pageObjects/login"

const login = new Login();
const inventory = new Inventory()

describe("Inventory", () => {
  before(() => {
    login.navigate()
    cy.fixture("valid_user.json").as("user")
    cy.get("@user").then((user) => {
      cy.login(user)
    })
  })

  it("should be in inventory page", () => {
    cy.location("pathname").should("equal", "/inventory.html")
  })

  it("should list all inventory items", () => {
    cy.get(".inventory_list")
      .should("be.visible")
      .children("div")
      .should("have.class", "inventory_item")
  })

  it("should add item to cart", () => {
    cy.getBySel("add-to-cart-sauce-labs-backpack").should("be.visible").click()
    cy.getBySel("add-to-cart-sauce-labs-bike-light").should("be.visible").click()
    cy.getBySel("add-to-cart-sauce-labs-bolt-t-shirt").should("be.visible").click()
    cy.getBySel("add-to-cart-sauce-labs-fleece-jacket").should("be.visible").click()
    cy.getBySel("add-to-cart-sauce-labs-onesie").should("be.visible").click()

    cy.get(".shopping_cart_badge")
      .should("be.visible")
      .and("contain", "5")

    inventory.clearCart()
  })

  it("should remove item from cart", () => {
    // adding items to cart
    cy.getBySel("add-to-cart-sauce-labs-fleece-jacket").should("be.visible").click()
    cy.getBySel("add-to-cart-sauce-labs-bolt-t-shirt").should("be.visible").click()
    cy.getBySel("add-to-cart-sauce-labs-onesie").should("be.visible").click()

    // click remove button
    cy.getBySel("remove-sauce-labs-onesie").should("be.visible").click()

    cy.get(".shopping_cart_badge")
      .should("be.visible")
      .and("contain", "2")

    inventory.clearCart()
  })

  it("should sort items from A to Z", () => {
    cy.getBySel("product_sort_container")
      .should("be.visible")
      .select("az")

    cy.get(".inventory_item").first().then(($item) => {
      cy.wrap($item)
        .find(".inventory_item_name")
        .should("be.visible")
        .should("have.text", "Sauce Labs Backpack")
    })

  })

  it("should sort items from Z to A", () => {
    cy.getBySel("product_sort_container")
      .should("be.visible")
      .select("za")

    cy.get(".inventory_item").first().then(($item) => {
      cy.wrap($item)
        .find(".inventory_item_name")
        .should("be.visible")
        .should("have.text", "Test.allTheThings() T-Shirt (Red)")
    })
  })

  it("should sort items by price from low to high", () => {
    cy.getBySel("product_sort_container")
      .should("be.visible")
      .select("lohi")

    cy.get(".inventory_item").first().then(($item) => {
      cy.wrap($item)
        .find(".inventory_item_name")
        .should("be.visible")
        .should("have.text", "Sauce Labs Onesie")

      cy.wrap($item)
        .find(".inventory_item_price")
        .should("be.visible")
        .should("have.text", "$7.99")
    })
  })

  it("should sort items by price from high to low", () => {
    cy.getBySel("product_sort_container")
      .should("be.visible")
      .select("hilo")

    cy.get(".inventory_item").first().then(($item) => {
      cy.wrap($item)
        .find(".inventory_item_name")
        .should("be.visible")
        .should("have.text", "Sauce Labs Fleece Jacket")

      cy.wrap($item)
        .find(".inventory_item_price")
        .should("be.visible")
        .should("have.text", "$49.99")
    })
  })
})