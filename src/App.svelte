<script lang="ts">
    import { onDestroy, onMount } from "svelte/internal";

    import CartesianGraph from "./components/CartesianGraph.svelte";
    import ZoomBar from "./components/ZoomBar.svelte";
    import type { Point } from "./models/Point";
    import Tailwind from "./Tailwind.svelte";

    let data: Point[] = [
        {
            id: 1,
            pos: {
                x: 5,
                y: 5,
            }
        },
        {
            id: 2,
            pos: {
                x: 20,
                y: 20,
            }
        },
    ];

    let scale = 10;

    const handleZoom = (zoom: CustomEvent<number>) => {
        scale = zoom.detail;
    };

    const handleClick = () => {
        data[1].pos.x = 5;
        data = data
    }

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
    <button on:click={handleClick}>Update Pos</button>
    <ZoomBar on:zoom={handleZoom} {scale} />
    <CartesianGraph points={data} {scale} />
</main>
