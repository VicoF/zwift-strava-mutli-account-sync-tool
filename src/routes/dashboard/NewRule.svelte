<script>
  import { createEventDispatcher } from "svelte";

  export let rule_string = "";
  export let share_to_athlete_id = "";
  export let athlete_choices = [];
  const dispatch = createEventDispatcher();

  function save() {
    dispatch("save", { rule_string, share_to_athlete_id });
    rule_string = "";
    share_to_athlete_id = "";
  }
</script>

<tr>
  <td>
    <input
      type="text"
      class="input"
      placeholder="New rule"
      bind:value={rule_string}
    /></td
  >
  <td>
    <select class="input" bind:value={share_to_athlete_id}>
      {#each athlete_choices as athlete}
        <option value={athlete.athlete_id}>{athlete.athlete_name}</option>
      {/each}
    </select>
  </td>
  <td>
    {#if rule_string != "" && share_to_athlete_id != ""}
      <button class="btn-orange" on:click={save}>Save</button>
    {/if}
  </td>
  <td />
</tr>
