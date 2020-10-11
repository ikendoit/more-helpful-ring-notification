WIP, please come back later, Github Adventurers.

This project is parked for now, until either [GCP Intelligence Video](https://cloud.google.com/video-intelligence) or [AWS Rekognition](https://aws.amazon.com/rekognition/) improves their pet-detection in videos for top-down angles ( as well as side-way angles )

Goal of this project:

- Front-end app: user can log into RING on cusom phone PWA, and be notified of ring-videos activities with more details ( 1 black dog, 1 white dog ).
- Back-end: 3 Cloud Run end points that supports the front-end.
- Everything are secured, the system does not persist user-data on the cloud more than they need to.

# Dev guide:

gcloud auth application-default login
< get service account and put to ~/.config/gcloud/custom-service-account.json to use Video Intelligence AI >

## Front-end:

npm start
remember to set up CORS

## Back-end:

docker-compose up
