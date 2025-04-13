## TypeScript - Node API Setup

Building API using `TypeScript` makes your codebase more predictable and maintainable. It helps you to have confident on your app while building. Building a type-safe API makes it easy for maintain, scale hence makes developer's life more easier.

To initialize a new Nodejs-TypeScript project, there are couple of steps we need to do to fully have a functional dev environment.

- Initialize a Nodejs project

```shell
npm init -y
```

#### What happened?

The command will create a `package.json` file in the root of your application with all default values.

```json
{
  "name": "playground-api",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "some test script"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "description": ""
}
```

- Install Dependencies & Initialize TS Config  
  Next it's time to install `typescript` and some related packages like `ts-node,`.

```shell
   npm i -D typescript ts-node
```

After installation has completed, next we need to run another command to scafold the typescript config file.

```shell
   tsc --init
```

### What happened?

The first command allows us to install TypeScript and ts-node. `ts-node` allow us to run typescript directly without transpiling or converted it to JavaScript to execute the file.

The next command will create a `tsconfig.json` file that describes the typescript configuration files.

- Create nodemon.json  
  The is a simple file that will keep track of all your files and restart the server everytime it detects a change in a specified file location and also execute a file with a specific extension.

```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "exec": "ts-node ./src/app.ts"
}
```

### What happened?

We explicitely tell it to watch the `src` directory that contains the file `extension .ts,.js` and run the file main `app.ts` file. That simply means any file whether inside the nested directory or regardless of where it located, so long as its inside the **src** directory, whenever you detects a change in file, re-run the _app.ts_.

- Installing Dependencies  
  At this point, the minimal setup we need to start developing our API is configured. Next we need to install the packages that we need to build API.

```bash
   npm i express jsonwebtoken cors dotenv
```

Since we a writing TypeScript, we also need to install the types associated with the package.

```bash
   npm i -D @types/express @types/jsonwebtoken @types/cors
```

**NOTE**: We don't need to install types for any package that are written in TypeScript. Its all included when we install it.

Next in the package.json file, we need to add some scripts to run the application.

```json
{
  "name": "playground-api",
  "version": "1.0.0",
  "main": "./src/app.js",
  "scripts": {
    "dev": "npx nodemon",
    "start": "node ./dist/app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "description": "Playground API for learning purposes"
}
```

Next, to test it out, inside the _**root**_ directory, create a new directory called **src**. Inside the src directory, create a create a `app.ts` and insert the foollowing code.

```ts
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

Now it's time to run the server. Open the terminal or command prompt and run the script we specified in the package.json file.

```shell
npm run dev
```

On you console or terminal , you would expect to see

```shell
Server is running on port 3000
```
