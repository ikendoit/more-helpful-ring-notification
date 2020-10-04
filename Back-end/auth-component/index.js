const {
  RingApi,
  firstFAAuth,
  secondFAAuth
} = require("./utils")
const express = require('express');
const bodyParser = require('body-parser')
const Joi = require('joi')

const app = express();
app.use(express.json())

// array of {username: string, password: string, client: RingClient} for clients waiting for 2FA.
//   remove a client as soon as they get their access token.
let allClientsWaiting2Fa = []

app.post('/1fa', async (req, res)=> {

  // 1: validate
  // 2: authenticate
  // 3: check if 2FA, if yes, push to allClientsWaiting2Fa, response "need2FA: true"
  // 4: if no, response access token

  // step 1
  const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .required(),
    password: Joi.string()
        .required()
  })
  schema.validate(req.body)

  const { username, password } = req.body

  // step 2
  const authResult = await firstFAAuth()

  // step 3
  // need to handle 2FA for this client
  if (authResult.need2FA) {

    allClientsWaiting2Fa.push({
      client: authResult.client,
      username,
      password
    })

    authResult.client = undefined; // clear this value out so we don't accidentally return serialized client
  }

  // step 4
  // 2 possibilities: {refreshToken} or {need2FA}
  res.send(authResult)

})


const port = 8080;
app.listen(port, () => {
  console.log(`authenticate: listening on port ${port}`);
});
