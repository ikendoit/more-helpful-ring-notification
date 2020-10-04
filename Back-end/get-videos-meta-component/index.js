const {
  getVideoMetaData
} = require("./utils")
const express = require('express');
const bodyParser = require('body-parser')
const Joi = require('joi')

const app = express();
app.use(express.json())

app.post('/videoMetas', async (req, res)=> {

  // 1: validate
  // 2: get video metas
  // 3: return

  // step 1
  const schema = Joi.object({
    refreshToken: Joi.string()
        .required()
  })
  schema.validate(req.body)

  const { refreshToken } = req.body

  // step 2
  const getVideosMetaResponse = getVideoMetaData(refreshToken)

  // step 3
  res.send(getVideosMetaResponse)

})


const port = 80;
app.listen(port, () => {
  console.log(`video-meta: listening on port ${port}`);
});
