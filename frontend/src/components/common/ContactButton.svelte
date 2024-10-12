<script lang="ts">
import Modal from './ContactModal.svelte';
import { openContactModal } from '$lib/store'

export let bgColor: string = "bg-secondary";
export let textColor: string = "text-white";

const openModal = () => {
    openContactModal.set(true);
};
</script>

<!-- Button to open the modal -->
<button class={`${bgColor} ${textColor} font-medium py-2 px-4 rounded`} on:click={openModal}>
    <span>Contact Me</span>
</button>
  
<Modal />