<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import ThemeToggle from '#components/ui/ThemeToggle.svelte';
  import ContactButton from '#components/ui/ContactButton.svelte';
  import { NAV_LINKS } from "#lib/constants";
  import type { NavLinkType } from "#lib/types";

  let { links = NAV_LINKS, lang = 'en', toggleUrl = '' } = $props<{ links?: NavLinkType[]; lang?: 'en' | 'es'; toggleUrl?: string }>();

  let isOpen = $state(false);
  let x = $state(24);
  let y = $state(24);
  let isDragging = false;
  let startTimestamp = 0;
  let drawerEl: HTMLElement | null = $state(null);

  const toggleMenu = (e: MouseEvent | KeyboardEvent) => {
    // If clicked by a keyboard (e.detail === 0 or pointer events didn't trigger startTimestamp), allow it
    const isKeyboard = (e instanceof KeyboardEvent) || (e as any).detail === 0;
    if (!isKeyboard && startTimestamp > 0) {
      const duration = Date.now() - startTimestamp;
      if (duration > 200) return;
    }
    isOpen = !isOpen;
  };

  // Scroll locking effect
  $effect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      isOpen = false;
      return;
    }
    if (e.key === 'Tab' && isOpen && drawerEl) {
      const focusable = drawerEl.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;
      
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  };

  function draggable(node: HTMLElement) {
    let moving = false;

    const handleStart = () => {
      moving = true;
      isDragging = true;
      startTimestamp = Date.now();
      document.body.classList.add('dragging');
    };

    const handleStop = () => {
      if (!moving) return;
      moving = false;
      document.body.classList.remove('dragging');
      setTimeout(() => isDragging = false, 50);

      // Snap to nearest screen edge
      const buttonWidth = 56;
      const safeMargin = 16;
      const midPoint = window.innerWidth / 2;
      const currentLeft = window.innerWidth - x - buttonWidth;

      // Animate snap coordinates
      if (currentLeft < midPoint) {
        x = window.innerWidth - safeMargin - buttonWidth; // Snap to left
      } else {
        x = safeMargin; // Snap to right
      }
      y = Math.min(Math.max(y, safeMargin), window.innerHeight - safeMargin - buttonWidth);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!moving) return;
      if (e.cancelable) e.preventDefault();

      const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

      const buttonWidth = 56;
      const safeMargin = 10;

      // Clamp coordinates within the viewport bounds
      x = Math.max(safeMargin, Math.min(window.innerWidth - clientX - 28, window.innerWidth - safeMargin - buttonWidth));
      y = Math.max(safeMargin, Math.min(window.innerHeight - clientY - 28, window.innerHeight - safeMargin - buttonWidth));
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

<svelte:window onkeydown={handleKeyDown} />

<!-- Floating Toggle Button -->
<button 
    use:draggable
    class="md:hidden fixed z-110 flex flex-col gap-1.5 justify-center items-center w-14 h-14 rounded-full border border-secondary/20 bg-secondary shadow-2xl transition-transform active:scale-95 touch-none"
    style="right: {x}px; bottom: {y}px;"
    onclick={toggleMenu}
    aria-label="Toggle Menu"
    aria-expanded={isOpen}>

    <span class="h-0.5 w-6 transition-all duration-300 {isOpen ? 'rotate-45 translate-y-2' : ''}" style="background-color: var(--bg-base);"></span>
    <span class="h-0.5 w-6 transition-all duration-300 {isOpen ? 'opacity-0' : ''}" style="background-color: var(--bg-base);"></span>
    <span class="h-0.5 w-6 transition-all duration-300 {isOpen ? '-rotate-45 -translate-y-2' : ''}" style="background-color: var(--bg-base);"></span>
</button>

{#if isOpen}
    <!-- Backdrop Overlay -->
    <div
      in:fade={{ duration: 150 }}
      out:fade={{ duration: 150 }}
      class="fixed inset-0 z-100 backdrop-blur-xl bg-black/40 dark:bg-black/60"
      onclick={() => isOpen = false}
      role="presentation">
    </div>

    <!-- Navigation Drawer (Includes Focus Trap and High-End Easing) -->
    <div 
        bind:this={drawerEl}
        in:fly={{ x: 200, duration: 300, easing: cubicOut }}
        out:fly={{ x: 200, duration: 300, easing: cubicOut }}
        class="flex flex-col fixed top-0 right-0 w-[85%] max-w-xs h-full z-101 shadow-2xl p-8 border-l border-secondary/10"
        style="background-color: var(--bg-base); color: var(--text-base);"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation">

        <div class="flex items-center justify-between mb-12">
            <div class="scale-90 origin-left">
                <ContactButton text={lang === 'es' ? 'Contáctame' : 'Contact Me'} />
            </div>
            <div class="flex items-center gap-4">
                {#if toggleUrl}
                    <a 
                        href={toggleUrl} 
                        class="p-2 rounded-lg border border-secondary/20 hover:border-secondary/50 transition-[border-color,background-color,transform] duration-200 text-secondary cursor-pointer relative overflow-hidden w-10 h-10 flex items-center justify-center active:scale-90 font-mono text-xs font-bold tracking-wider uppercase select-none"
                        onclick={() => isOpen = false}
                    >
                        {lang === 'en' ? 'ES' : 'EN'}
                    </a>
                {/if}
                <ThemeToggle />
            </div>
        </div>

        <nav class="flex flex-col gap-6">
          {#each links as link}
            <a 
                href={link.href} 
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onclick={() => isOpen = false}
                class="font-display text-2xl font-bold tracking-tighter hover:text-secondary transition-colors duration-200"
            >
                {link.name}
                {#if link.external}
                    <span class="sr-only">(opens in a new tab)</span>
                {/if}
            </a>
          {/each}
        </nav>

        <div class="mt-auto pt-20 flex flex-col items-center gap-4">
            <a href={lang === 'es' ? "/es/" : "/"} onclick={() => isOpen = false}>
                <img src="/logo.svg" alt="Nicolas Matute Logo" class="h-auto w-16" width="64" height="64" />
            </a>
            <p class="font-mono text-[10px] uppercase tracking-widest opacity-60">Nicolas Matute</p>
        </div>
    </div>
{/if}

<style>
    /* Prevent text selection while dragging */
    :global(body.dragging) {
        user-select: none;
    }
</style>