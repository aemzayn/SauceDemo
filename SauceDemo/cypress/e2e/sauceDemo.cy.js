import {Login} from "../pageObjects/login";

const login = new Login();

describe( 'Sauce Demo' ,  () => {
    

    it("BasarisiziGiris" , () => {
        login.navigate()
        cy.fixture("userdata1.json").as("user")
        
        cy.get("@user").then((user) => {
            login.login(user)
        })
    })

    it('BasariliGiris',() => {

        cy.fixture("userdata0.json").as("user")
        cy.get("@user").then((user) => {
            login.login(user)
        })
    })

})
