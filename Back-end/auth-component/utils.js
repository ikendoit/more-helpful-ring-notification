const { RingRestClient } = require( 'ring-client-api/lib/api/rest-client' )
const configMock = require('./env')

// 1FA: authenticate with username and password
const firstFAAuth = async (username, password) => {

  // get 2FA awaiting-confirmation client
  const client= new RingRestClient({ username, password });

  // if this client needs 2FA, mark them + save the existing RingClient and return
  if (client.using2fa) {

    return {
      client,
      need2FA: client.using2fa
    };
  } else {

    // else no 2FA needed => return the refresh tooken
    const auth = await restClient.getCurrentAuth()
    return {
      refreshToken: auth.refresh_token
    }

  }

}

// 2FA: authenticate with 2fa-code
const secondFAAuth = async (currentClient, faCode) => {

  try {
    const auth = await currentClient.getAuth(faCode)
    return auth.refresh_token;
  }  catch(err) {
    console.log('Incorrect 2fa code. Please try again.')
    throw err;
  }

}

// MOCK methods: 1FA-good, 1FA-need-code, 2FA-good
const mockFirstNeed = (username, password) => {
  return {
    client: {},
    need2FA: true,
  }
}
const mockFirstGood = (username, password) => {
  return {
    refreshToken: configMock.refreshToken
  }
}
const mockSecondGood = (currentClient, faCode) => {
  return {
    refreshToken: configMock.refreshToken
  }
}

// export
module.exports = {
  firstFAAuth: mockFirstGood,
  secondFAAuth: mockSecondGood
}
