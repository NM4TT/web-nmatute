<script lang="ts">
import DesktopMenu from '#components/layout/DesktopMenu.svelte';
import MobileMenu from '#components/layout/MobileMenu.svelte';
import ContactButton from '#components/ui/ContactButton.svelte';
import Logo from '#components/ui/Logo.svelte';
</script>

<header>
    <div id="desktop-header-content" class="hidden md:flex justify-between">
        <div id="logo">
            <Logo />
        </div>
        <div id="navigation" class="flex items-center justify-between">
            <DesktopMenu />
            <div class="ml-6 mr-5">
                <ContactButton />
            </div>
        </div>
    </div>
    <div id="mobile-header-content" class="md:hidden max-md:flex justify-between">
        <Logo />
        <div class="flex self-center">
            <div class="flex mr-4 rounded-sm border-secondary border-2 h-3/4.4">
                <ContactButton bgColor="bg-primary" textColor="text-secondary" />
            </div>
            <MobileMenu />
        </div>
    </div>
</header>
