<script lang="ts">
    import Modal from './ContactModal.svelte';

    export let bgColor: string = "bg-secondary";
    export let textColor: string = "text-white";
    let showModal: boolean = false;
    const mailto: string | undefined = import.meta.env.PUBLIC_MAILTO;

    const handleClick = () => {
        if (mailto) {
            window.open(`mailto:${mailto}`, '_blank');
        } else {
            showModal = true;
        }
    };

    const closeModal = () => {
        showModal = false;
    };
</script>

<button 
    class={`${bgColor} ${textColor} font-medium py-2 px-4 rounded`} 
    on:click={handleClick}>
    <span>Contact Me</span>
</button>
    
<Modal {showModal} on:close={closeModal} />
