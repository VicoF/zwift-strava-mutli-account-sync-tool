import { supabase } from "$lib/server/db";

/** @type {import('../$types').RequestHandler} */
export async function DELETE({ params, locals }) {
  const rule_id = params.id;
  const athlete_id = locals.athlete_id;

  await supabase
    .from("sync_rules")
    .delete()
    .eq("rule_id", rule_id)
    .eq("athlete_id", athlete_id);
  return new Response(null, { status: 204 });
}
