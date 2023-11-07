<script>
  import { createEventDispatcher } from "svelte";

  export let rule_id = null;
  export let rule_string = "";
  export let share_to_athlete_id = "";
  export let athlete_choices = [];
  let og_rule_string = rule_string;
  let og_share_to_athlete_id = share_to_athlete_id;
  const dispatch = createEventDispatcher();

  function save() {
    dispatch("save", { rule_id, rule_string, share_to_athlete_id });
    og_share_to_athlete_id = share_to_athlete_id;
    og_rule_string = rule_string;
  }

  function delete_rule() {
    dispatch("delete", { rule_id });
  }
</script>

<tr>
  <td> <input type="text" class="input" bind:value={rule_string} /></td>
  <td>
    <select class="input" bind:value={share_to_athlete_id}>
      {#each athlete_choices as athlete}
        <option value={athlete.athlete_id}>{athlete.athlete_name}</option>
      {/each}
    </select>
  </td>
  <td>
    {#if og_rule_string != rule_string || og_share_to_athlete_id != share_to_athlete_id}
      <button class="btn-orange" on:click={save}>Save</button>
    {/if}
  </td>
  <td> <button class="btn-gray" on:click={delete_rule}>Delete</button></td>
</tr>
