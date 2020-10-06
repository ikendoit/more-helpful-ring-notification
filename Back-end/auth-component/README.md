# Backend -> Auth Component

Single Instance Cloud Run, 
  Receive username + password, 
  Sometimes also receive 2FA

return refresh token to Client Web App.

# Building
export AUTH_COMPONENT_VERSION="v0.0.1"
docker build . -t murn-auth-component:$AUTH_COMPONENT_VERSION

# Deploying
<Check GCP Cloud Run docs>
...instruction here...
# Testing
go to root,
docker compose up (-d)
