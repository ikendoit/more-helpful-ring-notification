// should use REACT_APP_... env var for more centralized config.
const VIDEO_META_COMPONENT_URL = "http://localhost:8081"

const getVideosMeta = async (refreshToken) => {

  const responseRaw = await fetch(`${VIDEO_META_COMPONENT_URL}/videosMeta`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({refreshToken})
  })

  const responseJson = await responseRaw.json()

  console.log(responseJson)

  return responseJson
}


export {
  getVideosMeta
}
