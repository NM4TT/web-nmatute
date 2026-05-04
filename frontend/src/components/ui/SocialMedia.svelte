<script lang="ts">
    import MdiGithub from '~icons/mdi/github'
    import MdiLinkedin from '~icons/mdi/linkedin'
    import MdiInstagram from '~icons/mdi/instagram'
    import MdiDinosaurPixel from '~icons/mdi/dinosaur-pixel'

	import type { SocialMediaType } from "#lib/types/index.js";
	import { ICON_COLOR } from '#lib/constants/index.js';

	let { data = {
	    name: "unknown",
	    icon: "mdi:dinosaur-pixel",
	    url: "https://www.example.com"
	} } = $props<{ data: SocialMediaType }>();

	const icons: Record<string, any> = {
        'mdi:github': MdiGithub,
        'mdi:linkedin': MdiLinkedin,
        'mdi:instagram': MdiInstagram,
        'mdi:dinosaur-pixel': MdiDinosaurPixel
    };

    let SelectedIcon = $derived(icons[data.icon] || icons['mdi:dinosaur-pixel']);
</script>

<a
    href={data.url}
    aria-label={data.name}
    target="_blank"
    rel="noopener noreferrer"
>
    <SelectedIcon color={ICON_COLOR} />
</a>
