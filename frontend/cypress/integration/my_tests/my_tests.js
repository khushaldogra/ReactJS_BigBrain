context('Admin flow - happy path', () => {
  beforeEach(() => {
    // start at register page
    cy.visit('localhost:3000/register');
  });

  it('Registers, creates a game, starts, ends a game, loads results, login, logout successfully', () => {
    const name = 'Bob Smith';
    const email = 'bob.smithyeah9999@example.com';
    const password = 'passw0rd';

    cy.get('input[name=email]')
      .focus()
      .type(email);

    cy.get('input[name=name]')
      .focus()
      .type(name);

    cy.get('input[name=password]')
      .focus()
      .type(password)

    cy.get('button[type=submit]')
      .click()

    cy.wait(5000)

    const quizName = 'New Quiz';

    cy.get('input[type=text]')
      .focus()
      .type(quizName)

    cy.get('button[type=submit]')
      .click(1)

    cy.wait(5000)

    cy.get('.green')
      .click()

    cy.wait(5000)

    cy.get('.black')
      .click()

    cy.wait(5000)
    
    cy.get('[data-testid=start]')
      .click()

    cy.wait(5000)
  
    cy.get('.positive')
      .click()

    cy.wait(5000)

    cy.get('.sc-bdfBwQ > :nth-child(4)')
      .click()
  
    cy.wait(5000)

    cy.get('.sc-bdfBwQ > :nth-child(3)')
      .click()

    cy.wait(5000)

    cy.get(':nth-child(1) > .ui > input')
      .focus()
      .type(email)

    cy.get(':nth-child(2) > .ui > input')
      .focus()
      .type(password)

    cy.wait(5000)

    cy.get('.stacked > .teal')
      .click()

  });
    
});



