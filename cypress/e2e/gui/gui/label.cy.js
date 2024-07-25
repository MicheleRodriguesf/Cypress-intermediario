import { faker } from '@faker-js/faker'

const options = { env: {snapshotOnly: true,}}

describe ('create label', options, ()=> {
    const issue = {
        title:`issue-${faker.datatype.uuid ()}`,
        description: faker.random.words (2),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5) 
        }
    }
    const label = {
        name: `label-${faker.random.word()}`,
        color: '#ffaabb'

    }
    beforeEach (( )=> {
        cy.api_deleteProjects ()
        cy.login ()
        cy.api_createIssue (issue)
        .then (response => {
            cy.api_createLabel(response.body.project_id, label)
            cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)

        })
    })
    it ('sucessfully', () => {
        cy.gui_label (label)
        cy.get('.qa-labels-block').should('contain', label.name)
        cy.get('.qa-labels-block span')
          .should('have.attr', 'style', `background-color: ${label.color}; color: #333333;`)
    })
    
})