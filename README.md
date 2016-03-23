# Angular Imbalance Project
Angular frontend for Imbalance website.

Makes use of a REST API to get data and perform server side operations.

## Server Requirements
* Node
* npm

## Development Requirements
* IDE that understands typescript i.e. PhpStorm or MS Visual Studios.

## Installation
1. Clone repo to desired location.
2. Run **_npm install_**.
3. Change the URL in the **_app/services/api.service.ts_** file to point to the correct point for the REST API.
4. Run **_npm start_** to run the server that will compile the changes made, close the server once it is finished.

## Live Install
No extra steps at present

## Apache Config File
See the apache example folder for info on setting up apache .conf files.

Note the rewrite options used in these files, these are important and the site wont work properly without them.  
The aim of these rewrite rules is to pass the user back to Angular (index.html) if a route such as /users/1 is entered  
otherwise it will try to look on the server for a file that dosn't exist when a user tries to refresh the page.  

These rewrite rules can also be done in a .htaccess file at the route of the app but putting them in the conf stops  
access to any folders or file lower down e.g. if you had your API in a sub folder.

## Resources
* [Angular 2 docs](https://angular.io/docs/ts/latest/)
* [NPM docs](https://docs.npmjs.com/)