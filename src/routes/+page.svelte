<script>
  import { STRAVA_CLIENT_ID } from "$lib/public_env";
  function connectToStrava() {
    let scope = "activity:read_all";
    let redirect_uri = "http://localhost:5173/api/exchange_token";
    location.href = `http://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${redirect_uri}&approval_prompt=force&scope=${scope}`;
  }
</script>

<h1>Welcome to Zwift multi account sync</h1>
<button on:click={connectToStrava}> Connect to Strava </button>
