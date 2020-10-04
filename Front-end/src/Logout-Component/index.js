import React from 'react'
import { Button, message } from 'antd';

const LogoutButton = (props) => {
  const logout = () => {
    console.log("...loging out here...")
    localStorage.removeItem('refreshToken')
    props.setLoggedIn(false)
  }

  return (
    <Button
      onClick={logout}
      style={{
        float: 'right',
        backgroundColor: 'red',
        textAlign: 'center',
        width: 40,
        height: 30,
      }}
    > X </Button>
  )
}

export default LogoutButton
