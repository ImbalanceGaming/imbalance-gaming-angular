# Angular Base Project
Base setup for projects using an angular frontend.

Make sure not to use this base project directly instead follow the instructions at [this page](https://help.github.com/articles/duplicating-a-repository/).
This will create a duplicate of this repo in a new repo that wont effect this repo.

## Server Requirements
* Node
* npm
* Bower

## Installation
If installing separate from laravel.

1. Clone repo to desired location.
2. Run **_bower install_**.
3. Change config options in app.js.

If installing with laravel.

1. Setup laravel as described in the readme for the laravel base project.
2. Go into the public folder.
3. Run the below commands.  <br />
```
    git init  <br />
    git remote add origin git@github.com:ImbalanceGaming/<Repo Name>.git  <br />
    git fetch  <br />
    git checkout -t origin/master  <br />
```
4. Run **_bower install_**.

## Resources
* [Angular docs](https://angularjs.org/)
* [Bower docs](http://bower.io/)