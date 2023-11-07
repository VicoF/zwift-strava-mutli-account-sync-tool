import { validateJWT } from "$lib/server/jwt";
import { redirect } from "@sveltejs/kit";
import { setContext } from "svelte";

const notProtectedRoutes = [
  "^/$",
  "^/api/exchange_token/.*$",
  "^/api/webhooks/strava$",
];

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  if (notProtectedRoutes.some((route) => event.url.pathname.match(route))) {
    return await resolve(event);
  }
  const token = event.cookies.get("token");
  if (token == undefined) throw redirect(303, "/");
  const { payload, protectedHeader } = await validateJWT(token);
  if (payload.athlete_id == undefined) throw redirect(303, "/");
  event.locals.athlete_id = payload.athlete_id;

  return await resolve(event);
}
