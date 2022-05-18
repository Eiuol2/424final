import { useContext } from "react"

describe('Add new post', () => {
    useContext('Successful post', () => {
        it('GIVEN I navigate to the add a new post page', () =>  {
            cy.visit('http://localhost:3000/create-post')
        })

        it('WHEN I enter title, description, content and submit the form', () => {
            cy.intercept('POST', 'http://localhost:5016/posts/create-post').as('createPost');
            cy.get('form').within(() => {
                cy.get('input[name="title"]').type('Testing Post')
            })
        })
    })
})