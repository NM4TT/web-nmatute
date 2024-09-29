<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { menuItems } from '../store';
    import { onMount } from 'svelte';

    let currentPage: string;

    const menus: { [key: string]: string[] } = {
        '/': ['Portfolio', 'Biography'],
        '/biography': ['Portfolio', 'CV'],
        '/portfolio': ['Biography', 'CV'],
        '/404': ['Biography', 'Portfolio', 'CV'],
    };

    $: if ($page) {
        currentPage = $page.url.pathname;

        if (menus[currentPage]) {
            $menuItems = menus[currentPage];
        } else {
            onMount(() => {
                goto('/404');
            });
        }
    }
</script>

<header id="top">
    <nav>
        <ul>
            {#each $menuItems as item}
            <li><a href={`/${item.toLowerCase()}`}>{item}</a></li>
            {/each}
        </ul>
    </nav>
</header>

<slot />

<footer>
    <p><a href="#top">Back to top</a></p>
    <p>&copy; 2024 Nicolas Matute. All rights reserved.</p>
</footer>