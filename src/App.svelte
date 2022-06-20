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
