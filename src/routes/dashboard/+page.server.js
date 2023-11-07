import { supabase } from "$lib/server/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  const sync_rules = (
    await supabase
      .from("sync_rules")
      .select()
      .eq("athlete_id", locals.athlete_id)
  ).data;
  const connected_athletes = await supabase
    .from("connected_athletes")
    .select("strava_tokens!connected_athlete(athlete_id, athlete_name)")
    .eq("athlete_id", locals.athlete_id)
    .then(({ data }) => data?.map((item) => item.strava_tokens));
  return {
    sync_rules,
    connected_athletes,
  };
}
