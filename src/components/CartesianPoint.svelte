<script lang="ts">
  import { tweened } from "svelte/motion";
	import { cubicOut } from 'svelte/easing';

  import type { Point } from "../models/Point";
  import getCoord from "../utils/getCoord";

  export let point: Point;
  export let scale: number;
  export let color: string = '#303030'

  const animationConfig = {
    duration: 400,
    easing: cubicOut
  }

  const posX = tweened(point.pos.x, animationConfig);
  const posY = tweened(point.pos.y, animationConfig);

  $: {
    posX.set(point.pos.x);
    posY.set(point.pos.y);
  }
</script>

<circle style={`fill: ${color}`} cx={getCoord($posX, scale)} cy={getCoord($posY, scale)} r={1 * scale} />