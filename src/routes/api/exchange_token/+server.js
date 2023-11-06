import { PUBLIC_STRAVA_CLIENT_ID } from "$env/static/public";
import { STRAVA_CLIENT_SECRET } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import { supabase } from "$lib/server/db";
import { createJWT } from "$lib/server/jwt";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, cookies }) {
  const access_denied = url.searchParams.get("error") != null;
  const code = url.searchParams.get("code");
  const scope = url.searchParams.get("scope");

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
  await supabase.from("strava_tokens").upsert({
    athlete_id: responseData.athlete.id,
    access_token: responseData.access_token,
    refresh_token: responseData.refresh_token,
    expires_at: new Date(responseData.expires_at).toUTCString(),
  });
  await createJWT({ athlete_id: responseData.athlete.id }).then((jwt) => {
    cookies.set("token", jwt, { maxAge: 3600, path: "/" });
  });
  throw redirect(302, "/dashboard");
}
