import { STRAVA_SUBSCRIPTION_ID } from "$env/static/private";
import { supabase } from "$lib/server/db";

/** @type {import('../strava/$types').RequestHandler} */
export async function POST({ request }) {
  const {
    object_type,
    object_id,
    aspect_type,
    updates,
    owner_id,
    subscription_id,
    event_time,
  } = await request.json();

  if (subscription_id != STRAVA_SUBSCRIPTION_ID) {
    return new Response(null, { status: 404 });
  }

  if (object_type != "activity" && aspect_type != "create") {
    return new Response();
  }
  console.log("object_id", object_id);

  const athlete_tokens = (
    await supabase.from("strava_tokens").select().eq("athlete_id", owner_id)
  ).data;
  let myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${athlete_tokens.access_token}`);

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const activity = await fetch(
    `https://www.strava.com/api/v3/activities/${object_id}`,
    requestOptions
  ).then((response) => response.json());

  const rules = (
    await supabase
      .from("sync_rules")
      .select()
      .eq("athlete_id", owner_id)
      .containedBy("rule_string", `%${activity.name}%`)
  ).data;
  console.log("test", rules);
  console.log("activity", activity);
  return new Response();
}
