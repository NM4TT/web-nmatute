<script lang="ts">
    import MdiGithub from '~icons/mdi/github'
    import MdiLinkedin from '~icons/mdi/linkedin'
    import MdiInstagram from '~icons/mdi/instagram'
    import MdiDinosaurPixel from '~icons/mdi/dinosaur-pixel'

	import type { SocialMediaType } from "#lib/types";

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
    class="text-secondary/80 hover:text-secondary hover:scale-110 transition-all duration-200 inline-block text-2xl"
>
    <SelectedIcon />
</a>
