<script>
  import { createEventDispatcher } from "svelte";

  export let rule_string = "";
  export let share_to_athlete_id = "";
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
    <input
      type="text"
      class="input"
      placeholder="New rule"
      bind:value={share_to_athlete_id}
    /></td
  >
  {#if rule_string != "" && share_to_athlete_id != ""}
    <td> <button class="btn-orange" on:click={save}>Save</button></td>
  {/if}
</tr>
