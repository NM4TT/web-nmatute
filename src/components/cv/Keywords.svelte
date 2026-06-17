<script lang="ts">
  import { fade } from 'svelte/transition';
  export let data: string[] = [
      "Skill 1",
      "Skill 2",
      "Skill 3",
  ];
</script>

<div class="flex flex-wrap gap-3">
    {#each data as keyword, i}
        <span 
            in:fade={{ duration: 300, delay: i * 50 }}
            class="font-mono text-sm px-4 py-2 rounded-lg border border-secondary/30 
                   hover:border-secondary hover:text-secondary transition-all duration-300 cursor-default
                   bg-secondary/5 font-bold"
        >
            {keyword}
        </span>
    {/each}
</div>