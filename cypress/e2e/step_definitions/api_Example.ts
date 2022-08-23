import {
  Given,
  When,
  And,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

Given('As a user I want to execute a GET for all {string}', (items) => {
  cy.request({
    method: 'GET',
    url: 'https://simple-tool-rental-api.glitch.me/' + items,
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  }).as('get_tools_data')
});

Then('Verify {string} response status code is {int}', (requestAliasName, statusCode) => {
  cy.get(`${requestAliasName}`).should((response: any) => {
    expect(response.status).to.eq(statusCode);
  })
});

Then('Verify response details for tool {string}', (toolName) => {
  cy.get('@get_tools_data').then((response: any) => {
    cy.log("*** Buscando herramienta: " + toolName + "***");
    /*
    cy.log(response.body[0].name);
    expect(response.body[0]).to.have.property('name');

    //1st Way
    expect("Se esperaba que" + JSON.stringify(response.body[0]) + "contenga la propiedad name con el valor: " + toolName, response.body[0]).to.have.nested.property('name',toolName);
    //2nd Way
    expect(response.body[0]).to.have.property('name',toolName);
    //3rd Way
    const name = response.body[0].name;
    assert.equal(name, toolName);
    */

    var findedTool = false;
    var index = 0;
    response.body.forEach((row) => {
      if (row.name == toolName) {
        findedTool = true;
        cy.log("HERRAMIENTA ENCONTRADA:  " + JSON.stringify(response.body[index]));
        index++;
      }
    });

    if (findedTool == false) {
      cy.log("HERRAMIENTA " + toolName + "NO ENCONTRADA" + JSON.stringify(response.body));
    }

    expect(findedTool, "").eq(true)
    assert.equal(findedTool, true, "No se encontró la herramienta: " + toolName);
  })
});

Given('As a user I want to execute a GET for {int} {string}', (numberOfItems, toolCategory) => {
  cy.request({
    method: 'GET',
    url: 'https://simple-tool-rental-api.glitch.me/' + 'tools?category=' + toolCategory + '&results=' + numberOfItems,
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  }).as('get_tools_data')
});

Then('Verify the number of tools obtained equals {int}', (numberOfItems) => {
  cy.get('@get_tools_data').then((response: any) => {

    var index = 0;
    response.body.forEach((row) => {
      cy.log(JSON.stringify(row));
      index++
    });
    cy.writeFile("reports/Elements.txt", JSON.stringify(response.body))
    assert.equal(numberOfItems, index)
  })
});

Given('As the user {string} I want to create an order for {string}', (customerName, itemCode) => {
  var accessToken = "742812915760f0399c3329f46552af615a22d11b51b5635ad147c10193060624";
  cy.request({
    method: 'POST',
    url: 'https://simple-tool-rental-api.glitch.me/' + 'orders',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: {
      'customerName': customerName,
      'toolId': itemCode
    },
    failOnStatusCode: false
    //}).as('response')

  }).as('response').then((res) => {
    cy.log(JSON.stringify(res));
  })
});

Then('Verify response status code is {int}', (statusCode) => {
  cy.get('@response').should((res: any) => {
    expect(res.status).to.eq(statusCode);
  })
});

And('Verify order status is {string}', (orderStatus) => {
  cy.get('@response').should((res: any) => {
    expect(res.body.created).to.eq(true);
  })
});

Given('I proceed register a new client for {string} {string}', (clientName, clientEmail) => {
  cy.request({
    method: 'POST',
    url: 'https://simple-tool-rental-api.glitch.me/' + 'api-clients',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      "clientName": clientName,
      "clientEmail": clientEmail
    },
    failOnStatusCode: false
  }).as('response')

  // cy.get('response').then((response: any)=> {
  //   var jsonBody = "{\"clientName\": " + clientName + ",\"clientEmail\": " + clientEmail + ",\"accessToken\": " + response.accessToken + "}";
  //   cy.log(jsonBody);
  //   //cy.writeFile("reports/userToken.json",jsonBody);
  // })

});

And('Write response in a response file named {string}', (fileName) => {
  cy.get('@response').then((res: any) => {
    var filePath = "files/" + fileName + ".txt";
    cy.writeFile(filePath, res);
    cy.readFile(filePath).should("exist").and("contain", "accessToken");
  })
});

And('The file with the accessToken exist {string}', (fileName) => {
    var filePath = "files/" + fileName + ".txt";
    cy.readFile(filePath).should("exist").and("contain", "accessToken");
});

And('Create an order with clientName {string} and toolId {string} with the token in file {string}', (clientName, tooId, fileName) => {
  var filePath = "files/" + fileName + ".txt";

  cy.readFile(filePath).then((accessTokenFile)=>{
    expect(JSON.parse(accessTokenFile).body.accessToken).exist;
    var AccessTokenString = JSON.parse(accessTokenFile).body.accessToken;

    cy.request({
      method: 'POST',
      url: 'https://simple-tool-rental-api.glitch.me/' + 'orders',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AccessTokenString
      },
      body: {
        'customerName': clientName,
        'toolId': tooId
      },
      failOnStatusCode: false
  
    }).as('response')
  })
});