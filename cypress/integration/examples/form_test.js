describe('Form inputs', () => {
    it('Navigates to App', () => {
        cy.visit('http://localhost:3000/')
        cy.url()
        .should('include', 'localhost')
    })

    

    it('Adds a Name', () => {
        cy.get('input[name="name"]')
            .type('karmaeiic')
            .should('have.value', "karmaeiic")
    })

    it('Adds a Pizza Size', () => {
        cy.get('input[name="pizzaSize"]')
            .type('Small')
            .should('have.value', "Small")
    })

    it('Adds a Sauce', () => {
        cy.get('input[name="pizzaSauce"]')
            .type('Garlic Ranch')
            .should('have.value', "Garlic Ranch")
    })

    
    it('Submits inputs', () => {
        cy.get('button.submit')
            .should('not.be.disabled')
    })
})

describe('wont submit with missing inputs', () => {
    it('wont submit when Pizza Elements are missing', () => {
        cy.visit('http://localhost:3000/')
        cy.get('input[name="name"]').type('karmaeiic')
        cy.get('input[name="pizzaSauce"]').type('Garlic Ranch')
        cy.get('input[name="pizzaSize"]').type('Small')
        cy.get('button.submit').should('be.disabled')

    })
})

describe('Submit an order ', () =>{
    it('can submit an order', () => {
        cy.visit('http://localhost:3000/')
        cy.get('input[name="name"]').type('karmaeiic')
        cy.get('input[name="pizzaSauce"]').type('Garlic Ranch')
        cy.get('input[name="pizzaSize"]').type('Small')
        cy.get('button.submit').should('be.disabled')

    })
})