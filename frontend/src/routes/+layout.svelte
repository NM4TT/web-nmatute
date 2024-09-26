<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { menuItems } from '../store.js';
  
// Define your menus based on routes
const menus: { [key: string]: string[] } = {
    '/': ['Portfolio', 'Biography', 'Contact'],
    '/biography': ['Portfolio', 'CV', 'Contact'],
    '/portfolio': ['Biography', 'Contact', 'CV'],
    '/contact': ['Portfolio', 'Biography', 'CV'],
};

let currentPage: string;

$: if ($page) {
    currentPage = $page.url.pathname;
    if (menus[currentPage]) {
        $menuItems = menus[currentPage];
    } else {
        goto('/404');
    }
}
</script>

<nav>
<ul>
    {#each $menuItems as item}
    <li><a href={`/${item.toLowerCase()}`}>{item}</a></li>
    {/each}
</ul>
</nav>

<slot />
  