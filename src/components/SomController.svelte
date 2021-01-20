<script lang="ts">
  import { onDestroy, onMount } from "svelte/internal";
  import AnimationController from "./AnimationController.svelte";
  import CartesianGraph from "./Cartesian/CartesianGraph.svelte";
  import ZoomBar from "./ZoomBar.svelte";

  import trainLinearSOM from "../core/som-linear";
  import { getPoints } from "../data/data";
  import type { Coord } from "../models/Coord";
  import train2dSOM from "../core/som-2d";

  let scale = 10;

  let pointsData = getPoints();

  const handleZoom = (zoom: CustomEvent<number>) => {
    scale = zoom.detail;
  };

  const som = train2dSOM(pointsData, 9, 0.5, 500, 2);
  let somValue = som.next().value;
  let neurons: Coord[][] = somValue ? somValue.weights : [];

  let winningNeuron = [-1, -1];
  let evaluatedPoint = -1;

  function onMouseWheel(e) {
    if (e.deltaY > 0) scale = Math.max(1, scale - 1);
    else scale = Math.min(20, scale + 1);
  }

  let showNotification = false;
  let timeoutId = null;

  onMount(() => {
    timeoutId = setTimeout(() => {
      showNotification = true;
    }, 3000);
  });

  function continueSom() {
    const iteration = som.next();
    if (iteration.done || !iteration.value) return;
    neurons = iteration.value.weights ?? neurons;
    winningNeuron = iteration.value.bmu ?? [-1, -1];
    evaluatedPoint = iteration.value.dataIndex ?? -1;
  }

  function handleEnterPressed(e) {
    if (e.key !== "Enter") return;

    continueSom();

    showNotification = false;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      showNotification = true;
    }, 3000);
  }

  onMount(() => {
    window.addEventListener("mousewheel", onMouseWheel);
    window.addEventListener("keypress", handleEnterPressed);
  });

  onDestroy(() => {
    window.removeEventListener("mousewheel", onMouseWheel);
  });
</script>

<style>
  .notification {
    position: absolute;
    bottom: 80px;
    font-size: 24px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    opacity: 0;
    transition: opacity 300ms ease-out;
  }
  .notification.show {
    animation: fade 2s linear infinite;
  }

  @keyframes fade {
    50% {
      opacity: 1;
    }
  }
</style>

<p class={`notification ${showNotification ? 'show' : ''}`}>
  Press enter to continue...
</p>
<ZoomBar on:zoom={handleZoom} {scale} />
<AnimationController />
<CartesianGraph
  {evaluatedPoint}
  {winningNeuron}
  {neurons}
  {scale}
  dataPoints={pointsData} />
