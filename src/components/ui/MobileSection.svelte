<script lang="ts">
	import { SOCIAL_MEDIA_LIST } from "#lib/constants";
	import SocialMedia from "./SocialMedia.svelte";

export let title: string = "Dummy Title";
</script>

<div id="mobile-first-look" class="md:hidden flex flex-col items-center justify-center py-10 px-4">
    <h1 class="font-display font-extrabold text-center mb-6 text-5xl tracking-tighter">
        { title }
    </h1>
    {#if title.toLowerCase() === "resume" || title.toLowerCase() === "portfolio"}
    <div class="flex justify-center">
        <ul class="list-none flex items-center gap-6">
            {#each SOCIAL_MEDIA_LIST as socialMedia}
                <li class="text-3xl">
                    <SocialMedia data={socialMedia} />
                </li>
            {/each}
        </ul>
    </div>
    {/if}
</div>