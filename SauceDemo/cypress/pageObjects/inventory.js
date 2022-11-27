export class Inventory {
  clearCart() {
    cy.get("button[id^=remove]").click({ multiple: true })
  }
}