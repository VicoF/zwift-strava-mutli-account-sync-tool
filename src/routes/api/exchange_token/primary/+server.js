import { redirect } from "@sveltejs/kit";
import { createJWT } from "$lib/server/jwt";
import { addUserToDb } from "../common";

/** @type {import('../$types').RequestHandler} */
export async function GET({ url, cookies }) {
  const access_denied = url.searchParams.get("error") != null;
  const code = url.searchParams.get("code");
  const scope = url.searchParams.get("scope");

  const user = await addUserToDb(code);

  await createJWT({ athlete_id: user.athlete_id }).then((jwt) => {
    cookies.set("token", jwt, { maxAge: 3600, path: "/" });
  });
  throw redirect(302, "/dashboard");
}
