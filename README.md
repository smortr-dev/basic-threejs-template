# basic-threejs-template

A basic template project to create three.js projects using vanilla javascript

## Three.js Template Project

### Project Setup

> 1.  Clone this repository using `git clone` command.
> 2.  Add your three.js script in the `main.js` file.
> 3.  Add your assets i.e., models, images.. etc to the public folder.
> 4.  Refer to your assets in the `main.js` as if it were present in the root directory, without the `public/` prefix.

### Installing dependencies

> npm i

### Running the project locally

> npm start

### Building the project

> npm run build

### Deploying the project to netlify

> Drag and drop the `build/` folder into netlify. It will do the rest.
> After the deployment, change the domain of the project in netlify site settings if needed.

#### Note

> The build folder won't be pushed into to the github repo. So, generate a new build everytime before deployment.
> To push the `build/` folder into the repo remove the `build/` from the `.gitignore` file.

#### Extras

> To change the tab title edit the content inside the `<title>` in `index.html`.
> Change description of the page by editing the relevant `<meta>` tags in `index.html`.
