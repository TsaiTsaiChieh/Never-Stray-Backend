## Technology

yarn, docker, nodemon, express.js, typescript, eslint, dotenv

### Step 1: Creating a server with Express & TypeScript

- package.json

創建和初始化專案

```bash
mkdir <project-name>
cd <project-name>
yarn init -y
```

- tscogfig.json

安裝在開發時依賴（即不會打包至線上）的 TypeScript, 並創造 tsconfig.json 設定檔

```bash
yarn add typescript -D
npx tsc --init
```

將 tsconfig.json 設定檔，以下的設定開啟：

**baseUrl**: .ts source code 放置的路徑

**target**: 欲編譯的 JS 版本

**moduleResolution**: 使用 node 方法，模組從 node_modules 資料夾中載入（require('module-name')）

**outDir**: 將編譯好的 JS output 檔案放置的路徑

```json
"baseUrl": "./src"
"target": "es5"
"moduleResolution": "node"
"outDir": "./build"
```

安裝 express & dotenv

```bash
yarn add express
yarn add @types/exepress -D
yarn add dotenv
```

- env

在根目錄建立 .env 檔案，內容如下：

```
NODE_ENV=development
APP_PORT=3000
```

若有 production 的需求，可再新增 .env.prod 檔案

```
NODE_ENV=production
APP_PORT=3000
```

- index.ts

並在根資料夾創建 src 資料夾，新增 index.ts 檔案

```tsx
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'

const app = express()

const {APP_PORT} = process.env

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 印出 env 的檔案 for bug
app.get('/env', (req, res) => {
  res.json(process.env)
})

app.listen(APP_PORT, () => {
  console.log(`App listening at http://localhost:${APP_PORT}`)
})
```

- ESlint

安裝 Eslint 來檢查程式碼是否符合規範

```jsx
yarn add eslint -D
yarn run eslint --init
```

以下為 eslint 設定：

```
1. How would you like to use ESLint?
	> To check syntax, find problems, and enforce code style
2. What type of modules does your project use?
	> JavaScript modules (import/export)
3. Which framework does your project use?
	> None of this
4. Does your project use TypeScript?
	> Yes
5. Where does your code run? (<a> to toggle all)
	> Browser
	> Node
6. How would you like to define a style for your project?
	> Use a popular style guide
7. Which style guide do you want to follow?
	> Google: https://github.com/google/eslint-config-google
8. What format do you want your config file to be in?
	> JSON
9. Would you like to install them now with npm?
	> Yes
(will add @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-google in package.json at devDependencies)

```

打開 eslintrc.json，在 rule 新增下列設定。設定好後，到 index.ts 按下儲存，即可依照規範 format code

```json
"semi": [2, "never"]
```

- nodemon

當 code 有變化時，可以 reload code 的套件

```jsx
yarn add ts-node nodemon -D
```

手動建立 nodemon.json，並設定如下：

**verbose**: 設定為 true 時，nodemon 會顯示監控到哪些檔案變動

**ignore**: 設定哪些檔案有變動時不需重啟

**watch**: 設定哪些檔案變動需要重啟

**execMap**: 檔案型別/副檔名與執行時之間的對映

**execMap.ts**: 如何處理 TS 檔案，使用 node 執行，並將 debugging flags 註冊 (-r) 在 ts-node/register 裡面

— **inspect**: tells Node to expose the new debugging protocol

```json
{
  "verbose": true,
  "ignore": [".git"],
  "watch": ["src/**/*.ts"],
  "execMap": {
    "ts": "node --inspect=0.0.0.0:9229 -r ts-node/register"
  }
}
```

在 package.json 新增 scripts

```json
"scripts": {
    "start": "Node_PATH=./build node build/index.js",
    "build": "tsc -p .",
    "dev": "nodemon src/index.ts"
  }
```

執行以下指令，即可在 [http://localhost:3000/](http://localhost:3000/) 成功執行 app 

```bash
yarn dev
```

之後再執行以下指令，讓 TS 編譯出 index.js

```tsx
yarn build
```

### Step 2: Docker development

詳細可參考[Docker](https://www.notion.so/Docker-d00b05b92b224a928c6275890c92ba9e) 

- Dockerfile

新增 Dockerfile 在根目錄

```docker
### Development
# Base image
FROM node:14-alpine3.14 AS base
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./
RUN yarn install
# Bundle app source
COPY . .
```

在同個檔案，可新增 production 的 Dockerfile

```docker
### Production
FROM base AS production

ENV NODE_PATH=./build

RUN yarn build
```

- docker-compose.yml

新增 docker-compose.yml 在根目錄

```yaml
version: "3"
services:
  node-app:
    build: 
      context: .
      dockerfile: Dockerfile
      target: base
    command: yarn dev
    volumes:
      - .:/app
    environment:
      - NODE_ENV=development
    env_file:
      - .env
    ports: 
      - ${APP_PORT}:${APP_PORT}
    networks:
      - application
networks:
  application:
```

若有 production 的需求，可新增 docker-compose.prod.ymll 在根目錄

```yaml
version: "3"
services:
  node-app:
    build: 
      context: .
      dockerfile: Dockerfile
      target: production
    command: yarn start
    volumes:
      - .:/app
    environment:
      - NODE_ENV=production
    env_file:
      - .env.prod
    ports: 
      - ${APP_PORT}:${APP_PORT}
    networks:
      - application
networks:
  application:
```

執行以下指令，將 docker run 起來

-d: 在背景執行，可不下

```bash
docker-compose up -d
```

執行 production 的 docker

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

- Makefile

由於要頻繁打這些指令，可在根目錄建立 Makefile，alias 指令

```makefile
up:
	docker-compose up
up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
down:
	docker-compose down
```
快速執行，下以下指令即可

```bash
make up
make up-prod
make down
```

Quick start

```bash
git clone [git@github.com](mailto:git@github.com):TsaiTsaiChieh/node-ts-docker-init.git
```

## Reference

[Setting up Docker + TypeScript + Node (Hot reloading code changes in a running container) 🦄 🚀](https://dev.to/dariansampare/setting-up-docker-typescript-node-hot-reloading-code-changes-in-a-running-container-2b2f)