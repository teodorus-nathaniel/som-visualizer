<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte/internal";
  import AnimationController from "./AnimationController.svelte";
  import CartesianGraph from "./Cartesian/CartesianGraph.svelte";
  import ZoomBar from "./ZoomBar.svelte";
  import trainLinearSOM from "../core/som-linear";
  import train2dSOM from "../core/som-2d";
  import type { Coord } from "../models/Coord";
  import { close } from "svelte-awesome/icons";
  import { fly, fade } from "svelte/transition";
  import Icon from "svelte-awesome";

  export let data: {
    neuronCount: number;
    type: string;
    dataset: number[][];
    epoch: number;
    radius: number;
    learningRate: number;
  };

  const dispatch = createEventDispatcher();

  let scale = 10;

  let pointsData = data.dataset;

  const handleZoom = (zoom: CustomEvent<number>) => {
    scale = zoom.detail;
  };

  const somFunc = data.type === "linear" ? trainLinearSOM : train2dSOM;
  const som = somFunc(
    data.dataset,
    data.neuronCount,
    data.learningRate,
    data.epoch,
    data.radius
  );

  let doneTraining = false;

  let somValue = som.next().value;
  let neurons: Coord[][] = somValue ? somValue.weights : [];

  let winningNeuron = [-1, -1];
  let evaluatedPoint = -1;
  let currentEpoch = 0;

  function onMouseWheel(e) {
    if (e.deltaY > 0) scale = Math.max(1, scale - 1);
    else scale = Math.min(20, scale + 1);
  }

  let showNotification = false;
  let timeoutId = null;

  function setTimeoutShowNotification() {
    timeoutId = setTimeout(() => {
      showNotification = true;
    }, 3000);
  }

  onMount(() => {
    setTimeoutShowNotification();
  });

  function continueSom() {
    const iteration = som.next();
    if (iteration.done || !iteration.value) {
      doneTraining = true;
      return;
    }
    neurons = iteration.value.weights ?? neurons;
    winningNeuron = iteration.value.bmu ?? [-1, -1];
    evaluatedPoint = iteration.value.dataIndex ?? -1;
    currentEpoch = iteration.value.epoch;
    showNotification = false;
  }

  let skipEpoch = 0;
  let showLoading = false;
  let iterationLeft = 0;
  function doSomInBackground() {
    if (iterationLeft <= 0 || doneTraining) {
      setTimeoutShowNotification();
      showLoading = false;
      skipEpoch = 0;
      return;
    }
    window.requestAnimationFrame(() => {
      continueSom();
      doSomInBackground();
      iterationLeft -= 1;
    });
  }
  $: {
    if (skipEpoch >= 0 && !doneTraining) {
      iterationLeft = 2 * skipEpoch * pointsData.length + skipEpoch;
      showLoading = true;
      doSomInBackground();
    }
  }

  function handleKeyPressed(e) {
    if (e.keyCode === 10) {
      dispatch("close");
    }
    if (e.key !== "Enter") return;

    continueSom();

    clearTimeout(timeoutId);
    setTimeoutShowNotification();
  }

  let autoplay = false;
  let intervalId = null;
  const DEFAULT_ANIMATION_SPEED = 3000;
  let animationSpeed = 1500;
  function handleAutoplay(data: CustomEvent<boolean>) {
    autoplay = data.detail;
  }
  $: {
    clearInterval(intervalId);
    if (autoplay) {
      intervalId = setInterval(continueSom, animationSpeed);
    }
  }
  $: {
    if (!autoplay) setTimeoutShowNotification();
    else clearTimeout(timeoutId);
  }

  function handleSpeedChange(data: CustomEvent<number>) {
    animationSpeed =
      ((100 - data.detail) * DEFAULT_ANIMATION_SPEED) / 100 + 200;
  }

  onMount(() => {
    window.addEventListener("mousewheel", onMouseWheel);
    window.addEventListener("keypress", handleKeyPressed);
  });

  onDestroy(() => {
    window.removeEventListener("mousewheel", onMouseWheel);
  });
</script>

<style>
  .som-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    z-index: 999;
  }
  .exit-btn {
    position: absolute;
    z-index: 99;
    top: 30px;
    right: 50px;
  }
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
  .full-screen-loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    z-index: 999;
    display: none;
    font-weight: bold;
  }
  .full-screen-loading.show {
    display: flex;
  }
  .data-container {
    position: absolute;
    left: 50px;
    top: 30px;
  }
  @keyframes fade {
    50% {
      opacity: 1;
    }
  }
</style>

<div class="som-container" in:fly={{ x: -300, duration: 300 }} out:fade>
  <div class="data-container shadow-md px-8 py-5 rounded">
    <p class="text-lg">Epoch: {currentEpoch}</p>
  </div>
  <button class="exit-btn" on:click={() => dispatch('close')}>
    <Icon scale="2" data={close} />
  </button>
  <div class={`full-screen-loading ${showLoading ? 'show' : ''}`}>
    Loading...
  </div>
  <p class={`notification flex flex-col ${showNotification ? 'show' : ''}`}>
    {#if doneTraining}
      <p class="text-center">Training Complete.</p>
      <p class="text-center">Press CTRL+ENTER to go back to home...</p>
    {:else}Press ENTER to continue...{/if}
  </p>
  <ZoomBar on:zoom={handleZoom} {scale} />
  <AnimationController
    on:changeSpeed={handleSpeedChange}
    on:autoplay={handleAutoplay}
    on:changeSkipEpoch={(data) => (skipEpoch = data.detail)} />
  <CartesianGraph
    {evaluatedPoint}
    {winningNeuron}
    {neurons}
    {scale}
    dataPoints={pointsData} />
</div>
