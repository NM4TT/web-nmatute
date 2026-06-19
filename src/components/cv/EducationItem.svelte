<script lang="ts">
  import type { EducationItemType } from '#lib/types';

  export let data: EducationItemType = {
      title: "Master Degree",
      name: "Technological University Of Panama (UTP)",
      start: "January 20**",
      end: "Present",
  };
</script>

<article class="mb-10 group animate-fade-in-up">
    <header class="flex flex-col md:flex-row md:items-baseline justify-between mb-2 border-b border-secondary/10 pb-2">
        <h3 class="font-display text-xl font-bold">{data.title}</h3>
        <div class="font-mono text-sm text-secondary tracking-tight">
            <span>{data.start}</span>
            <span class="mx-1">—</span>
            <span class={(data.end?.toLowerCase() || '') === 'present' ? 'text-secondary font-bold' : ''}>
                {data.end || 'Present'}
            </span>
        </div>
    </header>
    <p class="text-lg opacity-80 font-medium italic">{data.name}</p>
</article>