<script lang="ts">
  import { tweened } from "svelte/motion";

  import type { Coord } from "../../models/Coord";
  import { animationConfig } from "../../stores/animationConfig";
  import getCoord from "../../utils/getCoord";

  export let pointA: Coord, pointB: Coord;
  export let scale: number;
  export let color: string = "#c0c0c0";

  let posAX = tweened(pointA.x, $animationConfig);
  let posAY = tweened(pointA.y, $animationConfig);
  let posBX = tweened(pointB.x, $animationConfig);
  let posBY = tweened(pointB.y, $animationConfig);

  $: {
    posAX.set(pointA.x);
    posAY.set(pointA.y);
    posBX.set(pointB.x);
    posBY.set(pointB.y);
  }
</script>

<line
  x1={getCoord($posAX, scale, true)}
  y1={getCoord($posAY, scale)}
  x2={getCoord($posBX, scale, true)}
  y2={getCoord($posBY, scale)}
  style={`stroke: ${color}; stroke-width: 1`} />
