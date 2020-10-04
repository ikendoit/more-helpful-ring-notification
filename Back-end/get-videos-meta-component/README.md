# Backend -> Auth Component

Single Instance Cloud Run, 
  Receive username + password, 
  Sometimes also receive 2FA

return refresh token to Client Web App.

# Building
export AUTH_COMPONENT_VERSION="v0.0.1"
docker build . -t murn-auth-component:$AUTH_COMPONENT_VERSION

# Deploying

# Testing
docker run \
  -p 8080:8080 \
  -v ./=/usr/src/app \
  murn-auth-component:$AUTH_COMPONENT_VERSION
