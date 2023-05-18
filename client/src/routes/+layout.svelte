<script>
  import Footer from "../components/footer.svelte";
  import { fade, fly } from "svelte/transition";

  const visibilityBorder = 700;
  let userScrolled = 0;
  let visible = false;
  export let data;

  const handleScroll = () => {
    if (userScrolled > visibilityBorder) {
      visible = true;
    } else {
      visible = false;
    }
  };

  const handleAnchorClick = (event) => {
    event.preventDefault();
    const link = event.currentTarget;
    const anchorId = new URL(link.href).hash.replace("#", "");
    const anchor = document.getElementById(anchorId);
    window.scrollTo({
      top: anchor.offsetTop,
      behavior: "smooth",
    });
  };
</script>

<svelte:window on:scroll={handleScroll} bind:scrollY={userScrolled} />

{#key data.url}
  {#if visible}
    <a
      href="#beginning"
      class="back-to-top"
      style="display:inline"
      on:click={handleAnchorClick}
      transition:fade
    >
      Венруться к началу
    </a>
  {/if}

  <div
    in:fly={{ x: -200, duration: 300, delay: 300 }}
    out:fly={{ x: 200, duration: 300 }}
  >
    <slot />
  </div>
{/key}

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
