/** @type {import('../strava/$types').RequestHandler} */
export async function GET({ url }) {
  const challenge = url.searchParams.get("hub.challenge");
  const verifyToken = url.searchParams.get("hub.verify_token");
  if (verifyToken != "vicool") {
    return new Response(null, { status: 404 });
  }
  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  return new Response(`{"hub.challenge":"${challenge}"}`, {
    status: 200,
    headers,
  });
}
