<script lang="ts">
    import { onDestroy, onMount } from "svelte/internal";
    import AnimationController from "./components/AnimationController.svelte";
    import CustomizeModel from "./components/CustomizeModel.svelte";
    import CartesianGraph from "./components/Cartesian/CartesianGraph.svelte";
    import ZoomBar from "./components/ZoomBar.svelte";
    import { getNeurons, getPoints } from "./data/data";
    import Tailwind from "./Tailwind.svelte";

    let scale = 10;

    let neuronsData = getNeurons();
    let pointsData = getPoints();

    const handleZoom = (zoom: CustomEvent<number>) => {
        scale = zoom.detail;
    };

    const handleClick = () => {
        neuronsData[0][1].x = 5;
        neuronsData = neuronsData;

        pointsData = getPoints();
    };

    function onMouseWheel(e) {
        console.log(scale);
        if (e.deltaY > 0) scale = Math.max(1, scale - 1);
        else scale = Math.min(20, scale + 1);
    }

    onMount(() => {
        window.addEventListener("mousewheel", onMouseWheel);
    });

    onDestroy(() => {
        window.removeEventListener("mousewheel", onMouseWheel);
    });
</script>

<style type="text/scss">
    :global(input[type="range"]) {
        background-color: #fff;
        overflow: hidden;
    }
    :global(.floating-container) {
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
    }
</style>

<Tailwind />
<main>
    <CustomizeModel />

    <!-- <button class="absolute" on:click={handleClick}>Update Pos</button>
  <ZoomBar on:zoom={handleZoom} {scale} />
  <AnimationController />
  <CartesianGraph neurons={neuronsData} {scale} dataPoints={pointsData} /> -->
</main>
