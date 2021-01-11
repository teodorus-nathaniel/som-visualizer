<script lang="ts">
    import { onDestroy, onMount } from "svelte/internal";

    import CartesianGraph from "./components/CartesianGraph.svelte";
    import ZoomBar from "./components/ZoomBar.svelte";
    import Tailwind from "./Tailwind.svelte";

    let data = [
        {
            x: 5,
            y: 5,
        },
        {
            x: 20,
            y: 20,
        },
    ];

    let scale = 10;

    const handleZoom = (zoom: CustomEvent<number>) => {
        scale = zoom.detail;
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

    $: console.log(scale);
</script>

<style type="text/scss">
</style>

<Tailwind />
<main>
    <ZoomBar on:zoom={handleZoom} {scale} />
    <CartesianGraph points={data} {scale} />
</main>
