const {
  firstFAAuth,
  secondFAAuth
} = require("./utils")
const express = require('express');
const bodyParser = require('body-parser')
const Joi = require('joi')

const app = express();
app.use(express.json())

/******* 2FA clients management ********/
// array of {username: string, password: string, client: RingClient} for clients waiting for 2FA.
//   remove a client as soon as they get their access token.
let allClientsWaiting2Fa = []

// manage waiting clients for 2FA
const getClientWaiting = (username, password) => {
  return allClientsWaiting2Fa.find(e => e.username === username && e.password === password)
}
const removeClientWaiting = (username, password) => {
  const i = allClientsWaiting2Fa.findIndex(e => e.username === username && e.password === password)
  if (i >= 0) {
    allClientsWaiting2Fa.splice(i, 1)
  }
}
const addClientWaiting = (username, password, clientObject) => {
  allClientsWaiting2Fa.push({
    username,
    password,
    client: clientObject
  })
}
/******* END 2FA clients management ********/




/******* Routes *******/
app.post('/1fa', async (req, res)=> {

  // 1: validate
  // 2: authenticate
  // 3: check if 2FA, if yes, push to allClientsWaiting2Fa, response "need2FA: true"
  // 4: if no, response access token

  // step 1
  const schema = Joi.object({
    username: Joi.string()
        .required(),
    password: Joi.string()
        .required()
  })
  schema.validate(req.body)

  const { username, password } = req.body
  removeClientWaiting(username, password)

  // step 2
  const authResult = await firstFAAuth()

  // step 3
  // need to handle 2FA for this client
  if (authResult.need2FA) {

    addClientWaiting(
      username,
      password,
      authResult.client
    )

    authResult.client = undefined; // clear this value out to not accidentally return serialized client
  }

  // step 4
  // 2 possibilities: {refreshToken} or {need2FA}
  res.send(authResult)

})

app.post('/2fa', async (req, res)=> {

  // 1: validate
  // 2: authenticate
  // 3: check if 2FA, if yes, push to allClientsWaiting2Fa, response "need2FA: true"
  // 4: if no, response access token

  // step 1
  const schema = Joi.object({
    username: Joi.string()
        .required(),
    password: Joi.string()
        .required(),
    faCode: Joi.string()
        .required(),
  })
  schema.validate(req.body)

  const { username, password, faCode } = req.body
  const clientWaiting = getClientWaiting(username, password)
  if (!clientWaiting) {
    throw new Error("Session expired, please clear the 2FA and login again.")
  }

  // step 2
  const authResult = await secondFAAuth(clientWaiting.client, faCode)

  // step 3
  res.send(authResult)

})

const port = 80;
app.listen(port, () => {
  console.log(`authenticate: listening on port ${port}`);
});
