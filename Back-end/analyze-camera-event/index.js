const {
  getVideoMetaData
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
    dingId: Joi.string()
        .required()
  })
  schema.validate(req.body)

  const { refreshToken } = req.body

  // step 2
  const getVideosMetaResponse = await getVideoMetaData(refreshToken)

  // step 3
  res.send(getVideosMetaResponse)
})


const port = 80;
app.listen(port, () => {
  console.log(`video-meta: listening on port ${port}`);
});
