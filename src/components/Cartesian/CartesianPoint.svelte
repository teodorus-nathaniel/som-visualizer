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

  let tooltipWidth = 75,
    tooltipHeight = 25;

  let posX = tweened(point.x, $animationConfig);
  let posY = tweened(point.y, $animationConfig);

  console.log($animationConfig);
  let showTooltip = false;
  let setShowToolTip = (show: boolean) => {
    showTooltip = show;
  };

  $: {
    posX.set(point.x);
    posY.set(point.y);
  }

  $: size = 1 * scale;

  $: x = getCoord(point.x, scale, true);
  $: y = getCoord(point.y, scale);
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

<g class={`tooltip ${showTooltip ? 'show' : ''}`}>
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
    {point.x}
    Y:
    {point.y}
  </text>
</g>
<circle
  on:mouseenter={() => setShowToolTip(true)}
  on:mouseleave={() => setShowToolTip(false)}
  style={`fill: ${color}`}
  cx={getCoord($posX, scale, true)}
  cy={getCoord($posY, scale)}
  r={(small ? 0.5 : 1) * size} />
