<script lang="ts">
    export let showModal: boolean = false;
    export let onClose: () => void;
    let email: string = "";

    const closeModal = () => {
        showModal = false;
        email = "";
        if (onClose) {
            onClose();
        }
    };

    async function notify(email: string): Promise<boolean> {
        try {
            const response = await fetch('/api/notify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sender: email }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result.success;
        } catch (error) {
            console.error('Error notifying:', error);
            return false;
        }
    }

    const handleSubmit = async (event: SubmitEvent) => {
        event.preventDefault();
        const emailPattern = /^[a-zA-Z0-9._%+-]{4,25}@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        try {
            const result: boolean = await notify(email);
            if (result) {
                alert("I'll contact you soon!.");
            } else {
                alert("There was an error, please retry later.");
            }
        } catch (error) {
            alert("An unexpected error occurred. Please try again later.");
        }
        closeModal();
    };
</script>

{#if showModal}
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