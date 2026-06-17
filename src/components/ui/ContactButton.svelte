<script lang="ts">
    const mailto: string = import.meta.env.PUBLIC_MAILTO;
</script>

<a 
    href={`mailto:${mailto}`}
    class="btn-primary"
>
    Contact Me
</a>