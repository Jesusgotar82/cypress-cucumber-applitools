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
      failOnStatusCode:false
    }).as('get_tools_data')
  });

  Then('Verify {string} response status code is {int}', (requestAliasName, statusCode) => {
    cy.get(`${requestAliasName}`).should((response: any)=> {
      expect(response.status).to.eq(statusCode);
    })
  });

  Then('Verify response details for tool {string}', (toolName) => {
    cy.get('@get_tools_data').then((response: any)=> {
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
        if (row.name == toolName){
          findedTool = true;
          cy.log ("HERRAMIENTA ENCONTRADA:  " +  JSON.stringify(response.body[index]));
          index ++;
        }
      });

      if (findedTool == false)
      {
        cy.log("HERRAMIENTA " + toolName + "NO ENCONTRADA" + JSON.stringify(response.body));
      }

      expect(findedTool,"").eq(true)
      assert.equal(findedTool, true,"No se encontró la herramienta: " + toolName);
    })
  });

  Given('As a user I want to execute a GET for {int} {string}', (numberOfItems , toolCategory) => {
    cy.request({
      method: 'GET',
      url: 'https://simple-tool-rental-api.glitch.me/' + 'tools?category=' + toolCategory + '&results=' + numberOfItems,
      headers: {
        'Content-Type': 'application/json'  
      },
      failOnStatusCode:false
    }).as('get_tools_data')
  });

  Then('Verify the number of tools obtained equals {int}', (numberOfItems) => {
    cy.get('@get_tools_data').then((response: any)=> {

      var index = 0;
      response.body.forEach((row) => {
        index++
      });
      assert.equal(numberOfItems, index)
    })
  });

  Given ('As the user {string} I want to create an order for {string}', (customerName , itemCode) => {
    var accessToken = "742812915760f0399c3329f46552af615a22d11b51b5635ad147c10193060624";
    cy.request({
      method:'POST',
      url: 'https://simple-tool-rental-api.glitch.me/'+ 'orders',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken 
      },
      body: {
        'customerName': customerName,
        'toolId': itemCode 
      },
      failOnStatusCode:false
    //}).as('response')

    }).as('response').then((res)=>{
      cy.log(JSON.stringify(res));
    })
  });

  Then('Verify response status code is {int}', (statusCode) => {
    cy.get('@response').should((res: any)=> {
      expect(res.status).to.eq(statusCode);
    })
  });

  And('Verify order status is {string}', (orderStatus) => {
    cy.get('@response').should((res: any)=> {
      expect(res.body.created).to.eq(true);
    })
  });