# User login flow

This is an example project that is split into two parts:

- an ES6-transpiled Express server (created using `generator-express-es6`), to serve as the backend of the application and exposes authentication APIs to track session tokens.  It also serves the frontend build bundle. Includes:
    - `passport` (authentication)
    - `express` (server)
    - `redis` (cache storage)

- a frontend (created using `react-create-app`) that uses routing to only show authorized pages for the user based on API responses. Includes:
    - `easy-peasy` (redux framework for state management)
    - `react-router` (page routing)
    - `styled-components` (component styling)

There are 3 API endpoints in the flow: one to generate a `httpOnly` token cookie, one to validate the token cookie is valid, and one to invalidate the token and expire the cookie.

---

### To run:

1) With docker installed, run the command `docker run --name express-redis-p 8012:6379 -d redis` to start a new redis 
container on port 8012 (after the initial command, you can run `docker container start express-redis` to start the container).
2) In a terminal window, navigate to the /api folder from the project root directory, and run `npm start`.
3) In a separate terminal window, navigate to the project root directory and run `npm start`.  
4) Navigate to `localhost:3000` and sign in using the username:`jack` and password:`secret`. (In development mode, API calls will be proxied to the express server on `localhost:3030`. In production mode, the react app and express should all be available on `localhost:3030`)

**NOTE**: 
- For step 2 you can decide to run `npm run start:secure` instead, to start the express server on HTTPS locally.
Running in this mode will mark the token cookie as `secure` as well.
- This mode relies on generating self-signed certificate files for the express server by running `openssl req -nodes -new -x509 -keyout server.key -out server.cert
` in a terminal, and adding them into the /api directory. 

----

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
