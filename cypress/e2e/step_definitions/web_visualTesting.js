import {
    Given,
    When,
    And,
    Then,
    Step,
  } from "@badeball/cypress-cucumber-preprocessor";
  const visualTestingPage = require("../../pages/VisualTestingPage")
  
  Given("A user opens the {string} website", (url) => {
    cy.visit(url);
  });

  Then("The page title has the text {string}", (titleLabel) => {
    visualTestingPage.elements.pageTittle().should('have.text',titleLabel);
  });


  And("The page must look ok", () => {
    cy.eyesOpen({
      appName: 'My App',
      testName: 'Landing Page Check'
    });
    cy.eyesCheckWindow();
    cy.eyesClose();
  });