<script lang="ts">
    let { text = "Contact Me" } = $props<{ text?: string }>();
    const mailto: string = import.meta.env.PUBLIC_MAILTO;
</script>

<a 
    href={`mailto:${mailto}`}
    class="btn-primary"
>
    {text}
</a>