<script lang="ts">
  export let type = "linear";
  export let neuronCount = 25;

  $: size = Math.floor(Math.sqrt(neuronCount));
</script>

<style>
  .neuron {
    width: 15px;
    height: 15px;
    background-color: var(--primary);
    border-radius: 50%;
    position: relative;
    z-index: 1;
  }
  .line {
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: rgba(77, 133, 241, 0.3);
    top: 50%;
    z-index: 0;
    transform: translateY(-50%);
  }
  .row:not(:last-child) {
    margin-bottom: 40px;
  }
  .abs-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .line-vert {
    height: 100%;
    width: 15px;
    position: relative;
  }
  .line-vert::after {
    content: "";
    background-color: rgba(77, 133, 241, 0.3);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 100%;
  }
</style>

<div class="rounded p-8" style="border: 1px solid var(--primary)">
  <div class="flex flex-col relative">
    {#if type === 'linear'}
      <div class="relative flex justify-between">
        <div class="line" />
        {#each Array.from({ length: neuronCount }) as i}
          <div class="neuron" />
        {/each}
      </div>
    {:else}
      <div class="abs-layer flex justify-between">
        {#each Array.from({ length: size }) as _, i (i)}
          <div class="line-vert" />
        {/each}
      </div>
      {#each Array.from({ length: size }) as _, i (i)}
        <div class="relative flex justify-between row">
          <div class="line" />
          {#each Array.from({ length: size }) as _, j (j)}
            <div class="neuron" />
          {/each}
        </div>
      {/each}
    {/if}
  </div>
</div>
