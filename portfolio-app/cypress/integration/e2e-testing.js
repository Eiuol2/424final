import { useContext } from "react"

describe('Add new post', () => {
    useContext('Successful post', () => {
        it('GIVEN I navigate to the add a new post page', () =>  {
            cy.visit('http://localhost:3000/create-post')
        })

        it('WHEN I enter title, description, content and submit the form', () => {
            cy.intercept('POST', 'http://localhost:5016/posts/create-post').as('createPost');
            cy.get('form').within(() => {
                cy.get('input[name="title"]').type('Testing Post');
                cy.get('input[name="describe"]').type('This is a random text to test the post');
                cy.get('input[name=content"]').type('https://teacherdanmax.files.wordpress.com/2013/09/school-test.png');
                cy.get('input[type="button"]').click();
            })
            cy.wait("@createPost");
        })

        it('THEN a new post has been added to the post list', () => {
            cy.visit('http://localhost:3000/posts-list');
        })
    })
})
