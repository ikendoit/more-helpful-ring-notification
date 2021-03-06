const { RingApi } = require('ring-client-api')

const getVideoMetaData = async (refreshToken) => {

  // init client
  const ringApi = new RingApi({
    refreshToken
  });

  // get locations that have cameras
  const locations = await ringApi.getLocations()
  const location = locations[0]

  // NOT supporting multiple positions, should, but out of scope.
  // get all cameras of first location

  const allEventsPromises = location.cameras.map( (cam) => {
    return cam.getEvents({ limit: 6 })
  })

  const allEvents = await Promise.all(allEventsPromises)
  const allEventsFlat = allEvents.map((e, i) =>
    // enrich with camera name
    e.events.map(singleEvent => ({
        ...singleEvent,
        cameraName: location.cameras[i].name
    }))

    // flatten out into 1 array with all events
  ).flat()

  // testing
  const testevent = allEventsFlat[0].ding_id_str
  console.log(testevent)
  const url = await location.cameras[0].getRecordingUrl(testevent, {transcoded: true})
  console.log(url)
  // end testing

  return allEventsFlat;
}

module.exports = {
  getVideoMetaData
}
