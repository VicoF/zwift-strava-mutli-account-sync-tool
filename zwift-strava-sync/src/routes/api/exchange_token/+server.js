import { STRAVA_CLIENT_ID } from "$lib/public_env";
import { STRAVA_CLIENT_SECRET } from "$lib/server/secrets";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const access_denied = url.searchParams.get("error") != null;
  const code = url.searchParams.get("code");
  const scope = url.searchParams.get("scope");

  const data = {
    client_id: STRAVA_CLIENT_ID.toString(),
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
  console.log(await response.json());
  throw redirect(302, "/");
}
