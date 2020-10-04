const { RingRestClient } = require( 'ring-client-api/lib/api/rest-client' )

const getVideoMetaData = async (refreshToken) => {
  console.log(refreshToken)

  return [{
    name: 'first video',
    id: '1adewe23w',
    timestamp: '2020-09-02T23:11:11Z'
  }]
}

module.exports = {
  getVideoMetaData
}
