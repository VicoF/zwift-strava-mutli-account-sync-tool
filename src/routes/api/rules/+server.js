import { supabase } from "$lib/server/db";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
  const { rule_string, share_to_athlete_id } = await request.json();
  const athlete_id = locals.athlete_id;
  console.log(locals);
  console.log({ rule_string, share_to_athlete_id, athlete_id });
  let new_rule = await supabase
    .from("sync_rules")
    .insert({ rule_string, share_to_athlete_id, athlete_id })
    .select()
    .single();
  console.log(new_rule);
  return json(new_rule.data);
}
