const assert = require("assert");
const { waitForDebugger } = require("inspector");
const { hasUncaughtExceptionCaptureCallback } = require("process");

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
                // assert.exists(response.body,
                //     'AND the response object (token) contains the data')
                expect(response.body).to.exist
                
            })
        })
    })
})

describe('API logs in and goes to profile page with users credentials', () => {
    context('User signing in then going to profile page', () => {
        let user = "";
        let config = "";
        let token = "";
        it('TESTING PROMISES', () => {
            user = {
                username: 'APITesting',
                pwd: '123'
            }
            // GIVEN user signing in with credentials
            cy.intercept('POST', 'http://localhost:5016/users/login').as('loginUser');
            cy.request('POST', 'http://localhost:5016/users/login', user).then((response) => { token = response.body;
                 config = {
                    headers: { Authorization: `Bearer ${token}` },
                }
                console.log("This is our config: " + config)

                return config;
            // WHEN user is trying to retrieve their profile after signing in
            }).then( (config) => {
                console.log("This is our second config: " + JSON.stringify(config))
                cy.request({
                    method: 'GET',
                    url: 'http://localhost:5016/profile/getprofile',
                    failOnStatusCode: false,
                    headers: config.headers
                }).then((response) => {
                assert.equal(response.status, 200, 
                    'THEN I received a successful response (code 200)')
                expect(response.body).to.exist
                assert.equal(response.body[0].username, user.username,
                    'AND the response object username contains the same username as the one passed in')
                });
        });
        })
    })
})