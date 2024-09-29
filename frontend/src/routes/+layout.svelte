<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { menuItems } from '../store';

    let currentPage: string;

    const menus: { [key: string]: string[] } = {
        '/': ['Portfolio', 'Biography', 'Contact'],
        '/biography': ['Portfolio', 'CV', 'Contact'],
        '/portfolio': ['Biography', 'Contact', 'CV'],
        '/contact': ['Portfolio', 'Biography', 'CV'],
    };

    $: if ($page) {
        currentPage = $page.url.pathname;
        if (menus[currentPage]) {
            $menuItems = menus[currentPage];
        } else {
            goto('/404');
        }
    }
</script>

<header>
    <nav>
        <ul>
            {#each $menuItems as item}
            <li><a href={`/${item.toLowerCase()}`}>{item}</a></li>
            {/each}
        </ul>
    </nav>
</header>

<slot />
  