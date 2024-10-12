<script lang="ts">
import Modal from './ContactModal.svelte';

export let bgColor: string = "bg-secondary";
export let textColor: string = "text-white";
let showModal: boolean = false;

const openModal = () => {
    showModal = true;
};

const closeModal = () => {
    showModal = false;
};
</script>

<button 
    class={`${bgColor} ${textColor} font-medium py-2 px-4 rounded`} 
    on:click={openModal}>
    <span>Contact Me</span>
</button>
  
<Modal {showModal} on:close={closeModal} />