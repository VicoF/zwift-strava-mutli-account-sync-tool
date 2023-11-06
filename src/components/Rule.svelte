<script>
  import { createEventDispatcher } from "svelte";

  export let rule_id = null;
  export let rule_string = "";
  export let share_to_athlete_id = "";
  let og_rule_string = rule_string;
  let og_share_to_athlete_id = share_to_athlete_id;
  const dispatch = createEventDispatcher();

  function save() {
    dispatch("save", { rule_id, rule_string, share_to_athlete_id });
  }

  function delete_rule() {
    dispatch("delete", { rule_id });
  }
</script>

<tr>
  <td> <input type="text" class="input" bind:value={rule_string} /></td>
  <td> <input type="text" class="input" bind:value={share_to_athlete_id} /></td>
  {#if og_rule_string != rule_string || og_share_to_athlete_id != share_to_athlete_id}
    <td> <button class="btn-orange" on:click={save}>Save</button></td>
  {/if}
  <td> <button class="btn-gray" on:click={delete_rule}>Delete</button></td>
</tr>
