const { RingRestClient } = require( 'ring-client-api/lib/api/rest-client' )
const configMock = require('./env')

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

const secondFAAuth = async (faCode) => {

  try {
    return await RingApiClient.client.getAuth(faCode)
  }  catch(err) {
    console.log('Incorrect 2fa code. Please try again.')
  }

}

// MOCK methods
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

module.exports = {
  firstFAAuth: mockFirstGood,
  secondFAAuth
}
