<script lang="ts">
	import '../app.css';
	import { Header, Footer } from '$lib/components/common/index.js';
	let { children } = $props();
</script>

<main class="py-5 lg:max-w-[96rem] px-6 sm:px-6 lg:px-8 max-w-full mx-auto bg-primary">
  <Header/>
  {@render children()}
  <Footer/>
</main>