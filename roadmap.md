improve external logger usage  
update light version according to the changes made in full version ( sendRequest parsing error handling: sendRequest -> sendEndpointRequest )  

interfaces refactoring/simplification  
update with the OpenAPI 3.1 spec  

allow usage of full and light version as an npm package

add method to save the API spec in a specified folder  
Wrap the  
https://www.npmjs.com/package/@openapitools/openapi-generator-cli  
to generate distant API typescript entity definition files in a specified folder  

add a service to test the external API from generated typescript files with different parameters  
add methods to list routes with incorrect openAPI definition from the tests  