<script lang="ts">
	import { SOCIAL_MEDIA_LIST } from "$lib/constants/index.js";
	import { SocialMedia } from "./index.js";

export let title: string = "Dummy Title";
</script>

<div id="mobile-first-look" class="md:hidden max-md:flex flex-col justify-center">
    <div class="flex justify-center">
        <h1 class="font-bold text-center pb-4 max-xs:text-2.5xl max-sm:text-4xl max-md:text-5xl">
            { title }
        </h1>
    </div>
    {#if title.toLowerCase() === "resume" }
    <div class="flex justify-center">
        <ul class="list-none flex items-center">
            {#each SOCIAL_MEDIA_LIST as socialMedia}
                <li class="max-xs:text-2.5xl max-sm:text-4xl max-md:text-5xl px-2">
                    <SocialMedia data={socialMedia} />
                </li>
            {/each}
        </ul>
    </div>
    {/if}
</div>