<script lang="ts">
	import '../generated.css';
	import { Header, Footer } from '$common/components';
	let { children } = $props();
</script>

<main class="py-5 lg:max-w-16xl px-6 sm:px-6 lg:px-8 max-w-full mx-auto bg-primary">
  <Header/>
  {@render children()}
  <Footer/>
</main>