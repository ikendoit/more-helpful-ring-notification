# Backend -> Get Videos Meta Component

Single Instance Cloud Run, 
  Receive refreshToken, 
  Receive date-string: 'YYYY-MM-DD' ( optional )

return all Videos of either today, or of date-string.

# Building
export GET_VIDEOS_META_COMPONENT_VERSION="v0.0.1"
docker build . -t murn-get-videos-meta-component:$GET_VIDEOS_META_COMPONENT_VERSION

# Deploying

# Testing
docker run \
  -p 8080:8080 \
  -v ./=/usr/src/app \
  murn-get-videos-meta-component:$GET_VIDEOS_META_COMPONENT_VERSION
