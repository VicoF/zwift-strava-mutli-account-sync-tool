import { STRAVA_CLIENT_SECRET } from "$env/static/private";
import { PUBLIC_STRAVA_CLIENT_ID } from "$env/static/public";
import { supabase } from "$lib/server/db";

export async function addUserToDb(code) {
  const data = {
    client_id: PUBLIC_STRAVA_CLIENT_ID.toString(),
    client_secret: STRAVA_CLIENT_SECRET,
    code,
    grant_type: "authorization_code",
  };

  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  return (
    await supabase
      .from("strava_tokens")
      .upsert({
        athlete_id: responseData.athlete.id,
        athlete_name: `${responseData.athlete.firstname} ${responseData.athlete.lastname}`,
        access_token: responseData.access_token,
        refresh_token: responseData.refresh_token,
        expires_at: new Date(responseData.expires_at * 1000).toUTCString(),
      })
      .select()
      .single()
  ).data;
}
