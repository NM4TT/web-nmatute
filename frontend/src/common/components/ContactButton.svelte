<script lang="ts">
    import { PUBLIC_MAILTO } from '$env/static/public';


    export let bgColor: string = "bg-secondary";
    export let textColor: string = "text-white";
    let showModal: boolean = false;
    const mailto: string = PUBLIC_MAILTO;

    const handleClick = () => {
       window.open(`mailto:${mailto}`, '_blank');
    };

</script>

<button 
    class={`${bgColor} ${textColor} font-medium py-2 px-4 rounded-sm cursor-pointer`}
    on:click={handleClick}>
    <span>Contact Me</span>
</button>
