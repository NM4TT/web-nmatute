<script lang="ts">
import { ICON_COLOR } from '$lib/constants/index.js'
	import type { WorkExperienceItemType } from '$lib/types/index.js';
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

<article class="mb-6">
    <h3 class="font-bold text-lg md:text-1xl">{data.name}</h3>
    <div class="flex justify-start my-1">
        <p class="font-medium">Role:</p>
        <p class="ml-3">{data.role}</p>
    </div>
    <div class="flex justify-normal my-1">
        <p>{data.start}</p>
        <p class="ml-2">-</p>
        <p class="ml-2">{data.end}</p>
        <p class="ml-2 font-bold">|</p>
        <p class="ml-2">{data.difference}</p>
    </div>
    <div class="my-2">
        <h4 class="font-medium">Responsibilities:</h4>
        <ul>
            {#each data.tasks as task}
                <li class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill={ICON_COLOR} d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z" />
                    </svg>
                    <span class="ml-2">{task}</span>
                </li>
            {/each}
        </ul>
    </div>
</article>