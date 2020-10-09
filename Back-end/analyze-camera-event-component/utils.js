const { RingApi } = require('ring-client-api')
const { v4: uuidv4 } = require('uuid');
const fetch = require("node-fetch");
const storageClient = require( '@google-cloud/storage' );

const getDownloadUrl = async (refreshToken, dingIdStr, cameraName) => {

  // init client
  const ringApi = new RingApi({
    refreshToken
  });

  // get locations that have cameras
  const locations = await ringApi.getLocations()
  const location = locations[0]

  // NOT supporting multiple positions, should, but out of scope.
  const camera = location.cameras.find ( cam => cam.name === cameraName )
  if (!camera) {
    throw new Error(`Camera "${cameraName}" Not found, likely renamed. Please refresh the application.`)
  }

  const url = await camera.getRecordingUrl(dingIdStr, { transcoded: true })

  return url;
}

// get the url from module above ( mp4 file ), upload to gcs, return uuid url.
const uploadVideoToGCS = async (url) => {

  // exposing this publicly for clarity and personal-branding,
  //     this bucket does not allow listing, only GET-object.
  //     Object life-cycle auto deletes object after certain time.
  const storage = new storageClient.Storage({ projectId: 'ExplorerTank' }).bucket( 'ikenbucket-more-helpful-ring-notification-us-central' );

  const fileName = `${uuidv4()}.mp4`

  console.log('uploading')
  await new Promise( (resolve1, reject1) => {
    fetch(url)
      .then( res => new Promise((resolve2, reject2) => {

            const gcsStream = storage.file( fileName ).createWriteStream();
            res.body.pipe(gcsStream);
            res.body.on("end", resolve2);
            gcsStream.on("error", reject2);

          })
      )
      .then(resolve1)
      .catch(reject1);
  })

  console.log("uploaded")

  return fileName;
}

module.exports = {
  getDownloadUrl,
  uploadVideoToGCS
}
