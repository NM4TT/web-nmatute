<script lang="ts">
import { DesktopMenu, ContactButton, Logo } from '$components';
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
    <div id="mobile-header-content" class="md:hidden max-md:flex justify-start">
        <Logo />
    </div>
</header>