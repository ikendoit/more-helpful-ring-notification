const { RingRestClient } = require( 'ring-client-api/lib/api/rest-client' )

const firstFAAuth = async (username, password) => {

  // get 2FA awaiting-confirmation client
  const client= new RingRestClient({ username, password });

  console.log("line 12: ", client )
  if (client.using2fa) {
    console.log("that guys needs 2fA")
  }

  return client;
}

const secondFAAuth = async (faCode) => {

  try {
    return await RingApiClient.client.getAuth(faCode)
  }  catch(err) {
    console.log('Incorrect 2fa code. Please try again.')
  }

}

module.exports = {
  firstFAAuth,
  secondFAAuth
}
