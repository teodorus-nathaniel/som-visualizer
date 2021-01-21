<script lang="ts">
  import CustomizeModel from "./components/CustomizeModel.svelte";

  import SomController from "./components/SomController.svelte";
  import Tailwind from "./Tailwind.svelte";

  let openSomController = false;
  let somData: {
    neuronCount: number;
    type: string;
    dataset: number[][];
    epoch: number;
    radius: number;
    learningRate: number;
  } | null = null;
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
  <CustomizeModel
    on:save={(e) => {
      somData = e.detail;
      openSomController = true;
    }} />
  {#if openSomController && somData}
    <SomController
      data={somData}
      on:close={() => {
        openSomController = false;
        somData = null;
      }} />
  {/if}
</main>
