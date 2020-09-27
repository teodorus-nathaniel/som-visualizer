<script lang="ts">
  import { spring } from 'svelte/motion';
  import { onMount } from 'svelte';
  import { pannable } from '../actions/pannable';
  import type { Coord } from '../models/Coords';

  export let points: Coord[];
  export let scale: number;

  let lineSize = 10000;

  let containerSize = { width: 0, height: 0 };
  let springDefault = {
    stiffness: 0.15,
    damping: 0.8,
    precision: 0.001,
  };
  let coords = spring(
    {
      x: 0,
      y: 0,
    },
    springDefault
  );

  function handlePanMove(event) {
    coords.update((coords) => ({
      x: coords.x - event.detail.dx,
      y: coords.y - event.detail.dy,
    }));
  }

  onMount(() => {
    containerSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    coords.damping = coords.stiffness = 1;
    coords.set({
      x: -window.innerWidth / 2,
      y: -window.innerHeight / 2,
    });

    coords.damping = springDefault.damping;
    coords.stiffness = springDefault.stiffness;
  });
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
    {#each points as point (point)}
      <circle cx={point.x * scale} cy={point.y * scale} r={5} />
    {/each}
  </svg>
</div>
