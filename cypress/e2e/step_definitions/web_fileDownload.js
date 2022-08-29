import {
    Given,
    When,
    And,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";

Given("I proceed to download the image file from the url {string}", (fileUrl) => {
    var todayDate = new Date().toISOString();
    var fileName = 'downloadImgExample-' + todayDate + '.jpg'
    cy.downloadFile(fileUrl, 'files', fileName).then(() =>{
        cy.task("getImageText",{fileName: "files/"+fileName, lang: "eng", logger: false })
        .then((text) => {
            expect(text).to.contains("This is an example image")
        })
    })
});

Given("I proceed to download the pdf file from the url {string}", (fileUrl) => {
    var todayDate = new Date().toISOString();
    var fileName = 'downloadPdfDummyExample-' + todayDate + '.pdf'
    cy.downloadFile(fileUrl, 'files', fileName).then(() =>{
        cy.task("getPDFText",{pdfFile:"files/"+fileName,maxPages:1})
        .then((text) =>{
            expect(text).to.contains("This is a small demonstration .pdf file")
        })
    })
});