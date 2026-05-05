<script lang="ts">
    const mailto: string = import.meta.env.PUBLIC_MAILTO;

    const handleClick = () => {
       window.open(`mailto:${mailto}`, '_blank');
    };
</script>

<button 
    class="btn-primary"
    on:click={handleClick}>
    Contact Me
</button>