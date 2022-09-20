# cypress-cucumber-applitools-for-e2e-testing

<img src="https://media-exp1.licdn.com/dms/image/C4E0BAQF1dg2KtKFdPg/company-logo_200_200/0/1626295436859?e=2159024400&v=beta&t=Ib_T9PXXQxkHRKnj3Oe65EKuR6EAh01IgAA6IGvU0FY" alt="exemplo imagem">

> Cypress 10+ with Cucumber and Applitools project.

## 💻 Requisitos
Es necesario tener instalado

* [NodeJS](https://nodejs.org/en/download/)

## IDE

En el caso de Cypress se pueden utilizar otros IDE como “IntelliJ”, pero detectamos que cuenta con algunas limitaciones en su uso, por lo que recomendamos utilizar Visual Studio Code:

* [Descargar Visual Studio Code](https://code.visualstudio.com/download)

## Plugins requeridos para el IDE VSCode
* [Cypress Helper](https://marketplace.visualstudio.com/items?itemName=Shelex.vscode-cy-helper)
* [Run Cypress](https://marketplace.visualstudio.com/items?itemName=coreylight.run-cy)
* [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)

Integrado con:

- [x] https://github.com/badeball/cypress-cucumber-preprocessor
- [x] https://github.com/bahmutov/cypress-esbuild-preprocessor
- [x] https://www.npmjs.com/package/multiple-cucumber-html-reporter

(+ bundlers: https://github.com/badeball/cypress-cucumber-preprocessor/tree/master/examples)


## 🚀 Instalación

Cypress es un framework impulsado por el motor NPM. Solo se requiere ejecitar el
siguiente comando:

```
$ npm install
```

## 🚀 Ejecución: 
Ahora, realizados todos los pasos anteriores, podemos ejecutar de la siguiente forma:
```
$ npx cypress {Cypress Option} -e TAGS='{Tags}',configFile={Ambiente} {Browser}
```
### Cypress Option <a name="cypress-option"></a>


| Comando | Descripción                                                   |
| :-----: | :------------------------------------------------------------ |
| run     | Ejecutas la pruebas en background                             |
| open    | Abre la interfaz de cypress para pruebas de script y debugger |

### Ambiente <a name="ambiente"></a>


| Comando     | Archivo de configuración                                   | Descripción                    |
| :---------: | :--------------------------------------------------------- | :----------------------------- |
| qa          | [qa-cypress.json](cypress/enviroments/qa-cypress.json)     | Para ambiente de pruebas QA    |
| dev         | [dev-cypress.json](cypress/enviroments/dev-cypress.json)   | Para pruebas locales           |

### Tags <a name="tags"></a>

| Comando | Ejemplo                         | Descripción                                                                       |
| :-----: | :-----------------------------: | :-------------------------------------------------------------------------------- |
| not     | TAGS='@full not @ignore'        | Se ejecutarian todos los scripts con el tag full pero no si tienen el tag ignore  |
| and     | TAGS='@smokeTest and @login'    | Se ejecutan los scripts con tag smoTtest y los que tengan el tag login            |
| or      | TAGS='@login1 or @login2'       | Se ejecutan scrips que tengan el tag login1 o el tag login2                       |

### Browser <a name="browser"></a>

| Comando   | Descripción                                                                                                        |
| :-------: | :----------------------------------------------------------------------------------------------------------------- |
| chrome    | Ejecuta las pruebas en chrome. Si esta la opción `open` de cypress se activara por default la opción de debbuger   |
| firefox   | Ejecuta las pruebas en Firefox                                                                                     |
| electron  | Ejecuta las pruebas en Electron. Esta opción es el navegador por default en caso de no poner el comando `--browser` |

Por ejemplo, usando los datos en las tablas, podriamos tener el siguiente comando:
```
$ npx cypress run -e TAGS='@full',configFile=dev --browser chrome
```