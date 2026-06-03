<script lang="ts">
  import { onMount } from 'svelte';
  import IconSunny from '~icons/mdi/weather-sunny';
  import IconNight from '~icons/mdi/weather-night';

  let isDark = $state(false);

  function applyTheme() {
    const theme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (theme === 'dark' || (!theme && systemDark)) {
      isDark = true;
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      isDark = false;
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }

  onMount(() => {
    applyTheme();
    // Re-apply theme after Astro swaps the page content
    document.addEventListener('astro:after-swap', applyTheme);
    return () => document.removeEventListener('astro:after-swap', applyTheme);
  });

  function toggleTheme() {
    isDark = !isDark;
    const newTheme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }
</script>

<button
  onclick={toggleTheme}
  class="p-2 rounded-lg border border-secondary/20 hover:border-secondary/50 transition-[border-color,background-color] duration-200 text-secondary cursor-pointer"
  aria-label="Toggle Theme"
>
  {#if isDark}
    <IconSunny class="text-xl" />
  {:else}
    <IconNight class="text-xl" />
  {/if}
</button>
