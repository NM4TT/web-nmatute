<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data;
    import '../generated.css';
    import CV from './cv/+page.svelte';
</script>
  
<CV data={data}/>
