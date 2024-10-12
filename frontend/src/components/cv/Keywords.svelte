<script lang="ts">
export let data: Object = {
    keywords: [
        "Java",
        "Golang",
        "Kubernetes",
    ],
};
</script>

<ul 
    class="grid grid-cols-1 sm:grid-cols-2 
    md:grid-cols-3 text-center font-medium">
    {#each data.keywords as keyword}
        <li class="py-4 hover:text-secondary 
            hover:text-xl transition-all duration-300
            w-3/4 max-w-sm mx-auto">
            {keyword}
        </li>
    {/each}
</ul>