<script>
  import { PUBLIC_STRAVA_CLIENT_ID } from "$env/static/public";
  import NewRule from "./NewRule.svelte";
  import Rule from "./Rule.svelte";
  import { page } from "$app/stores";

  /** @type {import('./$types').PageData} */
  export let data;
  const scope = "activity:write";
  $: redirect_uri = encodeURIComponent(
    `${$page.url.origin}/api/exchange_token/${data.athlete_id}`
  );
  $: sharing_url = `http://www.strava.com/oauth/authorize?client_id=${PUBLIC_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${redirect_uri}&approval_prompt=force&scope=${scope}`;

  async function createRule(event) {
    const res = await fetch("/api/rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event.detail),
    });
    const { rule_id, rule_string, share_to_athlete_id } = await res.json();
    data.sync_rules = [
      ...data.sync_rules,
      { rule_id, rule_string, share_to_athlete_id },
    ];
  }
  async function saveRule(event) {
    const { rule_id, rule_string, share_to_athlete_id } = event.detail;
    await fetch(`/api/rules/${rule_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rule_string, share_to_athlete_id }),
    });
  }
  async function deleteRule(event) {
    const { rule_id } = event.detail;
    await fetch(`/api/rules/${rule_id}`, { method: "DELETE" });
    data.sync_rules = data.sync_rules.filter(
      (rule) => rule.rule_id !== rule_id
    );
  }
  function copyUrl() {
    navigator.clipboard.writeText(sharing_url);
  }
</script>

<div class="flex flex-row gap-5">
  <table class="table-auto">
    <thead>
      <tr>
        <th>String to look for in activity's name</th>
        <th>Athlete id to share to</th>
        <th />
        <th />
      </tr>
    </thead>
    <tbody>
      {#each data.sync_rules as rules}
        <Rule
          on:delete={deleteRule}
          on:save={saveRule}
          {...rules}
          athlete_choices={data.connected_athletes}
        />
      {/each}
      <NewRule on:save={createRule} athlete_choices={data.connected_athletes} />
    </tbody>
  </table>
  <div class="flex flex-col">
    <h1>Add a new account</h1>
    <div class="flex">
      <input class="input w-full block" value={sharing_url} readonly />
      <button class="icon-button" on:click={copyUrl}>
        <span class="material-symbols-outlined"> content_copy </span>
      </button>
    </div>
    <h1>Already connected athletes</h1>
    <ul>
      {#each data.connected_athletes as athlete}
        <li>{athlete.athlete_name}</li>
      {/each}
    </ul>
  </div>
</div>
