<script lang="ts">
    import { DesktopMenu, ContactButton } from '$components';
    import { imagePlaceholder } from '$lib/utils';
    const src = imagePlaceholder(256,70)
</script>

<header id="top">
    <div id="desktop-header-content" class="hidden md:flex justify-between mt-5">
        <div id="logo">
            <img {src} alt="Nicolas Matute Logo" />
        </div>
        <div id="navigation" class="flex items-center justify-between">
            <DesktopMenu />
            <ContactButton />
        </div>
    </div>
</header>