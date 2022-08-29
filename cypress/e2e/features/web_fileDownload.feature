@full @web
Feature: web_fileDownload
    Scenario: Descarga y validacion archivos de imagen
        Given I proceed to download the image file from the url <fileUrl>
        Examples:
            | fileUrl                                                      |
            | 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg' |


    Scenario: Descarga y validacion de archivos pdf
        Given I proceed to download the pdf file from the url <fileUrl>
        Examples:
            | fileUrl                                            |
            | 'http://www.africau.edu/images/default/sample.pdf' |

