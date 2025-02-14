<script lang="ts">
    import Icon from "@iconify/svelte";
	import type { SocialMediaType } from "$lib/types/index.js";
    import { ICON_COLOR } from '$lib/constants/index.js';
    
    export let data: SocialMediaType = {
        name: "unknown",
        icon: "mdi:dinosaur-pixel",
        url: "https://www.example.com"
    };
</script>

<a
    href={data.url}
    aria-label={data.name}
    target="_blank"
    rel="noopener noreferrer"
>
    <Icon icon={data.icon} color={ICON_COLOR} />
</a>