<script lang="ts">
    import { imagePlaceholder } from '$lib/utils'
    export let data: Object = {
        corp: "Tech Corp",
        role: "Software Developer",
        start: "January 20**",
        end: "Present",
        tasks: [
            "Task 1",
            "Task 2",
            "Task 3"
        ],
    };
</script>

<article class="mb-6">
    <h3 class="font-bold text-lg md:text-2xl">{data.corp}</h3>
    <div class="flex justify-start my-1">
        <p class="font-medium">Role:</p>
        <p class="ml-3">{data.role}</p>
    </div>
    <div class="flex justify-normal my-1">
        <p>{data.start}</p>
        <p class="ml-3">-</p>
        <p class="ml-3">{data.end}</p>
    </div>
    <div class="my-2">
        <h4 class="font-medium">Responsibilities:</h4>
        <ul>
            {#each data.tasks as task}
                <li class="flex items-center">
                    <img
                    src={imagePlaceholder(16)}
                    alt="Tools, Skills and Languages"
                    class="w-4 h-4 mr-2"
                    />
                    <span>{task}</span>
                </li>
            {/each}
        </ul>
    </div>
</article>