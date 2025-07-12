// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
serve((_req) => new Response("Hello World"))

serve(async (req) => {
  const { code } = await req.json()

  const client_id = Deno.env.get('SPOTIFY_CLIENT_ID')
  const client_secret = Deno.env.get('SPOTIFY_CLIENT_SECRET')
  const redirect_uri = Deno.env.get('SPOTIFY_REDIRECT_URI')

  const auth = btoa(`${client_id}:${client_secret}`)

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirect_uri
  })

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  
  const data = await tokenRes.json()
  console.log('Spotify response:', data)

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    status: tokenRes.status
  })
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/exchange-spotify-token' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
