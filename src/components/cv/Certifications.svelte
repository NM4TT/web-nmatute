<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import type { CertificationItemType } from '#lib/types';
  import { formatEarnedDate } from '#lib/utils';

  let { certifications = [], lang = 'en', verifyText = 'Verify Credential', allLabel = 'All' } = $props<{
      certifications: CertificationItemType[];
      lang: string;
      verifyText: string;
      allLabel: string;
  }>();

  // Dynamic filter state
  let activeTag = $state('All');
  let selectedCertId = $state<string | null>(null);

  // Extract all unique skills/tags from certifications to build the filter bar
  let allTags = $derived([
    'All',
    ...new Set(certifications.flatMap((c) => c.skills || []))
  ]);

  // Sort by earned date descending and filter by selected tag
  let filteredCerts = $derived(
    [...certifications]
      .sort((a, b) => b.earned - a.earned)
      .filter((c) => activeTag === 'All' || c.skills.includes(activeTag))
  );

  let selectedCert = $derived(
    certifications.find((c) => c.id === selectedCertId) || null
  );

  function openModal(id: string) {
    selectedCertId = id;
  }

  function closeModal() {
    selectedCertId = null;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && selectedCertId !== null) {
      closeModal();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="space-y-6">
  <!-- Dynamic Filter Bar (Pill buttons similar to tools & skills keywords) -->
  <div class="flex flex-wrap gap-2 animate-fade-in-up">
    {#each allTags as tag}
      <button 
        type="button"
        class="font-mono text-xs px-3 py-1.5 rounded-full border transition-all duration-200 font-bold cursor-pointer select-none
               {activeTag === tag 
                 ? 'bg-secondary text-base border-secondary shadow-sm' 
                 : 'border-secondary/20 hover:border-secondary text-secondary/80 bg-secondary/5 hover:bg-secondary/10'}"
        style="color: {activeTag === tag ? 'var(--bg-base)' : 'inherit'}; border-color: {activeTag === tag ? 'var(--secondary)' : 'var(--border-color)'};"
        onclick={() => { activeTag = tag; closeModal(); }}
      >
        {tag === 'All' ? allLabel : tag}
      </button>
    {/each}
  </div>

  <!-- Certification Grid (Grid of 2 for mobile, grid of 3 for desktop) -->
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 animate-fade-in-up">
    {#each filteredCerts as cert (cert.id)}
      <button 
        type="button"
        class="group relative aspect-[4/3] rounded-xl border overflow-hidden cursor-pointer flex items-center justify-center p-1 sm:p-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-hidden focus:ring-2 focus:ring-secondary/50"
        style="background-color: var(--bg-surface); border-color: var(--border-color);"
        onclick={() => openModal(cert.id)}
      >
        {#if cert.resolvedImage}
          <img 
            src={cert.resolvedImage.src} 
            alt={cert.name} 
            width={cert.resolvedImage.width}
            height={cert.resolvedImage.height}
            class="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        {/if}
        
        <!-- Hover indicator overlay -->
        <div class="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/5 dark:group-hover:bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div class="p-2 rounded-full bg-base/80 dark:bg-surface/80 border border-secondary/15 shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-secondary">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
              <path d="M11 8v6"/>
              <path d="M8 11h6"/>
            </svg>
          </div>
        </div>
      </button>
    {/each}
  </div>
</div>

{#if selectedCert}
  <!-- Modal Portal / Container -->
  <div class="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
    <!-- Backdrop Overlay -->
    <div
      in:fade={{ duration: 150 }}
      out:fade={{ duration: 150 }}
      class="absolute inset-0 bg-black/70 backdrop-blur-md"
      onclick={closeModal}
      role="presentation"
    ></div>

    <!-- Modal Content Card -->
    <div
      in:scale={{ duration: 250, start: 0.95, easing: cubicOut }}
      out:scale={{ duration: 150, start: 0.95 }}
      class="relative w-full max-w-4xl max-h-[90vh] md:max-h-[80vh] overflow-y-auto rounded-2xl border flex flex-col md:flex-row gap-6 p-6 sm:p-8 z-101 shadow-2xl animate-fade-in-up"
      style="background-color: var(--bg-surface); border-color: var(--border-color); color: var(--text-base);"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <!-- Close Button (X) -->
      <button
        type="button"
        class="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary/10 text-secondary/60 hover:text-secondary cursor-pointer transition-colors select-none z-10"
        onclick={closeModal}
        aria-label="Close modal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18"/>
          <path d="m6 6 12 12"/>
        </svg>
      </button>

      <!-- Left Side: Image display -->
      <div 
        class="w-full md:w-1/2 flex items-center justify-center p-4 rounded-xl border bg-secondary/5 border-secondary/10 aspect-video md:aspect-square flex-shrink-0 select-none mt-8 md:mt-0"
      >
        {#if selectedCert.resolvedImage}
          <img
            src={selectedCert.resolvedImage.src}
            alt={selectedCert.name}
            width={selectedCert.resolvedImage.width}
            height={selectedCert.resolvedImage.height}
            class="max-w-full max-h-full object-contain drop-shadow-md"
          />
        {/if}
      </div>

      <!-- Right Side: Metadata information -->
      <div class="flex-grow flex flex-col justify-between space-y-6 pt-2">
        <div class="space-y-4">
          <div>
            <span class="font-mono text-xs text-secondary tracking-widest uppercase font-bold block mb-1 select-none">
              {selectedCert.issuer}
            </span>
            <h2 id="modal-title" class="font-display text-xl sm:text-2xl font-black tracking-tight leading-snug">
              {selectedCert.name}
            </h2>
          </div>

          <div class="flex items-center gap-2 select-none">
            <span class="font-mono text-xs text-secondary font-bold bg-secondary/10 px-2.5 py-1 rounded whitespace-nowrap">
              {formatEarnedDate(selectedCert.earned, lang)}
            </span>
          </div>

          {#if selectedCert.credentialId}
            <div class="text-xs font-mono text-secondary">
              <span class="opacity-60 uppercase font-black tracking-wider mr-1">ID:</span>
              <code class="px-1.5 py-0.5 rounded bg-secondary/10 select-all">{selectedCert.credentialId}</code>
            </div>
          {/if}

          <!-- Associated Skills Tags -->
          {#if selectedCert.skills && selectedCert.skills.length > 0}
            <div class="space-y-1.5">
              <span class="font-mono text-[10px] text-secondary/60 uppercase font-bold tracking-wider select-none block">Skills acquired:</span>
              <div class="flex flex-wrap gap-1.5">
                {#each selectedCert.skills as skill}
                  <span class="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/10 font-bold select-none">
                    {skill}
                  </span>
                {/each}
              </div>
            </div>
          {/if}
        </div>

        <!-- Verification link -->
        {#if selectedCert.url}
          <div class="pt-4 border-t border-secondary/10">
            <a
              href={selectedCert.url}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-base bg-secondary rounded-lg hover:opacity-90 transition-all select-none shadow-sm"
              style="color: var(--bg-base);"
            >
              {verifyText}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 3h6v6"/>
                <path d="M10 14 21 3"/>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              </svg>
            </a>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
