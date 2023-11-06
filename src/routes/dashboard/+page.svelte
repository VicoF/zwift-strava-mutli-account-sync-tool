<script>
  import NewRule from "../../components/NewRule.svelte";
  import Rule from "../../components/Rule.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

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
  function saveRule(event) {
    const { rule_id, rule_string, share_to_athlete_id } = event.detail;
  }
  async function deleteRule(event) {
    const { rule_id } = event.detail;
    await fetch(`/api/rules/${rule_id}`, { method: "DELETE" });
    data.sync_rules = data.sync_rules.filter(
      (rule) => rule.rule_id !== rule_id
    );
  }
</script>

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
      <Rule on:delete={deleteRule} on:save={saveRule} {...rules} />
    {/each}
  </tbody>
</table>
<NewRule on:save={createRule} />
