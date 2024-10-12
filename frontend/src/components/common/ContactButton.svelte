<script lang="ts">
import Modal from './ContactModal.svelte';
import { openContactModal } from '$lib/store'

const openModal = () => {
    openContactModal.set(true);
};
</script>

<!-- Button to open the modal -->
<button class="bg-secondary text-white font-medium py-2 px-4 rounded" on:click={openModal}>
    <span>Contact Me</span>
</button>
  
<Modal />