const assert = require("assert");

describe('API takes a user object with credentials and logs the user in', () => {
    context('User signing in', () => {
        before(() => {
        })

        let user = {};

        it('GIVEN User signing in with a valid username and password', () => {
            user = {
                username: 'APITesting',
                pwd: '123'
            }
        })

        it('WHEN User attempts to sign in with the user object', () => {
            cy.request('POST', 'http://localhost:5016/users/login', user).then((response) => {
                assert.equal(response.status, 200,
                    'THEN I receive a successful response (code 200)');
                assert.exists(response.body,
                    'AND the response object (token) contains the data');
            })
        })
    })
})

describe('API logs in and goes to profile page with users credentials', () => {
    context('User signing in then going to profile page', () => {
        let user = "";
        let config = "";
        let token = "";
        before(() => {
            user = {
                username: 'APITesting',
                pwd: '123'
            }
            token = cy.request('POST', 'http://localhost:5016/users/login', user).then((response) => { response.body });
            config = {
                headers: { Authorization: `Bearer ${token}` },
            }
        })

        it('GIVEN a user credentials for signing in', () => {
            user = {
                username: 'APITesting',
                pwd: 123
            }
        })

        it('WHEN a user attempts to visit the profile page', () => {
            cy.request('GET', 'http://localhost:5016/profile/getprofile', config).then((response) => {
                assert.equal(response.status, 200, 
                    'THEN I received a successful response (code 200)')
                assert.exists(response.body._id,
                    'AND the response object contains a property id')
                assert.equal(response.body.username, user.username,
                    'AND the response object username contains the same username as the one passed in')
            })
        })

    })
})