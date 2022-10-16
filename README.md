# Developer JS BE Test - Bartender

Design and implement a simple NodeJS web application exposing HTTP API that simulates
the bar tender service with simple ordering and dashboard interface in React. It should:

1. accept POST requests with customer number and drink type (BEER|DRINK) and:
2. respond with 200 code when ordered drink will be served
3. respond with 429 code when order is not accepted at the moment
4. keep track of served drinks and customers and expose endpoint which lists them

## Functional requirements:

1. The barman can prepare at once 2 beers (drinks of BEER type) or 1 drink (DRINK
type)

2. Preparing one drink takes X seconds (5 by default but value should be configurable)
regardless of drink type

3. Drink request should get the response as soon as barman starts to prepare a drink. It
should not be delayed for the time of the drink preparation.

## Non-functional requirements:

1. Service should be idempotent

2. Requests should be audited using application log

## Assumptions:

1. When answering OK for a drink request the barman prepares the drink in configured
time X without any further requests or notifications

2. Application runs in-memory, there is no persistent storage

3. Application runs on a single node

## Further assumptions by the developer:

1. The bartender can only serve one type of drink at a time

2. Incoming orders handled by the bartender have a total amount of one drink

3. Only drinks with a defined capacity can be prepared by the bartender (no unknown drinks can be prepared)

## Deliverables

Deliver the solution in zip file containing the source files or as git repository link.

# Running Bartender App

Node v16.13.2

### 1. npm install

### 2. backend/ npm install

### 3. npm start

### 4. backend/ npm start

## Repo structure.

Monorepo with React, Node and Express.

/backend: Route path for implementing the Backend project

/src: Route path for implementing the Frontend project

### Backend

Settings for /backend/.env:

- port : Port where the service will run
- mode : Execution enviorment
- URL : URL of the service accepting requests
- CLIENT_URL : URL of the client allowed to consume the API through CORS

#### /app
API routes, endpoint controllers, data models and services.

#### /setup
Express and Node configuration files.

#### /tests
Services and endpoints tests.

### Frontend

Settings for /.env:

- REACT_APP_API_URL : URL of the client

#### /components
React components for multiple and decentralized use. 

#### /pages
This directory should reflect the navigation tree used by the app. Route for specific or single use components.

#### /utils
Asorted directory for useful pieces of code.

.../api : Axios configuration file for API services and a file for each indepedent Route containing all endpoints relevant to that route.

.../contexts : Each file represents a react context component for relevant data management.

.../routes : Route definitions.

.../validators: Asorted data validation functions.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
