<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { WorkExperienceItemType } from '#lib/types';

  export let data: WorkExperienceItemType = {
      name: "Tech Corp",
      role: "Software Developer",
      start: "January 20**",
      end: "Present",
      tasks: [
          "Task 1",
          "Task 2",
          "Task 3"
      ],
      difference: "",
  };
</script>

<article in:fade={{ duration: 400 }} class="mb-12 group">
    <header class="flex flex-col md:flex-row md:items-baseline justify-between mb-4 border-b border-secondary/10 pb-2">
        <h3 class="font-display text-2xl font-extrabold">{data.name}</h3>
        <div class="flex items-center gap-3">
            <div class="font-mono text-sm text-secondary tracking-tight">
                <span>{data.start}</span>
                <span class="mx-1">—</span>
                <span class={(data.end?.toLowerCase() || '') === 'present' ? 'text-secondary font-bold' : ''}>
                    {data.end || 'Present'}
                </span>
            </div>
            <span class="font-sans text-[11px] uppercase font-black tracking-wider px-3 py-1 rounded-md bg-secondary shadow-sm flex items-center gap-1.5" style="color: var(--bg-base);">
                {#if (data.end?.toLowerCase() || '') === 'present'}
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style="background-color: var(--bg-base);"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2" style="background-color: var(--bg-base);"></span>
                    </span>
                {/if}
                {data.difference}
            </span>
        </div>
    </header>

    <div class="flex items-center gap-2 mb-4">
        <span class="text-sm font-semibold uppercase tracking-widest opacity-60">Role:</span>
        <span class="text-lg font-bold">{data.role}</span>
    </div>

    <div class="space-y-3">
        <ul class="space-y-3">
            {#each data.tasks as task}
                <li class="flex items-start">
                    <span class="mt-1.5 mr-3 h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span>
                    <span class="leading-relaxed">{task}</span>
                </li>
            {/each}
        </ul>
    </div>
</article>