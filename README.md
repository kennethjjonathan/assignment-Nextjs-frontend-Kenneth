# Teracce is a legal journalism platform where user can read legal news. Teracce is built with next js and deployed in vercel. Teracce use json-server as a mock backend.

### Deployed version

As for the deplyoed version, visit:

- https://assignment-nextjs-frontend-kenneth-40310953u.vercel.app/ (for the next js)
- https://json-server-nextjs-kenneth.vercel.app/ (for the json-server)

##

### To run in development mode

- Clone the repository
- Run "npm install"
- Edit .env in the next.config.js file. Cahnge the FRONTEND value to "http://localhost:3000" and BACKEND value to "http://localhost:7000" (commented version already in the file so you can copy it).
- At the root of the project, open two terminal.
- At the first terminal, run "npm run start-json" to start the json-server (located in the backend folder).
- At the second terminal, run "npm run dev" to run nextjs in development mode.
