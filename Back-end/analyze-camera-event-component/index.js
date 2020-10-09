const {
  getDownloadUrl,
  uploadVideoToGCS
} = require("./utils")
const express = require('express');
const bodyParser = require('body-parser')
const Joi = require('joi')

const app = express();
app.use(express.json())


app.post('/analyzeVideos', async (req, res)=> {

  // 1: validate
  // 2: send video content to gsc for analytics, set retention policy 1 hour.
  // 3: run analytics with video, get result
  // 4: return result to client

  // step 1
  const schema = Joi.object({
    refreshToken: Joi.string()
        .required(),
    dingIdStr: Joi.string()
        .required(),
    cameraName: Joi.string()
        .required(),
  })
  schema.validate(req.body)

  const { refreshToken, dingIdStr, cameraName } = req.body

  try {
    // step 2
    const urlDownload = await getDownloadUrl(refreshToken, dingIdStr, cameraName)
    const gcsFileName = await uploadVideoToGCS(urlDownload)

    // step 3
    // analyze call with gcs link
    let analyticsResult = {countHumans: 'I dont see none', countPets: 'looking petty'}

    // step 4
    res.send({
      analyticsResult,
      gcsFileName
    })

  } catch(err) {
    console.log(err)
    res.error(err)
  }
})


const port = 80;
app.listen(port, () => {
  console.log(`videos-analytics: listening on port ${port}`);
});
