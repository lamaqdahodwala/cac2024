<script lang="ts">
  import { page } from "$app/stores"
  import { signOut } from "@auth/sveltekit/client"
  import { goto } from '$app/navigation';

  $: if ($page.data.session) {
    goto('/dashboard');
  }
</script>

<h1>SvelteKit Auth</h1>
<div>
  {#if $page.data.session}
    {#if $page.data.session.user?.image}
      <img
        src={$page.data.session.user.image}
        alt="User Avatar"
        style="width: 50px; height: 50px; border-radius: 50%;"
      />
    {/if}
    <span>
      <small>Signed in as</small><br />
      <strong>{$page.data.session.user?.name ?? "User"}</strong>
    </span>
    <button on:click={() => signOut()}>Sign out</button>
  {:else}
    <span>You are not signed in</span>
    <a href="/signin">Sign in</a>
  {/if}
</div>


