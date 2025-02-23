# RecipeGPT

It's a small web server built on ExpressJS & hosted on [Heroku](https://www.heroku.com/), used for sending prompts to OpenAI's [GPT-4o](https://openai.com/index/hello-gpt-4o/) model to generate recipes with a given JSON structure, then it's returned to the mobile app called [RecipeGPT](https://github.com/mmswflow-upb/RecipeGPT.git).
It also has a functionality for generating random cooking-related quotes.

## Setup (Local)

### 1. Installing NodeJS & NPM
Check the official [website](https://nodejs.org/) and download nodejs along with npm, then verify the installation with the following commands, the versions should be displayed:

```powershell
node -v
npm -v
```

### 2. Cloning the Repo
 
Once node is installed, clone the repo by running the following command in the terminal
```gitbash
git clone 
```
### 3. Installing Dependencies
Open the root folder of the repo, then run the command
```powershell
npm install
```

### 4. Using Modules
To be able to import modules, make sure that in your package.json you have set the type to "module"
```json
  "name": "recipe-app-web-server",
  "version": "1.0.0",
  "description": "The Recipes Provider",
  "main": "server.js",
  "type": "module"
```

### 5. Getting an API Key from OpenAI 
Make sure you've got an API key from *OpenAI* and allowed the usage of *GPT-4o*, checkout [this](https://platform.openai.com/docs/overview) page for more details

### 6. Setting Up the Environmental Variables 
Add in the root directory and setup the *.env* file as such
```.env
OPENAI_API_KEY=YOUR_OPENAI_KEY
PORT=AVAILABLE_PORT
```

### 7. Running the Server
Now you can do this by running the command in the terminal
```powershell
npm start
```
