<script lang="ts">
  import CustomizeModel from "./components/CustomizeModel.svelte";

  import SomController from "./components/SomController.svelte";
  import Tailwind from "./Tailwind.svelte";

  let openSomController = false;
</script>

<style type="text/scss">
  :global(input[type="range"]) {
    background-color: #fff;
    overflow: hidden;
  }
  :global(.floating-container) {
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  }

  :global(*) {
    font-family: Montserrat, sans-serif;
  }

  :global(:root) {
    --primary: #325eb2;
  }
</style>

<Tailwind />
<main>
  <CustomizeModel />
  {#if openSomController}
    <SomController on:close={() => (openSomController = false)} />
  {/if}
</main>
