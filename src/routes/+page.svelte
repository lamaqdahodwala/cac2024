<script lang="ts">
  import { page } from "$app/stores"
  import { signOut } from "@auth/sveltekit/client"
  import { goto } from '$app/navigation';
	import type { PageData } from "./$types";

  $: if ($page.data.session) {
    goto('/dashboard');
  }

  export let data: PageData
</script>


<div>
  {#if data.authState}
    <p class="is-flex is-flex-direction-row">
      <small class='mr-2'>Signed in as</small><br />
      <span class="has-text-weight-bold">{data.authState.user?.name ?? "User"}</span>
    </p>
    <button on:click={() => signOut()} class="button is-warning is-inverted">Sign out</button>
  {:else}
    <span>You are not signed in</span>
    <a href="/signin">Sign in</a>
  {/if}
</div>


