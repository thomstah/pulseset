import * as SecureStore from 'expo-secure-store'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, SPOTIFY_SCOPES } from '@env'

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
}

export async function authenticateWithSpotify() {
  const redirectUri = SPOTIFY_REDIRECT_URI
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: SPOTIFY_CLIENT_ID,
      scopes: SPOTIFY_SCOPES.split(' '),
      redirectUri,
      responseType: 'code',
      usePKCE: true,
    },
    discovery,
  )

  return { request, response, promptAsync }
}
