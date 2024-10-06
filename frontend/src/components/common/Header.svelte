<script lang="ts">
    import { DesktopMenu, ContactButton } from '$components';
    import { imagePlaceholder } from '$lib/utils';
    const src = imagePlaceholder(126,35)
</script>

<header>
    <div id="desktop-header-content" class="hidden md:flex justify-between">
        <div id="logo">
            <img {src} alt="Nicolas Matute Logo" />
        </div>
        <div id="navigation" class="flex items-center justify-between">
            <DesktopMenu />
            <div class="ml-6 mr-5">
                <ContactButton />
            </div>
        </div>
    </div>
    <div id="mobile-header-content" class="md:hidden max-md:flex justify-start">
        <img src={imagePlaceholder(60)} alt="Nicolas Matute" class="m-0 pt-10" />
    </div>
</header>