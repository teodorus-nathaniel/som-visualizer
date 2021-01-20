<script lang="ts">
  import { spring } from "svelte/motion";
  import { onMount } from "svelte";
  import { pannable } from "../../actions/pannable";
  import type { Coord } from "../../models/Coord";
  import CartesianPoint from "./CartesianPoint.svelte";
  import CartesianLine from "./CartesianLine.svelte";
  import getNearestElement from "../../utils/getNearestElement";
  import getRainbowColors from "../../utils/getRainbowColors";

  export let neurons: Coord[][];
  export let scale: number;
  export let dataPoints: Coord[];
  export let winningNeuron: number[], evaluatedPoint: number;

  let lineSize = 10000;

  let containerSize = { width: 0, height: 0 };
  let springDefault = {
    stiffness: 0.15,
    damping: 0.8,
    precision: 0.001
  };
  let coords = spring(
    {
      x: 0,
      y: 0
    },
    springDefault
  );

  function handlePanMove(event) {
    coords.update((coords) => ({
      x: coords.x - event.detail.dx,
      y: coords.y - event.detail.dy
    }));
  }

  onMount(() => {
    containerSize = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    coords.damping = coords.stiffness = 1;
    coords.set({
      x: -window.innerWidth / 2,
      y: -window.innerHeight / 2
    });

    coords.damping = springDefault.damping;
    coords.stiffness = springDefault.stiffness;
  });

  let colors = [];
  $: {
    colors = dataPoints.map((coord) => {
      const allNeurons = neurons.reduce((acc, el) => [...acc, ...el], []);

      const nearestIndex = getNearestElement(allNeurons, coord);
      return nearestIndex;
    });
  }

  $: length = neurons.length * neurons[0].length;
</script>

<style type="text/scss">
  line {
    stroke: black;
    stroke-width: 1px;
  }
  svg {
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }
</style>

<div>
  <svg
    use:pannable
    on:panmove={handlePanMove}
    class="root"
    viewBox={`${$coords.x} ${$coords.y} ${containerSize.width} ${containerSize.height}`}
    width={containerSize.width}
    height={containerSize.height}>
    <line x1={-lineSize} y1={0} x2={lineSize} y2={0} />
    <line x1={0} y1={-lineSize} x2={0} y2={lineSize} />
    {#each neurons as row, i (i)}
      {#each row as neuron, j (j)}
        {#if neurons[i + 1] && neurons[i + 1][j]}
          <CartesianLine pointA={neuron} pointB={neurons[i + 1][j]} {scale} />
        {/if}
        {#if neurons[i] && neurons[i][j + 1]}
          <CartesianLine pointA={neuron} pointB={neurons[i][j + 1]} {scale} />
        {/if}
      {/each}
    {/each}
    {#each neurons as row, i (i)}
      {#each row as neuron, j (j)}
        <CartesianPoint
          highlightPoint={i === winningNeuron[0] && j === winningNeuron[1]}
          color={getRainbowColors((i * neurons.length + j) / length)}
          point={neuron}
          {scale} />
      {/each}
    {/each}
    {#each dataPoints as point, i (i)}
      <CartesianPoint
        color={getRainbowColors(colors[i] / length)}
        {point}
        {scale}
        highlightPoint={i === evaluatedPoint}
        small />
    {/each}
  </svg>
</div>
