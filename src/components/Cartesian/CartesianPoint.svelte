<script lang="ts">
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  import type { Coord } from "../../models/Coord";
  import getCoord from "../../utils/getCoord";
  import { animationConfig } from "../../stores/animationConfig";

  export let point: Coord;
  export let scale: number;
  export let color: string = "#303030";
  export let small: boolean = false;
  export let highlightPoint = false;

  let tooltipWidth = 100,
    tooltipHeight = 25;

  let posX = tweened(point[0], $animationConfig);
  let posY = tweened(point[1], $animationConfig);

  let showTooltip = false;
  let setShowToolTip = (show: boolean) => {
    showTooltip = show;
  };

  let pointSize = (small ? 0.5 : 1) * 1 * scale;

  $: {
    posX.set(point[0]);
    posY.set(point[1]);
  }

  let animatingPoint = false;
  const animationDuration = 300;
  let animatingPointSize = tweened(pointSize, {
    duration: animationDuration,
    easing: cubicOut
  });
  let intervalId = null;
  $: {
    const animating = () => {
      animatingPointSize.set(pointSize * 1.5);
      setTimeout(() => animatingPointSize.set(pointSize), animationDuration);
    };
    if (highlightPoint) {
      animatingPoint = true;
      animating();
      intervalId = setInterval(animating, animationDuration * 2);
    } else {
      clearInterval(intervalId);
      animatingPoint = false;
    }
  }

  $: x = getCoord(point[0], scale, true);
  $: y = getCoord(point[1], scale);
</script>

<style>
  .text {
    user-select: none;
  }
  .tooltip {
    opacity: 0;
    transition: opacity 300ms ease-out;
  }
  .tooltip.show {
    opacity: 1;
  }
</style>

<g
  class={`tooltip ${showTooltip ? 'show' : ''} ${animatingPoint ? 'animating' : ''}`}>
  <rect
    x={x - tooltipWidth / 2}
    y={y - (tooltipHeight + 1.5 * scale)}
    width={tooltipWidth}
    height={tooltipHeight}
    rx="5px"
    ry="5px"
    class="tooltip-rect" />
  <text
    class="text"
    text-anchor="middle"
    {x}
    y={y - (tooltipHeight / 2 + 1.5 * scale - 4)}
    fill="white">
    X:
    {point[0].toFixed(2)}
    Y:
    {point[1].toFixed(2)}
  </text>
</g>
{#if animatingPoint}
  <circle
    on:mouseenter={() => setShowToolTip(true)}
    on:mouseleave={() => setShowToolTip(false)}
    style={`stroke: ${color}; fill: transparent`}
    cx={getCoord($posX, scale, true)}
    cy={getCoord($posY, scale)}
    r={$animatingPointSize + 5} />
{/if}
<circle
  on:mouseenter={() => setShowToolTip(true)}
  on:mouseleave={() => setShowToolTip(false)}
  style={`fill: ${color}`}
  cx={getCoord($posX, scale, true)}
  cy={getCoord($posY, scale)}
  r={animatingPoint ? $animatingPointSize : pointSize} />
