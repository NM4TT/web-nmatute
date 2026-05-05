<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { ProjectItemType } from '#lib/types';

  export let data: ProjectItemType = {
      name: "Project Name",
      tools: ["Tech"],
      codebase: "#",
      live: "#"
  };
</script>

<article 
  in:fade={{ duration: 400, delay: 200 }}
  class="group flex flex-col p-6 rounded-lg border border-secondary/30 
         hover:border-secondary transition-colors duration-200 h-full"
  style="background-color: var(--bg-surface);">
  
  <header class="mb-4">
    <h3 class="text-xl font-bold tracking-tight">
      {data.name}
    </h3>
  </header>

  <div class="grow">
    <div class="flex flex-wrap gap-2 mb-6">
      {#each data.tools as tool}
        <span class="font-mono text-[10px] uppercase tracking-wider px-2 py-1 
                     rounded-full bg-secondary/10 text-secondary border border-secondary/10 font-bold">
          {tool}
        </span>
      {/each}
    </div>
  </div>

  <footer class="flex items-center gap-4 mt-auto">
    <a 
      href={data.codebase} 
      target="_blank" 
      rel="noopener noreferrer"
      class="flex items-center gap-1 text-sm font-medium opacity-70 hover:opacity-100 
             hover:text-secondary transition-all"
    >
      Details
    </a>
    
    {#if data.live}
      <a 
        href={data.live} 
        target="_blank" 
        rel="noopener noreferrer"
        class="flex items-center gap-1 text-sm font-medium opacity-70 hover:opacity-100 
               hover:text-secondary transition-all"
      >
        Demo
      </a>
    {/if}
  </footer>
</article>