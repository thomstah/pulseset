import React, { useEffect } from 'react'
import { Button, View, Text } from 'react-native'
import { useSpotifyAuth } from '../hooks/useSpotifyAuth'

export default function LoginScreen() {
  const { promptAsync, response } = useSpotifyAuth()

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params
      console.log('Auth Code: ', code)
      //send code to backend or change for tokens
    }
  }, [response])

  return (
    <View>
      <Text>Welcome to EchoCraft</Text>
      <Button title="Login with Spotify" onPress={() => promptAsync()} />
    </View>
  )
}
