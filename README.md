# Procore Submittals MicroService

## How to use:

In order to spin up the microservice, you must provide a valid port number, Client ID, and Client Secret.
For Security purposes, the Client ID and CLient Secret must be provided in the initialization command.

Once the you've gathered the necessary information, simply have the container execute:

```
npm install
PORT=8000 CLIENT_ID=YOUR_PROCORE_CLIENT_ID CLIENT_SECRET=YOUR_PROCORE_CLIENT_SECRET npm start
```

Technologies Used:

1. Typescript
2. NodeJS
3. [OvernightJS](https://github.com/seanpmaxwell/overnight/#readme) (Adds Typescript decorators meant to call express routes)
4. [node-fetch](https://github.com/node-fetch/node-fetch) (Adds `fetch()` to NodeJS)
