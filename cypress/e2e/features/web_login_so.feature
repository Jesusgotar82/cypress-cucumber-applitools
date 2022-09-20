@full @web @pwa @demo
Feature: web_login_so

    # Scenario Outline: Tokin
    #     Given A user opens the website <Website> in <Device>
    #     Examples:
    #         | Website | Device |
    #         | "https://poctokin.myvtex.com/""  | iphone-x |

    Scenario Outline: Successful login: <Description>
        Given A user opens a saucelabs website in <Device>
        When A user enters the username "standard_user"
        And A user enters the password "secret_sauce"
        And A user clicks on the login button
        Then the url will contains the inventory subdirectory
        Examples:
            | Description        | Device      |
            | "Login macbook-13" | macbook-13  |

    # | "Login iphone-6"      | iphone-x      |
    # | "Login samsung-s10"   | samsung-s10   |
    # | "Login samsung-note9" | samsung-note9 |
    # | "Login [800,600]"     | [800, 600]    |


    Scenario Outline: Unsuccesful Login: <Description> - On device: <Device>
        Given A user opens a saucelabs website in <Device>
        When A user enters the username <UserName>
        And A user enters the password <Password>
        And A user clicks on the login button
        Then The error message <TextError> is displayed
        Examples:
            | Description                | Device        | UserName          | Password       | TextError                                                                   |
            | "Bloqued login"            | macbook-13    | "locked_out_user" | "secret_sauce" | "Epic sadface: Sorry, this user has been locked out."                       |
            | "Incorrect user login"     | macbook-13    | "testName"        | "secret_sauce" | "Epic sadface: Username and password do not match any user in this service" |
            | "Incorrect password login" | macbook-13    | "standard_user"   | "testPassword" | "Epic sadface: Username and password do not match any user in this service" |


            # | "Bloqued login"            | iphone-x      | "locked_out_user" | "secret_sauce" | "Epic sadface: Sorry, this user has been locked out."                       |
            # | "Incorrect user login"     | iphone-x      | "testName"        | "secret_sauce" | "Epic sadface: Username and password do not match any user in this service" |
            # | "Incorrect password login" | iphone-x      | "standard_user"   | "testPassword" | "Epic sadface: Username and password do not match any user in this service" |
            # | "Bloqued login"            | samsung-s10   | "locked_out_user" | "secret_sauce" | "Epic sadface: Sorry, this user has been locked out."                       |
            # | "Incorrect user login"     | samsung-s10   | "testName"        | "secret_sauce" | "Epic sadface: Username and password do not match any user in this service" |
            # | "Incorrect password login" | samsung-s10   | "standard_user"   | "testPassword" | "Epic sadface: Username and password do not match any user in this service" |
            # | "Bloqued login"            | samsung-note9 | "locked_out_user" | "secret_sauce" | "Epic sadface: Sorry, this user has been locked out."                       |
            # | "Incorrect user login"     | samsung-note9 | "testName"        | "secret_sauce" | "Epic sadface: Username and password do not match any user in this service" |
            # | "Incorrect password login" | samsung-note9 | "standard_user"   | "testPassword" | "Epic sadface: Username and password do not match any user in this service" |