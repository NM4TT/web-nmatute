<script lang="ts">
	import '../app.css';
	import { Header, Footer } from '$common/components/index.js';
	let { children } = $props();
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&family=Sora:wght@600;700;800&display=swap" rel="stylesheet">
</svelte:head>

<main class="py-5 lg:max-w-16xl px-6 sm:px-6 lg:px-8 max-w-full mx-auto bg-primary">
  <Header/>
    {@render children()}
  <Footer/>
</main>