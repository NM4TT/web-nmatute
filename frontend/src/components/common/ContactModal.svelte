<script lang="ts">
    import { openContactModal } from '$lib/store'
    import { derived } from 'svelte/store';

    const isVisible = derived(openContactModal, $openContactModal => $openContactModal);

    let email: string = "";

    const closeModal = () => {
        openContactModal.set(false);
        email = "";
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        closeModal();
    };
</script>
  
{#if $isVisible}
<div id="contact-modal"
    class="fixed inset-0 flex items-center justify-center 
    bg-black bg-opacity-50 backdrop-blur-sm z-50">
    <div class="bg-white rounded shadow-lg p-6 w-80">
        <h2 class="text-lg font-bold mb-4 text-center">Contact Me</h2>
        <p>Please write down your email address so I can reach out back to you!</p>
        <form on:submit={handleSubmit} class="mt-3">
        <input type="email" id="email" name="email" bind:value={email} required
            placeholder="example@gmail.com"
            class="border rounded p-2 w-full mb-4" />
            <div class="flex justify-end">
                <button type="button" on:click={closeModal}
                    class="bg-red-500 text-white font-medium 
                    py-2 px-2 mr-4 rounded">
                Cancel
                </button>
                <button type="submit" 
                    class="bg-secondary text-white font-medium 
                    py-2 px-4 rounded">
                    Send
                </button>
            </div>
        </form>
    </div>
</div>
{/if}