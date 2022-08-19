@visualTesting
Feature: web_visualTesting
    Scenario: Visual testing Example
        Given A user opens the <url> website
        Then The page title has the text "Welcome to Next.js!"
        And The page must look ok
        Examples:
            | url |
            | "http://localhost:8080/" |