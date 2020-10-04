const {
  RingApi,
  firstFAAuth,
  secondFAAuth
} = require("./utils")

const express = require('express');
const app = express();

// array of {username, password}
let allClientsWaiting2Fa = []

app.get('/', (req, res) => {
  console.log(req)
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

const port = 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
