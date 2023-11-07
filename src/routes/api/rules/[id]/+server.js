import { supabase } from "$lib/server/db";
import { json } from "@sveltejs/kit";

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

/** @type {import('../$types').RequestHandler} */
export async function PUT({ params, locals, request }) {
  const rule_id = params.id;
  const { rule_string, share_to_athlete_id } = await request.json();

  return json(
    (
      await supabase
        .from("sync_rules")
        .update({
          rule_string,
          share_to_athlete_id,
        })
        .eq("rule_id", rule_id)
        .eq("athlete_id", locals.athlete_id)
        .select()
        .single()
    ).data
  );
}
