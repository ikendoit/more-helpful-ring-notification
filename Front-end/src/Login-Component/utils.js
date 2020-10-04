const AUTH_COMPONENT_URL = "http://localhost:8080"

const authenticate1stFA = async (username, password) => {

  const responseRaw = await fetch(`${AUTH_COMPONENT_URL}/1fa`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({username, password})
  })

  const responseJson = await responseRaw.json()

  console.log(responseJson)
}

const authenticate2ndFA = async (username, password, code_2fa) => {

  console.log(username, password)
  await fetch(`${AUTH_COMPONENT_URL}/2fa`, {
    method: 'POST'
  })

}

export {
  authenticate1stFA
}
