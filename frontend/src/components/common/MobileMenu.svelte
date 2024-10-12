<script lang="ts">
let isOpen = false;

const toggleMenu = () => {
    isOpen = !isOpen;
};

</script>
  
<button 
    class="rounded border-4 bg-secondary border-secondary h-3/4 self-center"
    on:click={toggleMenu}>
    <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24">
      <path fill="#FFFFFF" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
    </svg>
</button>
  
{#if isOpen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
      on:click={toggleMenu}
      role="dialog"
      aria-modal="true"
      tabindex="0">
  
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <div 
        class="flex flex-col fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg transition-transform duration-300 transform translate-x-0"
        role="navigation"
        aria-label="mobile menu"
        tabindex="0">
        
        <button 
          class="rounded bg-red-500 w-1/2 self-center py-2 mt-6 text-white font-medium"
          on:click={toggleMenu}
          aria-label="Close menu">
          Close
        </button>
        

        <nav class="flex flex-col mx-2 mt-4 space-y-4 text-center">
          <a href="/" class="text-lg font-medium text-secondary mt-4">Resume</a>
          <a href="/portfolio" class="text-lg font-medium text-secondary mt-4">Portfolio</a>
          <a href="/biography" class="text-lg font-medium text-secondary mt-4">Biography</a>
        </nav>
      </div>
    </div>
{/if}