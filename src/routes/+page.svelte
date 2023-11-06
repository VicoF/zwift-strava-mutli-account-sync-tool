<script>
  import { PUBLIC_STRAVA_CLIENT_ID } from "$env/static/public";
  function connectToStrava() {
    let scope = "activity:read_all";
    let redirect_uri = `${window.location.origin}/api/exchange_token`;
    location.href = `http://www.strava.com/oauth/authorize?client_id=${PUBLIC_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${redirect_uri}&approval_prompt=force&scope=${scope}`;
  }
</script>

<h1>Welcome to Zwift multi account sync</h1>
<button class="btn-orange" on:click={connectToStrava}>
  Connect to Strava
</button>
