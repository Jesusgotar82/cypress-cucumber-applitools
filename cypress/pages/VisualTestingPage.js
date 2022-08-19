class VisualTestingLandingPage {
    //selectores por elemento
    elements = {
      pageTittle: () => cy.get('.Home_title__T09hD'),
      pageSubtitle:()=> cy.get('.Home_description__41Owk'),
      documentationLink:()=> cy.get('[href="https://nextjs.org/docs"]')
    };
}
module.exports = new VisualTestingLandingPage();