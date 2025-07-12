import {
  useAuthRequest,
  makeRedirectUri,
  ResponseType,
} from 'expo-auth-session'
import { SPOTIFY_CLIENT_ID, SPOTIFY_SCOPES } from '@env'

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEnpoint: 'https://accounts.spotify.com/api/token',
}

export function useSpotifyAuth() {
  const redirectUri = makeRedirectUri({
    scheme: 'echocraft',
  })

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: SPOTIFY_CLIENT_ID,
      scopes: SPOTIFY_SCOPES.split(' '),
      redirectUri,
      responseType: ResponseType.Code,
      usePKCE: true,
    },
    discovery,
  )

  return { request, response, promptAsync, redirectUri }
}
