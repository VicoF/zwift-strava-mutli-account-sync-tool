import { redirect } from "@sveltejs/kit";
import { addUserToDb } from "../common";
import { supabase } from "$lib/server/db";

/** @type {import('../$types').RequestHandler} */
export async function GET({ url, params }) {
  const access_denied = url.searchParams.get("error") != null;
  const code = url.searchParams.get("code");
  const scope = url.searchParams.get("scope");
  const athlete_id = params.athlete_id;

  const user = await addUserToDb(code);
  await supabase.from("connected_athletes").upsert({
    athlete_id,
    connected_athlete: user.athlete_id,
  });

  throw redirect(302, "/success");
}
