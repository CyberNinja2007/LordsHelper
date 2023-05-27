<script>
  import { createEventDispatcher } from "svelte";

  export let open = false;
  export let title = "";

  const dispatch = createEventDispatcher();
</script>

{#if open}
  <div
    class="z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0"
  >
    <div class="fixed w-full h-full bg-gray-900 opacity-50" />
    <div
      class="bg-white w-full lg:h-5/6 lg:w-1/2 mx-auto rounded-lg shadow-xl z-50 overflow-y-auto"
    >
      <div
        class="flex justify-between items-center head bg-gray-100 py-5 px-8 text-2xl font-extrabold"
      >
        {title}
        <button
          class="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-full ml-4"
          on:click={() => dispatch("close")}
        >
          <i class="fa-solid fa-xmark fa-xl" />
        </button>
      </div>
      <div class="container p-8">
        <slot name="body" />
      </div>
    </div>
  </div>
{/if}
