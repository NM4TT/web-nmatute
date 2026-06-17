<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { z } from 'astro/zod'; // Following the modern Zod import
  import ThemeToggle from '#components/ui/ThemeToggle.svelte';
  import ContactButton from '#components/ui/ContactButton.svelte';
  import { NAV_LINKS } from "#lib/constants";

  let isOpen: boolean = false;
  
  // Position state (initial values match bottom-6 right-6 which is 24px)
  let x = 24;
  let y = 24;
  let isDragging = false;
  let startTimestamp = 0;

  const toggleMenu = (e: MouseEvent | TouchEvent) => {
    // Prevent opening if the interaction was a drag (held longer than 200ms)
    const duration = Date.now() - startTimestamp;
    if (duration > 200) return;
    
    isOpen = !isOpen;
  };

  // Svelte Action for Dragging
  function draggable(node: HTMLElement) {
    let moving = false;

    const handleStart = () => {
      moving = true;
      isDragging = true;
      startTimestamp = Date.now();
    };

    const handleStop = () => {
      moving = false;
      setTimeout(() => isDragging = false, 50);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!moving) return;

      // Prevent page scroll while dragging
      if (e.cancelable) e.preventDefault();

      const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

      // Calculate distance from bottom-right corner
      // 28 is half the button width (w-14 = 56px) to center it on finger
      x = Math.max(10, window.innerWidth - clientX - 28);
      y = Math.max(10, window.innerHeight - clientY - 28);
    };

    node.addEventListener('mousedown', handleStart);
    node.addEventListener('touchstart', handleStart);
    
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('mouseup', handleStop);
    window.addEventListener('touchend', handleStop);

    return {
      destroy() {
        node.removeEventListener('mousedown', handleStart);
        node.removeEventListener('touchstart', handleStart);
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('mouseup', handleStop);
        window.removeEventListener('touchend', handleStop);
      }
    };
  }
</script>

<!-- Floating Toggle Button -->
<button 
    use:draggable
    class="md:hidden fixed z-110 flex flex-col gap-1.5 justify-center items-center w-14 h-14 rounded-full border border-secondary/20 bg-secondary shadow-2xl transition-transform active:scale-95 touch-none"
    style="right: {x}px; bottom: {y}px;"
    on:click={toggleMenu}
    aria-label="Toggle Menu">

    <span class="h-0.5 w-6 transition-all duration-300 {isOpen ? 'rotate-45 translate-y-2' : ''}" style="background-color: var(--bg-base);"></span>
    <span class="h-0.5 w-6 transition-all duration-300 {isOpen ? 'opacity-0' : ''}" style="background-color: var(--bg-base);"></span>
    <span class="h-0.5 w-6 transition-all duration-300 {isOpen ? '-rotate-45 -translate-y-2' : ''}" style="background-color: var(--bg-base);"></span>
</button>

{#if isOpen}
    <!-- Backdrop/Blur Overlay -->
    <div
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}
      class="fixed inset-0 z-100 backdrop-blur-xl bg-black/40 dark:bg-black/60"
      on:click={() => isOpen = false}
      role="presentation">
    </div>

    <!-- Solid Menu Container -->
    <div 
        in:fly={{ x: 200, duration: 300 }}
        out:fly={{ x: 200, duration: 300 }}
        class="flex flex-col fixed top-0 right-0 w-[85%] max-w-xs h-full z-101 shadow-2xl p-8 border-l border-secondary/10"
        style="background-color: var(--bg-base); color: var(--text-base);"
        role="navigation"
        aria-label="mobile menu">

        <!-- Action Row -->
        <div class="flex items-center justify-between mb-12">
            <div class="scale-90 origin-left">
                <ContactButton />
            </div>
            <div class="flex items-center gap-4">
                <ThemeToggle />
            </div>
        </div>

        <!-- Navigation Links -->
        <nav class="flex flex-col gap-6">
          {#each NAV_LINKS as link}
            <a 
                href={link.href} 
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                on:click={() => isOpen = false}
                class="font-display text-2xl font-bold tracking-tighter hover:text-secondary transition-colors duration-200"
            >
                {link.name}
            </a>
          {/each}
        </nav>

        <!-- Centered Logo at Bottom -->
        <div class="mt-auto pt-20 flex flex-col items-center gap-4">
            <a href="/" on:click={() => isOpen = false}>
                <img src="/logo.svg" alt="Nicolas Matute Logo" class="h-auto w-16" />
            </a>
            <p class="font-mono text-[10px] uppercase tracking-widest opacity-40">Nicolas Matute</p>
        </div>
    </div>
{/if}

<style>
    /* Prevent text selection while dragging */
    :global(body.dragging) {
        user-select: none;
    }
</style>