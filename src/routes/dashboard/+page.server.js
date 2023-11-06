import { supabase } from "$lib/server/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  const sync_rules = (
    await supabase
      .from("sync_rules")
      .select()
      .eq("athlete_id", locals.athlete_id)
  ).data;
  return {
    sync_rules,
  };
}
