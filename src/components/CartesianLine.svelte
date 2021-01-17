<script lang="ts">
  import { tweened } from "svelte/motion";
  import animationConfig from "../animation/animationConfig";

  import type { Point } from "../models/Point";
  import getCoord from "../utils/getCoord";

  export let pointA: Point, pointB: Point;
  export let scale: number;
  export let color: string = '#c0c0c0'

  let posAX = tweened(pointA.pos.x, animationConfig);
  let posAY = tweened(pointA.pos.y, animationConfig);
  let posBX = tweened(pointB.pos.x, animationConfig);
  let posBY = tweened(pointB.pos.y, animationConfig);

  $: {
    posAX.set(pointA.pos.x);
    posAY.set(pointA.pos.y);
    posBX.set(pointB.pos.x);
    posBY.set(pointB.pos.y);
  }

</script>

<line 
  x1={getCoord($posAX, scale)} 
  y1={getCoord($posAY, scale)} 
  x2={getCoord($posBX, scale)} 
  y2={getCoord($posBY, scale)} 
  style={`stroke: ${color}; stroke-width: 1`} />