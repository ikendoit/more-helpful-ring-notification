// Imports the Google Cloud Video Intelligence library
const video = require('@google-cloud/video-intelligence').v1;

// Creates a client
const client = new video.VideoIntelligenceServiceClient();
const fs = require("fs")

const main  = async () => {

  const gcsUri = 'gs://ikenbucket-more-helpful-ring-notification/3ba4c862-bab7-4760-88ea-53803de1487f.mp4';
  //const gcsUri = 'gs://ikenbucket-more-helpful-ring-notification/cat.mp4';

  const request = {
    inputUri: gcsUri,
    features: ['OBJECT_TRACKING'],
  };

  // Detects labels in a video
  const [operation] = await client.annotateVideo(request);
  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();

  fs.writeFileSync("./test-result.json", JSON.stringify(operationResult, null, 2))

  // Gets annotations for video
  const annotations = operationResult.annotationResults[0];

  const labels = annotations.segmentLabelAnnotations;

  labels.forEach(label => {
    console.log(`Label ${label.entity.description} occurs at:`);
    label.segments.forEach(segment => {
      const time = segment.segment;
      if (time.startTimeOffset.seconds === undefined) {
        time.startTimeOffset.seconds = 0;
      }
      if (time.startTimeOffset.nanos === undefined) {
        time.startTimeOffset.nanos = 0;
      }
      if (time.endTimeOffset.seconds === undefined) {
        time.endTimeOffset.seconds = 0;
      }
      if (time.endTimeOffset.nanos === undefined) {
        time.endTimeOffset.nanos = 0;
      }
      console.log(
        `\tStart: ${time.startTimeOffset.seconds}` +
          `.${(time.startTimeOffset.nanos / 1e6).toFixed(0)}s`
      );
      console.log(
        `\tEnd: ${time.endTimeOffset.seconds}.` +
          `${(time.endTimeOffset.nanos / 1e6).toFixed(0)}s`
      );
      console.log(`\tConfidence: ${segment.confidence}`);
    });
  });
}

main()
