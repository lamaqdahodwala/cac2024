<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from "$app/stores";
  import { goto } from '$app/navigation';
  import type { PageData } from "./$types";

  import Hero from '../components/Hero.svelte';
  import InfoBanner from '../components/InfoBanner.svelte';
  import InfoBanner2 from '../components/InfoBanner2.svelte';
  import InfoBanner3 from '../components/InfoBanner3.svelte';
  import InfoBanner4 from '../components/InfoBanner4.svelte';
  import Features from '../components/Features.svelte';
  import Courses from '../components/Courses.svelte';
  import Playground from '../components/Playground.svelte';
  import Community from '../components/Community.svelte';
  import Newsletter from '../components/Newsletter.svelte';
  import CTA from '../components/CTA.svelte';

  export let data: PageData;
  let email = '';

  $: if ($page.data.authState) {
    goto('/dashboard');
  }

  onMount(() => {
    setTimeout(() => { }, 100);
  });
</script>

<svelte:head>
  <title>BrainBlox: Fun AI Learning for Young Minds</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&family=Roboto:wght@300&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
</svelte:head>

<main class="dashboard-wrapper">
  <Hero/>
  
  <InfoBanner/>
  
  <Features />

  <InfoBanner2/>
  
  <Courses />

  <InfoBanner3/>
  
  <Playground />
  
  <Community />

  <InfoBanner4/>
  
  <Newsletter bind:email />
  
  <CTA />
</main>

<style>
  @import '../styles/global.css';
</style>