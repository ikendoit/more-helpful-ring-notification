const ringClientApi = require("ring-client-api")

const userDataEnv = require("./env") // this should be git-ignored

const main = (req, res) => {


  // extract userData from req
  const {username, password} = userDataEnv

  // get refresh token
  const refreshToken =


  // return refresh token
  return refreshToken


}
