<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  interface LangOption {
    code: string;
    label: string;
    url: string;
  }

  let { currentLang, options = [] } = $props<{
    currentLang: string;
    options: LangOption[];
  }>();

  let isOpen = $state(false);
  let dropdownEl: HTMLElement | null = $state(null);

  const toggleDropdown = () => {
    isOpen = !isOpen;
  };

  const closeDropdown = () => {
    isOpen = false;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownEl && !dropdownEl.contains(event.target as Node)) {
      isOpen = false;
    }
  };

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="relative inline-block text-left" bind:this={dropdownEl}>
  <!-- Dropdown Trigger Button -->
  <button
    type="button"
    onclick={toggleDropdown}
    class="p-2 rounded-lg border border-secondary/20 hover:border-secondary/50 transition-[border-color,background-color,transform] duration-200 text-secondary cursor-pointer relative overflow-hidden w-16 h-10 flex items-center justify-between px-3 active:scale-95 font-mono text-xs font-bold tracking-wider uppercase select-none"
    aria-haspopup="true"
    aria-expanded={isOpen}
  >
    <span>{currentLang}</span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5 transition-transform duration-200 {isOpen ? 'rotate-180' : ''} opacity-70">
      <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
    </svg>
  </button>

  {#if isOpen}
    <!-- Dropdown Menu -->
    <div
      transition:fly={{ y: 8, duration: 150, easing: cubicOut }}
      class="absolute right-0 top-full mt-2 w-32 rounded-xl border shadow-2xl z-50 p-2 flex flex-col gap-0.5"
      style="background-color: color-mix(in srgb, var(--bg-surface) 95%, transparent); border-color: var(--border-color); backdrop-filter: blur(12px);"
      role="menu"
    >
      {#each options as option}
        <a
          href={option.url}
          onclick={closeDropdown}
          class="block w-full text-left font-sans text-xs font-semibold px-3 py-2.5 rounded-lg transition-colors duration-150 {option.code === currentLang ? 'text-secondary bg-secondary/10' : 'text-secondary/70 hover:text-secondary hover:bg-secondary/5'}"
          role="menuitem"
        >
          {option.label}
        </a>
      {/each}
    </div>
  {/if}
</div>
