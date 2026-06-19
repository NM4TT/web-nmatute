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
  class="p-2 rounded-lg border border-secondary/20 hover:border-secondary/50 transition-[border-color,background-color,transform] duration-200 text-secondary cursor-pointer relative overflow-hidden w-10 h-10 flex items-center justify-center active:scale-90"
  aria-label="Toggle Theme"
>
  <div class="transition-transform duration-300 {isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'} absolute">
    <IconNight class="text-xl" />
  </div>
  <div class="transition-transform duration-300 {isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'} absolute">
    <IconSunny class="text-xl" />
  </div>
</button>
