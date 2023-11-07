/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
  return {
    athlete_id: locals.athlete_id,
  };
}
