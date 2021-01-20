<script lang="ts">
  import { tweened } from "svelte/motion";

  import type { Coord } from "../../models/Coord";
  import { animationConfig } from "../../stores/animationConfig";
  import getCoord from "../../utils/getCoord";

  export let pointA: Coord, pointB: Coord;
  export let scale: number;
  export let color: string = "#c0c0c0";

  let posAX = tweened(pointA[0], $animationConfig);
  let posAY = tweened(pointA[1], $animationConfig);
  let posBX = tweened(pointB[0], $animationConfig);
  let posBY = tweened(pointB[1], $animationConfig);

  $: {
    posAX.set(pointA[0]);
    posAY.set(pointA[1]);
    posBX.set(pointB[0]);
    posBY.set(pointB[1]);
  }
</script>

<line
  x1={getCoord($posAX, scale, true)}
  y1={getCoord($posAY, scale)}
  x2={getCoord($posBX, scale, true)}
  y2={getCoord($posBY, scale)}
  style={`stroke: ${color}; stroke-width: 1`} />
